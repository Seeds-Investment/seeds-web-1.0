/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { purchaseItemCheckTesting } from '@/repository/danamart/offers.repository';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

export interface PurchaseFormDataI {
  user_peminjam_id?: string;
  user_pendana_id?: string;
  pinjaman_id?: string;
  sektor_usaha?: string;
  bunga_persen?: string;
  credit_rating?: string;
  dm_pem_02003?: string;
  dm_pem_02004?: string;
  jml_pinjaman_terbit?: string;
  tgl_jatuh_tempo?: string;
  referral_id_lv1_peminjam?: string;
  referral_id_lv2_peminjam?: string;
  referral_id_lv1_pendana?: string;
  referral_id_lv2_pendana?: string;
  total_dana_reward?: string;
  bid_cash?: string;
  harga_perlembar_saham?: string;
  lembar_saham: string;
}

const usePurchaseFormBondCheckTesting = (): any => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.offers.purchase.validationForm';

  const schema = yup.object().shape({
    lembar_saham: yup
      .string()
      .required(t(`${pathTranslation}.text1`) ?? 'This field is required'),
  });

  const defaultValues: PurchaseFormDataI = {
    user_peminjam_id: '',
    user_pendana_id: '',
    pinjaman_id: '',
    sektor_usaha: '',
    bunga_persen: '',
    credit_rating: '',
    dm_pem_02003: '',
    dm_pem_02004: '',
    jml_pinjaman_terbit: '',
    tgl_jatuh_tempo: '',
    referral_id_lv1_peminjam: '',
    referral_id_lv2_peminjam: '',
    referral_id_lv1_pendana: '',
    referral_id_lv2_pendana: '',
    total_dana_reward: '',
    bid_cash: '',
    harga_perlembar_saham: '',
    lembar_saham: '',
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setValue,
    trigger,
    watch,
    reset
  } = useForm<PurchaseFormDataI>({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
    defaultValues
  });

  const onSubmit = async (data: PurchaseFormDataI): Promise<void> => {
    try {
      const response = await purchaseItemCheckTesting(data);
      return response;
    } catch (error) {
      await Promise.reject(error);
    }
  };

  return {
    handleSubmit,
    register,
    errors,
    control,
    setValue,
    trigger,
    watch,
    onSubmit,
    reset
  };
};

export default usePurchaseFormBondCheckTesting;
