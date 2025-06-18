/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import SeedsXDanamart from '@/assets/danamart/seeds-danamart.svg';
import AuthPassword from '@/components/auth2/AuthPassword';
import { changePassword } from '@/repository/danamart/auth.repository';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
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
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  const [errorPassMsg, setErrorPassMsg] = useState<string | null>(null);
  const [errorRepassMsg, setErrorRepassMsg] = useState<string | null>(null);

  const [validation, setValidation] = useState({
    length: false,
    lowerCase: false,
    upperCase: false,
    numbers: false,
    specialChar: false
  });

  const checkValidation = (password: string): void => {
    setValidation({
      length: password.length >= 8,
      lowerCase: /[a-z]/.test(password),
      upperCase: /[A-Z]/.test(password),
      numbers: /\d/.test(password),
      specialChar: /[\W_]/.test(password)
    });
  };

  const handlePass = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setPasswordTemp(value);
    checkValidation(value);

    if (!regex.test(value)) {
      setErrorPassMsg(
        'Oops, password must be 8 characters long and have both uppercase and lowercase letters.'
      );
    } else {
      setErrorPassMsg(null);
    }
  };

  const handleRepass = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setFormDataNewPassword({ ...formDataNewPassword, [e.target.name]: value });

    if (!regex.test(value)) {
      setErrorRepassMsg(
        'Oops, password must be 8 characters long and have both uppercase and lowercase letters.'
      );
    } else if (value !== passwordTemp) {
      setErrorRepassMsg('Oops, password doesn’t match.');
    } else {
      setErrorRepassMsg(null);
    }
  };

  const handleNext = async (): Promise<void> => {
    try {
      const passTest = regex.test(formDataNewPassword.password);
      if (!passTest) {
        setErrorPass(true);
        throw new Error(
          `${t('danamart.forgotPassword.authForgotPass.validation.password')}`
        );
      }
      if (formDataNewPassword.password !== passwordTemp) {
        setErrorRepass(true);
        throw new Error(
          `${t('danamart.forgotPassword.authForgotPass.validation.match')}`
        );
      }
      if (passTest && formDataNewPassword.password === passwordTemp) {
        await changePassword(formDataNewPassword);
        handleOpen();
      }
    } catch (error: any) {
      toast(error, { type: 'error' });
    }
  };

  useEffect(() => {
    if (formDataNewPassword.password) {
      if (!regex.test(formDataNewPassword.password)) {
        setErrorRepassMsg(
          'Oops, password must be 8 characters long and have both uppercase and lowercase letters.'
        );
      } else if (formDataNewPassword.password !== passwordTemp) {
        setErrorRepassMsg('Oops, password doesn’t match.');
      } else {
        setErrorRepassMsg(null);
      }
    }
  }, [passwordTemp, formDataNewPassword.password]);

  return (
    <div className={`${className} w-full`}>
      <div className="w-full relative flex justify-center">
        <div
          onClick={() => {
            setPage('login');
          }}
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
      <div
        className={`w-full flex flex-col mt-4 ${errorPass ? 'gap-6' : 'gap-2'}`}
      >
        <div className="w-full">
          <AuthPassword
            handleChange={handlePass}
            value={passwordTemp}
            error={errorPass}
            name="passwordTemp"
            label={t(
              'danamart.forgotPassword.authForgotPass.newPassword.label'
            )}
            placeholder={t(
              'danamart.forgotPassword.authForgotPass.newPassword.placeholder'
            )}
            handleSubmit={async (e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter') {
                await handleNext();
              }
            }}
          />
          {passwordTemp !== '' && (
            <Typography className="font-poppins font-light text-sm text-[#DD2525] self-start ps-4">
              {errorPassMsg ?? <br />}
            </Typography>
          )}
        </div>
        <div className={`w-full ${errorPassMsg === null ? '' : 'mt-5'}`}>
          <AuthPassword
            handleChange={handleRepass}
            value={formDataNewPassword.password}
            error={errorRepass}
            name="password"
            label={t(
              'danamart.forgotPassword.authForgotPass.matchPassword.label'
            )}
            placeholder={t(
              'danamart.forgotPassword.authForgotPass.matchPassword.placeholder'
            )}
            handleSubmit={async (e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter') {
                await handleNext();
              }
            }}
          />
          {formDataNewPassword?.password !== '' && (
            <Typography className="font-poppins font-light text-sm text-[#DD2525] self-start ps-4">
              {errorRepassMsg ?? <br />}
            </Typography>
          )}
        </div>
      </div>
      <div
        className={`w-full flex flex-col gap-4 ${
          errorRepass ? 'mt-4' : 'mt-2'
        }`}
      >
        <div className="flex flex-col gap-2">
          <Typography className="font-poppins font-semibold text-sm text-seeds-green">
            {t('danamart.register.passwordContain')}
          </Typography>
          <div className="flex gap-2">
            <ul className="font-poppins font-normal text-sm">
              <li
                className={
                  validation.numbers ? 'text-seeds-green' : 'text-[#7C7C7C]'
                }
              >
                {t('danamart.register.numbers')}
              </li>
              <li
                className={
                  validation.lowerCase ? 'text-seeds-green' : 'text-[#7C7C7C]'
                }
              >
                {t('danamart.register.lowercase')}
              </li>
              <li
                className={
                  validation.specialChar ? 'text-seeds-green' : 'text-[#7C7C7C]'
                }
              >
                {t('danamart.register.specialCharacters')}
              </li>
            </ul>
            <ul className="font-poppins font-normal text-sm">
              <li
                className={
                  validation.length ? 'text-seeds-green' : 'text-[#7C7C7C]'
                }
              >
                {t('danamart.register.characters')}
              </li>
              <li
                className={
                  validation.upperCase ? 'text-seeds-green' : 'text-[#7C7C7C]'
                }
              >
                {t('danamart.register.capitalLetters')}
              </li>
            </ul>
          </div>
        </div>
        <Button
          onClick={handleNext}
          disabled={
            !passwordTemp ||
            passwordTemp.length === 0 ||
            !formDataNewPassword.password ||
            formDataNewPassword.password.length === 0 ||
            formDataNewPassword.password !== passwordTemp ||
            !validation?.length ||
            !validation?.lowerCase ||
            !validation?.upperCase ||
            !validation?.specialChar ||
            !validation?.numbers
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
