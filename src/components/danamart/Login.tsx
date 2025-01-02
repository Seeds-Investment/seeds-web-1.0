import useRecaptcha from '@/helpers/useRecaptcha';
import { Button, Typography } from '@material-tailwind/react';
import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import AuthEmail from './auth/AuthEmail';
import AuthPassword from './auth/AuthPassword';

interface Props {
  handleChangePass: (e: React.ChangeEvent<HTMLInputElement>) => void;
  password: string;
  error: boolean;
  errorPass: boolean;
  blankPass: boolean;
  email: string;
  setPage: (value: string) => void;
  handleLogin?: (recaptchaToken: string) => Promise<void>;
}

const Login: React.FC<Props> = ({
  handleChangePass,
  password,
  error,
  errorPass,
  blankPass,
  email,
  setPage,
  handleLogin
}) => {
  const RECAPTCHA_V2_SITE_KEY = '6LcXDqwqAAAAAOPdJX5A62B34yvSsezZwiWNRaEg';
  const { t } = useTranslation();
  const { capchaToken, recaptchaRef, handleRecaptcha } = useRecaptcha();

  const handleLoginWithRecaptcha = async (): Promise<void> => {
    if ((capchaToken !== null) && (capchaToken !== '') && typeof handleLogin === 'function') {
      await handleLogin(capchaToken);
    } else {
      toast.error(t('danamart.login.validation.recaptcha'));
    }
  };

  return (
    <div className='w-full'>
      <div className="flex flex-col gap-2 text-center my-4">
        <Typography className="font-poppins font-semibold text-xl text-[#262626]">
          {t('danamart.login.welcome')}
        </Typography>
        <Typography className="font-poppins font-light text-base text-[#7c7c7c]">
          {t('danamart.login.welcomeDescription')}
        </Typography>
      </div>
      <div className='w-full flex flex-col gap-4'>
        <div className="w-full">
          <AuthEmail
            name="email"
            value={email}
            fillable={false}
            disabled={true}
            handleSubmit={async (e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter') {
                await handleLoginWithRecaptcha();
              }
            }}
          />
        </div>
        <div className="w-full">
          <AuthPassword
            handleChange={handleChangePass}
            value={password}
            error={errorPass}
            name="password"
            label={t('danamart.login.password').toString()}
            placeholder={t('danamart.login.passwordPlaceholder').toString()}
            handleSubmit={async (e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter') {
                await handleLoginWithRecaptcha();
              }
            }}
          />
          <Typography className="font-poppins font-light text-sm text-[#DD2525] self-start ps-4">
            {error && errorPass ? (
              t('danamart.login.validation.login')
            ) : errorPass && blankPass ? (
              t('danamart.login.validation.blank')
            ) : errorPass ? (
              t('danamart.login.validation.password')
            ) : (
              <br />
            )}
          </Typography>
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={RECAPTCHA_V2_SITE_KEY}
          onChange={handleRecaptcha}
        />
      </div>
      <div className="w-full mt-4">
        <Typography
          onClick={() => { setPage('forgot'); }}
          className="font-poppins font-semibold text-base text-[#DA2D1F] text-right cursor-pointer"
        >
          {t('danamart.login.forgotPassword.forgotPasswordText')}
        </Typography>
      </div>
      <div className="w-full">
        <Button
          disabled={capchaToken === '' || password === ''}
          onClick={async () => {
            await handleLoginWithRecaptcha();
          }}
          className="w-full text-base font-semibold bg-seeds-button-green mt-4 rounded-full capitalize"
        >
          {t('danamart.login.loginButton')}
        </Button>
      </div>
    </div>
  );
};

export default Login;
