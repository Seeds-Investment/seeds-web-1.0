import SeedyAuthRef from '@/assets/auth/SeedyAuthRef.png';
import TrackerEvent from '@/helpers/GTM';
import {
  checkRefCode,
  loginPhoneNumber,
  register
} from '@/repository/auth.repository';
import { getUserInfo } from '@/repository/profile.repository';
import {
  Button,
  Dialog,
  DialogBody,
  Spinner,
  Typography
} from '@material-tailwind/react';
import DeviceDetector from 'device-detector-js';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import AuthCommonInput from './AuthCommonInput';

interface IAuthRef {
  open: boolean;
  handleOpen: any;
  setFormData: any;
  formData: any;
}

interface LoginFormData {
  phoneNumber: string;
  password: string;
  platform: string;
  os_name: string;
}

const AuthRef: React.FC<IAuthRef> = ({
  open,
  handleOpen,
  setFormData,
  formData
}: IAuthRef) => {
  const deviceDetector = new DeviceDetector();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState(false);
  const [loginForm, setLoginForm] = useState<LoginFormData>({
    phoneNumber: formData.phoneNumber,
    password: formData.password,
    platform: '',
    os_name: ''
  });

  const handleSubmit = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await loginPhoneNumber(loginForm);
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
        handleOpen();
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
      toast(error, { type: 'error' });
    }
  };

  const handleSkip = async (): Promise<void> => {
    try {
      const response = await register(formData);
      if (response === null) {
        throw new Error(response);
      }
      await handleSubmit();
      setError(false);
    } catch (error: any) {
      console.error(error);
      toast(error, { type: 'error' });
    }
  };

  const handleConfirm = async (): Promise<void> => {
    try {
      await checkRefCode(formData.refCode);
      const response = await register(formData);
      if (response === null) {
        throw new Error(response);
      }
      await handleSubmit();
      setError(false);
    } catch (error: any) {
      console.error(error);
      toast(error, { type: 'error' });

      setError(true);
    }
  };

  const handleChange = (e: any): void => {
    setError(false);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setLoginForm({
      ...loginForm,
      platform: `${
        deviceDetector.parse(navigator.userAgent).device?.type as string
      }_web`,
      os_name: `${deviceDetector.parse(navigator.userAgent).os?.name as string}`
    });
  }, []);
  return (
    <Dialog open={open} handler={handleOpen} size="sm">
      <DialogBody className="flex flex-col gap-4 p-10 items-center">
        <Image src={SeedyAuthRef} alt="SeedyAuthRef" className="w-[242px]" />
        <div className="flex flex-col gap-2">
          <Typography className="text-center font-poppins font-semibold text-xl text-[#262626]">
            {t('authRegister.authRef.title1')}
          </Typography>
          <Typography className="text-center font-poppins font-light text-base text-[#7C7C7C]">
            {t('authRegister.authRef.title2')}
          </Typography>
        </div>
        <div className="w-full">
          <AuthCommonInput
            handleChange={handleChange}
            name="refCode"
            formData={formData.refCode}
            placeholder={t('authRegister.authRef.referralPlaceholder')}
            label={t('authRegister.authRef.referral')}
            error={error}
            required={false}
          />
          <Typography className="font-poppins font-light text-sm text-[#DD2525] self-start ps-4">
            {error ? t('authRegister.authRef.validation') : <br />}
          </Typography>
        </div>
        <div className="flex gap-4 w-full">
          <Button
            className="w-full capitalize font-poppins font-semibold text-sm text-[#3AC4A0] bg-[#E0E0E091] rounded-full"
            onClick={handleSkip}
          >
            {loading ? (
              <Spinner className=" h-6 w-6" />
            ) : (
              t('authRegister.authRef.skip')
            )}
          </Button>
          <Button
            className="w-full capitalize font-poppins font-semibold text-sm text-white bg-[#3AC4A0] rounded-full"
            onClick={handleConfirm}
          >
            {loading ? (
              <Spinner className=" h-6 w-6" />
            ) : (
              t('authRegister.authRef.confirm')
            )}
          </Button>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default AuthRef;
