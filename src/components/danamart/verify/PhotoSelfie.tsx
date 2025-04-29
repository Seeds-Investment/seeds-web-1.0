import CameraIcon from '@/assets/danamart/camera.svg';
import SeedyDetective from '@/assets/danamart/seedy-detective.svg';
import Loading from '@/components/popup/Loading';
import {
  getPhotoSelfieData,
  updatePhotoSelfie
} from '@/repository/danamart/danamart.repository';
import { type AccountVerification } from '@/utils/interfaces/danamart.interface';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FiInfo } from 'react-icons/fi';
import { toast } from 'react-toastify';
import CameraSelfie from './CameraSelfie';

interface Props {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  t: (key: string) => string;
}

const PhotoSelfie: React.FC<Props> = ({ step, setStep, t }) => {
  const router = useRouter()
  const [photoSelfieData, setPhotoSelfieData] = useState<AccountVerification>();
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [isUsePhoto, setIsUsePhoto] = useState<boolean>(false);
  const [imageData, setImageData] = useState<string>('');
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isLoadingPostPhoto, setIsLoadingPostPhoto] = useState<boolean>(false);

  const toggleSwitch = (): void => {
    setIsChecked(prev => !prev);
  };

  useEffect(() => {
    if (step === 4) {
      void fetchDataPhotoSelfie();
    }
  }, [step]);

  const fetchDataPhotoSelfie = async (): Promise<void> => {
    try {
      const response = await getPhotoSelfieData();
      setPhotoSelfieData(response);
    } catch (error) {
      toast.error(`Error fetching data Photo Selfie`);
    }
  };

  const saveData = async (): Promise<void> => {
    try {
      setIsLoadingPostPhoto(true)
      const response = await updatePhotoSelfie(imageData, isChecked);
      if (response?.status === 200) {
        if (response?.data?.message === 'Terima kasih telah melengkapi Formulir Pengajuan Menjadi Pemodal, tim kami akan memverifikasi data Kamu.') {
          toast.success(t('danamart.verification.photoSelfie.success'));
        }
        await fetchDataPhotoSelfie()
        setIsUsePhoto(false)
        setImageData('')
        setIsCameraActive(false)
        setIsChecked(false)
      }
    } catch (error) {
      toast.error(error as string);
    } finally {
      setIsLoadingPostPhoto(false)
    }
  };

  const isButtonDisabled = (): boolean => {
    if (photoSelfieData == null) return true;
    if (photoSelfieData.info_4 === '1') return !isUsePhoto;
    return true;
  };

  return (
    <>
      {isLoadingPostPhoto && <Loading />}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Typography className="font-poppins font-semibold text-base text-[#3ac4a0]">
              {isUsePhoto
                ? t('danamart.verification.photoSelfie.previewSelfie')
                : t('danamart.verification.photoSelfieTittle')}
            </Typography>
            <FiInfo color="#3ac4a0" size={16} />
          </div>
          <div
            className={`flex justify-center items-center bg-[#F9F9F9] border-[1px] border-[#E9E9E9] rounded-lg p-5 w-full ${
              isCameraActive ? 'h-fit' : 'h-fit'
            }`}
          >
            <div className="flex flex-col justify-center items-center">
              {isCameraActive ? (
                <CameraSelfie
                  t={t}
                  setIsCameraActive={setIsCameraActive}
                  isUsePhoto={isUsePhoto}
                  setIsUsePhoto={setIsUsePhoto}
                  setImageData={setImageData}
                  height={312}
                  width={208}
                  useConfirm={true}
                />
              ) : (
                <>
                  {
                    photoSelfieData?.pemodal?.status_form !== '0' &&
                    photoSelfieData?.info_4 === '1' ?
                      <div className='flex justify-center items-center md:justify-start bg-[#F9F9F9] rounded-lg p-5 w-full'>
                        <div className='flex justify-center items-center w-[200px] h-auto rounded-md overflow-hidden'>
                          <Image
                            src={`https://dev.danamart.id/development/dm-scf-api/writable/uploads/${photoSelfieData?.penmit?.selfie_fail as string}`}
                            alt="photoSelfieData"
                            width={1000}
                            height={1000}
                            className='w-full h-auto'
                          />
                        </div>
                      </div>
                      :
                      <Image
                        src={SeedyDetective}
                        alt="SeedyDetective"
                        width={160}
                        height={160}
                      />
                  }
                  <Button
                    onClick={() => {
                      setIsCameraActive(true);
                    }}
                    className="flex justify-center items-center gap-2 border border-seeds-button-green capitalize font-poppins font-semibold text-sm text-seeds-button-green w-[191px] h-[36px] bg-white rounded-full"
                  >
                    <Image
                      src={CameraIcon}
                      alt="CameraIcon"
                      width={18}
                      height={18}
                    />
                    {t('danamart.verification.photoSelfie.camera')}
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Typography className="font-poppins font-semibold text-base text-[#262626]">
              {t('danamart.verification.photoSelfie.requirements')}
            </Typography>
            <FiInfo color="#3ac4a0" size={16} />
          </div>
          <ul>
            {[1, 2, 3, 4].map(number => (
              <li
                key={number}
                className="font-poppins font-normal text-sm text-[#bdbdbd]"
              >
                {t(`danamart.verification.photoSelfie.requirements${number}`)}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSwitch}
            className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
              isChecked ? '' : 'bg-gray-300'
            }`}
            style={{ backgroundColor: isChecked ? '#3AC4A0' : '#d1d5db' }}
          >
            <span
              className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
                isChecked ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
          <label className="text-sm font-medium font-poppins">
            {t('danamart.verification.photoSelfie.agreement')}
          </label>
        </div>
        <div className="flex items-center justify-end gap-6">
          {imageData !== '' ||
          isUsePhoto ||
          (photoSelfieData?.pemodal?.status_form !== '0' &&
          photoSelfieData?.info_4 === '1') && (
            <Button
              onClick={() => {
                setIsUsePhoto(false);
                setIsCameraActive(true);
              }}
              className="bg-seeds-button-green capitalize font-poppins font-semibold text-sm rounded-full w-[155px] h-[36px] flex justify-center items-center"
            >
              {t('danamart.verification.photoSelfie.retake')}
            </Button>
          )}
          {
            (photoSelfieData?.pemodal?.status_form !== '0' &&
            photoSelfieData?.info_4 === '1') && (
              <Button
                onClick={async() => {
                  if (isUsePhoto) {
                    setImageData('')
                    setIsUsePhoto(false)
                    setIsCameraActive(false)
                  } else {
                    await router.push('/danamart/dashboard')
                  }
                }}
                className="bg-seeds-button-green capitalize font-poppins font-semibold text-sm rounded-full w-[155px] h-[36px] flex justify-center items-center"
              >
                {
                  isUsePhoto
                    ? t('danamart.verification.photoSelfie.delete')
                    : t('danamart.verification.photoSelfie.continue')
                }
              </Button>
          )}
          {
            photoSelfieData?.info_4 !== '1' ||
            isUsePhoto && (
            <Button
              disabled={isButtonDisabled()}
              onClick={saveData}
              className={`${
                isButtonDisabled() ? 'bg-[#BDBDBD]' : 'bg-seeds-button-green'
              } capitalize font-poppins font-semibold text-sm rounded-full w-[155px] h-[36px] flex justify-center items-center
              ${isChecked ? 'bg-seeds-button-green' : 'bg-[#BDBDBD]'}`}
            >
              {t('danamart.verification.buttonSave')}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default PhotoSelfie;
