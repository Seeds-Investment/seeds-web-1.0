import { getPhoneVerificationOTP } from '@/repository/danamart/setting.repository';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button, Option, Select, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Modal from '../../../ui/modal/Modal';

interface Props {
  setIsContinueProcess: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowOTP: React.Dispatch<React.SetStateAction<boolean>>;
  isShowOTP: boolean;
  setPassedOTP: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
}

const ModalOTP: React.FC<Props> = ({
  setIsContinueProcess,
  setIsShowOTP,
  isShowOTP,
  setPassedOTP,
  isLoading
}) => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.offers.purchase.modals.otp';
  const [otpType, setOtpType] = useState<'wa' | 'sms'>('wa');
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

  const handleGetOTP = async (): Promise<void> => {
    try {
      const formData = new FormData();
      formData.append('metode', otpType);
      formData.append('kverif', 'Pverif');
      const response = await getPhoneVerificationOTP(formData);
      if (response?.data?.StatusCode === '200') {
        setCountdown(230);
        toast.success(response?.data?.message);
      }
    } catch (error: any) {
      if (error?.response?.data?.message === 'too many hits') {
        toast.error(t(`${pathTranslation}.tooManyAttempts`));
      } else {
        toast.error(`Error getting OTP: ${error as string}`);
      }
    }
  };

  return (
    <Modal
      backdropClasses="z-40 fixed top-0 left-0 w-full h-screen bg-black/25 flex justify-start items-start"
      modalClasses="md:w-[550px] md:left-[15%] md:right-[-15%] lg:left-[25%] lg:right-[-25%] xl:left-[30%] xl:right-[-30%] 2xl:left-[35%] 2xl:right-[-35%] top-[60%] h-fit z-50 animate-slide-down fixed left-0 transform -translate-x-1/2 -translate-y-1/2 mt-[-17rem] w-full p-6 rounded-lg bg-white"
    >
      <button
        onClick={() => {
          setIsShowOTP(!isShowOTP);
        }}
        className="absolute top-4 right-4 p-1 bg-gray-100 rounded-md hover:bg-gray-200"
      >
        <XMarkIcon className="w-5 h-5 text-gray-600" />
      </button>

      {/* OTP Component Here */}

      <Typography className="font-bold text-xl mb-4">
        {t(`${pathTranslation}.verification`)}
      </Typography>

      {/* Dropdown for OTP Type */}
      <div className="mb-4">
        <Typography className="mb-2">
          {t(`${pathTranslation}.selectType`)}
        </Typography>
        <Select
          value={otpType}
          onChange={value => {
            setOtpType(value as 'wa' | 'sms');
          }}
        >
          <Option value="wa">WhatsApp</Option>
          <Option value="sms">SMS</Option>
        </Select>
      </div>

      {/* Continue Button */}
      {countdown === 0 ? (
        <Button
          onClick={() => {
            void handleGetOTP();
          }}
          disabled={countdown !== 0 || isLoading}
          className="w-full bg-seeds-button-green rounded-full capitalize"
        >
          {t(`${pathTranslation}.getOtp`)}
        </Button>
      ) : (
        <div className="mt-4">
          <Typography className="text-red-600 text-sm font-medium mb-2">
            {`${t(`${pathTranslation}.timeRemaining`)}: ${formatTime(countdown)}`}
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

      <div className="w-full flex justify-end items-end gap-2">
        <Button
          onClick={() => {
            setIsShowOTP(!isShowOTP);
          }}
          className="w-[150px] text-sm font-semibold bg-white border border-seeds-button-green text-seeds-button-green mt-4 rounded-full capitalize"
        >
          {t(`${pathTranslation}.cancel`)}
        </Button>
        <Button
          onClick={() => {
            setIsShowOTP(!isShowOTP);
            setIsContinueProcess(true);
          }}
          disabled={!isOTPComplete || isLoading}
          className="w-[150px] text-sm font-semibold bg-seeds-button-green mt-4 rounded-full capitalize"
        >
          {t(`${pathTranslation}.process`)}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalOTP;
