import CameraIcon from '@/assets/danamart/camera.svg';
import SeedyDetective from '@/assets/danamart/seedy-detective.svg';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import React from 'react';
import { FiInfo } from 'react-icons/fi';

interface Props {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  t: (key: string) => string;
}

const PhotoSelfie: React.FC<Props> = ({ step, setStep, t }) => {
  return (
    <div>
      <div className="flex items-center gap-1">
        <Typography className="font-poppins font-semibold text-base text-[#3ac4a0]">
          {t('danamart.verification.photoSelfieTittle')}
        </Typography>
        <FiInfo color="#3ac4a0" size={16} />
      </div>
      <div className="bg-[#F9F9F9] border-[1px] border-[#E9E9E9] rounded-lg p-5">
        <div className="flex flex-col justify-center items-center">
          <Image
            src={SeedyDetective}
            alt="SeedyDetective"
            width={160}
            height={160}
          />
          <Button className="flex justify-center items-center gap-2 border border-seeds-button-green capitalize font-poppins font-semibold text-sm text-seeds-button-green w-[191px] h-[36px] bg-white rounded-full">
            <Image src={CameraIcon} alt="CameraIcon" width={18} height={18} />
            <Typography>Camera</Typography>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PhotoSelfie;
