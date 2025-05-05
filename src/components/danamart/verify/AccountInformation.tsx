import MInput from '@/components/form-input/multi-input';
import {
  useDanamartInformation,
  useDeclarationsNPWP,
  useDeclarationsStatement,
  useGender,
  useInvestmentGoals,
  useJobDetailList,
  useJobList,
  useLastEducation,
  useMarriageStatus,
  useReligion,
  useWorkingLength
} from '@/components/form-input/multi-input/data/dropdown-data';
import useUpdateUserInfoForm, {
  type UserInfoFormData
} from '@/hooks/danamart/useUpdateUserInfoForm';
import { getUserInformation } from '@/repository/danamart/danamart.repository';
import { type AccountVerification } from '@/utils/interfaces/danamart.interface';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { WarningGreenIcon } from 'public/assets/vector';
import React, { useEffect, useState } from 'react';
import { FaRegCheckCircle, FaRegTrashAlt } from 'react-icons/fa';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';

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
  const { handleSubmit, onSubmit, register, errors, control, watch, setValue } =
    useUpdateUserInfoForm();

  const permanentId = watch('masa_berlaku');
  const imageURL = watch('dm_penmit_01013');
  const isMarried = watch('dm_penmit_01026');
  const pathTranslation = 'danamart.verification.accountInformation';
  const [userInformation, setUserInformation] = useState<AccountVerification>();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, isUploading] = useState<boolean>(false);

  const handleSwitchChange = (): void => {
    if (permanentId === true) {
      setValue('masa_berlaku', false);
    } else {
      setValue('masa_berlaku', true);
      setValue('dm_penmit_01018', '2099-01-01');
    }
  };

  const fetchDataUserInformation = async (): Promise<void> => {
    try {
      const response = await getUserInformation();
      setUserInformation(response);
    } catch (error) {
      toast.error(`Error fetching data Photo Selfie`);
    }
  };

  useEffect(() => {
    if (step === 2) {
      void fetchDataUserInformation();
    }
  }, [step, uploading]);

  useEffect(() => {
    if (isMarried === 'single') {
      setValue('namaPasangan', '');
    }
  }, [isMarried]);

  useEffect(() => {
    setValue('pernyataan', userInformation?.penmit?.pernyataan);
    setValue('dm_penmit_01010', userInformation?.penmit?.dm_penmit_01010);
    setValue('dm_penmit_01003', userInformation?.penmit?.dm_penmit_01003);
    setValue('dm_penmit_01038', userInformation?.penmit?.dm_penmit_01038);
    setValue('dm_penmit_01006', userInformation?.penmit?.dm_penmit_01006);
    setValue('dm_penmit_01007', userInformation?.penmit?.dm_penmit_01007);
    setValue('dm_penmit_01015', userInformation?.penmit?.dm_penmit_01015);
    setValue('dm_penmit_01027', userInformation?.penmit?.dm_penmit_01027);
    setValue('dm_penmit_01026', userInformation?.penmit?.dm_penmit_01026);
    if (userInformation?.penmit?.dm_penmit_01026 !== '') {
      setValue('namaPasangan', userInformation?.penmit?.nama_pasangan);
    }
    setValue('dm_penmit_01029', userInformation?.penmit?.dm_penmit_01029);
    setValue('dm_penmit_01039', userInformation?.penmit?.dm_penmit_01039);
    setValue('dm_penmit_01040', userInformation?.penmit?.dm_penmit_01040);
    setValue('alamat_tmpt_kerja', userInformation?.penmit?.alamat_tmpt_kerja);
    setValue('telepon_tmpt_kerja', userInformation?.penmit?.telepon_tmpt_kerja);
    setValue('dm_penmit_01032', userInformation?.penmit?.dm_penmit_01032);
    setValue(
      'dm_penmit_01019rt',
      userInformation?.penmit?.dm_penmit_01019?.substring(0, 3)
    );
    setValue(
      'dm_penmit_01019rw',
      userInformation?.penmit?.dm_penmit_01019?.substring(4, 7)
    );
    setValue('dm_penmit_01037', userInformation?.penmit?.dm_penmit_01037);
    setValue('dm_penmit_01036', userInformation?.penmit?.dm_penmit_01036);
    setValue('dm_penmit_01035', userInformation?.penmit?.dm_penmit_01035);
    setValue('dm_penmit_01034', userInformation?.penmit?.dm_penmit_01034);
    setValue('dm_penmit_01033', userInformation?.penmit?.dm_penmit_01033);
    setValue('dm_penmit_01017', userInformation?.penmit?.dm_penmit_01017);
    setValue('dm_penmit_01008', userInformation?.penmit?.dm_penmit_01008);
    if (userInformation?.penmit?.dm_penmit_01018 === '2099-01-01') {
      setValue('masa_berlaku', true);
      setValue('dm_penmit_01018', userInformation?.penmit?.dm_penmit_01018);
    } else {
      setValue('masa_berlaku', false);
    }
    setValue('dm_penmit_01022', userInformation?.penmit?.dm_penmit_01022);
    setValue('dm_penmit_01041', userInformation?.penmit?.dm_penmit_01041);
    setValue('dm_penmit_01042', userInformation?.penmit?.dm_penmit_01042);
    setValue('dm_pen_08002', userInformation?.resiko?.dm_pen_08002);
    setValue('dm_pen_08009', userInformation?.resiko?.dm_pen_08009);
    setValue('pernyataan_npwp', userInformation?.penmit?.pernyataan_npwp);
    if (userInformation?.penmit?.pernyataan_npwp === '1') {
      setValue('dm_penmit_01012', userInformation?.penmit?.dm_penmit_01012);
      setValue('dm_penmit_01045', userInformation?.penmit?.dm_penmit_01045);
      setValue('dm_penmit_01013', userInformation?.penmit?.dm_penmit_01013);
    }
  }, [userInformation]);
  
  useEffect(() => {
    if ((Boolean(imageURL)) && imageURL.length > 0) {
      const file = imageURL[0];

      if (file instanceof File) {
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);

        return () => {
          URL.revokeObjectURL(objectUrl);
        };
      }
    }
  }, [imageURL]);

  const handleRemoveAccessCard = (): void => {
    setPreviewUrl(null)
    setValue('dm_penmit_01013', userInformation?.penmit?.dm_penmit_01013);
  }

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
      <div className="w-full flex gap-2 mt-4">
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
      <div className="w-full flex flex-col md:flex-row gap-2 mt-4">
        <MInput
          label={t(`${pathTranslation}.text2`)}
          registerName="dm_penmit_01010"
          type="long-number"
          errors={errors}
          placeholder={t(`${pathTranslation}.text3`)}
          control={control}
          watch={watch}
        />
        <MInput
          label={t(`${pathTranslation}.text4`)}
          registerName="dm_penmit_01003"
          register={register}
          type="text"
          errors={errors}
          placeholder={t(`${pathTranslation}.text5`)}
          className="rounded-lg px-3 border border-[#BDBDBD]"
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
      <div className="w-full flex flex-col md:flex-row gap-2 mt-4">
        <MInput
          label={t(`${pathTranslation}.text7`)}
          registerName="dm_penmit_01006"
          register={register}
          type="text"
          errors={errors}
          placeholder={t(`${pathTranslation}.text8`)}
          className="rounded-lg px-3 border border-[#BDBDBD]"
        />
        <MInput
          label={t(`${pathTranslation}.text9`)}
          registerName="dm_penmit_01007"
          register={register}
          type="date"
          errors={errors}
          className="rounded-lg px-3 border border-[#BDBDBD]"
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
      <div className="w-full flex flex-col md:flex-row gap-2 mt-4">
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
          options={useMarriageStatus()}
          rounded={false}
          fullWidth={true}
        />
      </div>
      {watch('dm_penmit_01026') === 'married' && (
        <div className="w-full flex flex-col md:flex-row gap-2 mt-4">
          <MInput
            label={t(`${pathTranslation}.text13`)}
            registerName="namaPasangan"
            register={register}
            type="text"
            errors={errors}
            placeholder={t(`${pathTranslation}.text14`)}
            className="rounded-lg px-3 border border-[#BDBDBD]"
          />
        </div>
      )}
      <Typography className="font-poppins font-semibold text-xl text-seeds-button-green my-4">
        {t(`${pathTranslation}.occupation`)}
      </Typography>
      <div className="w-full flex flex-col md:flex-row gap-2">
        <MInput
          label={t(`${pathTranslation}.text15`)}
          registerName="dm_penmit_01029"
          type="dropdown"
          control={control}
          errors={errors}
          options={useJobList()}
          rounded={false}
          fullWidth={true}
        />
        <MInput
          label={t(`${pathTranslation}.text17`)}
          registerName="dm_penmit_01039"
          type="dropdown"
          control={control}
          errors={errors}
          options={useJobDetailList()}
          rounded={false}
          fullWidth={true}
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
      <div className="w-full flex flex-col md:flex-row gap-2 mt-4">
        <MInput
          label={t(`${pathTranslation}.text20`)}
          registerName="alamat_tmpt_kerja"
          register={register}
          type="text"
          errors={errors}
          placeholder={t(`${pathTranslation}.text21`)}
          className="rounded-lg px-3 border border-[#BDBDBD]"
        />
        <MInput
          label={t(`${pathTranslation}.text22`)}
          registerName="telepon_tmpt_kerja"
          type="long-number"
          errors={errors}
          placeholder={t(`${pathTranslation}.text23`)}
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
      <div className="w-full flex gap-2 mt-4">
        <MInput
          label={t(`${pathTranslation}.text24`)}
          registerName="dm_penmit_01032"
          register={register}
          type="text"
          errors={errors}
          placeholder={t(`${pathTranslation}.text25`)}
          className="rounded-lg px-3 border border-[#BDBDBD]"
        />
      </div>
      <div className="w-full flex flex-col md:flex-row gap-2 mt-4">
        <MInput
          label={t(`${pathTranslation}.text26`)}
          registerName="dm_penmit_01019rt"
          type="long-number"
          errors={errors}
          placeholder={t(`${pathTranslation}.text27`)}
          control={control}
          watch={watch}
          maxLength={3}
        />
        <MInput
          label={t(`${pathTranslation}.text28`)}
          registerName="dm_penmit_01019rw"
          type="long-number"
          errors={errors}
          placeholder={t(`${pathTranslation}.text29`)}
          control={control}
          watch={watch}
          maxLength={3}
        />
        <MInput
          label={t(`${pathTranslation}.text30`)}
          registerName="dm_penmit_01037"
          register={register}
          type="text"
          errors={errors}
          placeholder={t(`${pathTranslation}.text31`)}
          className="rounded-lg px-3 border border-[#BDBDBD]"
        />
      </div>
      <div className="w-full flex flex-col md:flex-row gap-2 mt-4">
        <MInput
          label={t(`${pathTranslation}.text32`)}
          registerName="dm_penmit_01036"
          register={register}
          type="text"
          errors={errors}
          placeholder={t(`${pathTranslation}.text33`)}
          className="rounded-lg px-3 border border-[#BDBDBD]"
        />
        <MInput
          label={t(`${pathTranslation}.text34`)}
          registerName="dm_penmit_01035"
          register={register}
          type="text"
          errors={errors}
          placeholder={t(`${pathTranslation}.text35`)}
          className="rounded-lg px-3 border border-[#BDBDBD]"
        />
        <MInput
          label={t(`${pathTranslation}.text36`)}
          registerName="dm_penmit_01034"
          register={register}
          type="text"
          errors={errors}
          placeholder={t(`${pathTranslation}.text37`)}
          className="rounded-lg px-3 border border-[#BDBDBD]"
        />
      </div>
      <div className="w-full flex flex-col md:flex-row gap-2 mt-4">
        <MInput
          label={t(`${pathTranslation}.text38`)}
          registerName="dm_penmit_01033"
          type="long-number"
          errors={errors}
          placeholder={t(`${pathTranslation}.text39`)}
          control={control}
          watch={watch}
          maxLength={3}
        />
        <MInput
          label={t(`${pathTranslation}.text40`)}
          registerName="dm_penmit_01017"
          register={register}
          type="text"
          errors={errors}
          placeholder={t(`${pathTranslation}.text41`)}
          className="rounded-lg px-3 border border-[#BDBDBD]"
        />
        <MInput
          label={t(`${pathTranslation}.text42`)}
          registerName="dm_penmit_01008"
          register={register}
          type="text"
          errors={errors}
          placeholder={t(`${pathTranslation}.text43`)}
          className="rounded-lg px-3 border border-[#BDBDBD]"
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
        <div className="w-full flex justify-start items-end gap-2">
          <div className="w-auto">
            <MInput
              type="switch"
              registerName="masa_berlaku"
              control={control}
              errors={errors}
              onSwitchToggle={handleSwitchChange}
            />
          </div>
          <Typography className="w-full flex justify-start items-center font-poppins font-semibold">
            {t(`${pathTranslation}.text60`)}
          </Typography>
        </div>
        {permanentId === false && (
          <MInput
            label={t(`${pathTranslation}.text45`)}
            registerName="dm_penmit_01018"
            register={register}
            disabled={permanentId}
            type="date"
            errors={errors}
            className="rounded-lg px-3 border border-[#BDBDBD]"
          />
        )}
      </div>
      <Typography className="font-poppins font-semibold text-xl text-seeds-button-green my-4">
        {t(`${pathTranslation}.others`)}
      </Typography>
      <div className="w-full flex flex-col md:flex-row gap-2">
        <MInput
          label={t(`${pathTranslation}.text46`)}
          registerName="dm_penmit_01022"
          register={register}
          type="text"
          errors={errors}
          placeholder={t(`${pathTranslation}.text47`)}
          className="rounded-lg px-3 border border-[#BDBDBD]"
        />
        <MInput
          label={t(`${pathTranslation}.text48`)}
          registerName="dm_penmit_01041"
          register={register}
          type="text"
          errors={errors}
          placeholder={t(`${pathTranslation}.text49`)}
          className="rounded-lg px-3 border border-[#BDBDBD]"
        />
      </div>
      <div className="w-full flex flex-col md:flex-row gap-2 mt-4">
        <MInput
          label={t(`${pathTranslation}.text50`)}
          registerName="dm_penmit_01042"
          type="long-number"
          errors={errors}
          placeholder={t(`${pathTranslation}.text51`)}
          control={control}
          watch={watch}
        />
        <MInput
          label={t(`${pathTranslation}.text52`)}
          registerName="dm_pen_08002"
          type="dropdown"
          control={control}
          errors={errors}
          options={useInvestmentGoals()}
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
      <div className="w-full flex flex-col md:flex-row gap-2 mt-4">
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
      {watch('pernyataan_npwp') === '1' && (
        <div>
          <div className="w-full flex flex-col md:flex-row gap-2 mt-4">
            <MInput
              label={t(`${pathTranslation}.text55`)}
              registerName="dm_penmit_01012"
              register={register}
              type="text"
              errors={errors}
              placeholder={t(`${pathTranslation}.text56`)}
              className="rounded-lg px-3 border border-[#BDBDBD]"
            />
            <MInput
              label={t(`${pathTranslation}.text57`)}
              registerName="dm_penmit_01045"
              register={register}
              type="date"
              errors={errors}
              placeholder={t(`${pathTranslation}.text58`)}
              className="rounded-lg px-3 border border-[#BDBDBD]"
            />
          </div>
          <div className="w-full mt-4">
            <MInput
              label={t(`${pathTranslation}.text61`)}
              registerName="dm_penmit_01013"
              type="image"
              register={register}
              usePreview={false}
              fileType=".jpg,.jpeg"
              errors={errors}
              extraClasses="border border-[#BDBDBD] rounded-lg p-2 w-full"
            />
            {(
              (previewUrl !== null) && (previewUrl !== undefined) || 
              ((imageURL !== null) && (imageURL !== undefined))
            ) && (
              <div className='flex justify-between items-center'>
                <div className='flex justify-start items-center gap-2 mt-2'>
                  <a
                    href={
                      previewUrl !== null && previewUrl !== undefined
                        ? previewUrl
                        : `https://dev.danamart.id/development/dm-scf-api/writable/uploads/${imageURL as string}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-start items-center"
                  >
                    <div className="flex gap-2 bg-[#E5EDFC] py-2 px-3 w-fit rounded-md">
                      <IoDocumentTextOutline className="w-6 h-6 flex-shrink-0 text-seeds-button-green" />
                      <Typography className="font-poppins font-medium text-seeds-button-green">
                        Preview document
                      </Typography>
                    </div>
                  </a>
                  <FaRegCheckCircle className="w-4 h-4 flex-shrink-0 text-seeds-button-green"/>
                </div>
                {
                  (previewUrl !== null && previewUrl !== undefined) &&
                    <FaRegTrashAlt
                      onClick={() => { handleRemoveAccessCard() }}
                      className="w-5 h-5 flex-shrink-0 text-[#DA2D1F] cursor-pointer"
                    />
                }
              </div>
            )}
          </div>
        </div>
      )}
      <Button
        className="w-full text-base font-semibold bg-seeds-button-green mt-6 rounded-full capitalize"
        disabled={watch('pernyataan') !== '1'}
        onClick={() => {
          handleSubmit((data: UserInfoFormData) => {
            onSubmit(data).then(() => {
              setStep(step + 1);
              isUploading(!uploading);
            });
          })();
        }}
      >
        {t(`${pathTranslation}.text59`)}
      </Button>
    </div>
  );
};

export default AccountInformation;
