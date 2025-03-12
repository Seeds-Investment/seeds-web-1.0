import { postReport } from "@/repository/danamart/offers.repository";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import * as yup from "yup";

export interface ReportFormI {
  nama: string;
  email: string;
  nohp: string;
  pernyataan: string;
  isi: string;
  link: string;
}

const usePostReport = (): any => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.offers.detail.reportForm'

  const schema = yup.object().shape({
    nama: yup.string().required(t(`${pathTranslation}.validationForm.text1`) ?? 'This field is required'),
    email: yup.string().required(t(`${pathTranslation}.validationForm.text1`) ?? 'This field is required'),
    nohp: yup.string().required(t(`${pathTranslation}.validationForm.text1`) ?? 'This field is required'),
    pernyataan: yup.string().required(t(`${pathTranslation}.validationForm.text1`) ?? 'This field is required'),
    isi: yup.string().required(t(`${pathTranslation}.validationForm.text1`) ?? 'This field is required'),
    link: yup.string().required(t(`${pathTranslation}.validationForm.text1`) ?? 'This field is required'),
  });

	const defaultValues: ReportFormI  = {
    nama: '',
    email: '',
    nohp: '',
    pernyataan: '',
    isi: '',
    link: ''
	}

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setValue,
    trigger,
    watch,
  } = useForm<ReportFormI>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
		defaultValues
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: ReportFormI): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await postReport(data);
      if (response?.StatusCode === '200') {
        toast.success(t(`${pathTranslation}.text12`));
      }
    } catch (error) {
      toast.error(t(`${pathTranslation}.text13`));
    } finally {
      setIsLoading(false);
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
    isLoading,
  };
};

export default usePostReport;
