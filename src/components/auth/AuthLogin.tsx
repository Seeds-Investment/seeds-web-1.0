import SeedyAuthLogin from '@/assets/auth/SeedyAuthLogin.png';
import AuthNumber from '@/components/auth/AuthNumber';
import AuthPassword from '@/components/auth/AuthPassword';
import countries from '@/constants/countries.json';
import TrackerEvent from '@/helpers/GTM';
import { loginPhoneNumber } from '@/repository/auth.repository';
import { getUserInfo } from '@/repository/profile.repository';
import { Button, Spinner, Typography } from '@material-tailwind/react';
import DeviceDetector from 'device-detector-js';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AuthSSO from './AuthSSO';

interface FormData {
  phoneNumber: string;
  password: string;
  platform: string;
  os_name: string;
}

const AuthLogin: React.FC = () => {
  const router = useRouter();
  const deviceDetector = new DeviceDetector();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState(101);
  const [formData, setFormData] = useState<FormData>({
    phoneNumber: '',
    password: '',
    platform: '',
    os_name: ''
  });

  const handleSubmit = async (): Promise<void> => {
    try {
      setLoading(true);
      const formattedPhone = {
        ...formData,
        phoneNumber: `${countries[country].dialCode.replace('+', '')}${
          formData.phoneNumber
        }`
      };
      const response = await loginPhoneNumber(formattedPhone);
      if (response.status === 200) {
        window.localStorage.setItem('accessToken', response.accessToken);
        window.localStorage.setItem('refreshToken', response.refreshToken);
        window.localStorage.setItem('expiresAt', response.expiresAt);

        setFormData({ ...formData, phoneNumber: '', password: '' });
        const responseUser = await getUserInfo();
        TrackerEvent({
          event: 'Seeds_login_web',
          userId: responseUser.id
        });
        await router.push('/homepage');
        TrackerEvent({
          event: `Seeds_view_home_page_web`,
          userId: responseUser.id,
          pageName: 'homepage'
        });
      } else if (response.data.message === 'wrong phone number or password') {
        setLoading(false);
        setError(true);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

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

  useEffect(() => {
    setFormData({
      ...formData,
      platform: `${
        deviceDetector.parse(navigator.userAgent).device?.type as string
      }_web`,
      os_name: `${deviceDetector.parse(navigator.userAgent).os?.name as string}`
    });
  }, []);

  return (
    <div className="flex flex-col md:w-[78%] w-full items-center md:gap-8 gap-6 md:p-8 p-4">
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
      <AuthNumber
        handleChange={handleChange}
        formData={formData.phoneNumber}
        country={country}
        setCountry={setCountry}
        countries={countries}
        error={error}
      />
      <div className="w-full">
        <AuthPassword
          handleChange={handleChange}
          formData={formData.password}
          error={error}
          name="password"
          label="Password"
          placeholder="Please input your password"
        />
        <Typography className="font-poppins font-light text-sm text-[#DD2525] self-start ps-4">
          {error ? 'Your phone number or password is wrong' : <br />}
        </Typography>
      </div>
      <Typography className="hidden md:inline font-poppins font-semibold text-xs text-[#3AC4A0] self-end">
        Forgot Password?
      </Typography>
      <Button
        disabled={loading}
        onClick={handleSubmit}
        className="flex justify-center font-semibold font-poppins text-base text-white capitalize bg-[#3AC4A0] rounded-full w-full"
      >
        {loading ? <Spinner className=" h-6 w-6" /> : 'Login'}
      </Button>
      <Typography className="md:hidden inline font-poppins font-semibold text-xs text-[#3AC4A0] self-end">
        Forgot Password?
      </Typography>
      <AuthSSO />
    </div>
  );
};

export default AuthLogin;
