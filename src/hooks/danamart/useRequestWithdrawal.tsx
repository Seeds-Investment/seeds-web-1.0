/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { requestWithdrawal } from '@/repository/danamart/outgoing-funds.repository';
import { yupResolver } from '@hookform/resolvers/yup';
import { type Control, type FieldErrors, useForm, type UseFormHandleSubmit, type UseFormRegister, type UseFormReset, type UseFormSetValue, type UseFormTrigger, type UseFormWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

export interface RequestWithdrawI {
  jml_pembayaran: string;
  kodeOtp: string;
}

const useRequestWithdrawal = (): {
  handleSubmit: UseFormHandleSubmit<RequestWithdrawI>;
  register: UseFormRegister<RequestWithdrawI>;
  errors: FieldErrors<RequestWithdrawI>;
  control: Control<RequestWithdrawI>;
  setValue: UseFormSetValue<RequestWithdrawI>;
    trigger: UseFormTrigger<RequestWithdrawI>;
  watch: UseFormWatch<RequestWithdrawI>;
  reset: UseFormReset<RequestWithdrawI>;
  onSubmit: (data: RequestWithdrawI) => Promise<void>;
} => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.offers.purchase.validationForm';

  const schema = yup.object().shape({
    jml_pembayaran: yup
      .string()
      .required(t(`${pathTranslation}.text1`) ?? 'This field is required'),
    kodeOtp: yup
      .string()
      .required(t(`${pathTranslation}.text1`) ?? 'This field is required')
  });

  const defaultValues: RequestWithdrawI = {
    jml_pembayaran: '',
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
  } = useForm<RequestWithdrawI>({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
    defaultValues
  });

  const onSubmit = async (data: RequestWithdrawI): Promise<void> => {
    try {
      const response = await requestWithdrawal(data);
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

export default useRequestWithdrawal;
