import MInput from '@/components/form-input/multi-input';
import usePurchaseFormBondCheckTesting from '@/hooks/danamart/usePurchaseFormBondCheckTesting';
import { type PurchaseFormDataI } from '@/hooks/danamart/usePurchaseFormStock';
import { type FormPurchaseDataCheckTesting } from '@/utils/interfaces/danamart/offers.interface';
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
  isLoading,
  setIsPurchased,
  isPurchased,
  isContinueProcess,
  setIsContinueProcess,
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
  } = usePurchaseFormBondCheckTesting();
  const router = useRouter();
  const pathTranslation = 'danamart.offers.purchase.form';
  const bidReward = watch('bid_reward');
  const bidCash = watch('bid_cash');

  const calculateTotalPayment = (): void => {
    setValue('bid_cash', bidCash);
    setValue('lembar_saham', bidCash / 1000);
  };

  useEffect(() => {
    setValue(
      'user_peminjam_id',
      formPurchaseDataCheckTesting?.dataInput?.user_peminjam_id
    );
    setValue(
      'user_pendana_id',
      formPurchaseDataCheckTesting?.dataInput?.user_pendana_id
    );
    setValue(
      'tgl_jatuh_tempo',
      formPurchaseDataCheckTesting?.dataInput?.tgl_jatuh_tempo
    );
    setValue(
      'referral_id_lv1_peminjam',
      formPurchaseDataCheckTesting?.dataInput?.referral_id_lv1_peminjam
    );
    setValue(
      'referral_id_lv1_pendana',
      formPurchaseDataCheckTesting?.dataInput?.referral_id_lv1_pendana
    );
    setValue(
      'referral_id_lv2_peminjam',
      formPurchaseDataCheckTesting?.dataInput?.referral_id_lv2_peminjam
    );
    setValue(
      'referral_id_lv2_pendana',
      formPurchaseDataCheckTesting?.dataInput?.referral_id_lv2_pendana
    );
    setValue(
      'jml_pinjaman_terbit',
      formPurchaseDataCheckTesting?.dataInput?.jml_pinjaman_terbit
    );
    setValue(
      'jml_pinjaman_terbit_show',
      formPurchaseDataCheckTesting?.dataForm?.slotPembelian
    );
    setValue(
      'pinjaman_id',
      formPurchaseDataCheckTesting?.dataInput?.pinjaman_id
    );
    setValue(
      'bunga_persen',
      formPurchaseDataCheckTesting?.dataInput?.bunga_persen
    );
    setValue(
      'sektor_usaha',
      formPurchaseDataCheckTesting?.dataInput?.sektor_usaha
    );
    setValue(
      'credit_rating',
      formPurchaseDataCheckTesting?.dataInput?.credit_rating
    );
    setValue(
      'dm_pem_02003',
      formPurchaseDataCheckTesting?.dataInput?.dm_pem_02003
    );
    setValue(
      'dm_pem_02004',
      formPurchaseDataCheckTesting?.dataForm?.jangkaWaktu
    );
    setValue('BagiHasil', formPurchaseDataCheckTesting?.dataForm?.BagiHasil);
  }, [formPurchaseDataCheckTesting]);

  useEffect(() => {
    if (bidCash >= 100000) {
      const imbalHasil = Number(
        formPurchaseDataCheckTesting?.dataInput?.bunga_persen
      );
      const period = Number(
        formPurchaseDataCheckTesting?.dataForm?.jangkaWaktu
      );

      // Imbal hasil per bulan
      const imbalHasilBulanTemp = Math.round(bidCash * (imbalHasil / 12));
      const imbalHasilBulan = (Number(bidCash) * imbalHasil) / 12;

      // Total imbal hasil
      const totalImbalHasil = Math.round(imbalHasilBulan * period);

      // Total modal + imbal hasil
      const totalModalImbalHasil = Number(bidCash) + totalImbalHasil;

      // Pajak 10% dari imbal hasil per bulan
      const pajak = Math.round(0.1 * imbalHasilBulan);

      // Biaya administrasi 10% dari (imbal hasil - pajak)
      const biayaAdministrasi = Math.round(0.1 * (imbalHasilBulan - pajak));

      // Hasil investasi nett
      const hasilInvestasiNett = Math.round(
        (imbalHasilBulan - pajak - biayaAdministrasi) * period
      );

      setValue('imbal_hasil_bulan', `Rp ${imbalHasilBulan}`);
      setValue('imbal_hasil_bulan_temp', `Rp ${imbalHasilBulanTemp}`);
      setValue('pajak', `Rp ${pajak}`);
      setValue('total_imbal_hasil', `Rp ${totalImbalHasil}`);
      setValue('biaya_administrasi', `Rp ${biayaAdministrasi}`);
      setValue('total_modal_imbal_hasil', `Rp ${totalModalImbalHasil}`);
      setValue('hasil_investasi_nett', `Rp ${hasilInvestasiNett}`);
    } else {
      setValue('imbal_hasil_bulan_temp', 0);
      setValue('imbal_hasil_bulan', 0);
      setValue('pajak', 0);
      setValue('total_imbal_hasil', 0);
      setValue('biaya_administrasi', 0);
      setValue('total_modal_imbal_hasil', 0);
      setValue('hasil_investasi_nett', 0);
    }
  }, [bidCash]);

  useEffect(() => {
    calculateTotalPayment();
  }, [bidCash, bidReward]);

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
            setIsContinueProcess(false);
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
        {t(`${pathTranslation}.titleObligasi`)}
      </Typography>
      <div className="w-full flex flex-col md:flex-row gap-2 mt-4">
        <MInput
          label={`${t(`${pathTranslation}.text1`)}`}
          registerName="BagiHasil"
          register={register}
          type="text"
          errors={errors}
          disabled
        />
      </div>
      <div className="w-full flex flex-col md:flex-row gap-2 mt-4">
        <MInput
          label={`${t(`${pathTranslation}.text2`)}`}
          registerName="jml_pinjaman_terbit_show"
          register={register}
          type="text"
          errors={errors}
          disabled
        />
        <MInput
          label={`${t(`${pathTranslation}.text3`)}`}
          registerName="dm_pem_02004"
          register={register}
          type="text"
          errors={errors}
          disabled
        />
        <MInput
          label={`${t(`${pathTranslation}.text4`)}`}
          registerName="bid_cash"
          type="number"
          errors={errors}
          placeholder={`${t(`${pathTranslation}.text5`)}`}
          control={control}
          watch={watch}
        />
      </div>
      <hr className="my-4" />
      <Typography className="font-poppins font-semibold text-lg text-[#262626]">
        {`${t(`${pathTranslation}.text11`)}`}
      </Typography>
      <div className="w-full flex flex-col md:flex-row gap-2 mt-4">
        <MInput
          label={`${t(`${pathTranslation}.text12`)}`}
          registerName="imbal_hasil_bulan_temp"
          register={register}
          type="text"
          errors={errors}
          disabled
        />
        <MInput
          label={`${t(`${pathTranslation}.text13`)}`}
          registerName="pajak"
          register={register}
          type="text"
          errors={errors}
          disabled
        />
      </div>
      <div className="w-full flex flex-col md:flex-row gap-2 mt-4">
        <MInput
          label={`${t(`${pathTranslation}.text14`)}`}
          registerName="total_imbal_hasil"
          register={register}
          type="text"
          errors={errors}
          disabled
        />
        <MInput
          label={`${t(`${pathTranslation}.text15`)}`}
          registerName="biaya_administrasi"
          register={register}
          type="text"
          errors={errors}
          disabled
        />
      </div>
      <div className="w-full flex flex-col md:flex-row gap-2 mt-4">
        <MInput
          label={`${t(`${pathTranslation}.text16`)}`}
          registerName="total_modal_imbal_hasil"
          register={register}
          type="text"
          errors={errors}
          disabled
        />
        <MInput
          label={`${t(`${pathTranslation}.text17`)}`}
          registerName="hasil_investasi_nett"
          register={register}
          type="text"
          errors={errors}
          disabled
        />
      </div>
      <Button
        className="w-full text-base font-semibold bg-seeds-button-green mt-6 rounded-full capitalize"
        disabled={bidCash === undefined || isLoading}
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
