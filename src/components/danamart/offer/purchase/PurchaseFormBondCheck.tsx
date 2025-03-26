import MInput from '@/components/form-input/multi-input';
import {
  type PurchaseFormDataI
} from '@/hooks/danamart/usePurchaseFormStock';
import usePurchaseFormStockCheckTesting from '@/hooks/danamart/usePurchaseFormStockCheckTesting';
import {
  type FormPurchaseDataCheckTesting
} from '@/utils/interfaces/danamart/offers.interface';
import { Button, Typography } from '@material-tailwind/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

interface PurchaseFormProps {
  formPurchaseDataCheckTesting: FormPurchaseDataCheckTesting;
  setIsShowDisclaimer: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowOTP: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsPurchased: React.Dispatch<React.SetStateAction<boolean>>;
  isPurchased: boolean;
  isContinueProcess: boolean;
  setIsContinueProcess: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPending: React.Dispatch<React.SetStateAction<boolean>>;
  isPending: boolean;
}

const PurchaseFormBondCheck: React.FC<PurchaseFormProps> = ({
  formPurchaseDataCheckTesting,
  setIsShowDisclaimer,
  setIsLoading,
  setIsShowOTP,
  setIsPurchased,
  isPurchased,
  isContinueProcess,
  setIsContinueProcess,
  isLoading,
  setIsPending,
  isPending
}) => {
  const { t } = useTranslation();
  const {
    handleSubmit,
    onSubmit,
    register,
    errors,
    control,
    watch,
    setValue,
    reset
  } = usePurchaseFormStockCheckTesting();
  const router = useRouter();
  const pathTranslation = 'danamart.offers.purchase.form';
  const bidReward = watch('bid_rewerd');
  const lembarSaham = watch('lembar_saham');
  const sourceCash = watch('sumberDana');
  const bidCash = watch('bid_cash');
  const pricePerShare = Number(formPurchaseDataCheckTesting?.dataForm?.slotPembelian?.replace(/\./g, "")) / Number(formPurchaseDataCheckTesting?.dataForm?.sisaPembelian?.replace(/\./g, ""));
  const purchaseLimit = Number(formPurchaseDataCheckTesting?.dataForm?.slotPembelian?.replace(/\./g, ""));

  const calculateTotalPayment = (): void => {
    const basePrice = lembarSaham * (pricePerShare ?? 0);
    setValue('bid_cash', basePrice);
  };

  useEffect(() => {
    setValue('user_peminjam_id', formPurchaseDataCheckTesting?.dataInput?.user_peminjam_id);
    setValue('user_pendana_id', formPurchaseDataCheckTesting?.dataInput?.user_pendana_id);
    setValue('pinjaman_id', formPurchaseDataCheckTesting?.dataInput?.pinjaman_id);
    setValue('sektor_usaha', formPurchaseDataCheckTesting?.dataInput?.sektor_usaha);
    setValue('bunga_persen', formPurchaseDataCheckTesting?.dataInput?.bunga_persen);
    setValue('credit_rating', formPurchaseDataCheckTesting?.dataInput?.credit_rating);
    setValue('dm_pem_02003', formPurchaseDataCheckTesting?.dataInput?.dm_pem_02003);
    setValue('dm_pem_02004', formPurchaseDataCheckTesting?.dataInput?.dm_pem_02004);
    setValue('jml_pinjaman_terbit', formPurchaseDataCheckTesting?.dataInput?.jml_pinjaman_terbit);
    setValue('tgl_jatuh_tempo', formPurchaseDataCheckTesting?.dataInput?.tgl_jatuh_tempo);
    setValue('referral_id_lv1_peminjam', formPurchaseDataCheckTesting?.dataInput?.referral_id_lv1_peminjam);
    setValue('referral_id_lv1_pendana', formPurchaseDataCheckTesting?.dataInput?.referral_id_lv1_pendana);
    setValue('referral_id_lv2_peminjam', formPurchaseDataCheckTesting?.dataInput?.referral_id_lv2_peminjam);
    setValue('referral_id_lv2_pendana', formPurchaseDataCheckTesting?.dataInput?.referral_id_lv2_pendana);
    setValue('sisa_lembar_saham', formPurchaseDataCheckTesting?.dataForm?.sisaPembelian);
    setValue('total_dana_reward', 0);
    setValue('harga_perlembar_saham', pricePerShare);
    setValue('kode_efek', formPurchaseDataCheckTesting?.dataForm?.kodeEfek);
  }, [formPurchaseDataCheckTesting]);

  useEffect(() => {
    calculateTotalPayment();
  }, [lembarSaham, sourceCash, bidReward]);

  useEffect(() => {
    if (isContinueProcess) {
      handleSubmit(async (data: PurchaseFormDataI) => {
        try {
          setIsLoading(true);
          const response = await onSubmit(data);
          if (response !== undefined) {
            toast.success(t(`${pathTranslation}.formResponse.text3`));
            setIsLoading(false);
            setIsShowOTP(false);
            setIsPurchased(!isPurchased);
            reset();
            setTimeout(() => {
              void (async () => {
                await router.push('/danamart/portfolio');
              })();
            }, 2000);
          }
        } catch (error: any) {
          if (
            error?.response?.data?.messages?.message ===
            'Maaf, ada pembelian efek yang belum selesai diproses. Silakan proses terlebih dahulu transaksi Kamu'
          ) {
            toast.error(t(`${pathTranslation}.formResponse.text4`));
            setIsPending(!isPending);
          } else {
            toast.error(
              'Error purchasing assets: ',
              error?.response?.data?.messages?.message
            );
          }
          setIsContinueProcess(false);
          setIsLoading(false);
        }
      })();
    }
  }, [isContinueProcess]);

  return (
    <div className="w-full flex flex-col rounded-lg">
      <Typography className="font-poppins font-semibold text-lg text-[#262626]">
        {t(`${pathTranslation}.titleSaham`)}
      </Typography>
      <div className="w-full flex flex-col md:flex-row gap-2 mt-4">
        <MInput
          label={`${t(`${pathTranslation}.text25`)}`}
          registerName="kode_efek"
          register={register}
          type="text"
          errors={errors}
          disabled
        />
        <MInput
          label={`${t(`${pathTranslation}.text26`)}`}
          registerName="sektor_usaha"
          register={register}
          type="text"
          errors={errors}
          disabled
        />
      </div>
      <div className="w-full flex flex-col md:flex-row gap-2 mt-4">
        <MInput
          label={`${t(`${pathTranslation}.text27`)}`}
          registerName="sisa_lembar_saham"
          register={register}
          type="text"
          errors={errors}
          disabled
        />
        <MInput
          label={`${t(`${pathTranslation}.text28`)}`}
          registerName="harga_perlembar_saham"
          register={register}
          type="text"
          errors={errors}
          disabled
        />
      </div>
      <div className="w-full flex flex-col md:flex-row gap-2 mt-4">
        <MInput
          label={`${t(`${pathTranslation}.text29`)}`}
          registerName="bid_cash"
          type="number"
          errors={errors}
          control={control}
          watch={watch}
          disabled
        />
        <MInput
          label={`${t(`${pathTranslation}.text30`)}`}
          registerName="lembar_saham"
          type="number"
          errors={errors}
          control={control}
          watch={watch}
          placeholder={`${t(`${pathTranslation}.text31`)}`}
        />
      </div>
      <Button
        className="w-full text-base font-semibold bg-seeds-button-green mt-6 rounded-full capitalize"
        disabled={lembarSaham === undefined || isLoading || bidCash > purchaseLimit}
        onClick={() => {
          if (watch('bid_cash') < 100000) {
            toast.error(t(`${pathTranslation}.formResponse.text5`));
          } else {
            setIsShowDisclaimer(true);
          }
        }}
      >
        {`${t(`${pathTranslation}.text19`)}`}
      </Button>
    </div>
  );
};

export default PurchaseFormBondCheck;
