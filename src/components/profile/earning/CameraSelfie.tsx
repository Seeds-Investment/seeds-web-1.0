import { Button } from '@material-tailwind/react';
import Image from 'next/image';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import { MdCameraswitch, MdOutlineCancel } from 'react-icons/md';
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

  const usePhoto = (): void => {
    setImageData(captureImage ?? '');
    setIsUsePhoto(true);
    if (setIsWebcamReady !== undefined) {
      setIsWebcamReady(false);
    }
    setIsCameraActive(false);
  };

  const switchCamera = (): void => {
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file != null) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setCaptureImage(base64);
        setImageData(base64);
        setIsUsePhoto(true);
        setIsCameraActive(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {captureImage !== null ? (
        <div className="flex flex-col items-center gap-2">
          <Image
            alt="Capture Image"
            src={captureImage}
            width={width}
            height={height}
          />
          {isUsePhoto && (
            <div className="w-full flex flex-col md:flex-row justify-center items-center gap-3">
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
            <div
              onClick={capture}
              className="absolute bottom-3 left-1/2 transform -translate-x-1/2 cursor-pointer hover:scale-105 duration-150 z-10"
            >
              <div className="w-12 h-12 rounded-full bg-white border-[3px] border-white flex items-center justify-center">
                <div className="w-8 h-8 border border-[#000000] rounded-full"></div>
              </div>
            </div>
            {photoType === 'selfie' && (
              <>
                <div className="absolute m-auto left-0 right-0 top-[12%] rounded-full w-[45%] h-[45%] border border-dashed border-white" />
                <div className="absolute m-auto left-0 right-0 top-[65%] rounded-[70px] w-[70%] h-[70%] border border-dashed border-white" />
              </>
            )}
          </div>

          <div className="w-full flex justify-center items-center gap-3 mt-4">
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
        </>
      )}
    </div>
  );
};

export default CameraSelfie;
