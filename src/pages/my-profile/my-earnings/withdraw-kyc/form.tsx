'use client';

import IdentityCard from '@/assets/my-profile/earning/kyc-identity-card.svg';
import Selfie from '@/assets/my-profile/earning/kyc-selfie.svg';
import CameraSelfie from '@/components/profile/earning/CameraSelfie';
import countries from '@/constants/countries.json';
import withAuth from '@/helpers/withAuth';
import { kycSubmitData } from '@/repository/earning.repository';
import { type Country } from '@/utils/interfaces/guest.interface';
import { Button, Menu, MenuHandler, MenuItem, MenuList, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoMdClose } from 'react-icons/io';
import { toast } from 'react-toastify';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const WithdrawKYCForm = (): React.ReactElement => {
  const router = useRouter();
  const { t } = useTranslation();

  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [photoType, setPhotoType] = useState<'idCard' | 'selfie'>('idCard');

  const [isUsePhotoIdCard, setIsUsePhotoIdCard] = useState<boolean>(false);
  const [idCardImageData, setIdCardImageData] = useState<string>('');

  const [isUsePhotoSelfie, setIsUsePhotoSelfie] = useState<boolean>(false);
  const [selfieImageData, setSelfieImageData] = useState<string>('');
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [isShowEmailError, setIsShowEmailError] = useState<boolean>(true);
  const [isShowPhoneError, setIsShowPhoneError] = useState<boolean>(true);

  const [phone, setPhone] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    countries[101]
  );

  useEffect(() => {
    setIsShowEmailError(false);
    if (email === '') {
      setIsEmailValid(true);
      return;
    }
  
    const handler = setTimeout(() => {
      setIsEmailValid(emailRegex.test(email));
    }, 1000);
  
    return () => {
      clearTimeout(handler);
    };
  }, [email]);

  const handlePhoneChange = (value: string): void => {
    setIsShowPhoneError(false);
    const numericValue = value.replace(/\D/g, '');
  
    if (numericValue.startsWith('0')) {
      setPhone(numericValue.slice(1));
    } else {
      setPhone(numericValue);
    }
  };  

  const handleSubmit = async (): Promise<void> => {
    if (!isEmailValid || phone?.length < 7) {
      setIsShowEmailError(!isEmailValid);
      setIsShowPhoneError(phone?.length < 7);
    
      setTimeout(() => {
        setIsShowEmailError(false);
        setIsShowPhoneError(false);
      }, 5000);
    } else {
      const payload = {
        name,
        email,
        phone_number: `${selectedCountry?.dialCode}${phone}`,
        id_card_image: idCardImageData,
        user_image: selfieImageData,
      };
  
      try {
        setIsLoading(true);
        const response = await kycSubmitData(payload);
        if (response?.message === 'success') {
          toast.success(t('earning.withdrawKyc.text5'));
          setTimeout(() => {
            void router.push('/my-profile/my-earnings');
          }, 3000);
        }
      } catch (error: any) {
        if (error?.response?.data?.message === 'kyc already submitted') {
          toast.error(t('earning.withdrawKyc.text6'));
        } else {
          toast.error(t('earning.withdrawKyc.text7'));
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <div className={`w-full flex flex-col justify-center items-center overflow-hidden bg-white px-5 rounded-xl ${isCameraActive ? 'mb-16' : 'mb-0'}`}>
        {isCameraActive ? (
          <div className="w-full flex flex-col justify-center items-center py-5">
            <Typography className="font-poppins text-md font-medium text-[#262626] mt-2">
              {photoType === 'idCard' ? t('earning.withdrawKyc.text8') : t('earning.withdrawKyc.text9')}
            </Typography>
            <Typography className="font-poppins text-sm text-[#7C7C7C] mb-4">
              {photoType === 'idCard' ? t('earning.withdrawKyc.text10') : t('earning.withdrawKyc.text11')}
            </Typography>
            <CameraSelfie
              t={t}
              photoType={photoType}
              setIsCameraActive={setIsCameraActive}
              isUsePhoto={photoType === 'idCard' ? isUsePhotoIdCard : isUsePhotoSelfie}
              setIsUsePhoto={photoType === 'idCard' ? setIsUsePhotoIdCard : setIsUsePhotoSelfie}
              setImageData={photoType === 'idCard' ? setIdCardImageData : setSelfieImageData}
              height={photoType === 'idCard' ? 300 : 476}
              width={photoType === 'idCard' ? 476 : 476}
              useConfirm={true}
            />
          </div>
        ) : (
          <>
            <div className="w-full flex flex-col gap-4 py-5">
              {/* Name */}
              <div className="flex flex-col text-sm text-gray-700">
                <Typography className="font-poppins text-md font-medium text-[#262626]">
                  {t('earning.withdrawKyc.text12')} <span className="text-red-500">*</span>
                </Typography>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => { setName(e.target.value); }}
                  placeholder={`${t('earning.withdrawKyc.text20')}`}
                  className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-seeds-button-green"
                />
              </div>

              {/* Phone with country dropdown */}
              <div className="flex flex-col text-sm text-gray-700">
                <Typography className="font-poppins text-md font-medium text-[#262626]">
                  {t('earning.withdrawKyc.text13')} <span className="text-red-500">*</span>
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
                        <span className="text-sm font-poppins">{selectedCountry.dialCode}</span>
                      </button>
                    </MenuHandler>
                    <MenuList className="max-h-[20rem] max-w-[18rem] overflow-auto">
                      {countries.sort((a, b) => a.name.localeCompare(b.name)).map(country => (
                        <MenuItem
                          key={country.code}
                          className="flex items-center gap-2 font-poppins"
                          onClick={() => { setSelectedCountry(country); }}
                        >
                          <img
                            src={`https://flagcdn.com/${country.code.toLowerCase()}.svg`}
                            alt={country.name}
                            className="h-5 w-5 object-cover"
                          />
                          <span>{country.name}</span>
                          <span className="ml-auto text-gray-500">{country.dialCode}</span>
                        </MenuItem>
                      ))}
                    </MenuList>
                  </Menu>

                  <input
                    type="number"
                    inputMode="numeric"
                    placeholder={`${t('earning.withdrawKyc.text21')}`}
                    value={phone}
                    onChange={(e) => { handlePhoneChange(e.target.value); }}
                    className={`flex-1 px-4 py-2 outline-none font-poppins text-sm appearance-none [-moz-appearance:textfield] ${isShowPhoneError ? 'focus:ring-seeds-button-green' : 'border-red-500 focus:ring-red-500'}`}
                  />
                </div>
                {isShowPhoneError && (
                  <span className="text-xs text-red-500 mt-1">
                    {t('earning.withdrawKyc.text43')}
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col text-sm text-gray-700">
                <Typography className="font-poppins text-md font-medium text-[#262626]">
                  {t('earning.withdrawKyc.text14')} <span className="text-red-500">*</span>
                </Typography>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); }}
                  placeholder={`${t('earning.withdrawKyc.text22')}`}
                  className={`mt-1 p-2 border rounded-md focus:outline-none ${isShowEmailError ? 'border-red-500 focus:ring-red-500' : 'focus:ring-seeds-button-green'}`}
                />
                {isShowEmailError && (
                  <span className="text-xs text-red-500 mt-1">
                    {t('earning.withdrawKyc.text41')}
                  </span>
                )}
              </div>
            </div>

            {/* Identity Card */}
            <div className="w-full flex justify-center items-center gap-2">
              <div
                onClick={() => {
                  setIsCameraActive(true);
                  setPhotoType('idCard');
                  setIsUsePhotoIdCard(true);
                }}
                className="w-full border border-dashed py-2 px-4 rounded-lg border-[#E9E9E9] flex justify-between items-center mb-4 cursor-pointer hover:bg-[#F9F9F9] duration-300"
              >
                <div className="w-[80%] md:w-full">
                  <Typography className="font-poppins text-sm font-medium text-seeds-button-green">
                    {t('earning.withdrawKyc.text15')}
                  </Typography>
                  <Typography className="font-poppins text-sm text-[#7C7C7C]">
                    {t('earning.withdrawKyc.text16')}
                  </Typography>
                </div>
                <div className="flex justify-center items-center h-[60px] w-auto">
                  <Image
                    src={idCardImageData !== '' ? idCardImageData : IdentityCard}
                    alt="IdentityCard"
                    width={1000}
                    height={1000}
                    className={`w-auto h-full shrink-0 ${(idCardImageData?.length > 0) ? 'rounded-lg' : ''}`}
                  />
                </div>
              </div>
              {idCardImageData?.length > 0 && (
                <IoMdClose onClick={() => { setIdCardImageData(''); }} size={20} className="text-[#DA2D1F] mb-4 cursor-pointer" />
              )}
            </div>

            {/* Selfie with ID */}
            <div className="w-full flex justify-center items-center gap-2">
              <div
                onClick={() => {
                  setIsCameraActive(true);
                  setPhotoType('selfie');
                  setIsUsePhotoSelfie(true);
                }}
                className="w-full border border-dashed py-2 px-4 rounded-lg border-[#E9E9E9] flex justify-between items-center mb-4 cursor-pointer hover:bg-[#F9F9F9] duration-300"
              >
                <div className="w-[80%] md:w-full">
                  <Typography className="font-poppins text-sm font-medium text-seeds-button-green">
                    {t('earning.withdrawKyc.text17')}
                  </Typography>
                  <Typography className="font-poppins text-sm text-[#7C7C7C]">
                    {t('earning.withdrawKyc.text18')}
                  </Typography>
                </div>
                <div className="flex justify-center items-center h-[60px] w-auto">
                  <Image
                    src={selfieImageData !== '' ? selfieImageData : Selfie}
                    alt="Selfie"
                    width={1000}
                    height={1000}
                    className={`w-auto h-full shrink-0 ${selfieImageData?.length > 0 ? 'rounded-lg' : ''}`}
                  />
                </div>
              </div>
              {selfieImageData?.length > 0 && (
                <IoMdClose onClick={() => { setSelfieImageData(''); }} size={20} className="text-[#DA2D1F] mb-4 cursor-pointer" />
              )}
            </div>
          </>
        )}
      </div>

      {/* Submit Button */}
      {!isCameraActive && (
        <div className="w-full flex flex-col justify-center items-center rounded-xl p-5 bg-white mt-4 mb-16 md:mb-0 gap-4">
          <Button
            onClick={handleSubmit}
            disabled={
              name?.length === 0 ||
              email?.length === 0 ||
              phone?.length === 0 ||
              idCardImageData?.length === 0 ||
              selfieImageData?.length === 0 ||
              isLoading
            }
            className="w-full rounded-full bg-seeds-button-green text-white text-md py-2 hover:shadow-lg transition capitalize"
          >
            {t('earning.withdrawKyc.text19')}
          </Button>
          <Button
            onClick={async () => {
              await router.push('/my-profile/my-earnings');
            }}
            className="w-full rounded-full bg-white border border-[#E2E2E2] text-seeds-button-green text-md py-2 hover:shadow-lg transition capitalize"
          >
            {t('earning.withdrawKyc.text28')}
          </Button>
        </div>
      )}
    </>
  );
};

export default withAuth(WithdrawKYCForm);
