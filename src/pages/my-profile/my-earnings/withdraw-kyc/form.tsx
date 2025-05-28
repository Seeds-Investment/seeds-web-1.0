'use client';

import IdentityCard from '@/assets/my-profile/earning/kyc-identity-card.svg';
import Selfie from '@/assets/my-profile/earning/kyc-selfie.svg';
import CameraSelfie from '@/components/profile/earning/CameraSelfie';
import withAuth from '@/helpers/withAuth';
import { kycSubmitData } from '@/repository/earning.repository';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoMdClose } from 'react-icons/io';
import { toast } from 'react-toastify';

const WithdrawKYCForm = (): React.ReactElement => {
  const router = useRouter()
  const { t } = useTranslation();

  // ID Card
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [isUsePhotoIdCard, setIsUsePhotoIdCard] = useState<boolean>(false);
  const [idCardImageData, setIdCardImageData] = useState<string>('');

  // Selfie
  const [isUsePhotoSelfie, setIsUsePhotoSelfie] = useState<boolean>(false);
  const [selfieImageData, setSelfieImageData] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [photoType, setPhotoType] = useState<'idCard' | 'selfie'>('idCard');

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (): Promise<void> => {
    const payload = {
      name,
      email,
      phone_number: phone,
      id_card_image: idCardImageData,
      user_image: selfieImageData,
    };

    try {
      setIsLoading(true)
      const response = await kycSubmitData(payload);
      if (response?.message === 'success') {
        toast.success(t('earning.withdrawKyc.text5'))
        setTimeout(() => {
          void router.push('/my-profile/my-earnings');
        }, 3000);        
      }
    } catch (error: any) {
      if (error?.response?.data?.message === 'kyc already submitted') {
        toast.error(t('earning.withdrawKyc.text6'))
      } else {
        toast.error(t('earning.withdrawKyc.text7'))
      }
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <>
      <div className={`w-full flex flex-col justify-center items-center rounded-xl px-5 bg-white overflow-hidden ${isCameraActive ? 'mb-16' : 'mb-0'}`}>
        {isCameraActive ? (
          <div className="w-full flex flex-col justify-center items-center py-5">
            <Typography className="font-poppins text-md font-medium text-[#262626] mt-2">
            {
              photoType === 'idCard'
                ? t('earning.withdrawKyc.text8')
                : t('earning.withdrawKyc.text9')
            }
            </Typography>
            <Typography className="font-poppins text-sm text-[#7C7C7C] mb-4">
            {
              photoType === 'idCard'
                ? t('earning.withdrawKyc.text10')
                : t('earning.withdrawKyc.text11')
            }
            </Typography>
            <div className="w-fit h-fit p-4 border border-[#BDBDBD] rounded-lg">
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
          </div>
        ) : (
          <>
            <div className="w-full flex flex-col gap-4 py-5">
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

              <div className="flex flex-col text-sm text-gray-700">
                <Typography className="font-poppins text-md font-medium text-[#262626]">
                  {t('earning.withdrawKyc.text13')} <span className="text-red-500">*</span>
                </Typography>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => { setPhone(e.target.value); }}
                  placeholder={`${t('earning.withdrawKyc.text21')}`}
                  className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-seeds-button-green"
                />
              </div>

              <div className="flex flex-col text-sm text-gray-700">
                <Typography className="font-poppins text-md font-medium text-[#262626]">
                  {t('earning.withdrawKyc.text14')} <span className="text-red-500">*</span>
                </Typography>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); }}
                  placeholder={`${t('earning.withdrawKyc.text22')}`}
                  className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-seeds-button-green"
                />
              </div>
            </div>

            {/* Identity Card */}
            <div className='w-full flex justify-center items-center gap-2'>
              <div
                onClick={() => {
                  setIsCameraActive(true);
                  setPhotoType('idCard');
                  setIsUsePhotoIdCard(true);
                }}
                className="w-full border border-dashed py-2 px-4 rounded-lg border-[#E9E9E9] flex justify-between items-center mb-4 cursor-pointer hover:bg-[#F9F9F9] duration-300"
              >
                <div className='w-[80%] md:w-full'>
                  <Typography className="font-poppins text-sm font-medium text-seeds-button-green">
                    {t('earning.withdrawKyc.text15')}
                  </Typography>
                  <Typography className="font-poppins text-sm text-[#7C7C7C]">
                    {t('earning.withdrawKyc.text16')}
                  </Typography>
                </div>
                <div className="flex justify-center items-center h-[60px] w-auto">
                  <Image
                    src={
                      (idCardImageData?.length > 0)
                        ? idCardImageData.startsWith('data:image')
                          ? idCardImageData
                          : IdentityCard
                        : IdentityCard
                    }
                    alt="IdentityCard"
                    width={1000}
                    height={1000}
                    className={`w-auto h-full shrink-0 ${idCardImageData?.length > 0 ? 'rounded-lg' : ''}`}
                  />
                </div>
              </div>
              {
                idCardImageData?.length > 0 &&
                  <IoMdClose
                    onClick={() => { setIdCardImageData('') }}
                    size={20} 
                    className='text-[#DA2D1F] mb-4 cursor-pointer'
                  />
              }
            </div>

            {/* Selfie with ID */}
            <div className='w-full flex justify-center items-center gap-2'>
              <div
                onClick={() => {
                  setIsCameraActive(true);
                  setPhotoType('selfie');
                  setIsUsePhotoSelfie(true);
                }}
                className="w-full border border-dashed py-2 px-4 rounded-lg border-[#E9E9E9] flex justify-between items-center mb-4 cursor-pointer hover:bg-[#F9F9F9] duration-300"
              >
                <div className='w-[80%] md:w-full'>
                  <Typography className="font-poppins text-sm font-medium text-seeds-button-green">
                    {t('earning.withdrawKyc.text17')}
                  </Typography>
                  <Typography className="font-poppins text-sm text-[#7C7C7C]">
                    {t('earning.withdrawKyc.text18')}
                  </Typography>
                </div>
                <div className="flex justify-center items-center h-[60px] w-auto">
                  <Image
                    src={
                      (selfieImageData?.length > 0)
                        ? selfieImageData.startsWith('data:image')
                          ? selfieImageData
                          : Selfie
                        : Selfie
                    }
                    alt="Selfie"
                    width={1000}
                    height={1000}
                    className={`w-auto h-full shrink-0 ${selfieImageData?.length > 0 ? 'rounded-lg' : ''}`}
                  />
                </div>
              </div>
              {
                selfieImageData?.length > 0 &&
                  <IoMdClose
                    onClick={() => { setSelfieImageData('') }}
                    size={20} 
                    className='text-[#DA2D1F] mb-4 cursor-pointer'
                  />
              }
            </div>
          </>
        )}
      </div>

      {/* Submit Button */}
      {
        !isCameraActive &&
          <div className="w-full flex flex-col justify-center items-center rounded-xl p-5 bg-white mt-4 mb-16 md:mb-0 gap-4">
            <Button
              onClick={handleSubmit}
              disabled={
                name === '' ||
                email === '' ||
                phone === '' ||
                idCardImageData === '' ||
                selfieImageData === '' ||
                isLoading
              }
              className="w-full rounded-full bg-seeds-button-green text-white text-md py-2 hover:shadow-lg transition capitalize"
            >
              {t('earning.withdrawKyc.text19')}
            </Button>
            <Button
              onClick={async() => {
                await router.push('/my-profile/my-earnings')
              }}
              className="w-full rounded-full bg-white border border-[#E2E2E2] text-seeds-button-green text-md py-2 hover:shadow-lg transition capitalize"
            >
              {t('earning.withdrawKyc.text28')}
            </Button>
          </div>
      }
    </>
  );
};

export default withAuth(WithdrawKYCForm);
