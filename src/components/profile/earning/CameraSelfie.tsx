import { postCloud } from '@/repository/cloud.repository';
import { Button } from '@material-tailwind/react';
import Image from 'next/image';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import { IoCameraOutline } from 'react-icons/io5';
import { MdCameraswitch, MdOutlineCancel } from 'react-icons/md';
import { toast } from 'react-toastify';
import Webcam from 'react-webcam';

interface Props {
  t: (key: string) => string;
  setIsCameraActive: React.Dispatch<React.SetStateAction<boolean>>;
  isUsePhoto: boolean;
  setIsUsePhoto: React.Dispatch<React.SetStateAction<boolean>>;
  setImageData: React.Dispatch<React.SetStateAction<string>>;
  height: number;
  width: number;
  useConfirm: boolean;
  setIsWebcamReady?: React.Dispatch<React.SetStateAction<boolean>>;
  photoType: string;
}

const CameraSelfie: React.FC<Props> = ({
  t,
  setIsCameraActive,
  isUsePhoto,
  setIsUsePhoto,
  setImageData,
  height,
  width,
  useConfirm,
  setIsWebcamReady,
  photoType,
}) => {

  const usePhoto = async (): Promise<void> => {
    if (captureImage !== null) {
      try {
        const blob = await (await fetch(captureImage)).blob();
        const file = new File([blob], 'selfie.jpg', { type: 'image/jpeg' });
  
        const { path: cloudResponse } = await postCloud({
          file,
          type: 'OTHER_URL'
        });

        setImageData(cloudResponse);
        setIsUsePhoto(true);
        if (setIsWebcamReady !== undefined) {
          setIsWebcamReady(false);
        }
        setIsCameraActive(false);
      } catch {
        toast.error(t('earning.withdrawKyc.text42'));
      }
    }
  };
  
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = e.target.files?.[0];
    if (file != null) {
      try {
        const { path: cloudResponse } = await postCloud({
          file,
          type: 'OTHER_URL'
        });
  
        setCaptureImage(URL.createObjectURL(file));
        setImageData(cloudResponse);
        setIsUsePhoto(true);
        setIsCameraActive(false);
      } catch {
        toast.error(t('earning.withdrawKyc.text42'));
      }
    }
  };
  
  const webcamRef = useRef<Webcam | null>(null);
  const [captureImage, setCaptureImage] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');

  const capture = useCallback(() => {
    if (webcamRef.current != null) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc !== null) {
        setCaptureImage(imageSrc);
      }
    }
  }, []);

  useEffect(() => {
    if (!isUsePhoto) {
      setCaptureImage(null);
      setImageData('');
    }
  }, [isUsePhoto]);

  const switchCamera = (): void => {
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
  };

  return (
    <div>
      <div className="w-fit h-fit p-4 border border-[#BDBDBD] rounded-lg flex flex-col items-center gap-2 relative">
        {captureImage !== null ? (
          <div className="flex flex-col items-center gap-2">
            <Image
              alt="Capture Image"
              src={captureImage}
              width={width}
              height={height}
            />
          </div>
        ) : (
          <>
            <div className="relative overflow-hidden">
              {useConfirm ? (
                <Webcam
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  audio={false}
                  screenshotQuality={1}
                  videoConstraints={{ facingMode, width, height }}
                  onUserMedia={() => {
                    if (setIsWebcamReady !== undefined) {
                      setIsWebcamReady(true);
                    }
                  }}
                  onUserMediaError={() => {
                    if (setIsWebcamReady !== undefined) {
                      setIsWebcamReady(false);
                    }
                  }}
                />
              ) : (
                <Webcam
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  audio={false}
                  screenshotQuality={1}
                  videoConstraints={{ facingMode: 'user', width, height }}
                />
              )}
              {photoType === 'selfie' && (
                <>
                  <div className="absolute m-auto left-0 right-0 top-[12%] rounded-full w-[45%] h-[45%] border border-dashed border-white" />
                  <div className="absolute m-auto left-0 right-0 top-[65%] rounded-[70px] w-[70%] h-[70%] border border-dashed border-white" />
                </>
              )}
            </div>
          </>
        )}
        {
          captureImage === null &&
            <div
              onClick={capture}
              className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 cursor-pointer hover:scale-105 duration-150 z-10"
            >
              <div className="w-16 h-16 rounded-full bg-seeds-button-green flex items-center justify-center pb-1">
                <IoCameraOutline className='text-white' size={40}/>
              </div>
            </div>
        }
      </div>
      {
        captureImage !== null ?
          <>
            {isUsePhoto && (
                <div className={`w-full flex flex-col md:flex-row justify-center items-center gap-3 ${captureImage !== null ? 'mt-6' : 'mt-10'}`}>
                  <Button
                    onClick={() => {
                      setCaptureImage(null);
                    }}
                    className="flex items-center justify-center bg-white border border-seeds-button-green text-seeds-green capitalize text-sm font-poppins font-semibold rounded-full w-full md:w-[155px] h-[36px]"
                  >
                    {t('earning.withdrawKyc.text23')}
                  </Button>
                  <Button
                    onClick={usePhoto}
                    className="flex items-center justify-center bg-white border border-seeds-button-green text-seeds-green capitalize text-sm font-poppins font-semibold rounded-full w-full md:w-[155px] h-[36px]"
                  >
                    {t('earning.withdrawKyc.text24')}
                  </Button>
                </div>
              )}
          </>
          :
          <div className={`-full flex justify-center items-center gap-3 ${captureImage !== null ? 'mt-6' : 'mt-10'}`}>
            <div className="w-full flex justify-center">
              <label
                htmlFor="upload-photo"
                className="flex items-center justify-center gap-2 w-full md:w-[155px] h-[40px] bg-white border border-seeds-button-green text-seeds-green text-sm font-poppins font-semibold rounded-full cursor-pointer hover:bg-gray-50 transition-all"
              >
                <FiUpload className="text-lg" size={24}/>
                <span className="hidden md:inline">{t('earning.withdrawKyc.text27')}</span>
              </label>
              <input
                id="upload-photo"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
    
            <Button
              onClick={switchCamera}
              className="flex items-center justify-center gap-2 bg-white border border-seeds-button-green text-seeds-green capitalize text-sm font-poppins font-semibold rounded-full w-full h-[40px]"
            >
              <MdCameraswitch className="text-lg" size={24}/>
              <span className="hidden md:inline">{t('earning.withdrawKyc.text25')}</span>
            </Button>
    
            <Button
              onClick={() => {
                setIsCameraActive(false);
                if (setIsWebcamReady !== undefined) {
                  setIsWebcamReady(false);
                }
              }}
              className="flex items-center justify-center gap-2 bg-white border border-seeds-button-green text-seeds-green capitalize text-sm font-poppins font-semibold rounded-full w-full h-[40px]"
            >
              <MdOutlineCancel className="text-lg" size={24}/>
              <span className="hidden md:inline">{t('earning.withdrawKyc.text26')}</span>
            </Button>
          </div>
      }
    </div>
  );
};

export default CameraSelfie;
