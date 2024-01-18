import SeedyAuthLogin from '@/assets/auth/SeedyAuthLogin.png';
import AuthNumber from '@/components/auth/AuthNumber';
import { checkPhoneNumber } from '@/repository/auth.repository';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useState } from 'react';

interface IAuthForgotPassNumber {
  className: string;
  setSelect: any;
  formData: any;
  setFormData: any;
  setCountdown: any;
  countries: any;
}

const AuthForgotPassNumber: React.FC<IAuthForgotPassNumber> = ({
  className,
  setSelect,
  formData,
  setFormData,
  setCountdown,
  countries
}: IAuthForgotPassNumber) => {
  const [error, setError] = useState(false);
  const [country, setCountry] = useState(101);
  const handleChange = (e: any, dialCode: any): void => {
    setError(false);
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
    try {
      const formattedPhone = {
        ...formData,
        phoneNumber: `${
          countries[country].dialCode.replace('+', '') as string
        }${formData.phoneNumber as string}`
      };
      const response = await checkPhoneNumber(formattedPhone.phoneNumber);
      if (response === undefined) {
        setCountdown(30);
        setSelect(1);
      }
    } catch (error: any) {
      console.log(error);
      if (
        error.response.data.message === 'requested phone number already exists'
      ) {
        setError(true);
      }
    }
  };

  return (
    <div
      className={`${className} flex-col md:w-[78%] w-full items-center md:gap-8 gap-6 md:p-8 p-4`}
    >
      <Image
        src={SeedyAuthLogin}
        alt="SeedyAuthLogin"
        className="w-[141.8px] md:flex hidden"
      />
      <Typography className="w-full font-poppins font-semibold md:text-2xl text-base text-[#050522]">
        <span className="font-poppins font-normal md:text-xl text-sm text-[#7C7C7C]">
          Let’s Input!
        </span>
        <br />
        Phone number & password
      </Typography>
      <div className="w-full">
        <AuthNumber
          handleChange={handleChange}
          formData={formData.phoneNumber}
          country={country}
          setCountry={setCountry}
          countries={countries}
          error={error}
        />
        <Typography className="font-poppins font-light text-sm text-[#DD2525] self-start">
          {error ? 'Oops, Your number already registered' : <br />}
        </Typography>
      </div>
      <Button
        onClick={handleNext}
        className="flex justify-center font-semibold font-poppins text-base text-white capitalize bg-[#3AC4A0] rounded-full w-full"
      >
        Next
      </Button>
    </div>
  );
};

export default AuthForgotPassNumber;
