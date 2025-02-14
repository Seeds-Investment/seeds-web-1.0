import { type OfferList } from '@/utils/interfaces/danamart/offers.interface';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button, Typography } from '@material-tailwind/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '../../ui/modal/Modal';

interface Props {
  data: OfferList;
  setIsOpenModalDetail: (value: boolean) => void;
  isOpenModalDetail: boolean;
}

const ModalDetailOffer: React.FC<Props> = ({
  data,
  setIsOpenModalDetail,
  isOpenModalDetail
}) => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.offers.dashboard.detailOffer';
  const router = useRouter();

  return (
    <Modal
      backdropClasses="z-40 fixed top-0 left-0 w-full h-screen bg-black/25 flex justify-start items-start"
      modalClasses="z-50 animate-slide-down fixed top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 md:top-[60%] md:left-[35%] md:right-[-35%] mt-[-17rem] w-full h-fit md:w-[550px] p-6 rounded-lg bg-white"
    >
      <button
        onClick={() => {
          setIsOpenModalDetail(!isOpenModalDetail);
        }}
        className="absolute top-4 right-4 p-1 bg-gray-100 rounded-md hover:bg-gray-200"
      >
        <XMarkIcon className="w-5 h-5 text-gray-600" />
      </button>

      <Typography className="font-bold text-lg">{data?.pinjaman_id}</Typography>

      <div className="my-4 md:my-2 p-0 md:p-4 flex flex-col gap-2">
        <div className="flex justify-between">
          <Typography className="font-poppins text-[#677788]">
            {t(`${pathTranslation}.text1`)}
          </Typography>
          <Typography className="font-poppins text-[#687889] font-medium text-right">
            Rp 100.000,-
          </Typography>
        </div>

        <div className="flex justify-between">
          <Typography className="font-poppins text-[#677788]">
            {t(`${pathTranslation}.text2`)}
          </Typography>
          <Typography className="font-poppins text-[#687889] font-medium text-right">
            {data?.inisial}
          </Typography>
        </div>

        <div className="flex justify-between">
          <Typography className="font-poppins text-[#677788]">
            {t(`${pathTranslation}.text3`)}
          </Typography>
          <Typography className="font-poppins text-[#687889] font-medium text-right">
            {data?.lokasi}
          </Typography>
        </div>

        <div className="flex justify-between">
          <Typography className="font-poppins text-[#677788]">
            {t(`${pathTranslation}.text4`)}
          </Typography>
          <Typography className="font-poppins text-[#687889] font-medium text-right">
            {data?.dm_pem_05001}
          </Typography>
        </div>
      </div>

      <div className="mt-2 flex justify-center">
        <Button
          onClick={async () => {
            await router.push(
              `/danamart/offer/prospectus/${data?.pinjaman_id}`
            );
          }}
          className="rounded-full w-fit px-5 py-3 capitalize font-medium text-sm disabled:bg-[#BDBDBD] disabled:text-[#7C7C7C] bg-[#3AC4A0] text-white font-poppins"
        >
          {t(`${pathTranslation}.text5`)}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalDetailOffer;
