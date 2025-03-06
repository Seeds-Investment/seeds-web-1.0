import { type InformasiPenawaran } from '@/utils/interfaces/danamart/portfolio.interface';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button, Typography } from '@material-tailwind/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '../../ui/modal/Modal';

interface Props {
  data: InformasiPenawaran;
  setIsShowModalOfferInformation: React.Dispatch<React.SetStateAction<boolean>>;
  isShowModalOfferInformation: boolean;
}

const ModalOfferInformation: React.FC<Props> = ({
  data,
  setIsShowModalOfferInformation,
  isShowModalOfferInformation
}) => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.portfolio.modal'

  return (
    <Modal
      backdropClasses="z-40 fixed top-0 left-0 w-full h-screen bg-black/25 flex justify-start items-start"
      modalClasses="z-50 animate-slide-down fixed top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 md:top-[50%] md:left-[35%] md:right-[-35%] mt-[-17rem] w-full h-[60vh] md:h-fit md:w-[550px] p-6 rounded-lg bg-white overflow-y-scroll"
    >
      <button
        onClick={() => {
          setIsShowModalOfferInformation(!isShowModalOfferInformation);
        }}
        className="absolute top-4 right-4 p-1 bg-gray-100 rounded-md hover:bg-gray-200"
      >
        <XMarkIcon className="w-5 h-5 text-gray-600" />
      </button>

      <Typography className="font-bold text-lg font-poppins">
        {t(`${pathTranslation}.offerInformation.text1`)}
      </Typography>

      {
        data?.jenisEfek === 'Saham' ?
          <div className='p-4'>
            <div className='flex flex-col md:flex-row gap-4 mt-4'>
              <div className='w-full'>
                <Typography className='font-poppins text-[#262626] font-semibold'>
                  {t(`${pathTranslation}.offerInformation.text2`)}
                </Typography>
                <Typography className='font-poppins text-[#262626]'>
                  {data?.namaPenerbit}
                </Typography>
              </div>
              <div className='w-full'>
                <Typography className='font-poppins text-[#262626] font-semibold'>
                  {t(`${pathTranslation}.offerInformation.text3`)}
                </Typography>
                <Typography className='font-poppins text-[#262626]'>
                  {data?.TanggalPenyerahanDana}
                </Typography>
              </div>
            </div>
            <div className='flex flex-col md:flex-row gap-4 mt-4'>
              <div className='w-full'>
                <Typography className='font-poppins text-[#262626] font-semibold'>
                  {t(`${pathTranslation}.offerInformation.text4`)}
                </Typography>
                <Typography className='font-poppins text-[#262626]'>
                  {data?.sektorUsaha}
                </Typography>
              </div>
              <div className='w-full'>
                <Typography className='font-poppins text-[#262626] font-semibold'>
                  {t(`${pathTranslation}.offerInformation.text5`)}
                </Typography>
                <Typography className='font-poppins text-[#262626]'>
                  {data?.['JadwalPembayaranKupon/Dividen']}
                </Typography>
              </div>
            </div>
            <div className='flex flex-col md:flex-row gap-4 mt-4'>
              <div className='w-full'>
                <Typography className='font-poppins text-[#262626] font-semibold'>
                  {t(`${pathTranslation}.offerInformation.text6`)}
                </Typography>
                <Typography className='font-poppins text-[#262626]'>
                  {data?.PersentaseSahamYangDilepas}
                </Typography>
              </div>
              <div className='w-full'>
                <Typography className='font-poppins text-[#262626] font-semibold'>
                  {t(`${pathTranslation}.offerInformation.text7`)}
                </Typography>
                <Typography className='font-poppins text-[#262626]'>
                  {data?.StatusPembayaran}
                </Typography>
              </div>
            </div>
            <div className='flex mt-4'>
              <div className='w-full'>
                <Typography className='font-poppins text-[#262626] font-semibold'>
                  {t(`${pathTranslation}.offerInformation.text8`)}
                </Typography>
                <Typography className='font-poppins text-[#262626]'>
                  {data?.IntensitasPembagianDividen}
                </Typography>
              </div>
            </div>
            <div className='flex mt-4'>
              <div className='w-full'>
                <Typography className='font-poppins text-[#262626] font-semibold'>
                  {t(`${pathTranslation}.offerInformation.text9`)}
                </Typography>
                <Typography className='font-poppins text-[#262626]'>
                  {data?.PersentasePembagianDividen}
                </Typography>
              </div>
            </div>
          </div>
          :
          <div className='p-4'>
            <div className='flex flex-col md:flex-row gap-4 mt-4'>
              <div className='w-full'>
                <Typography className='font-poppins text-[#262626] font-semibold'>
                  {t(`${pathTranslation}.offerInformation.text2`)}
                </Typography>
                <Typography className='font-poppins text-[#262626]'>
                  {data?.namaPenerbit}
                </Typography>
              </div>
              <div className='w-full'>
                <Typography className='font-poppins text-[#262626] font-semibold'>
                  {t(`${pathTranslation}.offerInformation.text3`)}
                </Typography>
                <Typography className='font-poppins text-[#262626]'>
                  {data?.TanggalPenyerahanDana}
                </Typography>
              </div>
            </div>
            <div className='flex flex-col md:flex-row gap-4 mt-4'>
              <div className='w-full'>
                <Typography className='font-poppins text-[#262626] font-semibold'>
                  {t(`${pathTranslation}.offerInformation.text4`)}
                </Typography>
                <Typography className='font-poppins text-[#262626]'>
                  {data?.sektorUsaha}
                </Typography>
              </div>
              <div className='w-full'>
                <Typography className='font-poppins text-[#262626] font-semibold'>
                  {t(`${pathTranslation}.offerInformation.text5`)}
                </Typography>
                <Typography className='font-poppins text-[#262626]'>
                  {data?.['JadwalPembayaranKupon/Dividen']}
                </Typography>
              </div>
            </div>
            <div className='flex flex-col md:flex-row gap-4 mt-4'>
              <div className='w-full'>
                <Typography className='font-poppins text-[#262626] font-semibold'>
                  {t(`${pathTranslation}.offerInformation.text10`)}
                </Typography>
                <Typography className='font-poppins text-[#262626]'>
                  {data?.Kupon}
                </Typography>
              </div>
              <div className='w-full'>
                <Typography className='font-poppins text-[#262626] font-semibold'>
                  {t(`${pathTranslation}.offerInformation.text7`)}
                </Typography>
                <Typography className='font-poppins text-[#262626]'>
                  {data?.StatusPembayaran}
                </Typography>
              </div>
            </div>
            <div className='flex mt-4'>
              <div className='w-full'>
                <Typography className='font-poppins text-[#262626] font-semibold'>
                  {t(`${pathTranslation}.offerInformation.text11`)}
                </Typography>
                <Typography className='font-poppins text-[#262626]'>
                  {data?.Tenor}
                </Typography>
              </div>
            </div>
            <div className='flex mt-4'>
              <div className='w-full'>
                <Typography className='font-poppins text-[#262626] font-semibold'>
                  {t(`${pathTranslation}.offerInformation.text12`)}
                </Typography>
                <Typography className='font-poppins text-[#262626]'>
                  {data?.JenisPenawaran}
                </Typography>
              </div>
            </div>
          </div>
      }

      <div className="w-full mt-2 flex justify-center md:justify-end">
        <Button
          onClick={() => { setIsShowModalOfferInformation(!isShowModalOfferInformation) }}
          className="rounded-full w-full md:w-fit md:px-16 px-5 py-3 capitalize font-medium text-sm disabled:bg-[#BDBDBD] disabled:text-[#7C7C7C] bg-[#3AC4A0] text-white font-poppins"
        >
          {t(`${pathTranslation}.close`)}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalOfferInformation;
