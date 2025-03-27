import CameraIcon from '@/assets/danamart/camera.svg';
import SeedyDetective from '@/assets/danamart/seedy-detective.svg';
import UploadIcon from '@/assets/danamart/upload.svg';
import {
  getPhotoIdCard,
  updatePhotoIdCard
} from '@/repository/danamart/danamart.repository';
import { type AccountVerification } from '@/utils/interfaces/danamart.interface';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { WarningGreenIcon } from 'public/assets/vector';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CameraSelfie from './CameraSelfie';

interface PhotoIdCardProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  t: (key: string) => string;
}

const PhotoIdCard: React.FC<PhotoIdCardProps> = ({ step, setStep, t }) => {
  const [photoIdCardData, setPhotoIdCardData] = useState<AccountVerification>();
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [isIdCardUploaded, setIsIdCardUploaded] = useState<boolean>(false);
  const [isUsePhoto, setIsUsePhoto] = useState<boolean>(false);
  const [imageData, setImageData] = useState<string>('');
  const [uploadType, setUploadType] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isWebcamReady, setIsWebcamReady] = useState<boolean>(false);
  const pathTranslation = 'danamart.verification.photoIdCardTitle';
console.log('isIdCardUploaded ', isIdCardUploaded)
console.log('photoIdCardData ', photoIdCardData)
console.log('imageData ', imageData)
console.log('isUsePhoto ', isUsePhoto)
  useEffect(() => {
    if (step === 1) {
      void fetchDataPhotoIdCard();
    }
  }, [step]);

  useEffect(() => {
    if (
      photoIdCardData?.penmit !== null && 
      photoIdCardData?.penmit?.dm_penmit_01011 !== '' && 
      photoIdCardData?.penmit?.dm_penmit_01011 !== undefined
    ) {
      setIsIdCardUploaded(true);
    } else {
      setIsIdCardUploaded(false);
    }
  }, [photoIdCardData, photoIdCardData?.penmit]);

  const fetchDataPhotoIdCard = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await getPhotoIdCard();
      setPhotoIdCardData(response);
    } catch (error) {
      toast.error(`Error fetching data Photo Selfie`);
    } finally {
      setIsLoading(false);
    }
  };
