import {
  changeBankAccount,
  getBankList
} from '@/repository/danamart/setting.repository';
import { type BankList } from '@/utils/interfaces/danamart/setting.interface';
import { Button, Typography } from '@material-tailwind/react';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { toast } from 'react-toastify';
import ModalOTP from './ModalOTP';
import ModalSuccessValidating from './ModalSuccessValidating';

const ChangeBankAccount: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const pathTranslation = 'danamart.setting.changeBankAccount';

  const [newBankAccountName, setNewBankAccountName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [bankNumber, setBankNumber] = useState<number | ''>('');

  const [confirmNewBankAccountNameError, setConfirmNewBankAccountNameError] =
    useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);
  const [confirmOtpTypeError, setConfirmOtpTypeError] = useState<string | null>(
    null
  );
  const [confirmBankNumberError, setConfirmBankNumberError] = useState<
    string | null
  >(null);

  const [isShowOTP, setIsShowOTP] = useState<boolean>(false);
  const [isShowSuccessValidate, setIsShowSuccessValidate] =
    useState<boolean>(false);
  const [passedOTP, setPassedOTP] = useState<string>('');
  const [isContinueProcess, setIsContinueProcess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [bankList, setBankList] = useState<BankList>();
  const [selectedBankCode, setSelectedBankCode] = useState<string>('');
  const [selectedBankName, setSelectedBankName] = useState<string>('');
  const [selectedBankCombined, setSelectedBankCombined] = useState<string>('');
  const [otpType, setOtpType] = useState<string>('');
  const [isAllowedOTP, setIsAllowedOTP] = useState<boolean>(false);

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filtered list based on search
  const filteredBanks =
    bankList?.bList?.filter(bank =>
      bank?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    ) ?? [];

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        dropdownRef?.current !== null &&
        !dropdownRef?.current?.contains(event?.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchBankList = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await getBankList();

      if (response?.status === 200) {
        setBankList(response?.data);
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(`Error validating email: ${error as string}`);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  const handleChangeBankAccount = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('dm_penmit_07001', newBankAccountName);
      formData.append('dm_penmit_07002', `${bankNumber}`);
      formData.append('dm_penmit_07003', selectedBankCombined);
      formData.append('metodeVerifikasi', otpType);
      formData.append('password', password);
      const response = await changeBankAccount(formData);

      if (response === 'Access token Danamart not found') {
        toast.error(t(`${pathTranslation}.validation.text10`));
        setIsShowOTP(false);
        localStorage.removeItem('accessToken-danamart');
        await router.push('/danamart');
      }

      if (
        response?.data?.message ===
        'Terima kasih atas kesabarannya. Kami ingin memberitahukan bahwa masih terdapat permintaan perubahan data yang masih dalam proses. Mohon tunggu sampai proses ini selesai dan Anda dapat mengajukannya kembali.'
      ) {
        toast.warning(t(`${pathTranslation}.validation.text1`));
        setIsShowOTP(false);
      } else if (
        response?.data?.status === 'Sukses' &&
        response?.data?.statusCode === '200'
      ) {
        toast.success(t(`${pathTranslation}.validation.text2`));
        setIsAllowedOTP(true);
      } else if (
        response?.data?.message === 'No rekening salah atau tidak valid.'
      ) {
        setConfirmBankNumberError(t(`${pathTranslation}.validation.text5`));
        setIsShowOTP(false);
      } else if (
        response?.data?.message === 'Nama pemilik rekening tidak sesuai.'
      ) {
        setConfirmNewBankAccountNameError(
          t(`${pathTranslation}.validation.text6`)
        );
        setIsShowOTP(false);
      } else if (
        response?.data?.message === 'Password salah, silakan coba kembali.'
      ) {
        setConfirmPasswordError(t(`${pathTranslation}.validation.text7`));
        setIsShowOTP(false);
      }
    } catch (error: any) {
      if (error?.response?.data?.message === 'too many hits') {
        toast.error(t(`${pathTranslation}.validation.text8`));
      } else if (error?.response?.data === 'Too many Hits') {
        toast.error(t(`${pathTranslation}.validation.text8`));
      } else if (
        error?.response?.data?.messages?.message ===
        'Silahkan Pilih metode pengiriman Kode Verifikasi.'
      ) {
        setConfirmOtpTypeError(t(`${pathTranslation}.validation.text9`));
      } else if (
        error?.response?.data?.messages?.metodeVerifikasi ===
        'Silahkan Pilih Metode Verifikasi'
      ) {
        setConfirmOtpTypeError(t(`${pathTranslation}.validation.text9`));
      }
      setIsShowOTP(false);
      setIsContinueProcess(false);
      setIsLoading(false);
    } finally {
      setIsContinueProcess(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void Promise.all([fetchBankList()]);
  }, []);

  useEffect(() => {
    if (isContinueProcess) {
      void handleChangeBankAccount();
    }
  }, [isContinueProcess]);

  useEffect(() => {
    if (isShowSuccessValidate) {
      setNewBankAccountName('');
      setPassword('');
      setSelectedBankCode('');
      setBankNumber('');
    }
  }, [isShowSuccessValidate]);

  return (
    <div className="flex flex-col gap-4 mb:mt-8 mb-2">
      <Typography className="font-poppins md:text-xl text-lg font-semibold text-[#262626]">
        {t(`${pathTranslation}.text1`)}
      </Typography>

      {bankList?.dataRek !== '' ? (
        <div className="flex flex-col gap-2">
          <Typography className="font-poppins text-md text-seeds-button-green font-semibold">
            {bankList?.dataRek?.dm_penmit_07003 ?? ''}
          </Typography>
          <Typography className="font-poppins text-md text-[#262626] font-semibold">
            {bankList?.dataRek?.dm_penmit_07002 ?? ''}
          </Typography>
          <Typography className="font-poppins text-md text-[#262626] font-semibold">
            {bankList?.dataRek?.dm_penmit_07001 ?? ''}
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

      <Typography className="font-poppins md:text-xl text-lg font-semibold text-[#262626]">
        {t(`${pathTranslation}.text2`)}
      </Typography>

      <div className="flex flex-col md:flex-row gap-2 md:gap-4">
        <div className="relative w-full" ref={dropdownRef}>
          <label className="block text-md font-medium text-gray-700 mb-1 font-poppins">
            {t(`${pathTranslation}.text4`)}
          </label>

          <button
            type="button"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {selectedBankCode?.length > 0
              ? bankList?.bList?.find(bank => bank?.code === selectedBankCode)
                  ?.name
              : `${t(`${pathTranslation}.text5`)}`}
          </button>

          {isOpen && (
            <div className="absolute z-50 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto shadow-lg">
              <input
                type="text"
                className="w-full px-3 py-2 border-b border-gray-200 focus:outline-none"
                placeholder={`${t(`${pathTranslation}.text6`)}`}
                value={searchTerm}
                onChange={e => {
                  setSearchTerm(e.target.value);
                }}
              />
              {filteredBanks?.map(bank => (
                <div
                  key={bank?.code}
                  className={`px-4 py-2 hover:bg-blue-100 cursor-pointer ${
                    bank?.code === selectedBankCode
                      ? 'bg-blue-50 font-semibold'
                      : ''
                  }`}
                  onClick={() => {
                    setSelectedBankCode(bank?.code);
                    setSelectedBankName(bank?.name);
                    setSelectedBankCombined(`${bank?.name}#${bank?.code}`);
                    setIsOpen(false);
                  }}
                >
                  {bank.name}
                </div>
              ))}
              {filteredBanks.length === 0 && (
                <div className="px-4 py-2 text-gray-500">
                  {t(`${pathTranslation}.text7`)}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="relative w-full">
          <label className="block text-md font-medium text-gray-700 mb-1 font-poppins">
            {t(`${pathTranslation}.text8`)}
          </label>
          <input
            type="number"
            value={bankNumber}
            onChange={e => {
              const value = e.target.value;
              setBankNumber(value === '' ? '' : Number(value));
              setConfirmBankNumberError(null);
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={`${t(`${pathTranslation}.text9`)}`}
          />
          {confirmBankNumberError !== null && (
            <p className="text-sm text-red-500 mt-1 font-poppins">
              {confirmBankNumberError}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-2 md:gap-4">
        <div className="relative w-full">
          <label className="block text-md font-medium text-gray-700 mb-1 font-poppins">
            {t(`${pathTranslation}.text10`)}
          </label>
          <input
            type="text"
            value={newBankAccountName}
            onChange={e => {
              setNewBankAccountName(e.target.value);
              setConfirmNewBankAccountNameError(null);
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={`${t(`${pathTranslation}.text11`)}`}
          />
          {confirmNewBankAccountNameError !== null && (
            <p className="text-sm text-red-500 mt-1 font-poppins">
              {confirmNewBankAccountNameError}
            </p>
          )}
        </div>

        <div className="relative w-full">
          <label className="block text-md font-medium text-gray-700 mb-1 font-poppins">
            {t(`${pathTranslation}.text12`)}
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => {
              setPassword(e.target.value);
              setConfirmPasswordError(null);
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={`${t(`${pathTranslation}.text13`)}`}
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
            {t(`${pathTranslation}.text14`)}
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
              {t(`${pathTranslation}.text15`)}
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
          disabled={
            selectedBankCode === '' ||
            bankNumber === '' ||
            newBankAccountName === '' ||
            password === '' ||
            otpType === '' ||
            bankList?.dataRek === ''
          }
          className="rounded-full w-full md:w-fit md:px-16 px-5 py-3 capitalize font-medium text-md disabled:bg-[#BDBDBD] disabled:text-[#7C7C7C] bg-[#3AC4A0] text-white font-poppins"
        >
          {t(`${pathTranslation}.text16`)}
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
          newBankAccountName={newBankAccountName}
          bankNumber={`${bankNumber}`}
          selectedBankName={selectedBankName}
          selectedBankCode={selectedBankCode}
          setIsShowSuccessValidate={setIsShowSuccessValidate}
          setIsAllowedOTP={setIsAllowedOTP}
        />
      )}

      {isShowSuccessValidate && (
        <ModalSuccessValidating
          setIsShowSuccessValidate={setIsShowSuccessValidate}
        />
      )}
    </div>
  );
};

export default ChangeBankAccount;
