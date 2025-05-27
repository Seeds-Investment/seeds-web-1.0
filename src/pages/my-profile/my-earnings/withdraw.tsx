'use-client';

import ModalWithdrawList from '@/components/popup/ModalWithdrawList';
import ModalWithdrawOption from '@/components/popup/ModalWithdrawOption';
import withAuth from '@/helpers/withAuth';
import { getWithdrawalMyEarning } from '@/repository/payment.repository';
import { getUserInfo } from '@/repository/profile.repository';
import { type RootState } from '@/store/earnings';
import {
  resetBankAccount,
  setAccountName,
  setAccountNumber
} from '@/store/earnings/withdrawSlice';
import { type UserInfo } from '@/utils/interfaces/tournament.interface';
import { type Type_VA } from '@/utils/interfaces/withdraw.interfaces';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ArrowDownCollapse, XIcon } from 'public/assets/vector';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Withdraw = (): React.ReactElement => {
  const router = useRouter();
  const id = router.query.id;
  const { t } = useTranslation();
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [paymentType, setPaymentType] = useState<string>('bank');
  const [isShowWithdrawOption, setIsShowWithdrawOption] = useState<boolean>(false);
  const [isShowWithdrawList, setIsShowWithdrawList] = useState<boolean>(false);
  const [listVA, setListVA] = useState<Type_VA[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const dispatch = useDispatch();
  const { accountName, bankAccount, accountNumber } = useSelector(
    (state: RootState) => state?.withdraw ?? {}
  );

  const handleInputAccountName = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = event.target.value.replace(/[^a-zA-Z\s]/g, '');
    dispatch(setAccountName(value));
  };

  const handleInputAccountNumber = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = event.target.value.replace(/\D/g, '');
    dispatch(setAccountNumber(value));
  };

  const handleOpenWithdrawOption = (): void => {
    setIsShowWithdrawOption(true);
  };

  const fetchPaymentList = async (currency: string): Promise<void> => {
    try {
      const result = await getWithdrawalMyEarning({
        search: searchQuery,
        currency
      });
      if (paymentType === 'bank') {
        setListVA(result?.type_va);
      } else if (paymentType === 'e-wallet') {
        setListVA(result?.type_ewallet);
      }
    } catch (error) {
      toast.error(`Error fetching data: ${error as string}`);
    }
  };

  const fetchData = async (): Promise<void> => {
    try {
      const dataInfo = await getUserInfo();
      setUserInfo(dataInfo);
    } catch (error) {
      toast(`Error fetching data: ${error as string}`);
    }
  };

  useEffect(() => {
    fetchData()
      .then()
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (id !== null && userInfo !== undefined) {
      void fetchPaymentList(userInfo?.preferredCurrency ?? 'IDR');
    }
  }, [id, userInfo, paymentType, searchQuery]);

  return (
    <>
      {isShowWithdrawOption && userInfo != null && (
        <ModalWithdrawOption
          onClose={() => {
            setIsShowWithdrawOption(prev => !prev);
          }}
          setPaymentType={setPaymentType}
          setIsShowWithdrawList={setIsShowWithdrawList}
        />
      )}

      {isShowWithdrawList && userInfo != null && (
        <ModalWithdrawList
          onClose={() => {
            setIsShowWithdrawList(prev => !prev);
            setSearchQuery('');
          }}
          paymentType={paymentType}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          listVA={listVA}
          userInfo={userInfo}
        />
      )}
      <div className="w-full flex flex-col justify-center items-center rounded-xl p-5 bg-white">
        <Typography className="w-full text-center text-lg md:text-xl font-semibold font-poppins mt-4">
          {t('earning.withdraw')}
        </Typography>

        {/* Bank Data */}
        <div className="w-full mt-4">
          <div className="mb-4">
            <Typography className="font-semibold font-poppins text-sm mb-2">
              {t('earning.platformOption')}
            </Typography>
            <div className='w-full flex gap-2'>
              <div
                onClick={() => {
                  handleOpenWithdrawOption();
                }}
                className="w-full flex justify-between items-center border-b border-[#CCCCCC] pb-2 cursor-pointer"
              >
                <div>
                  {(bankAccount?.payment_method ?? '') === '' ? (
                    <div className="text-[#CCCCCC]">
                      {t('earning.enterBankAccount')}
                    </div>
                  ) : (
                    <div className='flex justify-center items-center h-[30px] w-auto'>
                      <Image
                        src={bankAccount?.logo_url}
                        alt={'BankAccount'}
                        width={1000}
                        height={1000}
                        className="w-full h-full"
                      />
                    </div>
                  )}
                </div>
                <div className="flex justify-center items-center w-[30px] h-[30px]">
                  <Image
                    src={ArrowDownCollapse}
                    alt={'ArrowDown'}
                    width={100}
                    height={100}
                    className="w-full h-full"
                  />
                </div>
              </div>
              {
                bankAccount?.payment_method !== '' &&
                  <Image
                    src={XIcon}
                    alt="X"
                    width={24}
                    height={24}
                    onClick={() => { dispatch(resetBankAccount()) }}
                    className="hover:scale-110 transition ease-out cursor-pointer mb-2"
                  />
              }
            </div>
          </div>
          <div className="mb-4">
            <Typography className="font-semibold font-poppins text-sm">
              {t('earning.accountName')}
            </Typography>
            <input
              id="search"
              type="text"
              name="search"
              value={accountName}
              onChange={e => {
                handleInputAccountName(e);
              }}
              placeholder={`${t('earning.enterAccountName')}`}
              className="border-b border-[#CCCCCC] block w-full text-[#262626] h-11 leading-4 placeholder:text-[#BDBDBD] focus:outline-0 disabled:bg-[#E9E9E9]"
            />
          </div>
          <div className="mb-4">
            <Typography className="font-semibold font-poppins text-sm">
              {t('earning.accountNumber')}
            </Typography>
            <input
              id="search"
              type="text"
              name="search"
              value={accountNumber}
              onChange={e => {
                handleInputAccountNumber(e);
              }}
              placeholder={`${t('earning.enterAccountNumber')}`}
              className="border-b border-[#CCCCCC] block w-full text-[#262626] h-11 leading-4 placeholder:text-[#BDBDBD] focus:outline-0 disabled:bg-[#E9E9E9]"
            />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center rounded-xl p-5 bg-white gap-4 mt-4 mb-16">
        <Button
          disabled={accountName === '' || bankAccount?.payment_method === '' || accountNumber === ''}
          onClick={async () => {
            await router.push('/my-profile/my-earnings/withdraw-value');
          }}
          className="w-full py-2 md:py-4 flex justify-center items-center bg-seeds-button-green hover:shadow-lg text-white duration-300 cursor-pointer rounded-full font-poppins text-md capitalize"
        >
          {t('earning.continue')}
        </Button>
        <Button
          onClick={async () => {
            await router.push('/my-profile/my-earnings');
          }}
          className="w-full py-2 md:py-4 flex justify-center items-center text-[#262626] bg-white border border-[#E2E2E2] hover:bg-[#E2E2E2] hover:shadow-lg duration-300 cursor-pointer rounded-full font-poppins text-md capitalize"
        >
          {t('earning.back')}
        </Button>
      </div>
    </>
  );
};

export default withAuth(Withdraw);
