import { Button, Switch, Typography } from '@material-tailwind/react';
import { useState } from 'react';

interface Props {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  t: (key: string) => string;
}

const FinancialInformation: React.FC<Props> = ({ step, setStep, t }) => {
  const [income, setIncome] = useState<string>('');

  const formatRupiah = (value: string): string => {
    const numericValue = value.replace(/\D/g, '');
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    })
      .format(Number(numericValue))
      .replace('IDR', '')
      .trim();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const rawValue = e.target.value;
    const formattedValue = formatRupiah(rawValue);
    setIncome(formattedValue);
  };

  return (
    <div className="w-full flex flex-col md:gap-6 gap-5">
      <Typography className="font-poppins font-semibold md:text-xl text-base text-[#3ac4a0]">
        {t('danamart.verification.financial.income')}
      </Typography>
      <div className="flex md:flex-nowrap flex-wrap items-center md:gap-6 gap-5">
        <div className="flex flex-col gap-2 w-full">
          <label className="font-poppins text-base font-semibold text-[#262626]">
            {t('danamart.verification.financial.incomeSource')}
          </label>
          <select
            defaultValue={''}
            placeholder={t('danamart.verification.financial.select')}
            className="rounded-full border border-[#7c7c7c] py-[10px] px-3 cursor-pointer"
          >
            <option value="" disabled>
              {t('danamart.verification.financial.select')}
            </option>
          </select>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="font-poppins text-base font-semibold text-[#262626]">
            {t('danamart.verification.financial.incomePerMonth')}
          </label>
          <input
            type="text"
            className="py-2 border-b-2 border-b-[#7c7c7c] outline-none"
            placeholder="Rp"
            value={income}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="flex md:flex-nowrap flex-wrap items-center gap-4">
        <Switch size={40} className="checked:bg-[#3AC4A0] text-justify" />
        <Typography className="font-poppins font-normal text-sm text-[#7c7c7c]">
          {t('danamart.verification.financial.validateInputForm')}
        </Typography>
      </div>
      <Typography className="font-poppins font-semibold md:text-xl text-base text-[#3ac4a0]">
        {t('danamart.verification.financial.bankInformation')}
      </Typography>
      <div className="flex md:flex-nowrap flex-wrap items-center md:gap-6 gap-5">
        <div className="flex flex-col gap-2 w-full">
          <label className="font-poppins text-base font-semibold text-[#262626]">
            {t('danamart.verification.financial.nameOfAccount')}
          </label>
          <input
            type="text"
            className="py-2 border-b-2 border-b-[#7c7c7c] outline-none"
            placeholder={t('danamart.verification.financial.nameOfAccount')}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="font-poppins text-base font-semibold text-[#262626]">
            {t('danamart.verification.financial.accountNumber')}
          </label>
          <input
            type="text"
            className="py-2 border-b-2 border-b-[#7c7c7c] outline-none"
            placeholder={t(
              'danamart.verification.financial.accountNumberPlaceHolder'
            )}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="font-poppins text-base font-semibold text-[#262626]">
            {t('danamart.verification.financial.bankName')}
          </label>
          <select
            defaultValue={''}
            placeholder={t('danamart.verification.financial.select')}
            className="rounded-full border border-[#7c7c7c] py-[10px] px-3 cursor-pointer"
          >
            <option value="" disabled>
              {t('danamart.verification.financial.select')}
            </option>
          </select>
        </div>
      </div>
      <Typography className="font-poppins font-semibold md:text-xl text-base text-[#3ac4a0]">
        {t('danamart.verification.financial.sidInformation')}
      </Typography>
      <div className="flex flex-col gap-2 w-full">
        <label className="font-poppins text-base font-semibold text-[#262626]">
          {t('danamart.verification.financial.doYouAlready')}
        </label>
        <select
          defaultValue={''}
          placeholder={t('danamart.verification.financial.select')}
          className="rounded-full border border-[#7c7c7c] py-[10px] px-3 cursor-pointer"
        >
          <option value="" disabled>
            {t('danamart.verification.financial.select')}
          </option>
        </select>
      </div>
      <Typography className="font-poppins font-semibold md:text-xl text-base text-[#3ac4a0]">
        {t('danamart.verification.financial.beneficialInformation')}
      </Typography>
      <div className="flex flex-col gap-2 w-full">
        <label className="font-poppins text-base font-semibold text-[#262626]">
          {t('danamart.verification.financial.isThereBeneficial')}
        </label>
        <select
          defaultValue={''}
          placeholder={t('danamart.verification.financial.select')}
          className="rounded-full border border-[#7c7c7c] py-[10px] px-3 cursor-pointer"
        >
          <option value="" disabled>
            {t('danamart.verification.financial.select')}
          </option>
        </select>
      </div>
      <div className="flex items-center justify-end gap-6">
        <Button
          onClick={() => {
            setStep(step - 1);
          }}
          className="bg-seeds-button-green capitalize font-poppins font-semibold text-sm rounded-full w-[155px] h-[36px] flex justify-center items-center"
        >
          {t('danamart.verification.buttonPrevious')}
        </Button>
        <Button
          onClick={() => {
            setStep(step + 1);
          }}
          className="bg-seeds-button-green capitalize font-poppins font-semibold text-sm rounded-full w-[155px] h-[36px] flex justify-center items-center"
        >
          {t('danamart.verification.buttonSave')}
        </Button>
      </div>
    </div>
  );
};

export default FinancialInformation;
