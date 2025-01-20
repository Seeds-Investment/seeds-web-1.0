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
  t: (key: string) => string;
}

const FinancialInformation: React.FC<FinancialInformationProps> = ({
  step,
  setStep,
  t
}) => {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleSubmit,
    register,
    errors,
    watch,
    control
  } = useUpdateUserInfoForm();
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
          registerName="income_source"
          type="dropdown"
          errors={errors}
          rounded={true}
          options={answer}
          fullWidth={true}
          control={control}
        />
        <MInput
          label={t('danamart.verification.financial.incomePerMonth')}
          registerName="income_per_montch"
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
            registerName="confirmation_form"
            control={control}
            errors={errors}
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
          registerName="name_of_account"
          register={register}
          type="text"
          errors={errors}
          placeholder={t('danamart.verification.financial.nameOfAccount')}
          className="border-b border-[#bdbdbd] pl-2 outline-none"
        />
        <MInput
          label={t('danamart.verification.financial.accountNumber')}
          registerName="account_number"
          register={register}
          type="text"
          errors={errors}
          placeholder={t(
            'danamart.verification.financial.accountNumberPlaceHolder'
          )}
          className="border-b border-[#bdbdbd] pl-2 outline-none"
        />
        <MInput
          label={t('danamart.verification.financial.bankName')}
          registerName="bank_name"
          type="dropdown"
          errors={errors}
          control={control}
          options={answer}
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
      <MInput
        label={t('danamart.verification.financial.doYouAlready')}
        registerName="rekening_efek"
        type="dropdown"
        control={control}
        errors={errors}
        options={answer}
        rounded={true}
        fullWidth={true}
      />
      <Typography className="font-poppins font-semibold md:text-xl text-base text-seeds-button-green">
        {t('danamart.verification.financial.beneficialInformation')}
      </Typography>
      <MInput
        label={t('danamart.verification.financial.isThereBeneficial')}
        registerName="beneficial"
        type="dropdown"
        control={control}
        errors={errors}
        options={answer}
        rounded={true}
        fullWidth={true}
      />
      <div className="flex items-center justify-end">
        <Button
          className="w-[155.5px] h-[36px] px-4 py-2 text-sm font-semibold bg-seeds-button-green rounded-full capitalize mt-2"
          onClick={async () => {
            setStep(prevStep => prevStep + 1);
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default FinancialInformation;
