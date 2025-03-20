import MInput from '@/components/form-input/multi-input';
import { decryptResponse } from '@/helpers/cryptoDecrypt';
import useRequestWithdrawal, {
  type RequestWithdrawI
} from '@/hooks/danamart/useRequestWithdrawal';
import { getPurchaseOTP } from '@/repository/danamart/offers.repository';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button, Option, Select, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Modal from '../../ui/modal/Modal';

interface Props {
  setIsShowModalWithdraw: React.Dispatch<React.SetStateAction<boolean>>;
  isShowModalWithdraw: boolean;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalWithdraw: React.FC<Props> = ({
  setIsShowModalWithdraw,
  isShowModalWithdraw,
  isLoading,
  setIsLoading
}) => {
  const { handleSubmit, onSubmit, register, errors, control, watch, setValue } =
    useRequestWithdrawal();
  const { t } = useTranslation();
  const pathTranslation = 'danamart.outgoingFunds.modal.withdrawRequest';

  const withdrawValue = watch('jml_pembayaran');
  const adminFee = 5000;

  useEffect(() => {
    setValue('biaya_admin', `Rp. ${adminFee?.toLocaleString('id-ID')}`);
  }, []);

  useEffect(() => {
    if (withdrawValue >= 5000) {
      setValue(
        'dana_diterima',
        `Rp. ${(withdrawValue - adminFee)?.toLocaleString('id-ID')}`
      );
    } else {
      setValue('dana_diterima', 0);
    }
  }, [withdrawValue, setValue]);

  const handleWithdrawal = async (): Promise<void> => {
    try {
      setIsLoading(true);
      handleSubmit(async (data: RequestWithdrawI) => {
        try {
          setIsLoading(true);
          const response = await onSubmit(data);
          if (
            response?.message ===
            'Selamat ya penarikan dana Anda diterima dan akan segera diproses!'
          ) {
            toast.success(t(`${pathTranslation}.succeed`));
          } else {
            toast.success(response?.message);
          }
          if (response !== null && response !== undefined) {
            setIsShowModalWithdraw(!isShowModalWithdraw);
            setOtp(['', '', '', '', '', '']);
          }
        } catch (error: any) {
          setIsLoading(false);
          if (
            error?.response?.data?.messages?.message ===
            'Masih ada proses tarik dana yang belum diproses di akun Kamu. Silakan tunggu proses tarik dana hingga selesai, lalu coba kembali ya.'
          ) {
            toast.error(t(`${pathTranslation}.pending`));
          } else {
            toast.error(error?.response?.data?.messages?.message);
          }
          setOtp(['', '', '', '', '', '']);
        }
      })();
    } catch (error: any) {
      toast.error(error?.response?.data?.messages?.message);
    } finally {
      setIsLoading(false);
    }
  };

  // OTP Side

  const [requestStep, setRequestStep] = useState<'form' | 'otp'>('form');
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
    setValue('kodeOtp', newOtp?.join(''));

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
      formData.append('method', otpType);
      formData.append('kverif', 'danaKeluar');
      formData.append('type', '1');
      const response = await getPurchaseOTP(formData);

      if (response?.status === 200) {
        const encryptedData = response?.data;
        const decryptedData = decryptResponse(encryptedData);
        setCountdown(230);

        if (decryptedData !== null) {
          const decryptedDataObject = JSON.parse(decryptedData);
          toast.success(decryptedDataObject?.message);
        }
      } else {
        toast.error(t(`${pathTranslation}.tooManyAttempts`));
      }
    } catch (error) {
      toast.error(`Error getting OTP: ${error as string}`);
    }
  };

  return (
    <Modal
      backdropClasses="z-40 fixed top-0 left-0 w-full h-screen bg-black/25 flex justify-start items-start"
      modalClasses="z-50 animate-slide-down fixed left-0 transform -translate-x-1/2 -translate-y-1/2 top-[40%] md:top-[45%] md:left-[35%] md:right-[-35%] mt-[-17rem] w-full h-fit md:w-[550px] p-6 rounded-lg bg-white"
    >
      <button
        onClick={() => {
          setIsShowModalWithdraw(!isShowModalWithdraw);
        }}
        className="absolute top-4 right-4 p-1 bg-gray-100 rounded-md hover:bg-gray-200"
      >
        <XMarkIcon className="w-5 h-5 text-gray-600" />
      </button>

      <Typography className="font-bold text-xl font-poppins">
        {t(`${pathTranslation}.title`)}
      </Typography>

      {requestStep === 'form' ? (
        <>
          <Typography className="font-bold text-lg font-poppins mt-4">
            {t(`${pathTranslation}.text1`)}
          </Typography>

          <div
            className="font-poppins leading-6 text-[#7C7C7C] text-md font-normal mt-4"
            dangerouslySetInnerHTML={{
              __html: t(`${pathTranslation}.steps`) ?? ''
            }}
          />
          <div className="md:px-4 pb-4">
            <div className="w-full flex flex-col md:flex-row gap-2 mt-4">
              <MInput
                label={`${t(`${pathTranslation}.text2`)}`}
                registerName="jml_pembayaran"
                type="number"
                errors={errors}
                placeholder={`${t(`${pathTranslation}.text13`)}`}
                control={control}
                watch={watch}
              />
            </div>
            {withdrawValue < 10000 && (
              <Typography className="font-poppins text-[#B81516] text-sm font-medium">
                {t(`${pathTranslation}.text3`)}
              </Typography>
            )}
            <div className="w-full flex flex-col md:flex-row gap-2 mt-4">
              <MInput
                label={`${t(`${pathTranslation}.text4`)}`}
                registerName="biaya_admin"
                register={register}
                type="text"
                errors={errors}
                disabled
              />
            </div>
            <div className="w-full flex flex-col md:flex-row gap-2 mt-4">
              <MInput
                label={`${t(`${pathTranslation}.text5`)}`}
                registerName="dana_diterima"
                register={register}
                type="text"
                errors={errors}
                disabled
              />
            </div>
          </div>
        </>
      ) : (
        <div className="md:px-4 pb-4">
          {/* Dropdown for OTP Type */}
          <div className="my-4">
            <Typography className="mb-2">
              {t(`${pathTranslation}.text6`)}
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
              {t(`${pathTranslation}.text7`)}
            </Button>
          ) : (
            <div className="mt-4">
              <Typography className="text-red-600 text-sm font-medium mb-2">
                {`${t(`${pathTranslation}.text8`)} ${formatTime(countdown)}`}
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
        </div>
      )}

      <div className="w-full mt-2 flex flex-col md:flex-row justify-center md:justify-end gap-4 md:gap-2">
        <Button
          onClick={() => {
            requestStep === 'form'
              ? setIsShowModalWithdraw(!isShowModalWithdraw)
              : setRequestStep('form');
          }}
          className="rounded-full w-full md:w-fit md:px-8 px-5 py-3 capitalize font-medium text-sm disabled:bg-[#BDBDBD] disabled:text-[#7C7C7C] bg-white text-[#7C7C7C] font-poppins"
        >
          {requestStep === 'form'
            ? t(`${pathTranslation}.text9`)
            : t(`${pathTranslation}.text10`)}
        </Button>
        <Button
          disabled={
            isLoading || requestStep === 'form'
              ? withdrawValue < 10000 || withdrawValue === undefined
              : !isOTPComplete
          }
          onClick={async () => {
            if (requestStep === 'form') {
              setRequestStep('otp');
            } else {
              await handleWithdrawal();
            }
          }}
          className="rounded-full w-full md:w-fit md:px-8 px-5 py-3 capitalize font-medium text-sm bg-[#3AC4A0] text-white"
        >
          {requestStep === 'form'
            ? t(`${pathTranslation}.text11`)
            : t(`${pathTranslation}.text12`)}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalWithdraw;
