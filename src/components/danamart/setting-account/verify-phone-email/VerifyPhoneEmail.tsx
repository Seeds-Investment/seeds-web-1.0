import {
  getEmailVerification,
  postPhoneVerificationOTP
} from '@/repository/danamart/setting.repository';
import { type UserProfile } from '@/utils/interfaces/danamart.interface';
import { Button, Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiPhone } from 'react-icons/fi';
import { MdOutlineEmail, MdOutlineVerified } from 'react-icons/md';
import { toast } from 'react-toastify';
import ModalOTP from './ModalOTP';

interface Props {
  userProfileData: UserProfile;
  setRefetchProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

const VerifyPhoneEmail: React.FC<Props> = ({
  userProfileData,
  setRefetchProfile
}) => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.setting.verifyPhoneAndEmail';
  const [selected, setSelected] = useState<string>('');
  const [isShowOTP, setIsShowOTP] = useState<boolean>(false);
  const [isContinueProcess, setIsContinueProcess] = useState<boolean>(false);
  const [passedOTP, setPassedOTP] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSelected(event.target.value);
  };

  const isEmailVerified = userProfileData?.detailUser[0]?.status_email === '1';
  const isPhoneVerified = userProfileData?.detailUser[0]?.status_hp === '1';
  const isAllVerified = isEmailVerified && isPhoneVerified;

  const handlePostOTP = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('otp', passedOTP);
      const response = await postPhoneVerificationOTP(formData);
      if (response?.data?.StatusCode === '200') {
        toast.success(t(`${pathTranslation}.text1`));
      }
      setRefetchProfile(true);
    } catch (error: any) {
      setIsLoading(false);
      toast.error(`Error validating phone number: ${error as string}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationEmail = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await getEmailVerification();

      if (response?.status === 200) {
        toast.success(t(`${pathTranslation}.text2`));
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(`Error validating email: ${error as string}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isContinueProcess) {
      void handlePostOTP();
    }
  }, [isContinueProcess]);

  return (
    <div className="flex flex-col gap-4 mb:mt-8 mb-2">
      <Typography className="font-poppins md:text-xl text-lg font-semibold text-[#262626] mb-4">
        {t(`${pathTranslation}.text3`)}
      </Typography>

      <div className="flex flex-col gap-6 lg:flex-row md:justify-around">
        {/* Email Option */}
        {isEmailVerified ? (
          <div className="flex gap-6 p-6 rounded-xl border-2 border-gray-300 items-center bg-gray-50 w-full lg:w-[48%] overflow-hidden">
            <div className="flex items-center justify-center w-[60px] h-[60px] rounded-full bg-gray-100">
              <MdOutlineEmail className="text-[#3AC4A0] w-8 h-8 shrink-0" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Typography className="font-poppins font-medium text-[#262626]">
                  {t(`${pathTranslation}.text4`)}
                </Typography>
                <div className="flex items-center gap-1 bg-gray-200 px-2 py-0.5 rounded-full text-xs text-[#262626] font-semibold">
                  <MdOutlineVerified className="text-[#262626]" />
                  {t(`${pathTranslation}.text5`)}
                </div>
              </div>
              <Typography className="font-poppins text-md text-[#262626]">
                {userProfileData?.detailUser[0]?.email ?? ''}
              </Typography>
            </div>
          </div>
        ) : (
          <label
            className={`flex gap-6 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 items-center w-full lg:w-[48%] overflow-hidden ${
              selected === 'option1' ? 'border-[#3AC4A0]' : 'border-gray-200'
            }`}
          >
            <input
              type="radio"
              name="choice"
              value="option1"
              checked={selected === 'option1'}
              onChange={handleChange}
              className="accent-[#3AC4A0] w-5 h-5 mt-1"
            />
            <MdOutlineEmail
              className={`w-[30px] h-auto shrink-0 ${
                selected === 'option1'
                  ? 'text-seeds-button-green'
                  : 'text-[#262626]'
              }`}
            />
            <div className="flex flex-col gap-2">
              <Typography
                className={`font-poppins text-md font-medium ${
                  selected === 'option1'
                    ? 'text-seeds-button-green'
                    : 'text-[#262626]'
                }`}
              >
                {t(`${pathTranslation}.text4`)}
              </Typography>
              <Typography
                className={`font-poppins text-md ${
                  selected === 'option1'
                    ? 'text-seeds-button-green'
                    : 'text-[#262626]'
                }`}
              >
                {t(`${pathTranslation}.text6`)}{' '}
                <span className="font-bold">
                  {userProfileData?.detailUser[0]?.email ?? ''}
                </span>
              </Typography>
            </div>
          </label>
        )}

        {/* Phone Option */}
        {isPhoneVerified ? (
          <div className="flex gap-6 p-6 rounded-xl border-2 border-gray-300 items-center bg-gray-50 w-full lg:w-[48%] overflow-hidden">
            <div className="flex items-center justify-center w-[60px] h-[60px] rounded-full bg-gray-100">
              <FiPhone className="text-[#3AC4A0] w-8 h-8 shrink-0" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Typography className="font-poppins font-medium text-[#262626]">
                  {t(`${pathTranslation}.text7`)}
                </Typography>
                <div className="flex items-center gap-1 bg-gray-200 px-2 py-0.5 rounded-full text-xs text-[#262626] font-semibold">
                  <MdOutlineVerified className="text-[#262626]" />
                  {t(`${pathTranslation}.text5`)}
                </div>
              </div>
              <Typography className="font-poppins text-md text-[#262626]">
                {userProfileData?.User?.nohp ?? ''}
              </Typography>
            </div>
          </div>
        ) : (
          <label
            className={`flex gap-6 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 items-center w-full lg:w-[48%] overflow-hidden ${
              selected === 'option2' ? 'border-[#3AC4A0]' : 'border-gray-200'
            }`}
          >
            <input
              type="radio"
              name="choice"
              value="option2"
              checked={selected === 'option2'}
              onChange={handleChange}
              className="accent-[#3AC4A0] w-5 h-5 mt-1"
            />
            <FiPhone
              className={`w-[30px] h-auto shrink-0 ${
                selected === 'option2'
                  ? 'text-seeds-button-green'
                  : 'text-[#262626]'
              }`}
            />
            <div className="flex flex-col gap-2">
              <Typography
                className={`font-poppins text-md font-medium ${
                  selected === 'option2'
                    ? 'text-seeds-button-green'
                    : 'text-[#262626]'
                }`}
              >
                {t(`${pathTranslation}.text7`)}
              </Typography>
              <Typography
                className={`font-poppins text-md ${
                  selected === 'option2'
                    ? 'text-seeds-button-green'
                    : 'text-[#262626]'
                }`}
              >
                {t(`${pathTranslation}.text8`)}{' '}
                <span className="font-bold">
                  {userProfileData?.User?.nohp ?? ''}
                </span>
              </Typography>
            </div>
          </label>
        )}
      </div>

      {/* Continue Button */}
      <div className="w-full mt-6 flex justify-center md:justify-start">
        <Button
          onClick={async () => {
            if (selected === 'option1') {
              await handleVerificationEmail();
            } else if (selected === 'option2') {
              setIsShowOTP(true);
            }
          }}
          disabled={isAllVerified || selected === '' || isLoading}
          className="rounded-full w-full md:w-fit md:px-16 px-5 py-3 capitalize font-medium text-md disabled:bg-[#BDBDBD] disabled:text-[#7C7C7C] bg-[#3AC4A0] text-white font-poppins"
        >
          {t(`${pathTranslation}.text9`)}
        </Button>
      </div>

      {isShowOTP && (
        <ModalOTP
          setIsShowOTP={setIsShowOTP}
          isShowOTP={isShowOTP}
          setIsContinueProcess={setIsContinueProcess}
          setPassedOTP={setPassedOTP}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default VerifyPhoneEmail;
