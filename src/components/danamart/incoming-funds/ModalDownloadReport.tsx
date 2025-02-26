import MInput from '@/components/form-input/multi-input';
import { useFormatFile } from '@/components/form-input/multi-input/data/dropdown-data';
import useDownloadReport from '@/hooks/danamart/useDownloadReport';
import { type UserProfile } from '@/utils/interfaces/danamart.interface';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button, Typography } from '@material-tailwind/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '../../ui/modal/Modal';

interface Props {
  setIsShowDownloadReport: (value: boolean) => void;
  isShowDownloadReport: boolean;
  userProfileData: UserProfile;
}

const ModalDownloadReport: React.FC<Props> = ({
  setIsShowDownloadReport,
  isShowDownloadReport,
  userProfileData,
}) => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.incomingFunds.modal.downloadReport';

  const {
    handleSubmit,
    onSubmit,
    register,
    errors,
    control,
    watch,
    setValue
  } = useDownloadReport();

  const startDate = watch('daritgl');
  const endDate = watch('sampaitgl');
  const typeFile = watch('file');

  useEffect(() => {
    setValue('userId', userProfileData?.detailUser[0]?.user_pendana_id)
  }, [userProfileData, startDate, endDate, typeFile])

  const isDisable = (): boolean => {
    return startDate === "" || endDate === "" || typeFile === undefined;
  };

  return (
    <Modal
      backdropClasses="z-40 fixed top-0 left-0 w-full h-screen bg-black/25 flex justify-start items-start"
      modalClasses="z-50 animate-slide-down fixed left-0 transform -translate-x-1/2 -translate-y-1/2 top-[50%] md:top-[55%] md:left-[35%] md:right-[-35%] mt-[-17rem] w-full h-fit md:w-[550px] p-6 rounded-lg bg-white"
    >
      <button
        onClick={() => {
          setIsShowDownloadReport(!isShowDownloadReport);
        }}
        className="absolute top-4 right-4 p-1 bg-gray-100 rounded-md hover:bg-gray-200"
      >
        <XMarkIcon className="w-5 h-5 text-gray-600" />
      </button>

      <Typography className="font-bold text-lg font-poppins">
        {t(`${pathTranslation}.text1`)}
      </Typography>

      <div className='p-4'>
        <div className='w-full flex flex-col md:flex-row gap-2 mt-4'>
          <MInput
            label={`${t(`${pathTranslation}.text2`)}`}
            registerName="daritgl"
            register={register}
            type="date"
            errors={errors}
            className='rounded-lg px-3 border border-[#BDBDBD]'
          />
          <MInput
            label={`${t(`${pathTranslation}.text3`)}`}
            registerName="sampaitgl"
            register={register}
            type="date"
            errors={errors}
            className='rounded-lg px-3 border border-[#BDBDBD]'
          />
        </div>
        <div className='w-full flex flex-col md:flex-row gap-2 mt-4'>
          <MInput
            label={`${t(`${pathTranslation}.text4`)}`}
            registerName="file"
            type="dropdown"
            control={control}
            errors={errors}
            options={useFormatFile()}
            rounded={false}
            fullWidth={true}
          />
        </div>
      </div>

      <div className="w-full mt-2 flex flex-col md:flex-row justify-center md:justify-end gap-4">
        <Button
          onClick={() => { setIsShowDownloadReport(!isShowDownloadReport) }}
          className="rounded-full w-full md:w-fit md:px-8 px-5 py-3 capitalize font-medium text-sm disabled:bg-[#BDBDBD] disabled:text-[#7C7C7C] bg-white text-[#7C7C7C] font-poppins"
        >
          {t(`${pathTranslation}.cancel`)}
        </Button>
        <Button
          disabled={isDisable()}
          onClick={async () => {
            await handleSubmit(onSubmit)();
            setIsShowDownloadReport(false);
          }}
          className="rounded-full w-full md:w-fit md:px-8 px-5 py-3 capitalize font-medium text-sm bg-[#3AC4A0] text-white"
        >
          {t(`${pathTranslation}.yes`)}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalDownloadReport;
