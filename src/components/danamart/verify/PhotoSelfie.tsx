import CameraIcon from '@/assets/danamart/camera.svg';
import SeedyDetective from '@/assets/danamart/seedy-detective.svg';
import {
  getPhotoSelfieData,
  updatePhotoSelfie
} from '@/repository/danamart/danamart.repository';
import { type AccountVerification } from '@/utils/interfaces/danamart.interface';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
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
  const [photoSelfieData, setPhotoSelfieData] = useState<AccountVerification>();

  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [isUsePhoto, setIsUsePhoto] = useState<boolean>(false);
  const [imageData, setImageData] = useState<string>('');

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
      const response = await updatePhotoSelfie(imageData);
      setPhotoSelfieData(response);
    } catch (error) {
      toast(error as string);
    }
  };

  const isButtonDisabled = (): boolean => {
    if (photoSelfieData !== undefined && photoSelfieData !== null) {
      return (
        (photoSelfieData.info_1 !== '1' &&
          photoSelfieData.info_2 !== '1' &&
          photoSelfieData.info_3 !== '1') ||
        !isUsePhoto
      );
    } else {
      return true;
    }
  };

  return (
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
            isCameraActive ? 'h-[390px]' : 'h-[350px]'
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
              />
            ) : (
              <>
                <Image
                  src={SeedyDetective}
                  alt="SeedyDetective"
                  width={160}
                  height={160}
                />
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
      <div className="flex items-center justify-end gap-6">
        {imageData !== '' && isUsePhoto && (
          <Button
            onClick={() => {
              setIsUsePhoto(false);
            }}
            className="bg-seeds-button-green capitalize font-poppins font-semibold text-sm rounded-full w-[155px] h-[36px] flex justify-center items-center"
          >
            {t('danamart.verification.photoSelfie.retake')}
          </Button>
        )}
        {photoSelfieData?.info_4 !== '1' && (
          <Button
            disabled={isButtonDisabled()}
            onClick={saveData}
            className={`${
              isButtonDisabled() ? 'bg-[#BDBDBD]' : 'bg-seeds-button-green'
            } capitalize font-poppins font-semibold text-sm rounded-full w-[155px] h-[36px] flex justify-center items-center`}
          >
            {t('danamart.verification.buttonSave')}
          </Button>
        )}
      </div>
    </div>
  );
};

export default PhotoSelfie;
