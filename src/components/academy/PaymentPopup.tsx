import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface PaymentPopupProps {
  isOpen: boolean;
  onClose: () => void;
  classTitle: string;
  amount?: string;
}

const PaymentPopup: React.FC<PaymentPopupProps> = ({
  isOpen,
  onClose,
  classTitle,
  amount
}) => {
  const router = useRouter();
  const { id } = router.query;
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

  const handleSubmit = (): void => {
    console.log(`Submitted: ${id as string}`);
    void router.push(`/academy/course/${id as string}/payment`);
    onClose();
  };

  if (!isOpen) return null;

  if (isSmallScreen) {
    return (
      <>
        <div
          className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-40"
          onClick={onClose}
        />
        <div className="fixed bottom-0 left-0 right-0 z-50 flex items-end justify-center">
          <div className="bg-white rounded-t-2xl overflow-hidden w-full border-2">
            <div className="flex justify-center my-5">
              <button
                onClick={onClose}
                className="bg-[#E9E9E9] py-1 px-14 text-xl rounded-3xl"
              ></button>
            </div>
            <div className="px-2">
              <div className="text-lg font-bold">
                {t('academy.payment.enroll')}
              </div>
              <div className="text-base text-[#7C7C7C]">{classTitle}</div>
            </div>
            <div className="px-2 py-2 flex flex-col gap-3">
              <div className="flex justify-center">
                <div className="w-1/2 h-24 rounded-lg bg-[#FDBA22] px-2 pt-7 pb-2">
                  <div className="bg-white w-full h-full flex flex-col justify-center items-center">
                    <div className="text-center font-bold text-[#FDBA22]">
                      {amount}
                    </div>
                    <div className="text-center text-xs text-[#FDBA22]">
                      {t('academy.payment.class')}
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center text-[#7C7C7C]">
                {t('academy.payment.desc')}
              </div>
              <div className="flex flex-col gap-1">
                <div className="bg-[#FFF7D2] py-3 w-full text-center rounded-lg">
                  IDR 75.000 /Month
                </div>
                <div className="bg-[#FFF7D2] py-3 w-full text-center rounded-lg">
                  IDR 75.000 /Month
                </div>
                <div className="bg-[#FFF7D2] py-3 w-full text-center rounded-lg">
                  IDR 75.000 /Month
                </div>
                <div className="bg-[#FFF7D2] py-3 w-full text-center rounded-lg">
                  IDR 75.000 /Month
                </div>
              </div>
              <button
                onClick={handleSubmit}
                className="w-full bg-[#3AC4A0] text-white py-2 px-4 rounded-3xl"
              >
                {t('academy.payment.buttonPay')}
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
            {/* <div className="flex justify-center my-5">
              <button
                onClick={onClose}
                className="bg-[#E9E9E9] py-1 px-14 text-xl rounded-3xl"
              >
                Close
              </button>
            </div> */}
            <div className="px-4 pt-4">
              <div className="text-lg font-bold">
                {t('academy.payment.enroll')}
              </div>
              <div className="text-base text-[#7C7C7C]">{classTitle}</div>
            </div>
            <div className="px-4 py-4 flex flex-col gap-3">
              <div className="flex justify-center">
                <div className="w-1/2 h-24 rounded-lg bg-[#FDBA22] px-2 pt-7 pb-2">
                  <div className="bg-white w-full h-full flex flex-col justify-center items-center">
                    <div className="text-center font-bold text-[#FDBA22]">
                      {amount}
                    </div>
                    <div className="text-center text-xs text-[#FDBA22]">
                      {t('academy.payment.class')}
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center text-[#7C7C7C]">
                {t('academy.payment.desc')}
              </div>
              <div className="flex flex-col gap-1">
                <div className="bg-[#FFF7D2] py-3 w-full text-center rounded-lg">
                  IDR 75.000 /Month
                </div>
                <div className="bg-[#FFF7D2] py-3 w-full text-center rounded-lg">
                  IDR 75.000 /Month
                </div>
                <div className="bg-[#FFF7D2] py-3 w-full text-center rounded-lg">
                  IDR 75.000 /Month
                </div>
                <div className="bg-[#FFF7D2] py-3 w-full text-center rounded-lg">
                  IDR 75.000 /Month
                </div>
              </div>
              <button
                onClick={handleSubmit}
                className="w-full bg-[#3AC4A0] text-white py-2 px-4 rounded-3xl"
              >
                {t('academy.payment.buttonPay')}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default PaymentPopup;
