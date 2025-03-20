import { standartCurrency } from '@/helpers/currency';
import { type IncomingFundsData } from '@/utils/interfaces/danamart/incoming-funds.interface';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button, Typography } from '@material-tailwind/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '../../ui/modal/Modal';

interface Props {
  data: IncomingFundsData;
  setIsShowModalDetailIncomeFunds: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  isShowModalDetailIncomeFunds: boolean;
}

const ModalDetailIncome: React.FC<Props> = ({
  data,
  setIsShowModalDetailIncomeFunds,
  isShowModalDetailIncomeFunds
}) => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.incomingFunds.modal.detailIncome';

  return (
    <Modal
      backdropClasses="z-40 fixed top-0 left-0 w-full h-screen bg-black/25 flex justify-start items-start"
      modalClasses="z-50 animate-slide-down fixed left-0 transform -translate-x-1/2 -translate-y-1/2 top-[60%] md:left-[35%] md:right-[-35%] mt-[-17rem] w-full h-fit md:w-[550px] p-6 rounded-lg bg-white"
    >
      <button
        onClick={() => {
          setIsShowModalDetailIncomeFunds(!isShowModalDetailIncomeFunds);
        }}
        className="absolute top-4 right-4 p-1 bg-gray-100 rounded-md hover:bg-gray-200"
      >
        <XMarkIcon className="w-5 h-5 text-gray-600" />
      </button>

      <Typography className="font-bold text-lg font-poppins">
        {t(`${pathTranslation}.text1`)}
      </Typography>

      <div className="p-4">
        <div className="flex mt-4">
          <div className="w-full">
            <Typography className="font-poppins text-[#262626] font-semibold">
              {t(`${pathTranslation}.text2`)}
            </Typography>
            <Typography className="font-poppins text-[rgb(38,38,38)]">
              {data?.tgl_deposit}
            </Typography>
          </div>
        </div>
        <div className="flex mt-4">
          <div className="w-full">
            <Typography className="font-poppins text-[#262626] font-semibold">
              {t(`${pathTranslation}.text3`)}
            </Typography>
            <Typography className="font-poppins text-[#262626]">
              {`IDR ${standartCurrency(Number(data?.jml_deposit ?? '0') ?? 0)}`}
            </Typography>
          </div>
        </div>
        <div className="flex mt-4">
          <div className="w-full">
            <Typography className="font-poppins text-[#262626] font-semibold">
              {t(`${pathTranslation}.text4`)}
            </Typography>
            <Typography className="font-poppins text-[#262626]">
              {data?.ket}
            </Typography>
          </div>
        </div>
      </div>

      <div className="w-full mt-2 flex justify-center md:justify-end">
        <Button
          onClick={() => {
            setIsShowModalDetailIncomeFunds(!isShowModalDetailIncomeFunds);
          }}
          className="rounded-full w-full md:w-fit md:px-16 px-5 py-3 capitalize font-medium text-sm disabled:bg-[#BDBDBD] disabled:text-[#7C7C7C] bg-[#3AC4A0] text-white font-poppins"
        >
          {t(`${pathTranslation}.close`)}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalDetailIncome;
