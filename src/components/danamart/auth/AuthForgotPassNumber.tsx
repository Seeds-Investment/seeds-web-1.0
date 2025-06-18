import SeedsXDanamart from '@/assets/danamart/seeds-danamart.svg';
import {
  handleChangePhoneNumber,
  handleFormattedData
} from '@/helpers/authFormData';
import { handleGetOTP } from '@/helpers/OTP';
import { checkPhoneNumber } from '@/repository/auth.repository';
import type { ForgotPassData } from '@/utils/interfaces/auth.interface';
import { type Country } from '@/utils/interfaces/guest.interface';
import { type OTPDataI } from '@/utils/interfaces/otp.interface';
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography
} from '@material-tailwind/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoIosArrowDown, IoMdClose } from 'react-icons/io';
import { toast } from 'react-toastify';
import AuthNumber from './AuthNumber';

interface Props {
  setPage: (value: string) => void;
  className: string;
  setSelect: React.Dispatch<React.SetStateAction<number>>;
  formData: ForgotPassData;
  setFormData: React.Dispatch<React.SetStateAction<ForgotPassData>>;
  setCountdown: React.Dispatch<React.SetStateAction<number>>;
  countries: Country[];
  method: string;
  country: number;
  setCountry: React.Dispatch<React.SetStateAction<number>>;
  otpForm: OTPDataI;
  setOTPForm: React.Dispatch<React.SetStateAction<OTPDataI>>;
  setMethod: React.Dispatch<React.SetStateAction<string>>;
}

const AuthForgotPassNumber: React.FC<Props> = ({
  setPage,
  className,
  setSelect,
  formData,
  setFormData,
  setCountdown,
  countries,
  method,
  country,
  setCountry,
  otpForm,
  setOTPForm,
  setMethod
}) => {
  const { t } = useTranslation();
  const [error, setError] = useState<boolean>(false);
  const [blank, setBlank] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const formattedData = handleFormattedData(otpForm, country);

  const handleNext = async (): Promise<void> => {
    try {
      setLoading(true);
      if (
        formattedData.phoneNumber.length ===
        countries[country].dialCode.replace('+', '').length
      ) {
        setBlank(true);
        setError(true);
        throw new Error();
      }
      const response = await checkPhoneNumber(formattedData.phoneNumber);
      if (response === undefined) {
        setError(true);
      }
    } catch (error: any) {
      if (
        error?.response?.data?.message !==
        'requested phone number already exists'
      ) {
        toast.error(error?.response?.data?.message);
      }
      if (
        error?.response?.data?.message ===
        'requested phone number already exists'
      ) {
        await handleGetOTP(
          method,
          setCountdown,
          setSelect,
          formattedData,
          setOTPForm
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setFormData({
      ...formData,
      phoneNumber: formattedData.phoneNumber
    });
  }, [formattedData.phoneNumber]);

  return (
    <div className={`${className} w-full`}>
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
          src={SeedsXDanamart}
          alt="SeedsXDanamart Logo"
          width={168}
          height={80}
        />
      </div>
      <div className="flex flex-col gap-2 text-center my-4">
        <Typography className="font-poppins font-semibold text-xl text-[#262626]">
          {t('danamart.forgotPassword.forgotPasswordTitle')}
        </Typography>
        <Typography className="font-poppins font-light text-base text-[#7c7c7c]">
          {t('danamart.forgotPassword.forgotPasswordDescription')}
        </Typography>
      </div>
      <div className="w-full flex flex-col gap-4 mt-4">
        <div className="w-full">
          <AuthNumber
            handleChange={handleChangePhoneNumber}
            formData={otpForm}
            setFormData={setOTPForm}
            name="phoneNumber"
            country={country}
            setCountry={setCountry}
            countries={countries}
            error={error}
            setError={setError}
            handleSubmit={async (e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter') {
                await handleNext();
              }
            }}
          />
        </div>
        {blank ||
          (error && (
            <Typography className="font-poppins font-light text-sm text-[#DD2525] self-start ps-4">
              {blank && error ? (
                t('danamart.forgotPassword.authForgotPass.validation.blank')
              ) : error ? (
                t('danamart.forgotPassword.authForgotPass.validation.number')
              ) : (
                <br />
              )}
            </Typography>
          ))}

        <div className="rounded-xl p-[2px] w-full bg-gradient-to-l from-[#97A4E7] to-[#47C0AA]">
          <div className="relative flex justify-center items-center bg-white border-none w-full rounded-[10px] h-full">
            <Menu>
              <MenuHandler>
                <Button
                  ripple={false}
                  variant="text"
                  className="w-full flex items-center justify-between px-4 py-2 text-[#7C7C7C] font-poppins font-normal text-base hover:bg-transparent focus:border-none"
                >
                  <Typography>
                    {method === 'sms' ? 'SMS' : 'WhatsApp'}
                  </Typography>
                  <IoIosArrowDown className="text-gray-500" />
                </Button>
              </MenuHandler>
              <MenuList className="absolute left-0 top-full mt-1 z-50 w-[250px] md:w-[350px] rounded-lg shadow-lg bg-white">
                <MenuItem
                  className="flex items-center gap-2 px-4 py-2 text-base text-[#262626] font-poppins hover:bg-gray-100"
                  onClick={() => {
                    setMethod('sms');
                    setOTPForm(prev => ({ ...prev, method: 'sms' }));
                  }}
                >
                  SMS
                </MenuItem>
                <MenuItem
                  className="flex items-center gap-2 px-4 py-2 text-base text-[#262626] font-poppins hover:bg-gray-100"
                  onClick={() => {
                    setMethod('whatsapp');
                    setOTPForm(prev => ({ ...prev, method: 'whatsapp' }));
                  }}
                >
                  WhatsApp
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>

        <Button
          onClick={handleNext}
          disabled={isLoading || formattedData?.phoneNumber === '62'}
          className="w-full text-base font-semibold bg-seeds-button-green rounded-full capitalize"
        >
          {t('danamart.forgotPassword.next')}
        </Button>
        <Button
          onClick={() => {
            setPage('login');
          }}
          className="w-full text-base font-semibold bg-white text-seeds-button-green border border-seeds-button-green rounded-full capitalize"
        >
          {t('danamart.forgotPassword.backLogin')}
        </Button>
      </div>
    </div>
  );
};

export default AuthForgotPassNumber;
