import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoCloseSharp } from 'react-icons/io5';

interface SummaryPayProps {
  isOpen: boolean;
  onClose: () => void;
  payment: string;
  amount: number;
  adminFee: number;
  serviceFee: number;
  promoAvailable: boolean;
  promoPrice: number;
  currency: string;
  onConfirm: () => void;
}

const SummaryPay: React.FC<SummaryPayProps> = ({
  isOpen,
  onClose,
  payment,
  amount,
  adminFee,
  serviceFee,
  promoAvailable,
  promoPrice,
  currency,
  onConfirm
}) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { t } = useTranslation();

  const checkScreenSize = (): void => {
    setIsSmallScreen(window.innerWidth < 768);
  };

  useEffect(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  if (!isOpen) return null;

  if (isSmallScreen) {
    return (
      <>
        <div
          className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-40"
          onClick={onClose}
        />
        <div className="fixed bottom-0 left-0 right-0 z-50 flex items-end justify-center">
          <div className="bg-white rounded-t-2xl overflow-hidden w-full border border-2">
            <div className="flex justify-center my-5">
              <button
                onClick={onClose}
                className="bg-[#E9E9E9] py-1 px-14 text-xl rounded-3xl"
              ></button>
            </div>
            <div className="px-4 pt-4">
              <div className="text-lg font-bold">
                {t('academy.payment.summary')}
              </div>
            </div>
            <div className="px-4">
              <div className="grid grid-cols-2">
                <div>
                  <div className="mt-4 mb-4">
                    {t('academy.payment.costAcademy')}
                  </div>
                  <div className="mb-4">{t('academy.payment.adminFee')}</div>
                  <div className="mb-4">{t('academy.payment.serviceFee')}</div>
                  <div className="mb-4">Promo</div>
                </div>
                <div>
                  <div className="text-right mt-4 mb-4">
                    {currency} {amount}
                  </div>
                  <div className="text-right mb-4">
                    {currency} {adminFee}
                  </div>
                  <div className="text-right mb-4">
                    {currency} {serviceFee}
                  </div>
                  <div className="text-right mb-4">
                    {currency} {promoAvailable ? promoPrice : 0}
                  </div>
                </div>
              </div>
              <hr className="border-t-2" />
              <div className="grid grid-cols-2 my-4">
                <div className="font-bold">
                  {t('academy.payment.totalCost')}
                </div>
                <div className="text-right font-bold">
                  {currency}{' '}
                  {amount +
                    adminFee +
                    serviceFee -
                    (promoAvailable ? promoPrice : 0)}
                </div>
              </div>
              <div className="mb-10 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Image
                    src="/assets/academy/promo-icon.svg"
                    alt="promo-icon"
                    width={24}
                    height={24}
                  />
                </div>
                <input
                  type="text"
                  className="pl-10 pr-4 py-3 rounded-xl border-2 w-full"
                  placeholder="Input Promo Code"
                />
              </div>
            </div>
            <div className="px-4 py-4 flex flex-col gap-3">
              <button
                onClick={onConfirm}
                className="w-full bg-[#3AC4A0] text-white py-2 px-4 rounded-3xl"
              >
                {t('academy.payment.payWith')} {payment}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div
          className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-40"
          onClick={onClose}
        />
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-3/4 lg:w-1/2">
          <div className="bg-white rounded-2xl overflow-hidden w-full border-2">
            <div className="px-4 pt-4 flex flex-row items-center justify-between">
              <div className="text-lg font-bold">
                {t('academy.payment.summary')}
              </div>
              <button onClick={onClose} className="text-2xl">
                <IoCloseSharp />
              </button>
            </div>
            <div className="px-4">
              <div className="grid grid-cols-2">
                <div>
                  <div className="mt-4 mb-4">
                    {t('academy.payment.costAcademy')}
                  </div>
                  <div className="mb-4">{t('academy.payment.adminFee')}</div>
                  <div className="mb-4">{t('academy.payment.serviceFee')}</div>
                  <div className="mb-4">Promo</div>
                </div>
                <div>
                  <div className="text-right mt-4 mb-4">
                    {currency} {amount}
                  </div>
                  <div className="text-right mb-4">
                    {currency} {adminFee}
                  </div>
                  <div className="text-right mb-4">
                    {currency} {serviceFee}
                  </div>
                  <div className="text-right mb-4">
                    {currency} {promoAvailable ? promoPrice : 0}
                  </div>
                </div>
              </div>
              <hr className="border-t-2" />
              <div className="grid grid-cols-2 my-4">
                <div className="font-bold">
                  {t('academy.payment.totalCost')}
                </div>
                <div className="text-right font-bold">
                  {currency}{' '}
                  {amount +
                    adminFee +
                    serviceFee -
                    (promoAvailable ? promoPrice : 0)}
                </div>
              </div>
              <div className="mb-10 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Image
                    src="/assets/academy/promo-icon.svg"
                    alt="promo-icon"
                    width={24}
                    height={24}
                  />
                </div>
                <input
                  type="text"
                  className="pl-10 pr-4 py-3 rounded-xl border-2 w-full"
                  placeholder="Input Promo Code"
                />
              </div>
            </div>
            <div className="px-4 py-4 flex flex-col gap-3">
              <button
                onClick={onConfirm}
                className="w-full bg-[#3AC4A0] text-white py-2 px-4 rounded-3xl"
              >
                {t('academy.payment.payWith')} {payment}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default SummaryPay;
