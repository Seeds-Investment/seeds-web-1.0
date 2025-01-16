import MInput from '@/components/form-input/multi-input';
import { answer } from '@/components/form-input/multi-input/data/dropdown-data';
import useUpdateUserInfoForm from '@/hooks/danamart/useUpdateUserInfoForm';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { WarningGreenIcon } from 'public/assets/vector';
import React from 'react';

interface FinancialInformationProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const FinancialInformation: React.FC<FinancialInformationProps> = ({ 
  step, 
  setStep
}) => {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleSubmit,
    register,
    errors,
    control
  } = useUpdateUserInfoForm();
  return (
    <div className="w-full flex flex-col rounded-lg">
      <div className="w-full flex justify-start items-center gap-2">
        <Typography className="font-poppins font-semibold text-xl text-seeds-button-green">
          Pendapatan
        </Typography>
        <Image
          src={WarningGreenIcon}
          alt="WarningGreenIcon"
          width={20}
          height={20}
        />
      </div>
      <div className='w-full flex flex-col md:flex-row gap-2 mt-4'>
        <MInput
          label="Sumber Penghasilan"
          registerName="name_promo_code"
          register={register}
          type="text"
          errors={errors}
          placeholder="Please input income source"
          className='rounded-lg px-3 border border-[#BDBDBD]'
        />
        <MInput
          label="Penghasilan Per Bulan"
          registerName="name_promo_code"
          register={register}
          type="text"
          errors={errors}
          placeholder="Please input your monthly income"
          className='rounded-lg px-3 border border-[#BDBDBD]'
        />
      </div>
      <div className='w-full flex flex-col md:flex-row gap-2 mt-4'>
        <MInput
          labelCheckbox="Saya menyatakan bahwa data penghasilan yang saya isikan ini adalah benar dan akurat sesuai dengan kondisi keuangan saya saat ini."
          type="checkbox"
          value="E-CERTIFICATE"
          registerName="reward"
          register={register}
          errors={errors}
        />
      </div>
      <Typography className="font-poppins font-semibold text-xl text-seeds-button-green my-4">
        Informasi Bank
      </Typography>
      <div className='w-full flex flex-col md:flex-row gap-2'>
        <MInput
          label="Nama Pemilik Rekening"
          registerName="name_promo_code"
          register={register}
          type="text"
          errors={errors}
          placeholder="Please input event name"
          className='rounded-lg px-3 border border-[#BDBDBD]'
        />
        <MInput
          label="No. Rekening"
          registerName="name_promo_code"
          register={register}
          type="datetime-local"
          errors={errors}
          placeholder="Please input your full name"
          className='rounded-lg px-3 border border-[#BDBDBD]'
        />
        <MInput
          label="Nama Bank"
          registerName="location_name"
          register={register}
          type="datetime-local"
          errors={errors}
          placeholder="Please input your full name"
          className='rounded-lg px-3 border border-[#BDBDBD]'
        />
      </div>
      <div className="w-full flex justify-start items-center gap-2 my-4">
        <Typography className="font-poppins font-semibold text-xl text-seeds-button-green">
          Informasi SID
        </Typography>
        <Image
          src={WarningGreenIcon}
          alt="WarningGreenIcon"
          width={20}
          height={20}
        />
      </div>
      <MInput
        label="Apakah sudah memiliki rekening efek?*"
        registerName="location_name"
        type="dropdown"
        control={control}
        errors={errors}
        options={answer}
        rounded={false}
        fullWidth={true}
      />
      <Typography className="font-poppins font-semibold text-xl text-seeds-button-green my-4">
        Informasi Beneficial Owner
      </Typography>
      <MInput
        label="Apakah Terdapat Pemilik Manfaat (Beneficial Owner)?"
        registerName="location_name"
        type="dropdown"
        control={control}
        errors={errors}
        options={answer}
        rounded={false}
        fullWidth={true}
      />
      <Button
        className="w-full text-base font-semibold bg-seeds-button-green mt-6 rounded-full capitalize"
        onClick={async () => {
          setStep((prevStep) => prevStep + 1);
        }}
      >
        Save
      </Button>
    </div>
  );
};

export default FinancialInformation;