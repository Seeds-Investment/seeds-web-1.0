import { validateChangePhoneNumberOTP } from '@/repository/danamart/setting.repository';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Modal from '../../../ui/modal/Modal';

interface Props {
  setIsAllowedOTP: React.Dispatch<React.SetStateAction<boolean>>;
  setIsContinueProcess: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowOTP: React.Dispatch<React.SetStateAction<boolean>>;
  isShowOTP: boolean;
  setPassedOTP: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isAllowedOTP: boolean;
  passedOTP: string;
  combinedPhone: string;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setOtpType: React.Dispatch<React.SetStateAction<string>>;
}

const ModalOTP: React.FC<Props> = ({
  setIsAllowedOTP,
  setIsContinueProcess,
  setIsShowOTP,
  isShowOTP,
  setPassedOTP,
  isLoading,
  setIsLoading,
  isAllowedOTP,
  passedOTP,
  combinedPhone
}) => {
  const { t } = useTranslation();
  const pathTranslationModal = 'danamart.offers.purchase.modals.otp';
  const pathTranslation = 'danamart.setting.changePhoneNumber';
  const [countdown, setCountdown] = useState<number>(0);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const isOTPComplete = otp?.every(value => value !== '');

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsContinueProcess(false);
      setOtp(['', '', '', '', '', '']);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [countdown]);

  const handleOtpChange = (value: string, index: number): void => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1);
    setOtp(newOtp);
    setPassedOTP(newOtp?.join(''));

    if (value.length > 0 && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ): void => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const handleValidateOTP = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('otp', passedOTP);
      formData.append('nohp', combinedPhone);

      const response = await validateChangePhoneNumberOTP(formData);

      if (response?.status === 200) {
        setIsLoading(false);
      }

      if (
        response?.data?.message ===
        'Kami telah menerima permintaan perubahan data-mu, selanjutnya tim kami akan melakukan konfirmasi terkait permintaan perubahan data ini dengan cara menghubungi-mu, mohon ditunggu ya.'
      ) {
        setIsShowOTP(false);
        toast.success(t(`${pathTranslation}.validation.text5`));
      } else {
        toast.success(t(`${pathTranslation}.validation.text5`));
      }
    } catch (error: any) {
      setIsLoading(false);

      if (
        error?.response?.data?.messages?.message ===
        'Kode salah! Silakan ulangi input.'
      ) {
        toast.error(t(`${pathTranslation}.validation.text6`));
      } else if (error?.response?.data === 'Too many Hits') {
        toast.error(t(`${pathTranslation}.validation.text2`));
      } else {
        toast.error(`Error validating OTP: ${error as string}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAllowedOTP) {
      setCountdown(300);
    }
  }, [isAllowedOTP]);

  useEffect(() => {
    if (countdown === 0) {
      setIsContinueProcess(false);
    }
  }, [countdown]);

  return (
    <Modal
      backdropClasses="z-40 fixed top-0 left-0 w-full h-screen bg-black/25 flex justify-start items-start"
      modalClasses="md:w-[550px] md:left-[15%] md:right-[-15%] lg:left-[25%] lg:right-[-25%] xl:left-[30%] xl:right-[-30%] 2xl:left-[35%] 2xl:right-[-35%] top-[60%] h-fit z-50 animate-slide-down fixed left-0 transform -translate-x-1/2 -translate-y-1/2 mt-[-17rem] w-full p-6 rounded-lg bg-white"
    >
      <button
        onClick={() => {
          setIsShowOTP(!isShowOTP);
          setIsContinueProcess(false);
          setIsAllowedOTP(false);
        }}
        className="absolute top-4 right-4 p-1 bg-gray-100 rounded-md hover:bg-gray-200"
      >
        <XMarkIcon className="w-5 h-5 text-gray-600" />
      </button>

      <Typography className="font-bold text-xl mb-4">
        {isAllowedOTP
          ? t(`${pathTranslation}.text11`)
          : t(`${pathTranslation}.text12`)}
      </Typography>

      {isAllowedOTP ? (
        <>
          {countdown === 0 ? (
            <Button
              onClick={() => {
                setIsContinueProcess(true);
              }}
              disabled={countdown !== 0 || isLoading}
              className="w-full bg-seeds-button-green rounded-full capitalize text-md"
            >
              {t(`${pathTranslation}.text13`)}
            </Button>
          ) : (
            <div className="mt-4">
              <Typography className="text-red-600 text-sm font-medium mb-2">
                {`${t(`${pathTranslation}.text14`)}: ${formatTime(countdown)}`}
              </Typography>

              {/* OTP Input Boxes */}
              <div className="flex justify-between gap-2">
                {otp?.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    value={digit}
                    maxLength={1}
                    onChange={e => {
                      handleOtpChange(e.target.value, index);
                    }}
                    onKeyDown={e => {
                      handleKeyDown(e, index);
                    }}
                    onInput={(e: React.FormEvent<HTMLInputElement>) => {
                      const target = e.target as HTMLInputElement;
                      target.value = target.value.replace(/[^0-9]/g, '');
                    }}
                    className="w-12 h-12 text-center border border-gray-300 rounded-lg text-xl focus:outline-none focus:ring-2 focus:ring-seeds-button-green"
                  />
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div>
          <Typography className="font-poppins text-md text-[#262626] font-semibold">
            {t(`${pathTranslation}.text15`)}
          </Typography>
        </div>
      )}

      <div className="w-full flex justify-end items-end gap-2">
        <Button
          onClick={() => {
            setIsShowOTP(!isShowOTP);
          }}
          disabled={isAllowedOTP ? countdown === 0 : isLoading}
          className="w-[150px] text-sm font-semibold bg-white border border-seeds-button-green text-seeds-button-green mt-4 rounded-full capitalize"
        >
          {t(`${pathTranslationModal}.cancel`)}
        </Button>
        <Button
          onClick={async () => {
            if (isAllowedOTP) {
              await handleValidateOTP();
            } else {
              setIsContinueProcess(true);
            }
          }}
          disabled={
            isAllowedOTP
              ? !isOTPComplete || isLoading || countdown === 0
              : isLoading
          }
          className="w-[150px] text-sm font-semibold bg-seeds-button-green mt-4 rounded-full capitalize"
        >
          {t(`${pathTranslation}.continue`)}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalOTP;
