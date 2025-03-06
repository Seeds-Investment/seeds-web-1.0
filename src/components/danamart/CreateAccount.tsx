import CreatePassword from '@/assets/danamart/create-password-seedy.svg';
import Eye from '@/assets/my-profile/editProfile/Eye.svg';
import EyeSlash from '@/assets/my-profile/editProfile/EyeSlash.svg';
import { decryptResponse } from '@/helpers/cryptoDecrypt';
import { register } from '@/repository/danamart/auth.repository';
import { registerLog } from '@/repository/danamart/danamart.repository';
import {
  type RegisterRes,
  type RegistrationForm
} from '@/utils/interfaces/danamart.interface';
import { type UserInfo } from '@/utils/interfaces/user.interface';
import { Button, Input, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { type useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { toast } from 'react-toastify';

interface Props {
  userInfo: UserInfo;
  router: ReturnType<typeof useRouter>;
  t: (key: string) => string;
  setConfirmRegistration: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLinkedSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenModalLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateAccount: React.FC<Props> = ({
  userInfo,
  router,
  t,
  setConfirmRegistration,
  setIsLinkedSuccess,
  setIsOpenModalLogin
}) => {
  const [regisForm, setRegisForm] = useState<RegistrationForm>({
    namaDepan: '',
    namaBlkng: '',
    email: '',
    tipePemodal: 'individu',
    nohp: '',
    password: '',
    repassword: '',
    kode_referral: '',
    notifikasi: '1'
  });
  const [passwordValidation, setPasswordValidation] = useState({
    numbers: false,
    lowerCase: false,
    specialChar: false,
    characters: false,
    upperCase: false
  });
  const [error, setError] = useState({
    errorPassword: false,
    errorRePassword: false
  });
  const [seePassword, setSeePassword] = useState({
    password: false,
    repassword: false
  });

  const [registerRes, setRegisterRes] = useState<RegisterRes>();

  useEffect(() => {
    if (userInfo !== undefined) {
      const [namaDepan, ...restNamaBlkng] = userInfo.name.split(' ');
      setRegisForm(prevForm => ({
        ...prevForm,
        namaDepan,
        namaBlkng: restNamaBlkng.join(' '),
        email: userInfo.email,
        nohp: userInfo.phoneNumber
      }));
    }
  }, [userInfo]);

  const validatePassword = (
    password: string
  ): {
    numbers: boolean;
    lowerCase: boolean;
    specialChar: boolean;
    characters: boolean;
    upperCase: boolean;
  } => {
    return {
      numbers: /\d/.test(password),
      lowerCase: /[a-z]/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>/\\[\]';`~_=+-]/.test(password),
      characters: password.length >= 8,
      upperCase: /[A-Z]/.test(password)
    };
  };

  const handleInputChange = (
    field: keyof RegistrationForm,
    value: string
  ): void => {
    setRegisForm(prevForm => ({ ...prevForm, [field]: value }));
    if (field === 'password') {
      setError({ ...error, errorRePassword: false });
      setPasswordValidation(validatePassword(value));
    } else if (field === 'repassword') {
      setError({ ...error, errorRePassword: false });
      const isValidRePassword =
        value.length >= 8 && value !== regisForm.password;
      setError(prevError => ({
        ...prevError,
        errorRePassword: isValidRePassword
      }));
    }
  };

  const togglePasswordVisibility = (field: keyof typeof seePassword): void => {
    setSeePassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleCreateAccount = async (): Promise<void> => {
    try {
      const response = await register(regisForm);
      if (response?.status === 200) {
        const decryptedData = JSON.parse(
          decryptResponse(response.data) !== null
            ? decryptResponse(response.data)
            : response
        );
        setRegisterRes(decryptedData);
      }
    } catch (error: any) {
      toast.error('Error creating account');
    }
  };

  const createRegisterLog = async (): Promise<void> => {
    try {
      const response = await registerLog({
        email: regisForm.email,
        phone_number: regisForm.nohp,
        type: 'individu'
      });
      toast.success(`Register ${response?.message as string}`);
      if (response?.message === 'Log created successfully') {
        setConfirmRegistration(false)
        setIsOpenModalLogin(true)
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (registerRes !== undefined) {
      void createRegisterLog();
    }
  }, [registerRes]);

  const isPasswordValid = Object.values(passwordValidation).every(Boolean);

  return (
    <div className="flex flex-col items-center gap-5 md:p-8 py-5 px-4 relative">
      <div
        onClick={() => {
          setConfirmRegistration(false);
          setIsLinkedSuccess(false);
        }}
        className="absolute top-9 right-5 cursor-pointer hover:scale-110 duration-150"
      >
        <IoMdClose size={20} />
      </div>
      <div className="w-full flex items-center justify-center">
        <Typography className="md:w-full w-[80%] text-center font-poppins font-semibold text-xl text-[#262626]">
          {t('danamart.register.createPasswordTitle')}
        </Typography>
      </div>
      <Image
        src={CreatePassword}
        alt="Create Password Seedy"
        width={170}
        height={170}
      />
      <div className="w-full flex flex-col">
        {['password', 'repassword'].map(field => (
          <PasswordInput
            extraClasses={`${field === 'password' ? 'mb-5' : 'mb-2'}`}
            key={field}
            label={t(
              `danamart.register.${
                field === 'password' ? 'createPassword' : 'confirmPassword'
              }`
            )}
            placeholder={t(
              `danamart.register.please${
                field === 'password' ? 'CreatePassword' : 'ConfirmPassword'
              }`
            )}
            showPassword={seePassword[field as keyof typeof seePassword]}
            error={
              field === 'repassword'
                ? error.errorRePassword
                : error.errorPassword
            }
            onToggle={() => {
              togglePasswordVisibility(field as keyof typeof seePassword);
            }}
            onChange={value => {
              handleInputChange(field as keyof RegistrationForm, value);
            }}
            value={regisForm[field as keyof RegistrationForm]}
            disabled={field === 'repassword' && regisForm.password.length < 8}
          />
        ))}
        {error.errorRePassword && (
          <Typography className="font-poppins font-semibold text-xs text-[#B81516]">
            {t('danamart.register.passNotMatch')}
          </Typography>
        )}
      </div>
      <PasswordChecklist validation={passwordValidation} t={t} />
      <Button
        disabled={
          regisForm.password !== regisForm.repassword ||
          regisForm.password === '' ||
          !isPasswordValid
        }
        onClick={handleCreateAccount}
        className="bg-seeds-button-green text-white rounded-full w-full h-[52px] font-semibold font-poppins capitalize text-base"
      >
        {t('danamart.register.createAccount')}
      </Button>
    </div>
  );
};

const PasswordInput: React.FC<{
  label: string;
  placeholder: string;
  value: string;
  error: boolean;
  disabled?: boolean;
  extraClasses?: string;
  showPassword: boolean;
  onToggle: () => void;
  onChange: (value: string) => void;
}> = ({
  label,
  placeholder,
  value,
  error,
  disabled = false,
  extraClasses,
  showPassword,
  onToggle,
  onChange
}) => (
  <div
    className={`rounded-xl p-[2px] w-full h-full ${extraClasses ?? ''} ${
      error ? 'bg-[#FF3838]' : 'bg-gradient-to-l from-[#97A4E7] to-[#47C0AA]'
    }`}
  >
    <div className="relative flex justify-center items-center bg-white border-none w-full rounded-[10px] h-full">
      <Input
        variant="static"
        required
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        onChange={e => {
          onChange(e.target.value);
        }}
        disabled={disabled}
        label={label}
        labelProps={{
          className:
            '!bg-white !w-fit !h-fit !px-1 !ms-3 after:!border-none !font-semibold !font-poppins !text-base !text-[#262626] !leading-[10px]'
        }}
        className="!border-none focus:!border-none !p-1.5 !ps-4 !font-poppins !font-normal !text-base !text-[#262626] !rounded-[10px]"
      />
      <Image
        src={showPassword ? Eye : EyeSlash}
        alt="Toggle Password Visibility"
        className="absolute right-3 cursor-pointer"
        onClick={onToggle}
      />
    </div>
  </div>
);

const PasswordChecklist: React.FC<{
  validation: {
    numbers: boolean;
    lowerCase: boolean;
    specialChar: boolean;
    characters: boolean;
    upperCase: boolean;
  };
  t: (key: string) => string;
}> = ({ validation, t }) => (
  <div className="flex flex-col justify-start gap-2 w-full">
    <Typography className="font-poppins font-semibold text-sm text-seeds-green">
      {t('danamart.register.passwordContain')}
    </Typography>
    <div className="flex gap-2">
      <ul className="font-poppins font-normal text-sm">
        <li
          className={validation.numbers ? 'text-seeds-green' : 'text-[#7C7C7C]'}
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
            validation.characters ? 'text-seeds-green' : 'text-[#7C7C7C]'
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
);

export default CreateAccount;
