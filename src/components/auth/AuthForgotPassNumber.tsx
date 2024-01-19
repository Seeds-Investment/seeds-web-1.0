import SeedyAuthLogin from '@/assets/auth/SeedyAuthLogin.png';
import AuthNumber from '@/components/auth/AuthNumber';
import { checkPhoneNumber, getOtp } from '@/repository/auth.repository';
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
  method: string;
}

const AuthForgotPassNumber: React.FC<IAuthForgotPassNumber> = ({
  className,
  setSelect,
  formData,
  setFormData,
  setCountdown,
  countries,
  method
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
    const formattedPhone = {
      ...formData,
      phoneNumber: `${countries[country].dialCode.replace('+', '') as string}${
        formData.phoneNumber as string
      }`
    };
    try {
      const response = await checkPhoneNumber(formattedPhone.phoneNumber);
      if (response === undefined) {
        setError(true);
      }
    } catch (error: any) {
      console.log(error);
      const getOTP = {
        method,
        phoneNumber: formattedPhone.phoneNumber
      };
      if (
        error.response.data.message === 'requested phone number already exists'
      ) {
        await getOtp(getOTP);
        setCountdown(30);
        setSelect(1);
        setFormData(formattedPhone);
      }
    }
  };
  console.log(formData);

  return (
    <div
      className={`${className} flex-col md:w-[78%] w-full items-center md:gap-8 gap-6 md:p-8 p-4`}
    >
      <Image
        src={SeedyAuthLogin}
        alt="SeedyAuthLogin"
        className="w-[141.8px] md:flex hidden"
      />
      <Typography className="w-full font-poppins font-normal md:text-xl text-sm text-[#7C7C7C]">
        <span className="font-poppins font-semibold md:text-2xl text-base text-[#050522]">
          Input Phone Number
        </span>
        <br />
        To get OPT Code
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
        <Typography className="font-poppins font-light text-sm text-[#DD2525] self-start ps-4">
          {error ? 'Oops, your phone number not registered' : <br />}
        </Typography>
      </div>
      <Button
        onClick={handleNext}
        disabled={formData.phoneNumber.length === 0}
        className="flex justify-center font-semibold font-poppins text-base text-white capitalize bg-[#3AC4A0] disabled:bg-[#BDBDBD] rounded-full w-full"
      >
        Next
      </Button>
    </div>
  );
};

export default AuthForgotPassNumber;
