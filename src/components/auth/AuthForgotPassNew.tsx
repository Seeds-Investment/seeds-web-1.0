import Info from '@/assets/auth/Info.png';
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
  handleOpen: any;
}

const AuthForgotPassNew: React.FC<IAuthForgotPassNew> = ({
  className,
  formData,
  setFormData,
  handleOpen
}: IAuthForgotPassNew) => {
  const [errorPass, setErrorPass] = useState(false);
  const [errorRepass, setErrorRepass] = useState(false);
  const regex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  const handlePass = (e: any): void => {
    setErrorPass(false);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleRepass = (e: any): void => {
    setErrorRepass(false);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = async (): Promise<void> => {
    try {
      const passTest = regex.test(formData.password);
      if (!passTest) {
        setErrorPass(true);
      }
      if (formData.password !== formData.repassword) {
        setErrorRepass(true);
      }
      handleOpen();
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
          name="password"
          label="Create a New Password"
          placeholder="Please create your password"
        />
        <Typography className="font-poppins font-light text-sm text-[#DD2525] self-start ps-4">
          {errorPass ? (
            'Password must contain 8 digit with upper case and lower case'
          ) : (
            <br />
          )}
        </Typography>
      </div>
      <div className="w-full">
        <AuthPassword
          handleChange={handleRepass}
          formData={formData.repassword}
          error={errorRepass}
          name="repassword"
          label="Confirm New Password"
          placeholder="Please confirm your password"
        />
        <Typography className="font-poppins font-light text-sm text-[#DD2525] self-start ps-4">
          {errorRepass ? 'Oops,  password doesn’t match' : <br />}
        </Typography>
      </div>
      <div className="flex gap-3">
        <Image src={Info} alt="Info" className="w-5 h-5" />
        <Typography className="font-poppins font-light text-sm text-[#3AC4A0]">
          Password must be 8 characters long and have both uppercase and
          lowercase letters.
        </Typography>
      </div>
      <Button
        onClick={handleNext}
        disabled={
          formData.password.length === 0 || formData.repassword.length === 0
        }
        className="flex justify-center font-semibold font-poppins text-base text-white capitalize bg-[#3AC4A0] rounded-full w-full"
      >
        Next
      </Button>
    </div>
  );
};

export default AuthForgotPassNew;
