/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use-client';

import EarningCoin from '@/assets/my-profile/earning/earningCoin.svg';
import GreenBackground from '@/assets/my-profile/earning/green-background.png';
import PaymentProcess from '@/assets/my-profile/earning/paymentProcess.svg';
import WithdrawCoin from '@/assets/my-profile/earning/withdrawCoin.svg';

import AssetPagination from '@/components/AssetPagination';
import Loading from '@/components/popup/Loading';
import { standartCurrency } from '@/helpers/currency';
import { getEarningDate } from '@/helpers/dateFormat';
import withAuth from '@/helpers/withAuth';
import {
  getEarningBalance,
  getEarningHistory,
  getWithdrawKYCStatus
} from '@/repository/earning.repository';
import { getUserInfo } from '@/repository/profile.repository';
import LanguageContext from '@/store/language/language-context';
import { type IKYCStatus, type Result } from '@/utils/interfaces/earning.interfaces';
import { type UserInfo } from '@/utils/interfaces/tournament.interface';
import { Typography } from '@material-tailwind/react';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';

interface EarningHistory {
  amount: number;
  created_at: string;
  direction: string;
  id: string;
  source: string;
  source_id: string;
  source_name: string;
  status: string;
  user_id: string;
}

interface EarningMetadata {
  current_page: number;
  limit: number;
  total: number;
  total_page: number;
}

