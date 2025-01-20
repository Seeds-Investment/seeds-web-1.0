import { Button } from '@material-tailwind/react';
import Image from 'next/image';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';

interface Props {
  t: (key: string) => string;
  setIsCameraActive: React.Dispatch<React.SetStateAction<boolean>>;
  isUsePhoto: boolean;
  setIsUsePhoto: React.Dispatch<React.SetStateAction<boolean>>;
  setImageData: React.Dispatch<React.SetStateAction<string>>;
}

const CameraSelfie: React.FC<Props> = ({
  t,
  setIsCameraActive,
  isUsePhoto,
  setIsUsePhoto,
  setImageData
}) => {
  const webcamRef = useRef<Webcam | null>(null);
  const [captureImage, setCaptureImage] = useState<string | null>(null);

  const capture = useCallback(() => {
    if (webcamRef.current != null) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc !== null) {
        setCaptureImage(imageSrc);
      }
    }
  }, [webcamRef]);

  useEffect(() => {
    if (!isUsePhoto) {
      setCaptureImage(null);
      setImageData('');
    }
  }, [isUsePhoto]);

  const usePhoto = (): void => {
    setImageData(captureImage ?? '');
    setIsUsePhoto(true);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {captureImage !== null ? (
        <div className="flex flex-col items-center gap-2">
          <Image
            alt="Capture Image"
            src={captureImage}
            width={208}
            height={312}
          />
          {!isUsePhoto && (
            <div className="flex items-center gap-3">
              <Button
                onClick={() => {
                  setCaptureImage(null);
                }}
                className="flex items-center justify-center bg-white border border-seeds-button-green text-seeds-green capitalize text-sm font-poppins font-semibold rounded-full w-[155px] h-[36px]"
              >
                {t('danamart.verification.photoSelfie.retake')}
              </Button>
              <Button
                onClick={usePhoto}
                className="flex items-center justify-center bg-white border border-seeds-button-green text-seeds-green capitalize text-sm font-poppins font-semibold rounded-full w-[155px] h-[36px]"
              >
                {t('danamart.verification.photoSelfie.continue')}
              </Button>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="relative">
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              audio={false}
              screenshotQuality={1}
              videoConstraints={{ facingMode: 'user', width: 208, height: 312 }}
            />
            <div
              onClick={capture}
              className="absolute bottom-3 left-1/2 transform -translate-x-1/2 cursor-pointer hover:scale-105 duration-150"
            >
              <div className="w-12 h-12 rounded-full bg-white border-[3px] border-white flex items-center justify-center">
                <div className="w-8 h-8 border border-[#000000] rounded-full"></div>
              </div>
            </div>
          </div>
          <Button
            onClick={() => {
              setIsCameraActive(false);
            }}
            className="flex items-center justify-center bg-white border border-seeds-button-green text-seeds-green capitalize text-sm font-poppins font-semibold rounded-full w-[155px] h-[36px]"
          >
            {t('danamart.verification.photoSelfie.cancel')}
          </Button>
        </>
      )}
    </div>
  );
};

export default CameraSelfie;
