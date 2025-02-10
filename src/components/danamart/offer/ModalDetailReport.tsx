import { type ReportI } from '@/utils/interfaces/danamart/offers.interface';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Typography } from '@material-tailwind/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '../../ui/modal/Modal';

interface Props {
  setIsShowDetailReport: (value: boolean) => void;
  isShowDetailReport: boolean;
  selectedReport: number;
  reportData: ReportI[];
}

const ModalDetailReport: React.FC<Props> = ({
  setIsShowDetailReport,
  isShowDetailReport,
  selectedReport,
  reportData
}) => {
  const { t } = useTranslation();
	const pathTranslation = 'danamart.offers.dashboard.offerCard'
  console.log('reportData ', reportData)

  return (
    <Modal
      backdropClasses="z-40 fixed top-0 left-0 w-full h-screen bg-black/25 flex justify-start items-start"
      modalClasses="z-50 animate-slide-down fixed top-[70%] left-0 transform -translate-x-1/2 -translate-y-1/2 md:top-[60%] md:left-[35%] md:right-[-35%] mt-[-17rem] w-full h-fit md:w-[450px] p-6 rounded-lg bg-white"
    >
      <button
        onClick={() => { setIsShowDetailReport(!isShowDetailReport); }}
        className="absolute top-4 right-4 p-1 bg-gray-100 rounded-md hover:bg-gray-200"
      >
        <XMarkIcon className="w-5 h-5 text-gray-600" />
      </button>

      <Typography className="font-bold text-lg">
        Modal
      </Typography>
    </Modal>
  );
};

export default ModalDetailReport;
