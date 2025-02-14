import MInput from '@/components/form-input/multi-input';
import { useCashSource } from '@/components/form-input/multi-input/data/dropdown-data';
import useUpdateUserInfoForm, { type UserInfoFormData } from '@/hooks/danamart/useUpdateUserInfoForm';
import { Button, Typography } from '@material-tailwind/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

const PurchaseForm: React.FC = () => {
  const { t } = useTranslation();
  const {
    handleSubmit,
    onSubmit,
    register,
    errors,
    control,
    watch,
    setValue
  } = useUpdateUserInfoForm();
  const pathTranslation = 'danamart.verification.accountInformation'
  const bidReward = watch("bid_reward");

  const handleSwitchChange = (): void => {
    if (bidReward === true) {
      setValue('bid_reward', false);
    } else {
      setValue('bid_reward', true);
    }
  };

  return (
    <div className="w-full flex flex-col rounded-lg">
      <Typography className="font-poppins font-semibold text-lg text-[#262626]">
        Pembelian Saham
      </Typography>
      <div className='w-full flex flex-col md:flex-row gap-2 mt-4'>
        <MInput
          label="Harga Per Lembar Saham (Rp)"
          registerName="dm_penmit_01010"
          type="number"
          errors={errors}
          placeholder="Harga Per Lembar Saham (Rp)"
          control={control}
          watch={watch}
        />
        <MInput
          label="Sisa Lembar Saham"
          registerName="dm_penmit_01010"
          type="number"
          errors={errors}
          placeholder="Sisa Lembar Saham"
          control={control}
          watch={watch}
        />
        {/* <MInput
          label="Slot Pembelian"
          registerName="dm_penmit_01003"
          register={register}
          type="text"
          errors={errors}
          placeholder="Imbal Hasil"
          className='rounded-lg px-3 border border-[#BDBDBD]'
        /> */}
      </div>
      <div className='w-full flex flex-col md:flex-row gap-2 mt-4'>
        <MInput
          label="Jumlah Pembelian"
          registerName="dm_penmit_01010"
          type="number"
          errors={errors}
          placeholder="Jumlah Pembelian"
          control={control}
          watch={watch}
        />
        <MInput
          label="Total Pembelian (Rp)"
          registerName="dm_penmit_01010"
          type="number"
          errors={errors}
          placeholder="Total Pembelian (Rp)"
          control={control}
          watch={watch}
        />
      </div>
      <div className='w-full flex flex-col md:flex-row gap-2 mt-4'>
        <MInput
          label="Dana Reward + Interim"
          registerName="dm_penmit_01010"
          type="number"
          errors={errors}
          placeholder="Jumlah Pembelian"
          control={control}
          watch={watch}
        />
        <MInput
          label="Pilih Sumber Dana"
          registerName="pernyataan"
          type="dropdown"
          control={control}
          errors={errors}
          options={useCashSource()}
          rounded={false}
          fullWidth={true}
        />
      </div>
      <div className='w-full flex justify-start items-end gap-2 mt-4'>
        <div className="w-auto">
          <MInput
            type="switch"
            registerName="bid_reward"
            control={control}
            errors={errors}
            onSwitchToggle={handleSwitchChange}
          />
        </div>
        <Typography className='w-full flex justify-start items-center font-poppins font-semibold'>
          Pakai Dana Reward + Interim
        </Typography>
      </div>
      <div className='w-full flex flex-col md:flex-row gap-2 mt-4'>
        <MInput
          label="Total Pembelian Yang Harus Dibayarkan"
          registerName="dm_penmit_01010"
          type="number"
          errors={errors}
          placeholder="Jumlah Pembelian"
          control={control}
          watch={watch}
        />
      </div>
      <Button
        className="w-full text-base font-semibold bg-seeds-button-green mt-6 rounded-full capitalize"
        disabled={watch("pernyataan") !== '1'}
        onClick={() => {
          handleSubmit((data: UserInfoFormData) => {
            onSubmit(data).then(() => {
              // setStep(step + 1);
            })
          })();
        }}
      >
        {t(`${pathTranslation}.text59`)}
      </Button>
    </div>
  );
};

export default PurchaseForm;