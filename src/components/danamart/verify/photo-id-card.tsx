import CameraIcon from '@/assets/danamart/camera.svg';
import SeedyDetective from '@/assets/danamart/seedy-detective.svg';
import UploadIcon from '@/assets/danamart/upload.svg';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { ArrowTaillessLeft, WarningGreenIcon } from 'public/assets/vector';
import React from 'react';

interface PhotoIdCardProps {
	step: string;
  setStep: (value: string) => void;
}

const PhotoIdCard: React.FC<PhotoIdCardProps> = ({
	step,
	setStep
}) => {
  return (
    <div className='w-full flex flex-col rounded-lg'>
			<div className='w-full flex justify-start items-center gap-4'>
				<Image
					src={ArrowTaillessLeft}
					alt='ArrowTaillessLeft'
					width={16}
					height={16}
				/>
				<Typography className='font-poppins font-semibold text-md'>
					Photo ID Card
				</Typography>
				<Typography className='font-poppins font-normal text-sm text-[#BDBDBD]'>
					1 of 4
				</Typography>
			</div>
			<div className='w-full flex mt-4 gap-4'>
				<div className={`h-[6px] w-full ${step !== 'id-card' ? 'bg-[#E9E9E9] hover:bg-seeds-button-green duration-300' : 'bg-seeds-button-green hover:bg-[#2da585] duration-300'} cursor-pointer`}/>
				<div className={`h-[6px] w-full ${step === 'id-card' ? 'bg-[#E9E9E9] hover:bg-seeds-button-green duration-300' : 'bg-seeds-button-green hover:bg-[#2da585] duration-300'} cursor-pointer`}/>
				<div className={`h-[6px] w-full ${step === 'id-card' ? 'bg-[#E9E9E9] hover:bg-seeds-button-green duration-300' : 'bg-seeds-button-green hover:bg-[#2da585] duration-300'} cursor-pointer`}/>
				<div className={`h-[6px] w-full ${step === 'id-card' ? 'bg-[#E9E9E9] hover:bg-seeds-button-green duration-300' : 'bg-seeds-button-green hover:bg-[#2da585] duration-300'} cursor-pointer`}/>
			</div>
			<Typography className='font-poppins font-semibold text-md text-seeds-button-green mt-4'>
				Upload your ID Card
			</Typography>
			<Typography className='font-poppins text-sm text-[#7C7C7C] mt-2'>
				To confirm you are, please upload digital photo or take a photo.
			</Typography>
			<div className='bg-[#F9F9F9] border-[1px] border-[#E9E9E9] rounded-lg mt-4 py-12'>
				<div className='flex flex-col justify-center items-center'>
					<Image
						src={SeedyDetective}
						alt='SeedyDetective'
						width={170}
						height={170}
					/>
					<div className='flex gap-4 mt-2'>
						<Button className="flex justify-center items-center gap-2 border-[1px] border-seeds-button-green capitalize font-poppins font-semibold text-sm text-seeds-button-green w-full h-[40px] bg-white rounded-full">
							<Image
								src={UploadIcon}
								alt='UploadIcon'
								width={18}
								height={18}
							/>
							<Typography>
								Upload
							</Typography>
						</Button>
						<Button className="flex justify-center items-center gap-2 border-[1px] border-seeds-button-green capitalize font-poppins font-semibold text-sm text-seeds-button-green w-full h-[40px] bg-white rounded-full">
							<Image
								src={CameraIcon}
								alt='CameraIcon'
								width={18}
								height={18}
							/>
							<Typography>
								Camera
							</Typography>
						</Button>
					</div>
				</div>
			</div>
			<div className='w-full flex justify-start items-center gap-2 my-4'>
				<Typography className='font-poppins font-semibold text-md'>
					Ketentuan mengunggah KTP
				</Typography>
				<Image
					src={WarningGreenIcon}
					alt='WarningGreenIcon'
					width={18}
					height={18}
				/>
			</div>
			<div className='text-[#BDBDBD]'>
				<ul>
					<li>Mengambil foto KTP langsung melalui kamera atau upload foto KTP.</li>
					<li>File yang diunggah harus dalam format <strong>JPG/JPEG</strong> dan maksimal <strong>4 MB</strong>.</li>
					<li>KTP tidak rusak seperti retak atau patah.</li>
					<li>Ambil foto KTP dengan posisi <strong>Landscape</strong>.</li>
					<li>Pastikan foto e-KTP jelas, tidak buram, pencahayaan cukup terang, dan tidak terpotong.</li>
				</ul>
			</div>
		</div>
  );
};

export default PhotoIdCard;