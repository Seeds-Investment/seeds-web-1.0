import MInput from '@/components/form-input/multi-input';
import {
  useBankName,
  useCashSource
} from '@/components/form-input/multi-input/data/dropdown-data';
import usePurchaseFormStock, {
  type PurchaseFormDataI
} from '@/hooks/danamart/usePurchaseFormStock';
import {
  type DashboardDataUser,
  type FormPurchaseData
} from '@/utils/interfaces/danamart/offers.interface';
import { Button, Typography } from '@material-tailwind/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

interface PurchaseFormProps {
  formPurchaseData: FormPurchaseData;
  pinjamanId: string;
  dashboardData: DashboardDataUser;
  setIsShowDisclaimer: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowOTP: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsPurchased: React.Dispatch<React.SetStateAction<boolean>>;
  isPurchased: boolean;
  isContinueProcess: boolean;
  passedOTP: string;
  setIsContinueProcess: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPending: React.Dispatch<React.SetStateAction<boolean>>;
  isPending: boolean;
}

const PurchaseFormStock: React.FC<PurchaseFormProps> = ({
  formPurchaseData,
  pinjamanId,
  dashboardData,
  setIsShowDisclaimer,
  setIsLoading,
  setIsShowOTP,
  setIsPurchased,
  isPurchased,
  isContinueProcess,
  passedOTP,
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
  } = usePurchaseFormStock();
  const router = useRouter();
  const bankOptions = useBankName();
  const pathTranslation = 'danamart.offers.purchase.form';
  const bidReward = watch('bid_rewerd');
  const lembarSaham = watch('lembar_saham');
  const sourceCash = watch('sumberDana');
  const totalPaid = watch('jumlah_pembelian');
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const cleanDanaRewerd = Number(
    dashboardData?.dataSaldoUser?.danaRewerd.replace(/[^\d]/g, '')
  );

  const calculateTotalPayment = (): void => {
    const basePrice =
      lembarSaham * (formPurchaseData?.dataForm?.hargaLembarSaham ?? 0);
    let finalPrice = basePrice;

    if (sourceCash === 'TransferDana') {
      finalPrice += 3000;
    }

    if (bidReward === true) {
      finalPrice = Math.max(finalPrice - cleanDanaRewerd, 0);
    }

    setTotalPrice(finalPrice);
    setValue('jumlah_pembelian', finalPrice);
    setValue('bid_cash', basePrice);
  };

  const handleSwitchChange = (): void => {
    if (bidReward === true) {
      setValue('bid_rewerd', false);
    } else {
      setValue('bid_rewerd', true);
    }
    calculateTotalPayment();
  };

  useEffect(() => {
    setValue('user_peminjam_id', formPurchaseData?.dataInput?.user_peminjam_id);
    setValue('user_pendana_id', formPurchaseData?.dataInput?.user_pendana_id);
    setValue('tgl_jatuh_tempo', formPurchaseData?.dataInput?.tgl_jatuh_tempo);
    setValue(
      'referral_id_lv1_peminjam',
      formPurchaseData?.dataInput?.referral_id_lv1_peminjam
    );
    setValue(
      'referral_id_lv1_pendana',
      formPurchaseData?.dataInput?.referral_id_lv1_pendana
    );
    setValue(
      'referral_id_lv2_peminjam',
      formPurchaseData?.dataInput?.referral_id_lv2_peminjam
    );
    setValue(
      'referral_id_lv2_pendana',
      formPurchaseData?.dataInput?.referral_id_lv2_pendana
    );
    setValue(
      'jml_pinjaman_terbit',
      formPurchaseData?.dataInput?.jml_pinjaman_terbit
    );
    setValue('pinjaman_id', formPurchaseData?.dataInput?.pinjaman_id);
    setValue('bunga_persen', formPurchaseData?.dataInput?.bunga_persen);
    setValue('sektor_usaha', formPurchaseData?.dataInput?.sektor_usaha);
    setValue('credit_rating', formPurchaseData?.dataInput?.credit_rating);
    setValue('dm_pem_02003', formPurchaseData?.dataInput?.dm_pem_02003);
    setValue('dm_pem_02004', formPurchaseData?.dataInput?.dm_pem_02004);
    setValue(
      'harga_perlembar_saham',
      formPurchaseData?.dataForm?.hargaLembarSaham
    );
    setValue('sisa_lembar_saham', formPurchaseData?.dataForm?.sisaPembelian);
    setValue(
      'total_dana_reward',
      dashboardData?.dataSaldoUser?.TotalDanaRewerd
    );
  }, [formPurchaseData]);

  useEffect(() => {
    calculateTotalPayment();
  }, [lembarSaham, sourceCash, bidReward]);

  useEffect(() => {
    setValue('kodeOtp', passedOTP);
  }, [passedOTP]);

  useEffect(() => {
    if (isContinueProcess) {
      handleSubmit(async (data: PurchaseFormDataI) => {
        try {
          setIsLoading(true);
          const response = await onSubmit(data);

          if (response !== undefined) {
            if (
              response?.message !==
              'Selamat! Proses pembelian efek sudah berhasil!'
            ) {
              if (sourceCash === 'DanaCash') {
                toast.success(t(`${pathTranslation}.formResponse.text1`));
                setIsLoading(false);
                setIsShowOTP(false);
                setIsPurchased(!isPurchased);
                reset();
              } else {
                setIsLoading(false);
                setIsPurchased(!isPurchased);
                reset();
                toast.success(t(`${pathTranslation}.formResponse.text2`));
                setTimeout(() => {
                  void (async () => {
                    if (totalPaid >= 1000000) {
                      await router.push(
                        `/danamart/offer/prospectus/${pinjamanId}/payment-va`
                      );
                    } else {
                      await router.push(
                        `/danamart/offer/prospectus/${pinjamanId}/payment-qris`
                      );
                    }
                  })();
                }, 3000);
              }
            } else {
              toast.success(t(`${pathTranslation}.formResponse.text3`));
              setTimeout(() => {
                void (async () => {
                  await router.push('/danamart/portfolio');
                })();
              }, 2000);
            }
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
          label={`${t(`${pathTranslation}.text20`)}`}
          registerName="harga_perlembar_saham"
          type="number"
          errors={errors}
          control={control}
          watch={watch}
          disabled
        />
        <MInput
          label={`${t(`${pathTranslation}.text21`)}`}
          registerName="sisa_lembar_saham"
          register={register}
          type="text"
          errors={errors}
          disabled
        />
      </div>
      <div className="w-full flex flex-col md:flex-row gap-2 mt-4">
        <MInput
          label={`${t(`${pathTranslation}.text24`)}`}
          registerName="lembar_saham"
          type="number"
          errors={errors}
          placeholder="Jumlah Pembelian"
          control={control}
          watch={watch}
        />
        <MInput
          label={`${t(`${pathTranslation}.text22`)}`}
          registerName="bid_cash"
          type="number"
          errors={errors}
          control={control}
          watch={watch}
          disabled
        />
      </div>
      <div className="w-full flex flex-col md:flex-row gap-2 mt-4">
        <MInput
          label={`${t(`${pathTranslation}.text6`)}`}
          registerName="total_dana_reward"
          type="number"
          errors={errors}
          control={control}
          watch={watch}
          disabled
        />
        <MInput
          label={`${t(`${pathTranslation}.sourceCash.text1`)}`}
          registerName="sumberDana"
          type="dropdown"
          control={control}
          errors={errors}
          options={useCashSource()}
          rounded={false}
          fullWidth={true}
        />
      </div>
      <div className="w-full flex justify-start items-end gap-2 mt-4">
        <div className="w-auto">
          <MInput
            type="switch"
            registerName="bid_rewerd"
            control={control}
            errors={errors}
            onSwitchToggle={handleSwitchChange}
          />
        </div>
        <Typography className="w-full flex justify-start items-center font-poppins font-semibold">
          {t(`${pathTranslation}.text8`)}
        </Typography>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-2 mt-4">
        {sourceCash !== '' && totalPrice === 0 && !Number.isNaN(totalPrice) && (
          <MInput
            label={`${t(`${pathTranslation}.text9`)}`}
            registerName="jumlah_pembelian"
            register={register}
            type="text"
            errors={errors}
            disabled
          />
        )}
        {sourceCash !== '' && totalPrice !== 0 && !Number.isNaN(totalPrice) && (
          <MInput
            label={`${t(`${pathTranslation}.text9`)}`}
            registerName="jumlah_pembelian"
            type="number"
            errors={errors}
            control={control}
            watch={watch}
            disabled
          />
        )}
        {sourceCash === 'TransferDana' && watch('bid_cash') >= 1000000 && (
          <MInput
            label={`${t(`${pathTranslation}.sourceCash.text1`)}`}
            registerName="bank_code"
            type="dropdown"
            control={control}
            errors={errors}
            options={bankOptions}
            rounded={false}
            fullWidth={true}
          />
        )}
      </div>
      <Button
        className="w-full text-base font-semibold bg-seeds-button-green mt-6 rounded-full capitalize"
        disabled={lembarSaham === undefined || sourceCash === '' || isLoading}
        onClick={() => {
          if (watch('bid_cash') < 100000) {
            toast.error(t(`${pathTranslation}.formResponse.text5`));
          } else {
            if (sourceCash === 'DanaCash') {
              setIsShowDisclaimer(true);
            } else {
              setIsContinueProcess(true);
            }
          }
        }}
      >
        {`${t(`${pathTranslation}.text19`)}`}
      </Button>
    </div>
  );
};

export default PurchaseFormStock;
