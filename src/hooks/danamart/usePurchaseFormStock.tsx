/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { purchaseItem } from '@/repository/danamart/offers.repository';
import { yupResolver } from '@hookform/resolvers/yup';
import { type Control, type FieldErrors, useForm, type UseFormHandleSubmit, type UseFormRegister, type UseFormReset, type UseFormSetValue, type UseFormTrigger, type UseFormWatch } from 'react-hook-form';
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
  bank_code?: string;
  bid_rewerd: boolean;
  sumberDana: string;
  kodeOtp?: string;
}

const usePurchaseFormStock = (): {
  handleSubmit: UseFormHandleSubmit<PurchaseFormDataI>;
  register: UseFormRegister<PurchaseFormDataI>;
  errors: FieldErrors<PurchaseFormDataI>;
  control: Control<PurchaseFormDataI>;
  setValue: UseFormSetValue<PurchaseFormDataI>;
    trigger: UseFormTrigger<PurchaseFormDataI>;
  watch: UseFormWatch<PurchaseFormDataI>;
  reset: UseFormReset<PurchaseFormDataI>;
  onSubmit: (data: PurchaseFormDataI) => Promise<void>;
} => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.offers.purchase.validationForm';

  const schema = yup.object().shape({
    lembar_saham: yup
      .string()
      .required(t(`${pathTranslation}.text1`) ?? 'This field is required'),
    bank_code: yup.string().when(['sumberDana', 'bid_cash'], {
      is: (sumberDana: string, bid_cash: number) =>
        sumberDana === 'TransferDana' && bid_cash >= 1000000,
      then: schema =>
        schema.required(
          t(`${pathTranslation}.text1`) ?? 'This field is required'
        ),
      otherwise: schema => schema.notRequired()
    }),
    bid_rewerd: yup
      .boolean()
      .required(t(`${pathTranslation}.text1`) ?? 'This field is required'),
    sumberDana: yup
      .string()
      .required(t(`${pathTranslation}.text1`) ?? 'This field is required'),
    kodeOtp: yup.string().when('sumberDana', {
      is: 'DanaCash',
      then: schema =>
        schema.required(
          t(`${pathTranslation}.text1`) ?? 'This field is required'
        ),
      otherwise: schema => schema.notRequired()
    })
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
    bank_code: '',
    bid_rewerd: false,
    sumberDana: '',
    kodeOtp: ''
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
      const response = await purchaseItem(data);
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

export default usePurchaseFormStock;
