import MInput from '@/components/form-input/multi-input';
import { useDanamartInformation, useDeclarationsNPWP, useDeclarationsStatement, useGender, useInvestingPlan, useLastEducation, useMarriage, useReligion, useWorkingLength } from '@/components/form-input/multi-input/data/dropdown-data';
import useUpdateUserInfoForm, { type UserInfoFormData } from '@/hooks/danamart/useUpdateUserInfoForm';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { WarningGreenIcon } from 'public/assets/vector';
import React, { useState } from 'react';

interface AccountInformationProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  t: (key: string) => string;
}

const AccountInformation: React.FC<AccountInformationProps> = ({ 
  step, 
  setStep,
  t
}) => {
  const [isIdPermanent, setIsIdPermanent] = useState<boolean>(true);
  const pathTranslation = 'danamart.verification.accountInformation'

  const {
    handleSubmit,
    onSubmit,
    register,
    errors,
    control,
    watch
  } = useUpdateUserInfoForm();

  return (
    <div className="w-full flex flex-col rounded-lg">
      <div className="w-full flex justify-start items-center gap-2">
        <Typography className="font-poppins font-semibold text-xl text-seeds-button-green">
          {t(`${pathTranslation}.accountInformationTitle`)}
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
          label={t(`${pathTranslation}.text1`)}
          registerName="pernyataan"
          type="dropdown"
          control={control}
          errors={errors}
          options={useDeclarationsStatement()}
          rounded={false}
          fullWidth={true}
        />
      </div>
      <div className='w-full flex flex-col md:flex-row gap-2 mt-4'>
        <MInput
          label={t(`${pathTranslation}.text2`)}
          registerName="dm_penmit_01010"
          register={register}
          type="text"
          errors={errors}
          placeholder={t(`${pathTranslation}.text3`)}
          className='rounded-lg px-3 border border-[#BDBDBD]'
        />
        <MInput
          label={t(`${pathTranslation}.text4`)}
          registerName="dm_penmit_01003"
          register={register}
          type="text"
          errors={errors}
          placeholder={t(`${pathTranslation}.text5`)}
          className='rounded-lg px-3 border border-[#BDBDBD]'
        />
        <MInput
          label={t(`${pathTranslation}.text6`)}
          registerName="dm_penmit_01038"
          type="dropdown"
          control={control}
          errors={errors}
          options={useGender()}
          rounded={false}
          fullWidth={true}
        />
      </div>
      <div className='w-full flex flex-col md:flex-row gap-2 mt-4'>
        <MInput
          label={t(`${pathTranslation}.text7`)}
          registerName="dm_penmit_01006"
          register={register}
          type="text"
          errors={errors}
          placeholder={t(`${pathTranslation}.text8`)}
          className='rounded-lg px-3 border border-[#BDBDBD]'
        />
        <MInput
          label={t(`${pathTranslation}.text9`)}
          registerName="dm_penmit_01007"
          register={register}
          type="datetime-local"
          errors={errors}
          className='rounded-lg px-3 border border-[#BDBDBD]'
        />
        <MInput
          label={t(`${pathTranslation}.text10`)}
          registerName="dm_penmit_01015"
          type="dropdown"
          control={control}
          errors={errors}
          options={useReligion()}
          rounded={false}
          fullWidth={true}
        />
      </div>
      <div className='w-full flex flex-col md:flex-row gap-2 mt-4'>
        <MInput
          label={t(`${pathTranslation}.text11`)}
          registerName="dm_penmit_01027"
          type="dropdown"
          control={control}
          errors={errors}
          options={useLastEducation()}
          rounded={false}
          fullWidth={true}
        />
        <MInput
          label={t(`${pathTranslation}.text12`)}
          registerName="dm_penmit_01026"
          type="dropdown"
          control={control}
          errors={errors}
          options={useMarriage()}
          rounded={false}
          fullWidth={true}
        />
      </div>
      {
        (watch("dm_penmit_01026") === "Kawin") &&
          <div className='w-full flex flex-col md:flex-row gap-2 mt-4'>
            <MInput
              label={t(`${pathTranslation}.text13`)}
              registerName="namaPasangan"
              register={register}
              type="text"
              errors={errors}
              placeholder={t(`${pathTranslation}.text14`)}
              className='rounded-lg px-3 border border-[#BDBDBD]'
            />
          </div>
      }
      <Typography className="font-poppins font-semibold text-xl text-seeds-button-green my-4">
        {t(`${pathTranslation}.occupation`)}
      </Typography>
      <div className='w-full flex flex-col md:flex-row gap-2'>
        <MInput
          label={t(`${pathTranslation}.text15`)}
          registerName="dm_penmit_01029"
          register={register}
          type="text"
          errors={errors}
          placeholder={t(`${pathTranslation}.text16`)}
          className='rounded-lg px-3 border border-[#BDBDBD]'
        />
        <MInput
          label={t(`${pathTranslation}.text17`)}
          registerName="dm_penmit_01039"
          register={register}
          type="text"
          errors={errors}
          placeholder={t(`${pathTranslation}.text18`)}
          className='rounded-lg px-3 border border-[#BDBDBD]'
        />
        <MInput
          label={t(`${pathTranslation}.text19`)}
          registerName="dm_penmit_01040"
          type="dropdown"
          control={control}
          errors={errors}
          options={useWorkingLength()}
          rounded={false}
          fullWidth={true}
        />
      </div>
      <div className='w-full flex flex-col md:flex-row gap-2 mt-4'>
        <MInput
          label={t(`${pathTranslation}.text20`)}
          registerName="alamat_tmpt_kerja"
          register={register}
          type="text"
          errors={errors}
          placeholder={t(`${pathTranslation}.text21`)}
          className='rounded-lg px-3 border border-[#BDBDBD]'
        />
        <MInput
          label={t(`${pathTranslation}.text22`)}
          type="number"
          registerName="telepon_tmpt_kerja"
          placeholder={t(`${pathTranslation}.text23`)}
          errors={errors}
          control={control}
          watch={watch}
        />
      </div>
      <div className="w-full flex justify-start items-center gap-2 mt-4">
        <Typography className="font-poppins font-semibold text-xl text-seeds-button-green">
          {t(`${pathTranslation}.address`)}
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
          label={t(`${pathTranslation}.text24`)}
          registerName="dm_penmit_01032"
          register={register}
          type="text"
          errors={errors}
          placeholder={t(`${pathTranslation}.text24`)}
          className='rounded-lg px-3 border border-[#BDBDBD]'
        />
      </div>
      <div className='w-full flex flex-col md:flex-row gap-2 mt-4'>
        <MInput
          label={t(`${pathTranslation}.text26`)}
          registerName="dm_penmit_01019rt"
          register={register}
          type="text"
          errors={errors}
          placeholder={t(`${pathTranslation}.text27`)}
          className='rounded-lg px-3 border border-[#BDBDBD]'
        />
        <MInput
          label={t(`${pathTranslation}.text28`)}
          registerName="dm_penmit_01019rw"
          register={register}
          type="text"
          errors={errors}
          placeholder={t(`${pathTranslation}.text29`)}
          className='rounded-lg px-3 border border-[#BDBDBD]'
        />
        <MInput
          label={t(`${pathTranslation}.text30`)}
          registerName="dm_penmit_01037"
          register={register}
          type="text"
          errors={errors}
          placeholder={t(`${pathTranslation}.text31`)}
          className='rounded-lg px-3 border border-[#BDBDBD]'
        />
      </div>
      <div className='w-full flex flex-col md:flex-row gap-2 mt-4'>
        <MInput
          label={t(`${pathTranslation}.text32`)}
          registerName="dm_penmit_01036"
          register={register}
          type="text"
          errors={errors}
          placeholder={t(`${pathTranslation}.text33`)}
          className='rounded-lg px-3 border border-[#BDBDBD]'
        />
        <MInput
          label={t(`${pathTranslation}.text34`)}
          registerName="dm_penmit_01035"
          register={register}
          type="text"
          errors={errors}
          placeholder={t(`${pathTranslation}.text35`)}
          className='rounded-lg px-3 border border-[#BDBDBD]'
        />
        <MInput
          label={t(`${pathTranslation}.text36`)}
          registerName="dm_penmit_01034"
          register={register}
          type="text"
          errors={errors}
          placeholder={t(`${pathTranslation}.text37`)}
          className='rounded-lg px-3 border border-[#BDBDBD]'
        />
      </div>
      <div className='w-full flex flex-col md:flex-row gap-2 mt-4'>
        <MInput
          label={t(`${pathTranslation}.text38`)}
          registerName="dm_penmit_01033"
          register={register}
          type="text"
          errors={errors}
          placeholder={t(`${pathTranslation}.text39`)}
          className='rounded-lg px-3 border border-[#BDBDBD]'
        />
        <MInput
          label={t(`${pathTranslation}.text40`)}
          registerName="dm_penmit_01017"
          register={register}
          type="text"
          errors={errors}
          placeholder={t(`${pathTranslation}.text41`)}
          className='rounded-lg px-3 border border-[#BDBDBD]'
        />
        <MInput
          label={t(`${pathTranslation}.text42`)}
          registerName="dm_penmit_01008"
          register={register}
          type="text"
          errors={errors}
          placeholder={t(`${pathTranslation}.text43`)}
          className='rounded-lg px-3 border border-[#BDBDBD]'
        />
      </div>
      <div className="w-full flex flex-col justify-start items-center gap-2 mt-4">
        <div className="w-full flex justify-start items-center gap-2 mt-4">
          <Typography className="font-poppins font-semibold text-xl text-seeds-button-green">
            {t(`${pathTranslation}.text44`)}
          </Typography>
          <Image
            src={WarningGreenIcon}
            alt="WarningGreenIcon"
            width={20}
            height={20}
          />
        </div>
        <div className='w-full flex justify-start items-center gap-2'>
          <input
            id="checkboxAll"
            type="checkbox"
            className="w-5 h-5 shrink-0 appearance-none rounded-md border-2 checked:border-none checked:bg-[#3AC4A0] disabled:checked:!bg-[#727272] relative after:checked:content-[' '] after:checked:absolute after:checked:w-2 after:checked:h-3 after:checked:border after:checked:border-white after:checked:border-t-0 after:checked:border-e-[3px] after:checked:border-b-[3px] after:checked:border-s-0 after:checked:rotate-45 after:checked:top-0.5 after:checked:left-1/2 after:checked:-translate-x-1/2 cursor-pointer peer"
            checked={isIdPermanent}
            onChange={() => { setIsIdPermanent(!isIdPermanent); }}
          />
          <Typography
            onClick={() => { setIsIdPermanent(!isIdPermanent); }}
            className='font-poppins text-sm font-medium cursor-pointer'>{t(`${pathTranslation}.text60`)}
          </Typography>
        </div>
        {
          !isIdPermanent &&
            <MInput
              label={t(`${pathTranslation}.text45`)}
              registerName="dm_penmit_01018"
              register={register}
              disabled={isIdPermanent}
              type="datetime-local"
              errors={errors}
              className='rounded-lg px-3 border border-[#BDBDBD]'
            />
        }
      </div>
      <Typography className="font-poppins font-semibold text-xl text-seeds-button-green my-4">
        {t(`${pathTranslation}.others`)}
      </Typography>
      <div className='w-full flex flex-col md:flex-row gap-2'>
        <MInput
          label={t(`${pathTranslation}.text46`)}
          registerName="dm_penmit_01022"
          register={register}
          type="text"
          errors={errors}
          placeholder={t(`${pathTranslation}.text47`)}
          className='rounded-lg px-3 border border-[#BDBDBD]'
        />
        <MInput
          label={t(`${pathTranslation}.text48`)}
          registerName="dm_penmit_01041"
          register={register}
          type="text"
          errors={errors}
          placeholder={t(`${pathTranslation}.text49`)}
          className='rounded-lg px-3 border border-[#BDBDBD]'
        />
      </div>
      <div className='w-full flex flex-col md:flex-row gap-2 mt-4'>
        <MInput
          label={t(`${pathTranslation}.text50`)}
          type="number"
          registerName="dm_penmit_01042"
          placeholder={t(`${pathTranslation}.text51`)}
          errors={errors}
          control={control}
          watch={watch}
        />
        <MInput
          label={t(`${pathTranslation}.text52`)}
          registerName="dm_pen_08002"
          type="dropdown"
          control={control}
          errors={errors}
          options={useInvestingPlan()}
          rounded={false}
          fullWidth={true}
        />
        <MInput
          label={t(`${pathTranslation}.text53`)}
          registerName="dm_pen_08009"
          type="dropdown"
          control={control}
          errors={errors}
          options={useDanamartInformation()}
          rounded={false}
          fullWidth={true}
        />
      </div>
      <div className='w-full flex flex-col md:flex-row gap-2 mt-4'>
        <MInput
          label={t(`${pathTranslation}.text54`)}
          registerName="pernyataan_npwp"
          type="dropdown"
          control={control}
          errors={errors}
          options={useDeclarationsNPWP()}
          rounded={false}
          fullWidth={true}
        />
      </div>
      {
        (watch("pernyataan_npwp") === '0') &&
          <div className='w-full flex flex-col md:flex-row gap-2 mt-4'>
            <MInput
              label={t(`${pathTranslation}.text55`)}
              registerName="dm_penmit_01012"
              register={register}
              type="text"
              errors={errors}
              placeholder={t(`${pathTranslation}.text56`)}
              className='rounded-lg px-3 border border-[#BDBDBD]'
            />
            <MInput
              label={t(`${pathTranslation}.text57`)}
              registerName="dm_penmit_01045"
              register={register}
              type="datetime-local"
              errors={errors}
              placeholder={t(`${pathTranslation}.text58`)}
              className='rounded-lg px-3 border border-[#BDBDBD]'
            />
          </div>
      }
      <Button
        className="w-full text-base font-semibold bg-seeds-button-green mt-6 rounded-full capitalize"
        onClick={() => {
          handleSubmit((data: UserInfoFormData) => {
            onSubmit(data).then(() => {
              setStep(step + 1);
            })
          })();
        }}
      >
        {t(`${pathTranslation}.text59`)}
      </Button>
    </div>
  );
};

export default AccountInformation;