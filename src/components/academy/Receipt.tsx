import { Button, Card, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaCheck } from 'react-icons/fa';
import { MdOutlinePendingActions } from 'react-icons/md';

interface ReceiptProps {
  amount: number;
  adminFee: number;
  serviceFee: number;
  logoURL: string;
  orderDetail: string;
  orderItem: string;
  currency: string;
  promoAvailable: boolean;
  promoPrice: number;
  isHidden: boolean;
}

const Receipt: React.FC<ReceiptProps> = ({
  amount,
  adminFee,
  serviceFee,
  logoURL,
  orderDetail,
  orderItem,
  currency,
  promoAvailable,
  promoPrice,
  isHidden
}) => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div hidden={isHidden}>
      <div className="bg-white p-2 rounded-xl shadow-md flex flex-col gap-5">
        <div className="flex items-center justify-center rounded-xl w-full ">
          <Card
            className="py-3 px-4 xl:px-24 border rounded-xl shadow-none w-full md:w-2/3 lg:w-1/2 h-full"
            style={{
              backgroundImage: "url('/assets/academy/top-bg-receipt.svg')",
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'top'
            }}
          >
            <div className="flex items-center justify-center mb-4 mt-3">
              {orderDetail === 'SETTLEMENT' ? (
                <>
                  <span className="rounded-full bg-[#74d5bc] w-10 h-10 animate-ping relative"></span>
                  <span className="text-2xl rounded-full border p-2 bg-[#efe7fc] absolute">
                    <FaCheck />
                  </span>
                </>
              ) : (
                <>
                  <span className="rounded-full bg-[#74d5bc] w-10 h-10 animate-ping relative"></span>
                  <span className="text-2xl rounded-full border p-2 bg-[#efe7fc] absolute">
                    <MdOutlinePendingActions />
                  </span>
                </>
              )}
            </div>
            <Typography className="text-2xl font-semibold text-white text-center">
              {orderDetail === 'SETTLEMENT'
                ? t('academy.payment.success')
                : t('academy.payment.pending')}
            </Typography>
            <Typography className="text-sm font-normal text-white text-center">
              {orderDetail === 'SETTLEMENT'
                ? t('academy.payment.success1')
                : t('academy.payment.pending1')}
            </Typography>
            <Typography className="text-sm font-normal text-white text-center">
              {orderDetail === 'SETTLEMENT'
                ? t('academy.payment.success2')
                : t('academy.payment.pending2')}
            </Typography>

            <Card className="px-5 py-2 mt-8 bg-white w-full">
              <Typography className="text-sm font-semibold text-[#BDBDBD] text-center">
                {t('academy.payment.method')}
              </Typography>
              <div className="flex items-center justify-center mb-9 mt-3">
                <Image
                  src={logoURL}
                  alt="logo"
                  className="object-cover"
                  width={100}
                  height={100}
                />
              </div>
              <hr className="border-t-2 border-dashed" />
              <div className="flex justify-between relative bottom-3 z-50">
                <div className="bg-[#3AC4A0] h-6 rounded-full w-6 -mx-8 outline-none" />
                <div className="bg-[#38be9b] h-6 rounded-full w-6 -mx-8 outline-none" />
              </div>

              <div className="flex flex-row justify-between my-5">
                <Typography className="text-sm font-semibold text-[#BDBDBD]">
                  {t('academy.payment.costAcademy')}
                </Typography>
                <Typography className="text-sm font-semibold text-[#262626]">
                  {currency}{' '}
                  {amount -
                    serviceFee -
                    adminFee +
                    (promoAvailable ? promoPrice : 0)}
                </Typography>
              </div>
              <div className="flex flex-row justify-between mb-5">
                <Typography className="text-sm font-semibold text-[#BDBDBD]">
                  {t('academy.payment.adminFee')}
                </Typography>
                <Typography className="text-sm font-semibold text-[#262626]">
                  {currency} {adminFee}
                </Typography>
              </div>
              <div className="flex flex-row justify-between mb-5">
                <Typography className="text-sm font-semibold text-[#BDBDBD]">
                  {t('academy.payment.serviceFee')}
                </Typography>
                <Typography className="text-sm font-semibold text-[#262626]">
                  {currency} {serviceFee}
                </Typography>
              </div>
              <div className="flex flex-row justify-between mb-5">
                <Typography className="text-sm font-semibold text-[#BDBDBD]">
                  Promo
                </Typography>
                <Typography className="text-sm font-semibold text-[#262626]">
                  {currency} {promoAvailable ? promoPrice : 0}
                </Typography>
              </div>
              <hr className="mb-5 border border-t-3" />
              <div className="flex flex-row justify-between mb-5">
                <Typography className="text-sm font-semibold text-[#BDBDBD]">
                  {t('academy.payment.amount')}
                </Typography>
                <Typography className="text-sm font-semibold text-[#262626]">
                  {currency} {amount}
                </Typography>
              </div>
            </Card>

            <div className="w-full flex items-center justify-center">
              <Button
                className="w-full text-sm font-semibold bg-[#3AC4A0] mt-20 rounded-full capitalize"
                onClick={() => {
                  void router.replace(`/academy/course/${orderItem}`);
                }}
              >
                {t('academy.payment.closeReceipt')}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
