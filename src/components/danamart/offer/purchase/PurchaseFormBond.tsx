import MInput from '@/components/form-input/multi-input';
import {
  useBankName,
  useCashSource
} from '@/components/form-input/multi-input/data/dropdown-data';
import usePurchaseFormBond from '@/hooks/danamart/usePurchaseFormBond';
import { type PurchaseFormDataI } from '@/hooks/danamart/usePurchaseFormStock';
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
  setPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
}

const PurchaseFormBond: React.FC<PurchaseFormProps> = ({
  formPurchaseData,
  pinjamanId,
  dashboardData,
  setIsShowDisclaimer,
  setIsLoading,
  setIsShowOTP,
  isLoading,
  setIsPurchased,
  isPurchased,
  isContinueProcess,
  passedOTP,
  setIsContinueProcess,
  setIsPending,
  isPending,
  setPaymentMethod
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
  } = usePurchaseFormBond();
  const router = useRouter();
  const pathTranslation = 'danamart.offers.purchase.form';
  const bankOptions = useBankName();
  const confirmation = watch('confirm');
  const bidReward = watch('bid_reward');
  const bidCash = watch('bid_cash');
  const sourceCash = watch('sumberDana');
  const totalPaid = watch('jumlah_pembelian');
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const cleanDanaRewerd = Number(
    dashboardData?.dataSaldoUser?.danaRewerd?.replace(/[^\d]/g, '')
  );
  const availableDanaCash = Number(
    dashboardData?.dataSaldoUser?.danaCash?.replace(/[^\d]/g, '')
  );

  const calculateTotalPayment = (): void => {
    let finalPrice = bidCash * 1;

    if (sourceCash === 'TransferDana') {
      finalPrice += 3000;
    }

    if (bidReward === true) {
      finalPrice = Math.max(finalPrice - cleanDanaRewerd, 0);
    }

    setTotalPrice(finalPrice);
    setValue('jumlah_pembelian', finalPrice);
    setValue('bid_cash', bidCash);
  };

  const handleSwitchChange = (): void => {
    if (bidReward === true) {
      setValue('bid_reward', false);
    } else {
      setValue('bid_reward', true);
    }
    calculateTotalPayment();
  };

  const handleSwitchAgreement = (): void => {
    if (confirmation === true) {
      setValue('confirm', false);
    } else {
      setValue('confirm', true);
    }
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
    setValue('jml_pinjaman_terbit', formPurchaseData?.dataInput?.jml_pinjaman_terbit);
    setValue(
      'jml_pinjaman_terbit_show',
      formPurchaseData?.dataForm?.slotPembelian
    );
    setValue('pinjaman_id', formPurchaseData?.dataInput?.pinjaman_id);
    setValue('bunga_persen', formPurchaseData?.dataInput?.bunga_persen);
    setValue('sektor_usaha', formPurchaseData?.dataInput?.sektor_usaha);
    setValue('credit_rating', formPurchaseData?.dataInput?.credit_rating);
    setValue('dm_pem_02003', formPurchaseData?.dataInput?.dm_pem_02003);
    setValue('dm_pem_02004', formPurchaseData?.dataForm?.jangkaWaktu);
    setValue(
      'total_dana_reward',
      dashboardData?.dataSaldoUser?.TotalDanaRewerd
    );
    setValue(
      'total_dana_reward_shown',
      dashboardData?.dataSaldoUser?.TotalDanaRewerd
    );
    setValue('BagiHasil', formPurchaseData?.dataForm?.BagiHasil);
    setValue(
      'jenis',
      formPurchaseData?.dm_pem_05001 === 'Project Financing'
        ? 'project-financing'
        : 'invoice-financing'
    );
  }, [formPurchaseData]);

  useEffect(() => {
    if (bidCash >= 100000) {
      const imbalHasil = Number(formPurchaseData?.dataInput?.bunga_persen);
      const period = Number(formPurchaseData?.dataForm?.jangkaWaktu);

      // Imbal hasil per bulan
      const imbalHasilBulanTemp = Math.round((bidCash * (imbalHasil / 12)));
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
  }, [bidCash, sourceCash, bidReward]);

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

                await Promise.resolve();

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
          } else if (error?.response?.data?.messages?.message ===
            "Maaf jumlah pembelian anda melebihi slot yang ada."
          ) {
            toast.error(t(`${pathTranslation}.formResponse.text7`));
          } else {
            toast.error(
              `Error purchasing assets: ${error?.response?.data?.messages?.message as string}`,
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
      <div className="w-full flex flex-col md:flex-row gap-2 mt-4">
        {
          dashboardData?.dataSaldoUser?.TotalDanaRewerd === 0 ?
            <MInput
              label={`${t(`${pathTranslation}.text6`)}`}
              registerName="total_dana_reward_shown"
              register={register}
              type="text"
              errors={errors}
              disabled
            />
            :
            <MInput
              label={`${t(`${pathTranslation}.text6`)}`}
              registerName="total_dana_reward"
              type="number"
              errors={errors}
              control={control}
              watch={watch}
              disabled
            />
        }
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
            registerName="bid_reward"
            control={control}
            errors={errors}
            onSwitchToggle={handleSwitchChange}
          />
        </div>
        <Typography className="w-full flex justify-start items-center font-poppins font-semibold">
          {`${t(`${pathTranslation}.text8`)}`}
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
        {sourceCash === 'TransferDana' && totalPaid >= 1000000 && (
          <MInput
            label={`${t(`${pathTranslation}.text10`)}`}
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
      <div className="w-full flex justify-start items-end gap-2 mt-4">
        <div className="w-auto">
          <MInput
            type="switch"
            registerName="confirm"
            control={control}
            errors={errors}
            onSwitchToggle={handleSwitchAgreement}
          />
        </div>
        <Typography className="w-full flex justify-start items-center font-poppins font-semibold">
          {`${t(`${pathTranslation}.text18`)}`}
        </Typography>
      </div>
      <Button
        className="w-full text-base font-semibold bg-seeds-button-green mt-6 rounded-full capitalize"
        disabled={bidCash === undefined || sourceCash === '' || isLoading }
        onClick={() => {
          if (bidCash < 100000) {
            toast.error(t(`${pathTranslation}.formResponse.text5`));
          } else {
            if (confirmation === undefined || confirmation === false) {
              toast.error(t(`${pathTranslation}.formResponse.text6`));
            } else {
              if (sourceCash === 'DanaCash') {
                if (availableDanaCash < bidCash) {
                  toast.error(t(`${pathTranslation}.formResponse.text8`))
                } else {
                  if (bidCash > watch('jml_pinjaman_terbit_show')) {
                    toast.error(t(`${pathTranslation}.formResponse.text9`))
                  } else {
                    setIsShowDisclaimer(true);
                    setPaymentMethod('DanaCash')
                  }
                }
              } else {
                if (
                  (watch('bank_code') === 'BCA') ||
                  (watch('bank_code') === 'MANDIRI') ||
                  (watch('bank_code') === 'BNI') ||
                  (watch('bank_code') === 'BRI')
                ) {
                  if (totalPaid > 50000000) {
                    toast.error(t(`${pathTranslation}.formResponse.text10`))
                  } else {
                    if (watch('bid_cash') > watch('jml_pinjaman_terbit_show')) {
                      toast.error(t(`${pathTranslation}.formResponse.text9`))
                    } else {
                      setIsShowDisclaimer(true);
                      setPaymentMethod('TransferDana')
                    }
                  }
                } else if (watch('bank_code') === 'PERMATA') {
                  if (totalPaid > 9000000) {
                    toast.error(t(`${pathTranslation}.formResponse.text10`))
                  } else {
                    if (watch('bid_cash') > watch('jml_pinjaman_terbit_show')) {
                      toast.error(t(`${pathTranslation}.formResponse.text9`))
                    } else {
                      setIsShowDisclaimer(true);
                      setPaymentMethod('TransferDana')
                    }
                  }
                }
              }
            }
          }
        }}
      >
        {t(`${pathTranslation}.text19`)}
      </Button>
    </div>
  );
};

export default PurchaseFormBond;
