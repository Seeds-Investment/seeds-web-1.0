import MInput from '@/components/form-input/multi-input';
import { answer, education, gender, marriage, religion } from '@/components/form-input/multi-input/data/dropdown-data';
import useUpdateUserInfoForm from '@/hooks/danamart/useUpdateUserInfoForm';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { WarningGreenIcon } from 'public/assets/vector';
import React, { useState } from 'react';

interface AccountInformationProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const AccountInformation: React.FC<AccountInformationProps> = ({ 
  step, 
  setStep
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isIdForever, setIsIdForever] = useState<boolean>(true);
  const {
    handleSubmit,
    register,
    errors,
    control
  } = useUpdateUserInfoForm();
  return (
    <div className="w-full flex flex-col rounded-lg">
      <div className="w-full flex justify-start items-center gap-2">
        <Typography className="font-poppins font-semibold text-xl text-seeds-button-green">
          Pribadi
        </Typography>
        <Image
          src={WarningGreenIcon}
          alt="WarningGreenIcon"
          width={20}
          height={20}
        />
      </div>
      <div className='w-full flex gap-2 mt-4'>
        <MInput
          label="Apakah data di bawah sudah sesuai?"
          registerName="location_name"
          type="dropdown"
          control={control}
          errors={errors}
          options={answer}
          rounded={false}
          fullWidth={true}
        />
      </div>
      <div className='w-full flex flex-col md:flex-row gap-2 mt-4'>
        <MInput
          label="NO KTP"
          registerName="name_promo_code"
          register={register}
          type="text"
          errors={errors}
          placeholder="Please input event name"
          className='rounded-lg px-3 border border-[#BDBDBD]'
        />
        <MInput
          label="Nama Lengkap"
          registerName="name_promo_code"
          register={register}
          type="text"
          errors={errors}
          placeholder="Please input your full name"
          className='rounded-lg px-3 border border-[#BDBDBD]'
        />
        <MInput
          label="Jenis Kelamin"
          registerName="location_name"
          type="dropdown"
          control={control}
          errors={errors}
          options={gender}
          rounded={false}
          fullWidth={true}
        />
      </div>
      <div className='w-full flex flex-col md:flex-row gap-2 mt-4'>
        <MInput
          label="Tempat Lahir"
          registerName="name_promo_code"
          register={register}
          type="text"
          errors={errors}
          placeholder="Please input event name"
          className='rounded-lg px-3 border border-[#BDBDBD]'
        />
        <MInput
          label="Tanggal Lahir"
          registerName="name_promo_code"
          register={register}
          type="datetime-local"
          errors={errors}
          placeholder="Please input your full name"
          className='rounded-lg px-3 border border-[#BDBDBD]'
        />
        <MInput
          label="Agama"
          registerName="location_name"
          type="dropdown"
          control={control}
          errors={errors}
          options={religion}
          rounded={false}
          fullWidth={true}
        />
      </div>
      <div className='w-full flex flex-col md:flex-row gap-2 mt-4'>
        <MInput
          label="Pendidikan Terakhir"
          registerName="location_name"
          type="dropdown"
          control={control}
          errors={errors}
          options={education}
          rounded={false}
          fullWidth={true}
        />
        <MInput
          label="Status Perkawinan"
          registerName="location_name"
          type="dropdown"
          control={control}
          errors={errors}
          options={marriage}
          rounded={false}
          fullWidth={true}
        />
      </div>
      <Typography className="font-poppins font-semibold text-xl text-seeds-button-green my-4">
        Pekerjaan
      </Typography>
      <div className='w-full flex flex-col md:flex-row gap-2'>
        <MInput
          label="Pekerjaan"
          registerName="name_promo_code"
          register={register}
          type="text"
          errors={errors}
          placeholder="Please input your occupation"
          className='rounded-lg px-3 border border-[#BDBDBD]'
        />
        <MInput
          label="Bidang Pekerjaan"
          registerName="name_promo_code"
          register={register}
          type="text"
          errors={errors}
          placeholder="Please input occupation type"
          className='rounded-lg px-3 border border-[#BDBDBD]'
        />
        <MInput
          label="Lama Bekerja"
          registerName="name_promo_code"
          register={register}
          type="text"
          errors={errors}
          placeholder="Please input your employment duration"
          className='rounded-lg px-3 border border-[#BDBDBD]'
        />
      </div>
      <div className='w-full flex flex-col md:flex-row gap-2 mt-4'>
        <MInput
          label="Alamat Kantor"
          registerName="name_promo_code"
          register={register}
          type="text"
          errors={errors}
          placeholder="Please input your office address"
          className='rounded-lg px-3 border border-[#BDBDBD]'
        />
        <MInput
          label="Nomor Telepon Tempat Bekerja"
          registerName="name_promo_code"
          register={register}
          type="text"
          errors={errors}
          placeholder="Please input your office number"
          className='rounded-lg px-3 border border-[#BDBDBD]'
        />
      </div>
      <div className="w-full flex justify-start items-center gap-2 mt-4">
        <Typography className="font-poppins font-semibold text-xl text-seeds-button-green">
          Alamat
        </Typography>
        <Image
          src={WarningGreenIcon}
          alt="WarningGreenIcon"
          width={20}
          height={20}
        />
      </div>
      <div className='w-full flex gap-2 mt-4'>
        <MInput
          label="Alamat"
          registerName="name_promo_code"
          register={register}
          type="text"
          errors={errors}
          placeholder="Please input your address"
          className='rounded-lg px-3 border border-[#BDBDBD]'
        />
      </div>
      <div className='w-full flex flex-col md:flex-row gap-2 mt-4'>
        <MInput
          label="RT"
          registerName="name_promo_code"
          register={register}
          type="text"
          errors={errors}
          placeholder="Please input your occupation"
          className='rounded-lg px-3 border border-[#BDBDBD]'
        />
        <MInput
          label="RW"
          registerName="name_promo_code"
          register={register}
          type="text"
          errors={errors}
          placeholder="Please input occupation type"
          className='rounded-lg px-3 border border-[#BDBDBD]'
        />
        <MInput
          label="Kelurahan"
          registerName="name_promo_code"
          register={register}
          type="text"
          errors={errors}
          placeholder="Please input your employment duration"
          className='rounded-lg px-3 border border-[#BDBDBD]'
        />
      </div>
      <div className='w-full flex flex-col md:flex-row gap-2 mt-4'>
        <MInput
          label="Kecamatan"
          registerName="name_promo_code"
          register={register}
          type="text"
          errors={errors}
          placeholder="Please input your occupation"
          className='rounded-lg px-3 border border-[#BDBDBD]'
        />
        <MInput
          label="Kabupaten"
          registerName="name_promo_code"
          register={register}
          type="text"
          errors={errors}
          placeholder="Please input occupation type"
          className='rounded-lg px-3 border border-[#BDBDBD]'
        />
        <MInput
          label="Provinsi"
          registerName="name_promo_code"
          register={register}
          type="text"
          errors={errors}
          placeholder="Please input your employment duration"
          className='rounded-lg px-3 border border-[#BDBDBD]'
        />
      </div>
      <div className='w-full flex flex-col md:flex-row gap-2 mt-4'>
        <MInput
          label="Kode POS"
          registerName="name_promo_code"
          register={register}
          type="text"
          errors={errors}
          placeholder="Please input your occupation"
          className='rounded-lg px-3 border border-[#BDBDBD]'
        />
        <MInput
          label="Kota Penerbit KTP"
          registerName="name_promo_code"
          register={register}
          type="text"
          errors={errors}
          placeholder="Please input occupation type"
          className='rounded-lg px-3 border border-[#BDBDBD]'
        />
        <MInput
          label="Kewarganegaraan"
          registerName="name_promo_code"
          register={register}
          type="text"
          errors={errors}
          placeholder="Please input your employment duration"
          className='rounded-lg px-3 border border-[#BDBDBD]'
        />
      </div>
      <div className="w-full flex flex-col justify-start items-center gap-2 mt-4">
        <div className="w-full flex justify-start items-center gap-2 mt-4">
          <Typography className="font-poppins font-semibold text-xl text-seeds-button-green">
            Masa Berlaku KTP
          </Typography>
          <Image
            src={WarningGreenIcon}
            alt="WarningGreenIcon"
            width={20}
            height={20}
          />
        </div>
        <MInput
          labelCheckbox="Seumur Hidup"
          type="checkbox"
          value="E-CERTIFICATE"
          registerName="reward"
          register={register}
          errors={errors}
        />
        <MInput
          label="Tanggal Masa Berlaku KTP"
          registerName="name_promo_code"
          register={register}
          disabled={isIdForever}
          type="datetime-local"
          errors={errors}
          placeholder="Please input your full name"
          className='rounded-lg px-3 border border-[#BDBDBD]'
        />
      </div>
      <Typography className="font-poppins font-semibold text-xl text-seeds-button-green my-4">
        Lainnya
      </Typography>
      <div className='w-full flex flex-col md:flex-row gap-2'>
        <MInput
          label="Nama Ibu Kandung"
          registerName="name_promo_code"
          register={register}
          type="text"
          errors={errors}
          placeholder="Please input your occupation"
          className='rounded-lg px-3 border border-[#BDBDBD]'
        />
        <MInput
          label="Nama Ahli Waris"
          registerName="name_promo_code"
          register={register}
          type="text"
          errors={errors}
          placeholder="Please input occupation type"
          className='rounded-lg px-3 border border-[#BDBDBD]'
        />
        <MInput
          label="Hubungan dengan Ahli Waris"
          registerName="name_promo_code"
          register={register}
          type="text"
          errors={errors}
          placeholder="Please input your employment duration"
          className='rounded-lg px-3 border border-[#BDBDBD]'
        />
      </div>
      <div className='w-full flex flex-col md:flex-row gap-2 mt-4'>
        <MInput
          label="Nomor Telepon"
          registerName="name_promo_code"
          register={register}
          type="text"
          errors={errors}
          placeholder="Please input your occupation"
          className='rounded-lg px-3 border border-[#BDBDBD]'
        />
        <MInput
          label="Tujuan Investasi"
          registerName="name_promo_code"
          register={register}
          type="text"
          errors={errors}
          placeholder="Please input occupation type"
          className='rounded-lg px-3 border border-[#BDBDBD]'
        />
        <MInput
          label="Sumber Informasi Danamart"
          registerName="name_promo_code"
          register={register}
          type="text"
          errors={errors}
          placeholder="Please input your employment duration"
          className='rounded-lg px-3 border border-[#BDBDBD]'
        />
      </div>
      <div className='w-full flex flex-col md:flex-row gap-2 mt-4'>
        <MInput
          label="Apakah kamu mempunyai NPWP?"
          registerName="name_promo_code"
          type="dropdown"
          control={control}
          errors={errors}
          options={answer}
          rounded={false}
          fullWidth={true}
        />
        <MInput
          label="NPWP"
          registerName="name_promo_code"
          register={register}
          type="text"
          errors={errors}
          placeholder="Please input your employment duration"
          className='rounded-lg px-3 border border-[#BDBDBD]'
        />
      </div>
      <Button
        className="w-full text-base font-semibold bg-seeds-button-green mt-6 rounded-full capitalize"
        onClick={async () => {
          handleSubmit();
        }}
      >
        Save
      </Button>
    </div>
  );
};

export default AccountInformation;