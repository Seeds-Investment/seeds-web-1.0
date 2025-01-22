import MInput from '@/components/form-input/multi-input';
import {
  useConfirmBeneficialOwner,
  useConfirmShares,
  useGender,
  useIncome
} from '@/components/form-input/multi-input/data/dropdown-data';
import useUpdateFinancialInfo from '@/hooks/danamart/useUpdateFinancialInfo';
import { getFinancialInformationData } from '@/repository/danamart/danamart.repository';
import { type AccountVerification } from '@/utils/interfaces/danamart.interface';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { WarningGreenIcon } from 'public/assets/vector';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ModalConfirmationForm from './ModalConfirmationForm';

interface FinancialInformationProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  t: (key: string) => string;
}

const FinancialInformation: React.FC<FinancialInformationProps> = ({
  step,
  setStep,
  t
}) => {
  const [financialInformationData, setFinancialInformationData] =
    useState<AccountVerification>();
  const [isSwitchActive, setIsSwitchActive] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const gender = useGender();
  const income = useIncome();

  const { control, errors, handleSubmit, register, watch, onSubmit, setValue } =
    useUpdateFinancialInfo();

  const fetchDataFinancial = async (): Promise<void> => {
    try {
      const response = await getFinancialInformationData();
      setFinancialInformationData(response);
    } catch (error: any) {
      toast.error(`Error fetching data Financial Information`);
    }
  };

  useEffect(() => {
    if (step === 3) {
      void fetchDataFinancial();
    }
  }, [step]);

  const handleSwitchChange = (): void => {
    if (!isSwitchActive) {
      setShowModal(true);
    } else {
      setIsSwitchActive(false);
      setValue('cek_pendapatan_baru', false);
    }
  };

  const handleModalResponse = (isConfirmed: boolean): void => {
    setShowModal(false);
    if (isConfirmed) {
      setIsSwitchActive(true);
      setValue('cek_pendapatan_baru', true);
    } else {
      setIsSwitchActive(false);
      setValue('cek_pendapatan_baru', false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 rounded-lg">
      <div className="w-full flex justify-start items-center gap-2">
        <Typography className="font-poppins font-semibold md:text-xl text-base text-seeds-button-green">
          {t('danamart.verification.financial.income')}
        </Typography>
        <Image
          src={WarningGreenIcon}
          alt="WarningGreenIcon"
          width={20}
          height={20}
        />
      </div>
      <div className="w-full flex flex-wrap md:flex-nowrap items-center gap-2">
        <MInput
          label={t('danamart.verification.financial.incomeSource')}
          registerName="dm_pen_06001"
          type="dropdown"
          errors={errors}
          rounded={true}
          options={income}
          fullWidth={true}
          control={control}
        />
        <MInput
          label={t('danamart.verification.financial.incomePerMonth')}
          registerName="dm_pen_06002"
          control={control}
          watch={watch}
          type="number"
          errors={errors}
          prefix="Rp"
          placeholder="Rp"
        />
      </div>
      <div className="w-full flex items-center flex-wrap md:flex-nowrap gap-4">
        <div className="w-auto">
          <MInput
            type="switch"
            registerName="cek_pendapatan_baru"
            control={control}
            errors={errors}
            onSwitchToggle={handleSwitchChange}
          />
        </div>
        <Typography className="font-poppins text-sm font-normal text-[#7C7C7C] text-justify">
          {t('danamart.verification.financial.validateInputForm')}
        </Typography>
      </div>
      <Typography className="font-poppins font-semibold md:text-xl text-base text-seeds-button-green">
        {t('danamart.verification.financial.bankInformation')}
      </Typography>
      <div className="w-full flex flex-wrap items-center md:flex-nowrap gap-2">
        <MInput
          label={t('danamart.verification.financial.nameOfAccount')}
          registerName="dm_penmit_07001"
          register={register}
          type="text"
          errors={errors}
          placeholder={t('danamart.verification.financial.nameOfAccount')}
          className="px-4 font-normal text-base text-[#201B1C] border border-[#BDBDBD] rounded-lg"
        />
        <MInput
          label={t('danamart.verification.financial.accountNumber')}
          registerName="dm_penmit_07002"
          register={register}
          type="text"
          errors={errors}
          onInput={e => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
          }}
          placeholder={t(
            'danamart.verification.financial.accountNumberPlaceHolder'
          )}
          className="px-4 font-normal text-base text-[#201B1C] border border-[#BDBDBD] rounded-lg"
        />
        <MInput
          label={t('danamart.verification.financial.bankName')}
          registerName="dm_penmit_07003"
          type="dropdown"
          errors={errors}
          control={control}
          options={financialInformationData?.bList?.map((item, index) => ({
            key: index,
            label: item.name,
            value: `${item.name}#${item.code}`
          }))}
          rounded={true}
          fullWidth={true}
        />
      </div>
      <div className="w-full flex justify-start items-center gap-2">
        <Typography className="font-poppins font-semibold md:text-xl text-base text-seeds-button-green">
          {t('danamart.verification.financial.sidInformation')}
        </Typography>
        <Image
          src={WarningGreenIcon}
          alt="WarningGreenIcon"
          width={20}
          height={20}
        />
      </div>
      <div
        className={
          watch('pernyataan') === '1'
            ? 'w-full flex flex-wrap md:flex-nowrap items-center gap-2'
            : ''
        }
      >
        <MInput
          label={t('danamart.verification.financial.doYouAlready')}
          registerName="pernyataan"
          type="dropdown"
          control={control}
          watch={watch}
          errors={errors}
          options={useConfirmShares()}
          rounded={true}
          fullWidth={true}
        />
        {watch('pernyataan') === '1' && (
          <MInput
            label={t('danamart.verification.financial.noSID')}
            registerName="dm_penmit_07008"
            register={register}
            type="text"
            errors={errors}
            onInput={e => {
              e.target.value = e.target.value.replace(/[^0-9]/g, '');
            }}
            className="px-4 font-normal text-base text-[#201B1C] border border-[#BDBDBD] rounded-lg"
          />
        )}
      </div>
      {watch('pernyataan') === '1' && (
        <div className="w-full flex flex-wrap md:flex-nowrap items-center gap-2">
          <MInput
            label={t('danamart.verification.financial.monthYearRegis')}
            registerName="dm_penmit_07009"
            type="date"
            register={register}
            errors={errors}
            className="px-4 font-normal text-base text-[#201B1C] border border-[#BDBDBD] rounded-lg"
          />
          <MInput
            label={t('danamart.verification.financial.accessCard')}
            registerName="dm_penmit_07010"
            type="image"
            register={register}
            usePreview={false}
            extraClasses="border border-[#BDBDBD] rounded-lg p-2 w-full"
          />
        </div>
      )}
      <Typography className="font-poppins font-semibold md:text-xl text-base text-seeds-button-green">
        {t('danamart.verification.financial.beneficialInformation')}
      </Typography>
      <MInput
        label={t('danamart.verification.financial.isThereBeneficial')}
        registerName="bo_confirm"
        type="dropdown"
        control={control}
        errors={errors}
        options={useConfirmBeneficialOwner()}
        rounded={true}
        fullWidth={true}
      />
      {watch('bo_confirm') === 'Y' && (
        <>
          <div className="w-full flex flex-wrap items-center md:flex-nowrap gap-2">
            <MInput
              label={t('danamart.verification.financial.fullName')}
              registerName="bo_nama"
              type="text"
              register={register}
              errors={errors}
              className="px-4 font-normal text-base text-[#201B1C] border border-[#BDBDBD] rounded-lg"
              placeholder="John Doe"
            />
            <MInput
              label={t('danamart.verification.financial.gender')}
              registerName="bo_jns_kelamin"
              type="dropdown"
              control={control}
              errors={errors}
              options={gender}
              rounded={true}
              fullWidth={true}
            />
            <MInput
              label={t('danamart.verification.financial.identityNumber')}
              registerName="bo_no_identitas"
              type="text"
              register={register}
              errors={errors}
              className="px-4 font-normal text-base text-[#201B1C] border border-[#BDBDBD] rounded-lg"
              placeholder="01234"
            />
          </div>
          <div className="w-full flex flex-wrap items-center md:flex-nowrap gap-2">
            <MInput
              label={t('danamart.verification.financial.fileIdentity')}
              registerName="bo_file_identitas"
              type="image"
              register={register}
              usePreview={false}
              extraClasses="border border-[#BDBDBD] rounded-lg p-2 w-full"
            />
            <MInput
              label={t('danamart.verification.financial.address')}
              registerName="bo_alamat"
              type="text"
              register={register}
              errors={errors}
              className="px-4 font-normal text-base text-[#201B1C] border border-[#BDBDBD] rounded-lg"
              placeholder="Jl. Boulevard"
            />
            <MInput
              label={t('danamart.verification.financial.birthPlace')}
              registerName="bo_tmp_lahir"
              type="text"
              register={register}
              errors={errors}
              className="px-4 font-normal text-base text-[#201B1C] border border-[#BDBDBD] rounded-lg"
              placeholder="Jakarta"
            />
          </div>
          <div className="w-full flex flex-wrap items-center md:flex-nowrap gap-2">
            <MInput
              label={t('danamart.verification.financial.birthDate')}
              registerName="bo_tgl_lahir"
              type="date"
              register={register}
              errors={errors}
              className="px-4 font-normal text-base text-[#201B1C] border border-[#BDBDBD] rounded-lg"
            />
            <MInput
              label={t('danamart.verification.financial.citizenship')}
              registerName="bo_kewarganegaraan"
              type="text"
              register={register}
              errors={errors}
              className="px-4 font-normal text-base text-[#201B1C] border border-[#BDBDBD] rounded-lg"
              placeholder="Indonesia"
            />
            <MInput
              label={t('danamart.verification.financial.job')}
              registerName="bo_pekerjaan"
              type="dropdown"
              control={control}
              errors={errors}
              options={gender}
              rounded={true}
              fullWidth={true}
            />
          </div>
        </>
      )}
      <div className="flex items-center justify-end">
        <Button
          className="w-[155.5px] h-[36px] px-4 py-2 text-sm font-semibold bg-seeds-button-green rounded-full capitalize mt-2"
          onClick={() => {
            // handleSubmit(onSubmit);
            const allValues = watch();
            console.log(allValues);
          }}
        >
          Save
        </Button>
      </div>
      {showModal && (
        <ModalConfirmationForm
          onConfirm={() => {
            handleModalResponse(true);
          }}
          onCancel={() => {
            handleModalResponse(false);
          }}
          t={t}
        />
      )}
    </div>
  );
};

export default FinancialInformation;
