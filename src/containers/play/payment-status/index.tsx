'use client';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import { Typography } from '@material-tailwind/react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import InlineText from './components/InlineText';
import SubmitButton from '@/components/SubmitButton';

import {
Success
} from 'public/assets/vector';

const PaymentStatus = (): JSX.Element => {
  const { t } = useTranslation();
  const paymentLogo = 'https://assets.seeds.finance/storage/cloud/E--Wallet-gopay.png';
  const admissionFee = 100000;
  const adminFee = 0;
  const transactionId = '12345678910';

  const renderStatusIcon = (): JSX.Element => (
    <div className='bg-[#FCFBFE] flex-shrink p-1.5 rounded-full w-10 bg-opacity-30 self-center'>
      <div className="bg-[#EDE3FE] rounded-full items-center justify-center flex self-center">
        <Image
          src={Success}
          alt="gain"
          width={46}
          height={46}
        />
      </div>
    </div>
  );

  const renderDetails = (): JSX.Element => (
    <div className='flex justify-between'>
      <Typography className="text-left text-xs font-normal text-neutral-soft text-[#BDBDBD]">
        12 Okt 2022
      </Typography>
      <Typography className="text-left text-xs font-normal text-neutral-soft text-[#BDBDBD]">
        •
      </Typography>
      <Typography className="text-left text-xs font-normal text-neutral-soft text-[#BDBDBD]">
        14:07:00 WIB
      </Typography>
      <Typography className="text-left text-xs font-normal text-neutral-soft text-[#BDBDBD]">
        •
      </Typography>
      <Typography className="text-left text-xs font-normal text-neutral-soft text-[#BDBDBD]">
        No.Ref 702223456789
      </Typography>
    </div>
  );

  const renderContent = (): JSX.Element => (
    <div className="relative md:bg-[url('/assets/vector/purple-ellipse.svg')] bg-[white] bg-opacity-30 bg-no-repeat bg-left-top w-full h-full flex flex-col items-center md:p-8 rounded-xl">
      <div className="bg-[url('/assets/payment-status/banner.svg')] bg-no-repeat w-full max-w-[600px] rounded-xl items-center justify-center flex-column p-8">
        <div className='relative flex justify-center items-center mb-2'>
          {renderStatusIcon()}
        </div>
        <Typography className="w-full max-w-[600px] text-left text-center text-white text-xl font-semibold mb-2">
          {t('PlayPaymentStatus.successTitle')}
        </Typography>
        <Typography className="w-full max-w-[600px] text-left text-center text-white text-sm font-normal">
          {t('PlayPaymentStatus.successSubtitle')}
        </Typography>
        <div className='relative flex justify-center items-center'>
          <div className='flex-col justify-center items-center w-full max-w-[370px]'>
            <div className='relative bg-white mt-8 px-4 pt-8 rounded-t-xl w-full items-center justify-center flex-column bg-[white] border mb-4'>
              <Typography className="w-full max-w-[600px] text-left text-center text-xs font-semibold text-neutral-soft">
                {t('PlayPaymentStatus.paymentMethod')}
              </Typography>
              <Typography className="w-full max-w-[600px] text-left text-center text-xs font-semibold text=[#262626]">
                Johannes Gavin (1234XXX)
              </Typography>
              <Image
                src={paymentLogo}
                width={200}
                height={200}
                className="h-[20px] w-full object-contain mt-2"
                alt={'logo'}
              />
              <div className="border-b border-dashed border-b-2 my-5 pt-5">
                <div className="absolute rounded-full w-5 h-5 bg-[#3AC4A0] -mt-2 -left-2"></div>
                <div className="absolute rounded-full w-5 h-5 bg-[#38BE9B] -mt-2 -right-2"></div>
              </div>
              <div className="px-3">
                <InlineText
                    label={t(`PlayPaymentStatus.admissionFeeLabel`)}
                    value={`IDR ${admissionFee}`}
                    className="mb-4"
                  />
                  <InlineText
                    label={t(`PlayPaymentStatus.adminFeeLabel`)}
                    value={`IDR ${adminFee}`}
                    className="mb-4"
                  />
                  <hr className="h-px my-4 bg-[#BDBDBD] border-0 dark:bg-gray-700"></hr>
                  <InlineText
                    label={t(`PlayPaymentStatus.totalLabel`)}
                    value={`IDR ${admissionFee + adminFee}`}
                    className="mb-4"
                  />
                  <InlineText
                    label={t(`PlayPaymentStatus.transactionIdLabel`)}
                    value={transactionId}
                    className="mb-2"
                  />
                  {renderDetails()}
                </div>
                <div className="border-b border-dashed border-b-2 my-2"/>
            </div>
            <SubmitButton
              fullWidth
              onClick={() => {}}
            >
              {t('PlayPaymentStatus.button')}
            </SubmitButton>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <PageGradient defaultGradient className="w-full md:px-20">
      {renderContent()}
    </PageGradient>
  );
};

export default PaymentStatus;
