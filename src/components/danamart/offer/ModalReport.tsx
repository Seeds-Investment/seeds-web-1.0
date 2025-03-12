import { SeedyPayment } from '@/assets/danamart';
import MInput from '@/components/form-input/multi-input';
import usePostReport, { type ReportFormI } from '@/hooks/danamart/usePostReport';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '../../ui/modal/Modal';

interface Props {
  url: string;
  setIsShowReportForm: React.Dispatch<React.SetStateAction<boolean>>;
  isShowReportForm: boolean;
}

const ModalReport: React.FC<Props> = ({
  url,
  setIsShowReportForm,
  isShowReportForm
}) => {
  const {
    handleSubmit,
    onSubmit,
    register,
    errors,
    control,
    watch,
    setValue,
    isLoading
  } = usePostReport();
  const { t } = useTranslation();
  const pathTranslation = 'danamart.offers.detail.reportForm'
  const formName = watch("nama");
  const formEmail = watch("email");
  const formNohp = watch("nohp");
  const formPernyataan = watch("pernyataan");
  const formIsi = watch("isi");
  const formLink = watch("link");

  const getProspektusURL = (url: string): string => {
    try {
      const parsedUrl = new URL(url);
      const baseUrl = `${parsedUrl.origin}${parsedUrl.pathname}`;
      const params = new URLSearchParams(parsedUrl.search);
      
      const prospektusValue = params.get('prospektus');
      return (prospektusValue !== null) ? `${baseUrl}?prospektus=${prospektusValue}` : baseUrl;
    } catch (error: any) {
      return '';
    }
  };

  useEffect(() => {
    if (url !== undefined) {
      setValue('link', getProspektusURL(url))
    }
  }, [url])

  const isFilled = (): boolean => {
    if (
      (formName === '') ||
      (formEmail === '') ||
      (formNohp === '') ||
      (formPernyataan === '') ||
      (formIsi === '') ||
      (formLink === '')
    ) {
      return false
    } else {
      return true
    }
  }

  return (
    <Modal
      backdropClasses="z-40 fixed top-0 left-0 w-full h-screen bg-black/25 flex justify-start items-start"
      modalClasses="z-50 animate-slide-down fixed top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 md:top-[45%] md:left-[35%] md:right-[-35%] mt-[-17rem] w-full h-[70vh] md:h-fit md:w-[550px] p-6 rounded-lg bg-white overflow-y-scroll"
    >
      <div className='w-full flex justify-start items-center bg-seeds-button-green lg:bg-gradient-to-r from-seeds-button-green to-white rounded-md'>
        <div className='flex justify-center items-center h-[80px] w-auto m-2'>
          <Image
            alt="SeedyPayment"
            width={100}
            height={100}
            src={SeedyPayment}
            className="h-full w-auto"
          />
        </div>
        <Typography className='font-poppins font-semibold text-white text-lg'>
          {t(`${pathTranslation}.title`)}
        </Typography>
      </div>
      <button
        onClick={() => {
          setIsShowReportForm(!isShowReportForm);
        }}
        className="absolute top-6 right-3 p-1 bg-gray-100 rounded-md hover:bg-gray-200"
      >
        <XMarkIcon className="w-5 h-5 text-gray-600" />
      </button>
      
      <div className='p-4'>
        <div className='w-full flex flex-col md:flex-row gap-2 mt-4'>
          <MInput
            label={`${t(`${pathTranslation}.text1`)}`}
            registerName="nama"
            register={register}
            type="text"
            errors={errors}
            placeholder={`${t(`${pathTranslation}.text2`)}`}
            className='rounded-lg px-3 border border-[#BDBDBD]'
          />
        </div>
        <div className='w-full flex flex-col md:flex-row gap-2 mt-4'>
          <MInput
            label={`${t(`${pathTranslation}.text3`)}`}
            registerName="email"
            register={register}
            type="text"
            errors={errors}
            placeholder={`${t(`${pathTranslation}.text4`)}`}
            className='rounded-lg px-3 border border-[#BDBDBD]'
          />
          <MInput
            label={`${t(`${pathTranslation}.text5`)}`}
            registerName="nohp"
            type="long-number"
            errors={errors}
            placeholder={`${t(`${pathTranslation}.text6`)}`}
            control={control}
            watch={watch}
          />
        </div>
        <div className='w-full flex flex-col md:flex-row gap-2 mt-4'>
          <MInput
            label={`${t(`${pathTranslation}.text7`)}`}
            registerName="pernyataan"
            register={register}
            type="text"
            errors={errors}
            placeholder={`${t(`${pathTranslation}.text8`)}`}
            className='rounded-lg px-3 border border-[#BDBDBD]'
          />
        </div>
        <div className='w-full flex flex-col md:flex-row gap-2 mt-4'>
          <MInput
            label={`${t(`${pathTranslation}.text9`)}`}
            registerName="isi"
            register={register}
            type="text"
            errors={errors}
            placeholder={`${t(`${pathTranslation}.text10`)}`}
            className='rounded-lg px-3 border border-[#BDBDBD]'
          />
        </div>
      </div>

      <div className="w-full mt-2 flex justify-center md:justify-end">
        <Button
          disabled={!isFilled() || isLoading}
          onClick={() => {
            handleSubmit((data: ReportFormI) => {
              onSubmit(data).then(() => {
                setIsShowReportForm(!isShowReportForm)
              })
            })();
          }}
          className="rounded-full w-full md:w-fit md:px-8 px-5 py-3 capitalize font-medium text-sm disabled:bg-[#BDBDBD] disabled:text-[#7C7C7C] bg-[#3AC4A0] text-white font-poppins"
        >
          {t(`${pathTranslation}.text11`)}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalReport;
