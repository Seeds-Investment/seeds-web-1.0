import Backward from '@/assets/auth/Backward.svg';
import SeedsXDanamart from '@/assets/danamart/seeds-danamart.svg';
import { handleFormattedData } from '@/helpers/authFormData';
import { handleGetOTP, handleOTP } from '@/helpers/OTP';
import { useAppDispatch } from '@/store/redux/store';
import type { OTPDataI } from '@/utils/interfaces/otp.interface';
import { Button, Typography } from '@material-tailwind/react';
import Image, { type StaticImageData } from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoMdClose } from 'react-icons/io';
import { toast } from 'react-toastify';

interface Props {
  setPage: (value: string) => void;
  select: number;
  method: string;
  setMethod: React.Dispatch<React.SetStateAction<string>>;
  countdown: number;
  setCountdown: React.Dispatch<React.SetStateAction<number>>;
  image: StaticImageData;
  otpForm: OTPDataI;
  setOTPForm: React.Dispatch<React.SetStateAction<OTPDataI>>;
  setSelect: React.Dispatch<React.SetStateAction<number>>;
  country: number;
  guest?: string;
}

const AuthOTP: React.FC<Props> = ({
  setPage,
  select,
  method,
  setMethod,
  countdown,
  setCountdown,
  setSelect,
  image,
  otpForm,
  setOTPForm,
  guest,
  country
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [input, setInput] = useState(['', '', '', '']);
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [blank, setBlank] = useState(false);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const otp = input.join('');
  const formattedData = handleFormattedData(otpForm, country);
  const stateOTP = 'danamart';

  const handleChangeOTP = (index: number, value: string): void => {
    setBlank(false);
    setError(false);
    const newInput = [...input];
    newInput[index] = value.replace(/\D/g, '');
    setInput(newInput);
    if (newInput[index] !== '') {
      inputRefs.current[index + 1]?.focus();
    }
    setOTPForm(prev => ({ ...prev, otp: newInput.join('') }));
  };
  const handleMethodChange = async (): Promise<void> => {
    setBlank(false);
    setError(false);
    setInput(['', '', '', '']);
    const newMethod = method === 'whatsapp' ? 'sms' : 'whatsapp';
    setMethod(newMethod);
    await handleGetOTP(newMethod, setCountdown, setSelect, formattedData, setOTPForm);
    inputRefs.current[0]?.focus();
    setOTPForm(prev => ({ ...prev, method: newMethod }));
  };

  const handleSubmitOTP = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();
    try {
      setLoading(true);
      if (otp?.length === 0) {
        setBlank(true);
        setError(true);
        setInput(['', '', '', '']);
        inputRefs.current[0]?.focus();
        throw new Error(`${t('danamart.forgotPassword.authOTP.blank')}`);
      } else {
        await handleOTP(
          formattedData,
          guest,
          router,
          dispatch,
          setSelect,
          setOTPForm,
          stateOTP
        );
        setCountdown(0);
      }
    } catch (error: any) {
      toast(error?.response?.data?.message ?? error, { type: 'error' });

      setError(true);
      setInput(['', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
      setInput(['', '', '', '']);
    }
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, [select === 1]);

  return (
    <>
      <div className={`${select === 1 ? 'flex flex-col' : 'hidden'} w-full`}>
        <div className="w-full relative flex justify-center">
          <div
            onClick={() => {
              setPage('login');
            }}
            className="absolute right-0 cursor-pointer hover:scale-110 duration-150"
          >
            <IoMdClose size={20} />
          </div>
          <Image
            src={Backward}
            alt="Backward"
            className="absolute left-0 cursor-pointer"
            onClick={() => {
              setSelect(0);
            }}
          />
          <Image
            src={SeedsXDanamart}
            alt="SeedsXDanamart Logo"
            width={168}
            height={80}
          />
        </div>
        <div className="flex flex-col gap-2 text-center mt-4">
          <Typography className="w-full font-poppins font-normal text-base text-[#7C7C7C] pt-4 md:p-0">
            <Typography className="font-poppins font-semibold text-xl text-[#262626] mb-2">
              {t('danamart.forgotPassword.authOTP.title1')}
            </Typography>
            {t('danamart.forgotPassword.authOTP.title2')}
            {method === 'whatsapp' ? 'Whatsapp' : 'SMS'}
            {t('danamart.forgotPassword.authOTP.title3')} +
            {formattedData.phoneNumber}.
          </Typography>
        </div>
        <div className="flex w-full justify-center items-center">
          <Image
            src={image}
            alt="SeedyAuthLogin"
            className="w-[141.8px] md:flex hidden"
          />
        </div>
        <div className="w-full flex flex-col">
          <div className="w-full">
            <div className="flex justify-between md:mb-4 mb-2 mt-2">
              <Button
                onClick={async () => {
                  setBlank(false);
                  setError(false);
                  setInput(['', '', '', '']);
                  inputRefs.current[0]?.focus();
                  await handleGetOTP(
                    method,
                    setCountdown,
                    setSelect,
                    formattedData,
                    setOTPForm
                  );
                }}
                disabled={countdown > 0}
                className="capitalize bg-transparent shadow-none hover:shadow-none p-0 text-sm disabled:text-[#7C7C7C] text-[#3AC4A0] font-semibold font-poppins"
              >
                {t('danamart.forgotPassword.authOTP.resend')}
              </Button>
              <Typography className="font-poppins font-normal text-base text-[#7C7C7C]">
                {countdown === 60
                  ? '01:00'
                  : `00:${countdown < 10 ? '0' : ''}${countdown}`}
              </Typography>
            </div>
            <div className="flex justify-center w-full gap-6">
              {input.map((value, index) => (
                <div
                  className={`rounded-[10px] p-[2px] w-16 h-16 ${
                    error
                      ? 'bg-[#FF3838]'
                      : 'bg-gradient-to-l from-[#97A4E7] to-[#47C0AA]'
                  }`}
                  key={index}
                >
                  <input
                    type="text"
                    key={index}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    ref={el => {
                      if (el !== null) {
                        inputRefs.current[index] = el;
                      }
                    }}
                    value={value}
                    maxLength={1}
                    onKeyDown={async (
                      e: React.KeyboardEvent<HTMLInputElement>
                    ) => {
                      if (e.key === 'Enter') {
                        await handleSubmitOTP(e);
                      } else if (e.key === 'Backspace') {
                        if (input[index] === '') {
                          inputRefs.current[index - 1]?.focus();
                        }
                      }
                    }}
                    onChange={e => {
                      handleChangeOTP(index, e.target.value);
                    }}
                    className=" w-full h-full focus:outline-none p-0 rounded-[8px] text-center text-[#262626] text-base font-semibold font-poppins [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              ))}
            </div>
            <Typography className="font-poppins font-light text-sm text-[#DD2525] text-center mt-2">
              {error && blank ? (
                t('danamart.forgotPassword.authOTP.blank')
              ) : error ? (
                t('danamart.forgotPassword.authOTP.validation')
              ) : (
                <></>
              )}
            </Typography>
          </div>

          <div className="flex flex-col items-center mt-2">
            <Typography className="font-poppins font-medium text-sm text-[#BDBDBD]">
              {t('danamart.forgotPassword.authOTP.otherMethod1')}
            </Typography>
            <Button
              className="capitalize bg-transparent shadow-none hover:shadow-none p-0 text-sm disabled:text-[#7C7C7C] text-[#3AC4A0] font-semibold font-poppins"
              onClick={handleMethodChange}
              disabled={countdown > 0}
            >
              {t('danamart.forgotPassword.authOTP.otherMethod3')}
              <span className="lowercase">
                {t('danamart.forgotPassword.authOTP.otherMethod4')}
              </span>
              {`${method === 'whatsapp' ? ' SMS' : ' Whatsapp'}`}
            </Button>
          </div>

          <Button
            disabled={isLoading}
            onClick={async e => {
              await handleSubmitOTP(e);
            }}
            className="w-full text-base font-semibold bg-seeds-button-green rounded-full capitalize mt-4"
          >
            {t('danamart.forgotPassword.next')}
          </Button>
        </div>
      </div>
    </>
  );
};

export default AuthOTP;
