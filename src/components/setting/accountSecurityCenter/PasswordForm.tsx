import Info from '@/assets/auth/Info.png';
import SeedyLock from '@/assets/auth/SeedyLock.png';
import AuthPassword from '@/components/auth/AuthPassword';
import { changePassword } from '@/repository/auth.repository';
import { useAppSelector } from '@/store/redux/store';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

interface IPasswordForm {
  formData: any;
  setFormData: any;
}

const PasswordForm: React.FC<IPasswordForm> = ({
  formData,
  setFormData
}: IPasswordForm) => {
  const { t } = useTranslation();
  const { dataUser } = useAppSelector(state => state.user);
  const [errorPass, setErrorPass] = useState(false);
  const [errorOldPass, setErrorOldPass] = useState(false);
  const [errorRepass, setErrorRepass] = useState(false);
  const [repass, setRepass] = useState({ repass: '' });
  const regex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  const handlePass = (e: any): void => {
    setErrorPass(false);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleOldPass = (e: any): void => {
    setErrorOldPass(false);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleRepass = (e: any): void => {
    setErrorRepass(false);
    setRepass({ ...repass, [e.target.name]: e.target.value });
  };

  const handleNext = async (): Promise<void> => {
    try {
      const passTest = regex.test(formData.password);
      if (!passTest) {
        setErrorPass(true);
        throw new Error(`${t('authForgotPass.validation.password')}`);
      }
      if (dataUser.isPasswordExists) {
        await changePassword(formData);
      } else {
        if (formData.password !== repass.repass) {
          setErrorRepass(true);
          throw new Error(`${t('authForgotPass.validation.match')}`);
        }
        if (passTest && formData.password === repass.repass) {
          await changePassword(formData);
        }
      }
    } catch (error: any) {
      toast(error, { type: 'error' });
    }
  };

  return (
    <div className="flex flex-col w-full items-center md:gap-8 gap-6 md:py-8 md:px-20 p-4">
      <Image src={SeedyLock} alt="SeedyLock" className="w-32 md:flex hidden" />
      <Typography className="w-full font-poppins font-semibold md:text-2xl text-base text-[#050522] text-center">
        {t('authForgotPass.title3')}
        <br />
        <span className="font-poppins font-normal md:text-xl text-sm text-[#7C7C7C]">
          {t('authForgotPass.title4')}
        </span>
      </Typography>
      {dataUser.isPasswordExists ? (
        <div className="w-full">
          <AuthPassword
            handleChange={handleOldPass}
            formData={formData.old_password}
            error={errorOldPass}
            name="old_password"
            label={t('authForgotPass.matchPassword.label')}
            placeholder={t('authForgotPass.matchPassword.placeholder')}
            handleSubmit={false}
          />
          <Typography className="font-poppins font-light text-sm text-[#DD2525] self-start ps-4">
            {errorOldPass ? t('authForgotPass.validation.match') : <br />}
          </Typography>
        </div>
      ) : null}

      <div className="w-full">
        <AuthPassword
          handleChange={handlePass}
          formData={formData.password}
          error={errorPass}
          name="password"
          label={t('authForgotPass.newPassword.label')}
          placeholder={t('authForgotPass.newPassword.placeholder')}
          handleSubmit={false}
        />
        <Typography className="font-poppins font-light text-sm text-[#DD2525] self-start ps-4">
          {errorPass ? t('authForgotPass.validation.password') : <br />}
        </Typography>
      </div>
      {dataUser.isPasswordExists ? null : (
        <div className="w-full">
          <AuthPassword
            handleChange={handleRepass}
            formData={repass.repass}
            error={errorRepass}
            name="repass"
            label={t('authForgotPass.matchPassword.label')}
            placeholder={t('authForgotPass.matchPassword.placeholder')}
            handleSubmit={false}
          />
          <Typography className="font-poppins font-light text-sm text-[#DD2525] self-start ps-4">
            {errorRepass ? t('authForgotPass.validation.match') : <br />}
          </Typography>
        </div>
      )}
      <div className="flex gap-3 self-start">
        <Image src={Info} alt="Info" className="w-5 h-5" />
        <Typography className="font-poppins font-light text-sm text-[#3AC4A0]">
          {t('authForgotPass.information')}
        </Typography>
      </div>
      <Button
        onClick={handleNext}
        disabled={
          formData.password.length === 0 || formData.old_password.length === 0
        }
        className="flex justify-center font-semibold font-poppins text-base text-white capitalize bg-[#3AC4A0] disabled:bg-[#BDBDBD] rounded-full w-full"
      >
        {t('authLogin.next')}
      </Button>
    </div>
  );
};

export default PasswordForm;
