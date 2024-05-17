/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use-client';

import CircleBackground from '@/assets/my-profile/earning/circleBackground.svg';
import Loading from '@/components/popup/Loading';
import { standartCurrency } from '@/helpers/currency';
import withAuth from '@/helpers/withAuth';
import { getEarningBalance } from '@/repository/earning.repository';
import { getUserInfo } from '@/repository/profile.repository';
import { type Result } from '@/utils/interfaces/earning.interfaces';
import { type UserInfo } from '@/utils/interfaces/tournament.interface';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const Withdraw = (): React.ReactElement => {
  const router = useRouter();
  const id = router.query.id;
  const { t } = useTranslation();
  const [earning, setEarning] = useState<Result>();
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [paymentType, setPaymentType] = useState<string>('bank');
  const [isLoadingEarn, setIsLoadingEarn] = useState<boolean>(false);

  const [accountName, setAccountName] = useState<string>();
  const [bankAccount, setBankAccount] = useState<string>();
  const [accountNumber, setAccountNumber] = useState<string>();

  useEffect(() => {
    fetchData()
      .then()
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (id !== null && userInfo !== undefined) {
      void fetchMyEarningsData(userInfo?.preferredCurrency);
    }
  }, [id, userInfo]);

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
      setEarning(result)
    } catch (error) {
      toast.error(`Error follow user: ${error as string}`);
    } finally {
      setIsLoadingEarn(false);
    }
  };

  const handleInputAccountName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setAccountName(event.target.value);
  };

  const handleInputBankAccount = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setBankAccount(event.target.value);
  };

  const handleInputAccountNumber = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setAccountNumber(event.target.value);
  };

  return (
    <>
      {isLoadingEarn && <Loading />}
      <div className="w-full flex flex-col justify-center items-center rounded-xl p-5 bg-white">
        <Typography className="w-full text-center text-lg md:text-xl font-semibold font-poppins mt-4">
          Withdraw
        </Typography>

        {/* My Earnings */}
        <div className='relative w-full bg-gradient-to-r from-[#53B5A3] to-[#5BE3C0] p-4 mt-4 rounded-xl overflow-hidden'>
          <div className='w-full flex justify-between items-center z-10'>
            <Typography className='w-full flex font-poppins text-sm text-white z-10'>
              {t('earning.myEarnings')}
            </Typography>
          </div>
          <div className='w-full flex justify-between items-center mt-2 z-10'>
            <Typography className='font-semibold font-poppins text-white text-base md:text-lg lg:text-xl z-10'>
              {userInfo?.preferredCurrency !== undefined ? userInfo?.preferredCurrency : 'IDR'}{standartCurrency(earning?.balance ?? 0).replace('Rp', '')}
            </Typography>
          </div>
          <Image
            alt="CircleBackground"
            src={CircleBackground}
            width={100}
            height={100}
            className="absolute right-0 bottom-1 z-0 w-[90px] h-[90px]"
          />
        </div>

        {/* Payment Type */}
        <div className='w-full bg-[#E9E9E9] rounded-full flex justify-center items-center mt-4 p-2 gap-2'>
          <Typography
            onClick={() => { setPaymentType('bank'); }}
            className={`${paymentType === 'bank' ? 'bg-white text-black shadow-lg ' : 'bg-[#E9E9E9] text-[#BDBDBD]'} w-full flex justify-center items-center py-2 rounded-full cursor-pointer font-poppins text-xs md:text-base font-semibold hover:shadow-lg duration-300`}
          >
            Bank Transfer
          </Typography>
          <Typography
            onClick={() => { setPaymentType('e-wallet'); }}
            className={`${paymentType === 'e-wallet' ? 'bg-white text-black shadow-lg ' : 'bg-[#E9E9E9] text-[#BDBDBD]'} w-full flex justify-center items-center py-2 bg-white rounded-full cursor-pointer font-poppins text-xs md:text-base font-semibold hover:shadow-lg duration-300`}
          >
            E-Wallet
          </Typography>
        </div>

        {/* Bank Data */}
        <div className='w-full mt-4'>
          <div className='mb-4'>
            <Typography className='font-semibold font-poppins text-sm'>
              Account Name
            </Typography>
            <input
              id="search"
              type="text"
              name="search"
              value={accountName}
              onChange={e => {
                handleInputAccountName(e);
              }}
              placeholder="Enter your account name..."
              className="border-b border-[#CCCCCC] block w-full text-[#262626] h-11 leading-4 placeholder:text-[#BDBDBD] focus:outline-0 disabled:bg-[#E9E9E9]"
            />
          </div>
          <div className='mb-4'>
            <Typography className='font-semibold font-poppins text-sm'>
              Bank Account
            </Typography>
            <input
              id="search"
              type="text"
              name="search"
              value={bankAccount}
              onChange={e => {
                handleInputBankAccount(e);
              }}
              placeholder="Enter your bank account..."
              className="border-b border-[#CCCCCC] block w-full text-[#262626] h-11 leading-4 placeholder:text-[#BDBDBD] focus:outline-0 disabled:bg-[#E9E9E9]"
            />
          </div>
          <div className='mb-4'>
            <Typography className='font-semibold font-poppins text-sm'>
              Account Number
            </Typography>
            <input
              id="search"
              type="text"
              name="search"
              value={accountNumber}
              onChange={e => {
                handleInputAccountNumber(e);
              }}
              placeholder="Enter your account number..."
              className="border-b border-[#CCCCCC] block w-full text-[#262626] h-11 leading-4 placeholder:text-[#BDBDBD] focus:outline-0 disabled:bg-[#E9E9E9]"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuth(Withdraw);
