/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { purchaseItem } from "@/repository/danamart/offers.repository";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

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
  harga_perlembar_saham?: string;
  bid_cash: number;
  bank_code?: string;
  bid_reward: boolean;
  sumberDana: string;
  kodeOtp?: string;
}

const usePurchaseFormBond = (): any => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.offers.purchase.validationForm';
  
  const schema = yup.object().shape({
    bid_cash: yup.number().required(t(`${pathTranslation}.text1`) ?? 'This field is required'),
    bank_code: yup.string().when(["sumberDana", "bid_cash"], {
      is: (sumberDana: string, bid_cash: number) => sumberDana === "TransferDana" && bid_cash >= 1000000,
      then: schema => schema.required(t(`${pathTranslation}.text1`) ?? 'This field is required'),
      otherwise: schema => schema.notRequired()
    }),
    bid_reward: yup.boolean().required(t(`${pathTranslation}.text1`) ?? 'This field is required'),
    sumberDana: yup.string().required(t(`${pathTranslation}.text1`) ?? 'This field is required'),
    kodeOtp: yup.string().when("sumberDana", {
      is: "DanaCash",
      then: schema => schema.required(t(`${pathTranslation}.text1`) ?? 'This field is required'),
      otherwise: schema => schema.notRequired()
    }),
  });

	const defaultValues: PurchaseFormDataI  = {
    user_peminjam_id: "",
    user_pendana_id: "",
    pinjaman_id: "",
    sektor_usaha: "",
    bunga_persen: "",
    credit_rating: "",
    dm_pem_02003: "",
    dm_pem_02004: "",
    jml_pinjaman_terbit: "",
    tgl_jatuh_tempo: "",
    referral_id_lv1_peminjam: "",
    referral_id_lv2_peminjam: "",
    referral_id_lv1_pendana: "",
    referral_id_lv2_pendana: "",
    total_dana_reward: "",
    harga_perlembar_saham: "",
    bid_cash: 0,
    bank_code: "",
    bid_reward: false,
    sumberDana: "",
    kodeOtp: ""
	}

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
    mode: "onSubmit",
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

export default usePurchaseFormBond;
