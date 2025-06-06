/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { encryptRequest } from '@/helpers/cryptoEncrypt';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const useDownloadReport = (): any => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.incomingFunds.modal.downloadReport';

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setValue,
    trigger,
    watch,
    reset
  } = useForm({
    mode: 'onSubmit'
  });

  const onSubmit = async (formData: {
    daritgl: string;
    sampaitgl: string;
    file: string;
  }): Promise<void> => {
    try {
      const payload = { ...formData };
      const jsonString = JSON.stringify(payload);
      const encryptedData = encryptRequest(jsonString) ?? '';

      const reportUrl = `https://dev.danamart.id/development/dm-scf-api/public/pemodal/DanaMasuk/laporanDanaMasuk?data=${encodeURIComponent(
        encryptedData
      )}`;

      window.open(reportUrl, '_blank');

      if (payload?.file === 'pdf') {
        toast.success(t(`${pathTranslation}.text7`));
      } else {
        toast.success(t(`${pathTranslation}.text8`));
      }
      reset();
    } catch (error) {
      toast.error(t(`${pathTranslation}.text9`));
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

export default useDownloadReport;