const MyEarnings = (): React.ReactElement => {
  const router = useRouter();
  const id = router.query.id;
  const { t } = useTranslation();
  const languageCtx = useContext(LanguageContext);
  const [earning, setEarning] = useState<Result>();
  const [kyc, setKyc] = useState<IKYCStatus>();
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [earningHistory, setEarningHistory] = useState<EarningHistory[]>([]);
  const [earningMetadata, setEarningMetadata] = useState<EarningMetadata>();
  const [isLoadingEarn, setIsLoadingEarn] = useState<boolean>(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState<boolean>(false);
  const [earningHistoryParams, setEarningHistoryParams] = useState({
    limit: 8,
    page: 1,
    search: '',
    group: ''
  });
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchData()
      .then()
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (id !== null && userInfo !== undefined) {
      void fetchMyEarningsData(userInfo?.preferredCurrency);
      void fetchWithdrawKYCStatus();
    }
  }, [id, userInfo]);

  useEffect(() => {
    if (id !== null && userInfo !== undefined) {
      void fetchEarningHistory(userInfo?.preferredCurrency);
    }
  }, [id, userInfo, earningHistoryParams]);

  const fetchData = async (): Promise<void> => {
    try {
      const dataInfo = await getUserInfo();
      setUserInfo(dataInfo);
    } catch (error) {
      toast(`Error fetching data: ${error as string}`);
    }
  };

  const fetchMyEarningsData = async (currency: string): Promise<void> => {
    try {
      setIsLoadingEarn(true);
      const result = await getEarningBalance(currency);
      setEarning(result);
    } catch (error) {
      toast.error(`Error fetching data: ${error as string}`);
    } finally {
      setIsLoadingEarn(false);
    }
  };

  const fetchEarningHistory = async (currency: string): Promise<void> => {
    try {
      setIsLoadingHistory(true);
      const response = await getEarningHistory({
        ...earningHistoryParams,
        currency
      });
      setEarningHistory(response?.data);
      setEarningMetadata(response?.metadata);
    } catch (error) {
      toast.error(`Error fetching data: ${error as string}`);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const fetchWithdrawKYCStatus = async (): Promise<void> => {
    try {
      const response = await getWithdrawKYCStatus();
      setKyc(response)
    } catch (error) {
      toast.error(`Error fetching data: ${error as string}`);
    }
  };

  const handleRouteWithdrawStatus = async (
    status: string,
    id: string
  ): Promise<void> => {
    await router.push(`/my-profile/my-earnings/withdraw-status/${id}`);
  };

  return (
    <>
      {isLoadingEarn && isLoadingHistory && <Loading />}
      <div className="w-full flex flex-col justify-center items-center rounded-xl p-5 bg-white">
        <div
          className="w-full p-2 md:p-4 rounded-xl"
          style={{
            backgroundImage: `url(${GreenBackground.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="flex flex-col justify-between items-center rounded-md p-2 md:p-4">
            <Typography className="w-full font-medium md:font-semibold font-poppins text-sm md:text-lg text-white">
              {t('earning.myEarnings')}
            </Typography>
            <div className="w-full flex justify-between items-center">
              <Typography className="font-semibold font-poppins text-white text-base md:text-xl">
                {userInfo?.preferredCurrency !== undefined
                  ? userInfo?.preferredCurrency
                  : 'IDR'}
                {standartCurrency(earning?.balance ?? 0).replace('Rp', '')}
              </Typography>
              <Typography
                onClick={async () => {
                  if (kyc?.status === 'approve') {
                    await router.push('/my-profile/my-earnings/withdraw')
                  } else {
                    await router.push('/my-profile/my-earnings/withdraw-kyc')
                  }
                }}
                className="px-4 md:px-8 lg:px-16 py-1 font-poppins text-[#3AC4A0] bg-white text-xs md:text-sm rounded-full cursor-pointer hover:shadow-lg duration-300 font-medium"
              >
                {t('earning.withdraw')}
              </Typography>
            </div>
          </div>
        </div>
        <div className="flex justify-start w-full mt-4">
          <Typography className="text-lg md:text-xl font-semibold font-poppins">
            {t('earning.earningHistory')}
          </Typography>
        </div>
        <div className='w-full mt-4'>
          <div className="relative w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={e => { 
                setSearchTerm(e.target.value);

                if (debounceTimeout) {
                  clearTimeout(debounceTimeout);
                }
            
                const timeout = setTimeout(() => {
                  setEarningHistoryParams((prev) => ({
                    ...prev,
                    page: 1,
                    search: e.target.value
                  }));
                }, 500);
            
                setDebounceTimeout(timeout);
              }}
              placeholder={`${t('earning.search')}`}
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-seeds-button-green"
            />
            {earningHistoryParams?.search !== '' && (
              <button
                onClick={() => { setEarningHistoryParams({ ...earningHistoryParams, search: '' }) }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <FiX size={18} />
              </button>
            )}
          </div>
          <div className='w-full flex gap-2 mt-4'>
            <Typography 
              className={`
                w-full py-2 px-4 cursor-pointer rounded-lg text-center font-medium text-sm
                ${
                  earningHistoryParams?.group === ''
                    ? 'bg-seeds-button-green text-white hover:bg-seeds-green duration-200'
                    : 'bg-white text-[#BDBDBD] border border-[#BDBDBD]'
                }
              `}
              onClick={() => { 
                setEarningHistoryParams({ ...earningHistoryParams, group: '', page: 1, search: '' })
                setSearchTerm('')
              }}
            >
              {t('earning.all')}
            </Typography>
            <Typography
              className={`
                w-full py-2 px-4 cursor-pointer rounded-lg text-center font-medium text-sm
                ${
                  earningHistoryParams?.group === 'OUT'
                    ? 'bg-seeds-button-green text-white hover:bg-seeds-green duration-300'
                    : 'bg-white text-[#BDBDBD] border border-[#BDBDBD]'
                }
              `}
              onClick={() => { 
                setEarningHistoryParams({ ...earningHistoryParams, group: 'OUT', page: 1, search: '' })
                setSearchTerm('')
              }}
            >
              {t('earning.withdrawal')}
            </Typography>
            <Typography
              className={`
                w-full py-2 px-4 cursor-pointer rounded-lg text-center font-medium text-sm
                ${
                  earningHistoryParams?.group === 'IN'
                    ? 'bg-seeds-button-green text-white hover:bg-seeds-green duration-300'
                    : 'bg-white text-[#BDBDBD] border border-[#BDBDBD]'
                }
              `}
              onClick={() => { 
                setEarningHistoryParams({ ...earningHistoryParams, group: 'IN', page: 1, search: '' }) 
                setSearchTerm('')
              }}
            >
              {t('earning.earnings')}
            </Typography>
          </div>
        </div>

        {/* Earnings and Withdraws */}
        <div className="w-full mt-4">
          {!isLoadingHistory ? (
            earningHistory !== null ? (
              <div className="w-full gap-2">
                {earningHistory?.map(item => (
                  <div
                    key={item?.id ?? '0'}
                    onClick={() => {
                      handleRouteWithdrawStatus(
                        item?.status ?? '',
                        item?.id ?? '0'
                      );
                    }}
                    className="w-full flex justify-between items-center p-2 md:p-4 cursor-pointer rounded-lg hover:bg-[#F9F9F9] hover:shadow-lg duration-300"
                  >
                    <div className="flex justify-start items-center gap-2 md:gap-4">
                      <div
                        className={`${
                          (item?.direction ?? 'IN') === 'IN'
                            ? 'bg-[#DCFCE4]'
                            : 'bg-[#FFF7D2]'
                        } w-[40px] h-[40px] md:w-[60px] md:h-[60px] flex justify-center items-center rounded-full`}
                      >
                        <Image
                          alt=""
                          src={
                            (item?.direction ?? 'IN') === 'IN'
                              ? EarningCoin
                              : WithdrawCoin
                          }
                          width={100}
                          height={100}
                          className="w-[25px] h-[25px] md:w-[35px] md:h-[35px]"
                        />
                      </div>
                      <div className="">
                        <Typography className="text-xs md:text-base font-semibold font-poppins">
                          {(item?.direction ?? 'IN') === 'IN'
                            ? t('earning.earnings')
                            : t('earning.withdrawal')}
                        </Typography>
                        <Typography className="md:hidden text-xs md:text-base font-poppins text-[#BDBDBD]">
                          {(item?.source_name ?? 'Winner Rewards')?.length < 20
                            ? item?.source_name ?? 'Winner Rewards'
                            : `${(item?.source_name ?? 'Winner Rewards')?.slice(
                                0,
                                19
                              )}...`}
                        </Typography>
                        <Typography className="hidden md:block text-xs md:text-base font-poppins text-[#BDBDBD]">
                          {item?.source_name ?? 'Winner Rewards'}
                        </Typography>
                        <div className="flex gap-1">
                          <Typography className="text-xs md:text-base font-poppins text-[#BDBDBD]">
                            {languageCtx.language === 'ID'
                              ? getEarningDate(
                                  new Date(
                                    new Date(
                                      item?.created_at ?? '2024-12-31T23:59:00Z'
                                    )
                                  ),
                                  'id-ID'
                                )
                              : getEarningDate(
                                  new Date(
                                    new Date(
                                      item?.created_at ?? '2024-12-31T23:59:00Z'
                                    )
                                  ),
                                  'en-US'
                                )}
                          </Typography>
                          <Typography className="hidden md:flex text-xs md:text-base font-poppins text-[#BDBDBD]">
                            {`- ${moment(item?.created_at).format('HH:mm:ss')}`}
                          </Typography>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-end items-end">
                      <Typography className="text-xs md:text-base font-poppins text-[#BDBDBD]">
                        +{' '}
                        {`${
                          userInfo?.preferredCurrency !== undefined
                            ? userInfo?.preferredCurrency
                            : 'IDR'
                        }${standartCurrency(item?.amount ?? 0).replace(
                          'Rp',
                          ''
                        )}`}
                      </Typography>
                      <Typography
                        className={`${
                          (item?.status ?? 'completed') === 'completed'
                            ? 'text-[#4DA81C]'
                            : (item?.status ?? 'completed') === 'pending'
                            ? 'text-[#D89918]'
                            : 'text-[#DA2D1F]'
                        } text-xs md:text-base font-poppins font-semibold`}
                      >
                        {(item?.status ?? 'Loading...') === 'completed'
                          ? t('earning.completed')
                          : (item?.status ?? 'Loading...') === 'pending'
                          ? t('earning.onProgress')
                          : (item?.status ?? 'Loading...') === 'rejected'
                          ? t('earning.rejected')
                          : 'Loading...'}
                      </Typography>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white flex flex-col justify-center items-center text-center lg:px-0">
                <Image alt="" src={PaymentProcess} className="w-[250px]" />
                <p className="font-semibold text-black text-lg">
                  {t('earning.noData')}
                </p>
                <p className="text-[#7C7C7C]">
                  {t('earning.noDataDescription')}
                </p>
              </div>
            )
          ) : (
            <div className="w-full flex justify-center h-fit mt-8">
              <div className="h-[60px]">
                <div className="animate-spinner w-16 h-16 border-8 border-gray-200 border-t-seeds-button-green rounded-full" />
              </div>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mx-auto my-8">
          <AssetPagination
            currentPage={earningHistoryParams.page}
            totalPages={Math.ceil((earningMetadata?.total ?? 0) / 8)}
            onPageChange={page => {
              setEarningHistoryParams({ ...earningHistoryParams, page });
            }}
          />
        </div>
      </div>
    </>
  );
};

export default withAuth(MyEarnings);
