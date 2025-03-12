import Info from '@/assets/auth/Info.png';
import SeedsXDanamart from '@/assets/danamart/seeds-danamart.svg';
import AuthPassword from '@/components/auth2/AuthPassword';
import { changePassword } from '@/repository/danamart/auth.repository';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoMdClose } from 'react-icons/io';
import { toast } from 'react-toastify';

interface NewPasswordI {
  email: string;
  password: string;
}

interface Props {
  setPage: (value: string) => void;
  className: string;
  setSelect: React.Dispatch<React.SetStateAction<number>>;
  formDataNewPassword: NewPasswordI;
  setFormDataNewPassword: React.Dispatch<React.SetStateAction<NewPasswordI>>;
  handleOpen: () => void;
}

const AuthForgotPassNew: React.FC<Props> = ({
  setPage,
  className,
  handleOpen,
  formDataNewPassword,
  setFormDataNewPassword
}) => {
  const { t } = useTranslation();
  const [passwordTemp, setPasswordTemp] = useState<string>('');
  const [errorPass, setErrorPass] = useState(false);
  const [errorRepass, setErrorRepass] = useState(false);
  const regex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const handlePass = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setErrorPass(false);
    setPasswordTemp(e.target.value);
  };
  const handleRepass = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setErrorRepass(false);
    setFormDataNewPassword({ ...formDataNewPassword, [e.target.name]: e.target.value });
  };

  const handleNext = async (): Promise<void> => {
    try {
      const passTest = regex.test(formDataNewPassword.password);
      if (!passTest) {
        setErrorPass(true);
        throw new Error(`${t('danamart.forgotPassword.authForgotPass.validation.password')}`);
      }
      if (formDataNewPassword.password !== passwordTemp) {
        setErrorRepass(true);
        throw new Error(`${t('danamart.forgotPassword.authForgotPass.validation.match')}`);
      }
      if (passTest && formDataNewPassword.password === passwordTemp) {
        await changePassword(formDataNewPassword);
        handleOpen();
      }
    } catch (error: any) {
      toast(error, { type: 'error' });
    }
  };

  return (
    <div className={`${className} w-full`}>
      <div className="w-full relative flex justify-center">
        <div
          onClick={() => { setPage('login'); }}
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
          {t('danamart.forgotPassword.createNewPassword.title1')}
        </Typography>
        <Typography className="font-poppins font-light text-base text-[#7c7c7c]">
          {t('danamart.forgotPassword.createNewPassword.title2')}
        </Typography>
      </div>
      <div className='w-full flex flex-col gap-4 mt-4'>
        <div className="w-full">
          <AuthPassword
            handleChange={handlePass}
            value={passwordTemp}
            error={errorPass}
            name="passwordTemp"
            label={t('danamart.forgotPassword.authForgotPass.newPassword.label')}
            placeholder={t('danamart.forgotPassword.authForgotPass.newPassword.placeholder')}
            handleSubmit={async (e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter') {
                await handleNext();
              }
            }}
          />
          <Typography className="font-poppins font-light text-sm text-[#DD2525] self-start ps-4">
            {errorPass ? t('danamart.forgotPassword.authForgotPass.validation.password') : <br />}
          </Typography>
        </div>
        <div className="w-full">
          <AuthPassword
            handleChange={handleRepass}
            value={formDataNewPassword.password}
            error={errorRepass}
            name="password"
            label={t('danamart.forgotPassword.authForgotPass.matchPassword.label')}
            placeholder={t('danamart.forgotPassword.authForgotPass.matchPassword.placeholder')}
            handleSubmit={async (e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter') {
                await handleNext();
              }
            }}
          />
          <Typography className="font-poppins font-light text-sm text-[#DD2525] self-start ps-4">
            {errorRepass ? t('danamart.forgotPassword.authForgotPass.validation.match') : <br />}
          </Typography>
        </div>
        <div className="flex gap-3">
          <Image src={Info} alt="Info" className="w-5 h-5" />
          <Typography className="font-poppins font-light text-sm text-[#3AC4A0]">
            {t('danamart.forgotPassword.authForgotPass.information')}
          </Typography>
        </div>
        <Button
          onClick={handleNext}
          disabled={
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            !formDataNewPassword.password ||
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            !passwordTemp ||
            formDataNewPassword.password.length === 0 ||
            passwordTemp.length === 0
          }
          className="w-full text-base font-semibold bg-seeds-button-green rounded-full capitalize"
        >
          {t('danamart.forgotPassword.next')}
        </Button>
      </div>
    </div>
  );
};

export default AuthForgotPassNew;
