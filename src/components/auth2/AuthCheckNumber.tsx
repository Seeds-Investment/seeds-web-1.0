import Backward from '@/assets/auth/Backward.svg';
import SeedyAuthLogin from '@/assets/auth/SeedyAuthLogin.png';
import AuthNumber from '@/components/auth2/AuthNumber';
import withRedirect from '@/helpers/withRedirect';
import {
  checkPhoneNumber,
  // getOtp,
  validateSetupPassword
} from '@/repository/auth.repository';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import AuthSSO from './AuthSSO';

interface Country {
  name: string;
  flag: string;
  code: string;
  dialCode: string;
}

interface IAuthCheckNumber {
  className: string;
  setSelect: (value: number) => void;
  formData: {
    phoneNumber: string;
  };
  setFormData: (value: { phoneNumber: string }) => void;
  setCountdown: (value: number) => void;
  countries: Country[];
}

interface EventObject {
  target: {
    name: string;
    value: string;
  };
}

const AuthCheckNumber: React.FC<IAuthCheckNumber> = ({
  className,
  setSelect,
  formData,
  setFormData,
  setCountdown,
  countries
}: IAuthCheckNumber) => {
  const { t } = useTranslation();
  const [country, setCountry] = useState(101);
  const router = useRouter();
  const handleChange = (e: EventObject, dialCode: string): void => {
    if (formData.phoneNumber === dialCode) {
      setFormData({
        ...formData,
        phoneNumber: e.target.value.substring(dialCode.length)
      });
    } else if (formData.phoneNumber === '0') {
      setFormData({
        ...formData,
        phoneNumber: e.target.value.substring(1)
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleNext = async (): Promise<void> => {
    const formattedPhone = {
      ...formData,
      phoneNumber: `${countries[country].dialCode.replace('+', '')}${
        formData.phoneNumber
      }`
    };
    try {
      const response = await checkPhoneNumber(formattedPhone.phoneNumber);
      if (response === undefined) {
        // go to register page
        await withRedirect(
          router,
          { ...router.query, phoneNumber: formattedPhone.phoneNumber },
          '/auth2/register'
        );
      }
    } catch (error: any) {
      toast.error(error);
      const response = await validateSetupPassword(formattedPhone.phoneNumber);
      if (response.is_need_set_password === true) {
        // go to create password
        await withRedirect(
          router,
          { ...router.query, phoneNumber: formattedPhone.phoneNumber },
          '/auth2/setup-password'
        );
      } else {
        // go to login page
        await withRedirect(
          router,
          { ...router.query, phoneNumber: formattedPhone.phoneNumber },
          '/auth2/login'
        );
      }
    }
  };

  return (
    <div
      className={`${className} flex-col md:w-[78%] w-full items-center md:gap-8 gap-6 md:p-8 p-4`}
    >
      <Image
        src={Backward}
        alt="Backward"
        className="absolute left-5 top-5 cursor-pointer"
        onClick={async () => {
          await withRedirect(router, router.query, '/auth2');
        }}
      />
      <Image
        src={SeedyAuthLogin}
        alt="SeedyAuthPass"
        className="w-[141.8px] md:flex hidden"
      />
      <Typography className="w-full font-poppins font-semibold md:text-2xl text-base text-[#050522] pt-10 md:p-0">
        <span className="font-poppins font-normal md:text-xl text-sm text-[#7C7C7C]">
          {t('authLogin.title1')}
        </span>
        <br />
        {t('authLogin.title3')}
      </Typography>
      <div className="w-full">
        <AuthNumber
          handleChange={handleChange}
          formData={formData.phoneNumber}
          name="phoneNumber"
          country={country}
          setCountry={setCountry}
          countries={countries}
          // error={error}
          handleSubmit={async (e: any) => {
            if (e.key === 'Enter') {
              await handleNext();
            }
          }}
        />
      </div>
      <Button
        onClick={handleNext}
        disabled={formData.phoneNumber.length === 0}
        className="flex justify-center font-semibold font-poppins text-base text-white capitalize bg-[#3AC4A0] disabled:bg-[#BDBDBD] rounded-full w-full"
      >
        {t('authLogin.next')}
      </Button>
      <AuthSSO setSelect={setSelect} />
    </div>
  );
};

export default AuthCheckNumber;
