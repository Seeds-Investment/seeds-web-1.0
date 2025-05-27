'use-client';

import AmbienceRejected from '@/assets/my-profile/earning/ambience-rejected.svg';
import Ambience from '@/assets/my-profile/earning/ambience.svg';
import WithdrawRejected from '@/assets/my-profile/earning/withdrawRejected.png';
import WithdrawUnavailable from '@/assets/my-profile/earning/withdrawUnavailable.svg';
import withAuth from '@/helpers/withAuth';
import { getWithdrawKYCStatus } from '@/repository/earning.repository';
import { type IKYCStatus } from '@/utils/interfaces/earning.interfaces';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const WithdrawKYC = (): React.ReactElement => {
  const router = useRouter();
  const { t } = useTranslation();
  const [kyc, setKyc] = useState<IKYCStatus>();
  
  const fetchWithdrawKYCStatus = async (): Promise<void> => {
    try {
      const response = await getWithdrawKYCStatus();
      setKyc(response)
    } catch (error) {
      toast.error(`Error fetching data: ${error as string}`);
    }
  };
  
  useEffect(() => {
    void fetchWithdrawKYCStatus();
  }, []);

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center rounded-xl px-5 py-8 md:py-16 bg-white overflow-hidden">
        <div className='w-full flex justify-center items-start h-[200px] relative'>
          <div className='w-full flex justify-center items-start h-[500px] absolute top-[-150px] z-0'>
            <Image
              src={
                kyc?.status === 'reject'
                  ? AmbienceRejected
                  : Ambience
              }
              alt='Ambience'
              width={1000}
              height={1000}
              className="w-auto h-full"
            />
          </div>
          <Image
            src={
              kyc?.status === 'reject'
                ? WithdrawRejected
                : WithdrawUnavailable
            }
            alt='WithdrawUnavailable'
            width={1000}
            height={1000}
            className="w-auto h-full z-10 relative"
          />
        </div>
        <div className='w-full flex flex-col justify-center items-center z-10 mt-4'>
          <Typography className="font-semibold font-poppins text-xl">
            {
              kyc?.status === 'none'
                ? t('earning.withdrawKyc.text1')
                : kyc?.status === 'reject'
                  ? t('earning.withdrawKyc.text29')
                  : kyc?.status === 'pending'
                    ? t('earning.withdrawKyc.text30')
                    : t('earning.withdrawKyc.text31')
            }
          </Typography>
          <Typography className="w-full md:w-[80%] font-poppins mt-4 text-[#7C7C7C] text-center">
            {
              kyc?.status === 'none'
                ? t('earning.withdrawKyc.text2')
                : kyc?.status === 'reject'
                  ? `${kyc?.reject_reason}`
                  : kyc?.status === 'pending'
                    ? t('earning.withdrawKyc.text33')
                    : t('earning.withdrawKyc.text35')
            }
          </Typography>
          <Typography className="w-full md:w-[80%] font-poppins mt-4 text-[#7C7C7C] text-center">
            {
              kyc?.status === 'none'
                ? t('earning.withdrawKyc.text3')
                : kyc?.status === 'reject'
                  ? ''
                  : kyc?.status === 'pending'
                    ? t('earning.withdrawKyc.text34')
                    : t('earning.withdrawKyc.text36')
            }
          </Typography>
          <Button
            onClick={async() => {
              if (kyc?.status === 'none' || kyc?.status === 'reject') {
                await router.push('/my-profile/my-earnings/withdraw-kyc/form')
              } else {
                await router.push('/my-profile/my-earnings')
              }
            }}
            className="w-full md:w-[275px] py-2 md:py-4 flex justify-center items-center bg-seeds-button-green hover:shadow-lg text-white duration-300 cursor-pointer rounded-full font-poppins text-md capitalize mt-6"
          >
            {
              kyc?.status === 'none'
                ? t('earning.withdrawKyc.text4')
                : kyc?.status === 'reject'
                  ? t('earning.withdrawKyc.text37')
                  : t('earning.withdrawKyc.text28')
            }
          </Button>
        </div>
      </div>
    </>
  );
};

export default withAuth(WithdrawKYC);