console.log('isIdCardUploaded:', isIdCardUploaded, typeof isIdCardUploaded);

  const saveData = async (): Promise<void> => {
    try {
      console.log('isIdCardUplresponseoaded ', isIdCardUploaded)
      const response = await updatePhotoIdCard(
        isIdCardUploaded ? 'updateOcr' : 'simpan',
        imageData
      );
      if (response?.data?.statusCode === 200) {
        toast.success(t(`${pathTranslation}.successMessage`));
        setStep(step + 1);
        setPhotoIdCardData(response);
      }
    } catch (error) {
      toast.error(error as string);
    }
  };

  const handleNextPage = (): void => {
    setStep(step + 1);
  };

  return (
    <div className="w-full flex flex-col rounded-lg">
      <Typography className="font-poppins font-semibold text-md text-seeds-button-green">
        {t(`${pathTranslation}.uploadTitle`)}
      </Typography>
      <Typography className="font-poppins text-sm text-[#7C7C7C] mt-2">
        {t(`${pathTranslation}.uploadDescription`)}
      </Typography>
      <div className="bg-[#F9F9F9] border-[1px] border-[#E9E9E9] rounded-lg mt-4 py-12">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            {isCameraActive ? (
              <CameraSelfie
                t={t}
                setIsCameraActive={setIsCameraActive}
                isUsePhoto={isUsePhoto}
                setIsUsePhoto={setIsUsePhoto}
                setImageData={setImageData}
                height={300}
                width={476}
                useConfirm={true}
                setIsWebcamReady={setIsWebcamReady}
              />
            ) : (
              <>
                {imageData?.length > 0 ? (
                  <div className="mt-4 flex flex-col items-center">
                    <div className="w-auto h-[208px] border-[1px] border-[#E9E9E9] rounded-lg overflow-hidden">
                      <img
                        src={imageData}
                        alt="Uploaded Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ) : isLoading ? (
                  <div className="w-full flex justify-center h-fit my-8">
                    <div className="h-[60px]">
                      <div className="animate-spinner w-16 h-16 border-8 border-gray-200 border-t-seeds-button-green rounded-full" />
                    </div>
                  </div>
                ) : isIdCardUploaded ? (
                  <img
                    src={
                      photoIdCardData?.penmit?.dm_penmit_01011 !== undefined
                        ? `https://dev.danamart.id/development/dm-scf-api/writable/uploads/${photoIdCardData?.penmit?.dm_penmit_01011}`
                        : SeedyDetective
                    }
                    alt="photoIdCardData"
                    width={1000}
                    height={1000}
                    className="h-auto w-full"
                  />
                ) : (
                  <Image
                    src={SeedyDetective}
                    alt="SeedyDetective"
                    width={160}
                    height={160}
                  />
                )}
              </>
            )}
            {!isWebcamReady && (
              <div className="flex gap-4 mt-2">
                <Button
                  onClick={() => {
                    setIsCameraActive(false);
                    setUploadType('file');
                    setImageData('');
                  }}
                  className="flex justify-center items-center gap-2 border-[1px] border-seeds-button-green capitalize font-poppins font-semibold text-sm text-seeds-button-green w-full h-[40px] bg-white rounded-full"
                >
                  <Image
                    src={UploadIcon}
                    alt="UploadIcon"
                    width={18}
                    height={18}
                  />
                  <Typography>
                    <label htmlFor="fileUpload" className="cursor-pointer">
                      {t(`${pathTranslation}.upload`)}
                    </label>
                  </Typography>
                  <input
                    type="file"
                    id="fileUpload"
                    accept="image/*"
                    className="hidden"
                    onChange={async e => {
                      const file = e.target.files?.[0];
                      if (file != null) {
                        const reader = new FileReader();
                        reader.onload = () => {
                          const base64String = reader.result as string;
                          setImageData(base64String);
                          setIsUsePhoto(true);
                        };
                        reader.readAsDataURL(file);
                      } else {
                        toast.error(t('No file selected'));
                      }
                    }}
                  />
                </Button>
                <Button className="flex justify-center items-center gap-2 border-[1px] border-seeds-button-green capitalize font-poppins font-semibold text-sm text-seeds-button-green w-full h-[40px] bg-white rounded-full">
                  <Image
                    src={CameraIcon}
                    alt="CameraIcon"
                    width={18}
                    height={18}
                  />
                  <Typography
                    onClick={() => {
                      setIsCameraActive(true);
                      setUploadType('camera');
                      setIsUsePhoto(false);
                    }}
                  >
                    {t(`${pathTranslation}.camera`)}
                  </Typography>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-full flex justify-start items-center gap-2 my-4">
        <Typography className="font-poppins font-semibold text-md">
          {t(`${pathTranslation}.uploadRequirement.title`)}
        </Typography>
        <Image
          src={WarningGreenIcon}
          alt="WarningGreenIcon"
          width={18}
          height={18}
        />
      </div>
      <ul>
        {[1, 2, 3, 4, 5].map(number => (
          <li
            key={number}
            className="font-poppins font-normal text-sm text-[#bdbdbd]"
          >
            {t(`${pathTranslation}.uploadRequirement.text${number}`)}
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-end gap-6">
        {imageData !== '' && isUsePhoto && uploadType !== 'file' && (
          <Button
            onClick={() => {
              setIsUsePhoto(false);
              setIsCameraActive(false);
              setImageData('');
            }}
            className="bg-seeds-button-green capitalize font-poppins font-semibold text-sm rounded-full w-[155px] h-[36px] flex justify-center items-center"
          >
            {t(`${pathTranslation}.retake`)}
          </Button>
        )}
        {imageData !== '' && isUsePhoto && uploadType === 'file' && (
          <Button
            onClick={() => {
              setImageData('');
            }}
            className="bg-seeds-button-green capitalize font-poppins font-semibold text-sm rounded-full w-[155px] h-[36px] flex justify-center items-center"
          >
            {t(`${pathTranslation}.retake`)}
          </Button>
        )}
        {photoIdCardData?.info_4 !== '1' && (
        <Button
          disabled={isLoading}
          onClick={async () => {
            if (isUsePhoto) {
              await saveData();
            } else {
              handleNextPage();
            }
          }}
          className="rounded-full px-4 py-2 w-[155px] h-[36px] bg-seeds-button-green"
        >
          {
            imageData !== ''
              ? t('danamart.verification.buttonSave') 
              : t('danamart.verification.buttonNext')
          }
        </Button>
        )}
      </div>
    </div>
  );
};

export default PhotoIdCard;
