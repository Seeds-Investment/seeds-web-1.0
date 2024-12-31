import { Button, Typography } from '@material-tailwind/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import AuthEmail from './auth/AuthEmail';
import AuthPassword from './auth/AuthPassword';

interface Props {
  handleChangePass: (e: React.ChangeEvent<HTMLInputElement>) => void;
  password: string;
  error: boolean;
  errorPass: boolean;
  blankPass: boolean;
  setPage: (value: string) => void;
  email: string;
  handleLogin?: () => Promise<void>;
}

const Login: React.FC<Props> = ({
  handleChangePass,
  password,
  error,
  errorPass,
  blankPass,
  setPage,
  email,
  handleLogin
}) => {
  const { t } = useTranslation();
  
  // const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  
  // const onChange = (value: string | null): void => {
  //   console.log("Captcha value:", value);
  //   setRecaptchaValue(value);
  // };
    
  // useEffect(() => {
  //   console.log('recaptchaValue ', recaptchaValue)
  // }, [recaptchaValue]);

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
                if (handleLogin !== undefined && handleLogin !== null) {
                  await handleLogin();
                }
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
                if (handleLogin !== undefined && handleLogin !== null) {
                  await handleLogin();
                }
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
      {/* <div className="w-full">
        <ReCAPTCHA
          sitekey="6Lfst6kqAAAAAMaM3dUS7qx_r5SpgBAwgMLTfxMy"
          onChange={onChange}
        />
      </div> */}
      <div className="w-full">
        <Typography
          onClick={() => { setPage('forgot'); }}
          className="font-poppins font-semibold text-base text-[#DA2D1F] text-right cursor-pointer"
        >
          {t('danamart.login.forgotPassword.forgotPasswordText')}
        </Typography>
      </div>
      <Button
        onClick={async() => {
          if (handleLogin !== undefined && handleLogin !== null) {
            await handleLogin();
          }
        }}
        className="w-full text-base font-semibold bg-seeds-button-green mt-4 rounded-full capitalize"
      >
        {t('danamart.login.loginButton')}
      </Button>
    </div>
  );
};

export default Login;
