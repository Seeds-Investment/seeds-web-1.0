import useRecaptcha from '@/helpers/useRecaptcha';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Typography } from '@material-tailwind/react';
import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import AuthEmail from './auth/AuthEmail';
import AuthPassword from './auth/AuthPassword';

interface LoginProps {
  userEmail: string;
  handleLogin: (
    email: string,
    password: string,
    captchaToken: string
  ) => Promise<void>;
  isLoading: boolean;
  setPage: (value: string) => void;
  errorType: number;
  isError: boolean;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowConfirmUnlink: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenModalLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

interface LoginFormInputs {
  email: string;
  password: string;
  capchaToken: string;
}

const Login: React.FC<LoginProps> = ({
  userEmail,
  handleLogin,
  isLoading,
  setPage,
  errorType,
  isError,
  setIsError,
  setIsShowConfirmUnlink,
  setIsOpenModalLogin
}) => {
  const { t } = useTranslation();
  const RECAPTCHA_V2_SITE_KEY = '6LcXDqwqAAAAAOPdJX5A62B34yvSsezZwiWNRaEg';
  const { capchaToken, recaptchaRef, handleRecaptcha } = useRecaptcha();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch
  } = useForm<LoginFormInputs>({
    defaultValues: { email: userEmail, password: '' },
    resolver: yupResolver(
      Yup.object({
        email: Yup.string().required(
          String(t('danamart.login.validation.blank'))
        ),
        password: Yup.string().required(
          String(t('danamart.login.validation.wrongPassword'))
        ),
        capchaToken: Yup.string().required(
          String(t('danamart.login.validation.recaptcha'))
        )
      })
    )
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async data => {
    await handleLogin(data.email, data.password, capchaToken);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="flex flex-col gap-2 text-center my-4">
        <Typography className="font-poppins font-semibold text-xl text-[#262626]">
          {t('danamart.login.welcome')}
        </Typography>
        <Typography className="font-poppins font-light text-base text-[#7c7c7c]">
          {t('danamart.login.welcomeDescription')}
        </Typography>
      </div>

      <AuthEmail
        value={userEmail}
        {...register('email')}
        fillable={false}
        disabled={true}
        handleSubmit={e => {
          if (e.key === 'Enter') void handleSubmit(onSubmit)();
        }}
      />

      <AuthPassword
        value={watch('password')}
        onChange={e => {
          setValue('password', e.target.value);
          setIsError(false);
        }}
        error={Boolean(errors.password)}
        name="password"
        label={t('danamart.login.password')}
        placeholder={t('danamart.login.passwordPlaceholder')}
        handleSubmit={e => {
          if (e.key === 'Enter') void handleSubmit(onSubmit)();
        }}
        className={'mt-6'}
      />
      {errors.password !== null && errors.password !== undefined && (
        <p className="text-red-500">{errors.password.message}</p>
      )}
      {isError && errorType === 1 ? (
        <p className="text-red-500 w-full text-justify mt-2">
          {t('danamart.login.validation.limitEntry')}
        </p>
      ) : isError && errorType === 2 ? (
        <p className="text-red-500 w-full text-justify mt-2">
          {t('danamart.login.validation.wrongPassword')}
        </p>
      ) : isError && errorType === 3 ? (
        <p className="text-red-500 w-full text-justify mt-2">
          {t('danamart.login.validation.error')}
        </p>
      ) : null}

      <div className="w-full flex flex-col justify-center items-center mt-4">
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={RECAPTCHA_V2_SITE_KEY}
          onChange={token => {
            handleRecaptcha(token);
            setValue(
              'capchaToken',
              token !== null && token !== undefined ? token : '',
              {
                shouldValidate: true
              }
            );
          }}
        />
        {errors.capchaToken !== null && errors.capchaToken !== undefined && (
          <p className="text-red-500">{errors.capchaToken.message}</p>
        )}
      </div>
      <div className="w-full mt-4 flex justify-end items-end">
        <Typography
          onClick={() => {
            setPage('forgot');
            
          }}
          className="w-fit font-poppins font-semibold text-base text-[#DA2D1F] text-right cursor-pointer"
        >
          {t('danamart.forgotPassword.forgotPasswordText')}
        </Typography>
      </div>

      <Button
        type="submit"
        disabled={capchaToken === '' || watch('password') === '' || isLoading}
        className="w-full text-base font-semibold bg-seeds-button-green mt-4 rounded-full capitalize font-poppins"
      >
        {t('danamart.login.loginButton')}
      </Button>

      <Button
        onClick={() => {
          setIsOpenModalLogin(false)
          setIsShowConfirmUnlink(true)
        }}
        disabled={isLoading}
        className="w-full text-base font-semibold bg-white text-seeds-button-green mt-4 rounded-full capitalize font-poppins"
      >
        {t('danamart.login.disconnectAccount')}
      </Button>
    </form>
  );
};

export default Login;
