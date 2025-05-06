import countries from '@/constants/countries.json';
import { changePhoneNumber } from '@/repository/danamart/setting.repository';
import { type UserProfile } from '@/utils/interfaces/danamart.interface';
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { toast } from 'react-toastify';
import ModalOTP from './ModalOTP';

interface Country {
  name: string;
  flag: string;
  code: string;
  dialCode: string;
}

interface Props {
  userProfileData: UserProfile;
}

const ChangePhoneNumber: React.FC<Props> = ({ userProfileData }) => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.setting.changePhoneNumber';

  const [selectedCountry, setSelectedCountry] = useState<Country>(
    countries[101]
  );
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [combinedPhone, setCombinedPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);

  const [otpType, setOtpType] = useState<string>('');
  const [confirmOtpTypeError, setConfirmOtpTypeError] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowOTP, setIsShowOTP] = useState<boolean>(false);
  const [isContinueProcess, setIsContinueProcess] = useState<boolean>(false);
  const [isAllowedOTP, setIsAllowedOTP] = useState<boolean>(false);
  const [passedOTP, setPassedOTP] = useState<string>('');

  const handlePhoneChange = (value: string): void => {
    const cleaned = value.startsWith('0') ? value.slice(1) : value;
    setPhoneNumber(cleaned);
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  const handleChangePhoneNumber = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('nohp', combinedPhone);
      formData.append('password', password);
      const response = await changePhoneNumber(otpType, formData);

      if (
        response?.data?.message ===
        'Kode verifikasi Berhasil Dikirim. Silahkan Cek Handphone Anda!'
      ) {
        toast.success(t(`${pathTranslation}.validation.text1`));
        setIsAllowedOTP(true);
        setIsLoading(false);
      }
    } catch (error: any) {
      if (error?.response?.data?.message === 'too many hits') {
        toast.error(t(`${pathTranslation}.validation.text2`));
      } else if (
        error?.response?.data?.messages?.message ===
        'Password salah, silakan coba kembali.'
      ) {
        toast.error(t(`${pathTranslation}.validation.text3`));
      } else if (
        error?.response?.data?.messages?.message ===
        'Nomor Handphone anda masih dalam proses pengajuan tunggu data selesai di konfirmasi oleh verifikator!'
      ) {
        toast.warning(t(`${pathTranslation}.validation.text4`));
      } else {
        toast.error(`Error getting OTP: ${error as string}`);
      }
      setIsContinueProcess(false);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
      setIsContinueProcess(false);
    }
  };

  useEffect(() => {
    const dialCodeWithoutPlus = selectedCountry?.dialCode.replace('+', '');
    setCombinedPhone(`${dialCodeWithoutPlus}${phoneNumber}`);
  }, [selectedCountry, phoneNumber]);

  useEffect(() => {
    if (isContinueProcess) {
      void handleChangePhoneNumber();
    }
  }, [isContinueProcess]);

  return (
    <div className="flex flex-col gap-4 mt-6 mb:mt-8 mb-2">
      <Typography className="font-poppins md:text-xl text-lg font-semibold text-[#262626] mb-4">
        {t(`${pathTranslation}.text1`)}
      </Typography>

      {userProfileData?.User?.nohp !== '' &&
      userProfileData?.User?.nohp !== null ? (
        <div className="flex flex-col gap-2">
          <Typography className="font-poppins text-md text-[#262626]">
            {t(`${pathTranslation}.text2`)}{' '}
            <span className="font-bold">
              {userProfileData?.User?.nohp ?? ''}
            </span>
          </Typography>
          <hr className="mt-2" />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <Typography className="font-poppins text-md text-[#262626] italic">
            {t(`${pathTranslation}.text3`)}
          </Typography>
          <hr className="mt-2" />
        </div>
      )}

      <div className="w-full md:w-1/2">
        <Typography className="block mb-1 text-md font-medium font-poppins text-gray-700">
          {t(`${pathTranslation}.text4`)}
        </Typography>

        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
          <Menu placement="bottom-start">
            <MenuHandler>
              <button className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 transition-all">
                <img
                  src={`https://flagcdn.com/${selectedCountry.code.toLowerCase()}.svg`}
                  alt={selectedCountry.name}
                  className="h-5 w-5 object-cover"
                />
                <span className="text-sm font-poppins">
                  {selectedCountry.dialCode}
                </span>
              </button>
            </MenuHandler>
            <MenuList className="max-h-[20rem] max-w-[18rem] overflow-auto">
              {countries
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(country => (
                  <MenuItem
                    key={country.code}
                    className="flex items-center gap-2 font-poppins"
                    onClick={() => {
                      setSelectedCountry(country);
                    }}
                  >
                    <img
                      src={`https://flagcdn.com/${country.code.toLowerCase()}.svg`}
                      alt={country.name}
                      className="h-5 w-5 object-cover"
                    />
                    <span>{country.name}</span>
                    <span className="ml-auto text-gray-500">
                      {country.dialCode}
                    </span>
                  </MenuItem>
                ))}
            </MenuList>
          </Menu>

          {/* Phone Input */}
          <input
            type="number"
            inputMode="numeric"
            placeholder={`${t(`${pathTranslation}.text5`)}`}
            value={phoneNumber}
            onChange={e => {
              handlePhoneChange(e.target.value);
            }}
            className="flex-1 px-4 py-2 outline-none font-poppins text-sm appearance-none [-moz-appearance:textfield]"
          />
        </div>
      </div>

      <div className="w-full md:w-1/2">
        <div className="relative w-full">
          <Typography className="block mb-1 text-md font-medium font-poppins text-gray-700">
            {t(`${pathTranslation}.text6`)}
          </Typography>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => {
              setPassword(e.target.value);
              setConfirmPasswordError(null);
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={`${t(`${pathTranslation}.text7`)}`}
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

      <div className="flex flex-col md:flex-row gap-2 md:gap-4">
        <div className="relative w-full md:w-1/2 md:pr-2">
          <label className="block text-md font-medium text-gray-700 mb-1 font-poppins">
            {t(`${pathTranslation}.text8`)}
          </label>
          <select
            value={otpType}
            onChange={e => {
              setOtpType(e.target.value);
              setConfirmOtpTypeError(null);
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              {t(`${pathTranslation}.text9`)}
            </option>
            <option value="wa">WhatsApp</option>
            <option value="sms">SMS</option>
          </select>
          {confirmOtpTypeError !== null && (
            <p className="text-sm text-red-500 mt-1 font-poppins">
              {confirmOtpTypeError}
            </p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="w-full mt-2 flex justify-center md:justify-start mb-16 md:mb-0">
        <Button
          onClick={async () => {
            setIsShowOTP(true);
          }}
          disabled={phoneNumber === '' || password === '' || otpType === ''}
          className="rounded-full w-full md:w-fit md:px-16 px-5 py-3 capitalize font-medium text-md disabled:bg-[#BDBDBD] disabled:text-[#7C7C7C] bg-[#3AC4A0] text-white font-poppins"
        >
          {t(`${pathTranslation}.text10`)}
        </Button>
      </div>

      {isShowOTP && (
        <ModalOTP
          setIsShowOTP={setIsShowOTP}
          isShowOTP={isShowOTP}
          setIsContinueProcess={setIsContinueProcess}
          setPassedOTP={setPassedOTP}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          isAllowedOTP={isAllowedOTP}
          passedOTP={passedOTP}
          setIsAllowedOTP={setIsAllowedOTP}
          combinedPhone={combinedPhone}
          setPhoneNumber={setPhoneNumber}
          setPassword={setPassword}
          setOtpType={setOtpType}
        />
      )}
    </div>
  );
};

export default ChangePhoneNumber;
