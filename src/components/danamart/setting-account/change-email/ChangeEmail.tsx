import { decryptResponse } from '@/helpers/cryptoDecrypt';
import { changeEmail } from '@/repository/danamart/setting.repository';
import { type UserProfile } from '@/utils/interfaces/danamart.interface';
import { Button, Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { toast } from 'react-toastify';
import ModalConfirm from './ModalConfirm';

interface Props {
  userProfileData: UserProfile;
}

const ChangeEmail: React.FC<Props> = ({ userProfileData }) => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.setting.changeEmail';

  const [newEmail, setNewEmail] = useState<string>('');
  const [newEmailError, setNewEmailError] = useState<string | null>(null);
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);
  const [isShowConfirm, setIsShowConfirm] = useState<boolean>(false);
  const [isContinueProcess, setIsContinueProcess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setNewEmail(value);
    setNewEmailError(null);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleValidateEmail = (): void => {
    if (newEmail?.length > 0 && !validateEmail(newEmail)) {
      setNewEmailError(t(`${pathTranslation}.text5`));
    } else {
      setNewEmailError(null);
      setIsShowConfirm(true);
    }
  };

  const handleChangeEmail = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('email', newEmail);
      formData.append('password', password);
      const response = await changeEmail(formData);

      if (response?.status === 200) {
        const encryptedData = response?.data;
        const decryptedData = decryptResponse(encryptedData);

        if (decryptedData !== null) {
          const decryptedDataObject = JSON.parse(decryptedData);

          if (
            decryptedDataObject?.message ===
            'Silakan cek email Kamu untuk verifikasi perubahan email.'
          ) {
            toast.success(t(`${pathTranslation}.text8`));
          }
        }
      }

      setTimeout(() => {
        void (async () => {
          setIsShowConfirm(false);
        })();
      }, 2000);

      setNewEmail('');
      setPassword('');
    } catch (error: any) {
      if (
        error?.response?.data?.messages?.error ===
        'Password salah, silakan coba kembali.'
      ) {
        setConfirmPasswordError(t(`${pathTranslation}.text6`));
      } else if (
        error?.response?.data?.messages?.email ===
        'Alamat Email sudah digunakan!, Silahkan Ganti Email yang lain'
      ) {
        setNewEmailError(t(`${pathTranslation}.text7`));
      } else {
        setConfirmPasswordError(`Error changing password: ${error as string}`);
      }
      setIsShowConfirm(false);
      setIsContinueProcess(false);
    } finally {
      setIsLoading(false);
      setIsContinueProcess(false);
    }
  };

  useEffect(() => {
    if (isContinueProcess) {
      void handleChangeEmail();
    }
  }, [isContinueProcess]);

  return (
    <div className="flex flex-col gap-4 mt-6 mb:mt-8 mb-2">
      <Typography className="font-poppins md:text-xl text-lg font-semibold text-[#262626]">
        {t(`${pathTranslation}.text1`)}
      </Typography>

      <Typography className="font-poppins text-md text-[#262626]">
        {t(`${pathTranslation}.text2`)}{' '}
        <span className="font-semibold">
          {userProfileData?.User?.email ?? ''}
        </span>
      </Typography>

      <div className="flex flex-col md:flex-row gap-2 md:gap-4">
        <div className="relative w-full">
          <label className="block text-md font-medium text-gray-700 mb-1 font-poppins">
            {t(`${pathTranslation}.text3`)}
          </label>
          <input
            type="text"
            value={newEmail}
            onChange={handleEmailChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={`${t(`${pathTranslation}.text9`)}`}
          />
          {newEmailError !== null && (
            <p className="text-sm text-red-500 mt-1 font-poppins">
              {newEmailError}
            </p>
          )}
        </div>

        <div className="relative w-full">
          <label className="block text-md font-medium text-gray-700 mb-1 font-poppins">
            {t(`${pathTranslation}.text4`)}
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => {
              setPassword(e.target.value);
              setConfirmPasswordError(null);
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={`${t(`${pathTranslation}.text10`)}`}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute top-9 right-3 text-gray-500"
          >
            {showPassword ? (
              <FiEyeOff className="h-5 w-5" />
            ) : (
              <FiEye className="h-5 w-5" />
            )}
          </button>
          {confirmPasswordError !== null && (
            <p className="text-sm text-red-500 mt-1 font-poppins">
              {confirmPasswordError}
            </p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="w-full mt-2 flex justify-center md:justify-start mb-16 md:mb-0">
        <Button
          onClick={() => {
            handleValidateEmail();
          }}
          disabled={
            newEmailError !== null || password === '' || newEmail === ''
          }
          className="rounded-full w-full md:w-fit md:px-16 px-5 py-3 capitalize font-medium text-md disabled:bg-[#BDBDBD] disabled:text-[#7C7C7C] bg-[#3AC4A0] text-white font-poppins"
        >
          {t(`${pathTranslation}.text1`)}
        </Button>
      </div>

      {isShowConfirm && (
        <ModalConfirm
          setIsShowConfirm={setIsShowConfirm}
          isShowConfirm={isShowConfirm}
          newEmail={newEmail}
          setIsContinueProcess={setIsContinueProcess}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default ChangeEmail;
