import SeedyAuthLogin from '@/assets/auth/SeedyAuthLogin.png';
import AuthPassword from '@/components/auth/AuthPassword';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useState } from 'react';

interface IAuthForgotPassNew {
  className: string;
  setSelect: any;
  formData: any;
  setFormData: any;
}

const AuthForgotPassNew: React.FC<IAuthForgotPassNew> = ({
  className,
  setSelect,
  formData,
  setFormData
}: IAuthForgotPassNew) => {
  const [errorPass, setErrorPass] = useState(false);
  const regex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  const handlePass = (e: any): void => {
    setErrorPass(false);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = async (): Promise<void> => {
    try {
      const passTest = regex.test(formData.password);
      if (!passTest) {
        setErrorPass(true);
      }
    } catch (error: any) {
      console.log(error);
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
        <AuthPassword
          handleChange={handlePass}
          formData={formData.password}
          error={errorPass}
        />
        <Typography className="font-poppins font-light text-sm text-[#DD2525] self-start">
          {errorPass ? (
            'Password must contain 8 digit with upper case and lower case'
          ) : (
            <br />
          )}
        </Typography>
      </div>
      <div className="w-full">
        <AuthPassword
          handleChange={handlePass}
          formData={formData.password}
          error={errorPass}
        />
        <Typography className="font-poppins font-light text-sm text-[#DD2525] self-start">
          {errorPass ? (
            'Password must contain 8 digit with upper case and lower case'
          ) : (
            <br />
          )}
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

export default AuthForgotPassNew;
