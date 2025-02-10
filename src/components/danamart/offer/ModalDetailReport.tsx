import { type ReportI } from '@/utils/interfaces/danamart/offers.interface';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button, Typography } from '@material-tailwind/react';
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
	const pathTranslation = 'danamart.offers.detail.tab.report.modalDetail'

  return (
    <Modal
      backdropClasses="z-40 fixed top-0 left-0 w-full h-screen bg-black/25 flex justify-start items-start"
      modalClasses={`
        ${reportData[selectedReport]?.jenis === 'Saham' 
          ? 'md:w-[550px] md:left-[15%] md:right-[-15%] lg:left-[25%] lg:right-[-25%] xl:left-[30%] xl:right-[-30%] 2xl:left-[35%] 2xl:right-[-35%] top-[40%] md:top-[50%] h-[70vh] overflow-y-scroll' 
          : 'md:w-[450px] md:left-[35%] md:right-[-35%] top-[70%] md:top-[60%] h-fit'}
          z-50 animate-slide-down fixed left-0 transform -translate-x-1/2 -translate-y-1/2 mt-[-17rem] w-full p-6 rounded-lg bg-white`
        }
    >
      <button
        onClick={() => { setIsShowDetailReport(!isShowDetailReport); }}
        className="absolute top-4 right-4 p-1 bg-gray-100 rounded-md hover:bg-gray-200"
      >
        <XMarkIcon className="w-5 h-5 text-gray-600" />
      </button>

      <Typography className="font-bold text-xl">
        {t(`${pathTranslation}.title`)}
      </Typography>
      
      <div className='p-4'>
        {
          reportData[selectedReport]?.jenis === 'Obligasi'
            ? reportData[selectedReport]?.jenisLaporan === 'Laporan Berkala'
              ?
                <div className='flex flex-col gap-4'>
                  <div>
                    <Typography className='font-poppins text-[#262626] font-semibold'>
                      {t(`${pathTranslation}.text1`)}
                    </Typography>
                    <Typography className='font-poppins text-[#262626]'>
                      {reportData[selectedReport]?.jenisLaporan}
                    </Typography>
                  </div>
                  <div>
                    <Typography className='font-poppins text-[#262626] font-semibold'>
                      {t(`${pathTranslation}.text2`)}
                    </Typography>
                    <Typography className='font-poppins text-[#262626]'>
                      {reportData[selectedReport]?.modalDetail?.perkembanganProyek}
                    </Typography>
                  </div>
                  <div>
                    <Typography className='font-poppins text-[#262626] font-semibold'>
                      {t(`${pathTranslation}.text3`)}
                    </Typography>
                    <Typography className='font-poppins text-[#262626]'>
                      {reportData[selectedReport]?.jenis}
                    </Typography>
                  </div>
                  <div>
                    <Typography className='font-poppins text-[#262626] font-semibold'>
                      {t(`${pathTranslation}.text4`)}
                    </Typography>
                    <a
                      href={`https://dev.danamart.id/development/dm-scf-api/writable/uploads/${reportData[selectedReport]?.modalDetail?.dokumen ?? ''}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className='font-poppins text-seeds-button-green break-words'
                    >
                      {t(`${pathTranslation}.text5`)}
                    </a>
                  </div>
                </div>
              :
                <div className='flex flex-col gap-4'>
                  <div>
                    <Typography className='font-poppins text-[#262626] font-semibold'>
                      {t(`${pathTranslation}.text1`)}
                    </Typography>
                    <Typography className='font-poppins text-[#262626]'>
                      {reportData[selectedReport]?.jenisLaporan}
                    </Typography>
                  </div>
                  <div>
                    <Typography className='font-poppins text-[#262626] font-semibold'>
                      {t(`${pathTranslation}.text6`)}
                    </Typography>
                    <div
                      className="font-poppins text-[#262626]"
                      dangerouslySetInnerHTML={{
                        __html: reportData[selectedReport]?.modalDetail?.dm_ebus_01004 ?? ''
                      }}
                    />
                  </div>
                  <div>
                    <Typography className='font-poppins text-[#262626] font-semibold'>
                      {t(`${pathTranslation}.text7`)}
                    </Typography>
                    <a
                      href={`https://dev.danamart.id/development/dm-scf-api/writable/uploads/${reportData[selectedReport]?.modalDetail?.dm_ebus_01005 ?? ''}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className='font-poppins text-seeds-button-green break-words'
                    >
                      {t(`${pathTranslation}.text5`)}
                    </a>
                  </div>
                </div>
            :
              <div className='flex flex-col gap-4'>
                <div>
                  <Typography className='font-poppins text-[#262626] font-semibold'>
                    {t(`${pathTranslation}.text1`)}
                  </Typography>
                  <Typography className='font-poppins text-[#262626]'>
                    {reportData[selectedReport]?.jenisLaporan}
                  </Typography>
                </div>
                <div className='flex flex-col md:flex-row gap-4 md:gap-0'>
                  <div className='w-full md:w:1/2'>
                    <Typography className='font-poppins text-[#262626] font-semibold'>
                      {t(`${pathTranslation}.text8`)}
                    </Typography>
                    <a
                      href={`https://dev.danamart.id/development/dm-scf-api/writable/uploads/${reportData[selectedReport]?.modelDetail?.dataDok?.RealisasiPenggunaanDana ?? ''}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className='font-poppins text-seeds-button-green break-words'
                    >
                      {t(`${pathTranslation}.text5`)}
                    </a>
                  </div>
                  <div className='w-full md:w:1/2'>
                    <Typography className='font-poppins text-[#262626] font-semibold'>
                      {t(`${pathTranslation}.text9`)}
                    </Typography>
                    <a
                      href={`https://dev.danamart.id/development/dm-scf-api/writable/uploads/${reportData[selectedReport]?.modelDetail?.dataDok?.LaporanPerubahanEkuitas ?? ''}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className='font-poppins text-seeds-button-green break-words'
                    >
                      {t(`${pathTranslation}.text5`)}
                    </a>
                  </div>
                </div>
                <div className='flex flex-col md:flex-row gap-4 md:gap-0'>
                  <div className='w-full md:w:1/2'>
                    <Typography className='font-poppins text-[#262626] font-semibold'>
                      {t(`${pathTranslation}.text10`)}
                    </Typography>
                    <a
                      href={`https://dev.danamart.id/development/dm-scf-api/writable/uploads/${reportData[selectedReport]?.modelDetail?.dataDok?.LaporanNeraca ?? ''}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className='font-poppins text-seeds-button-green break-words'
                    >
                      {t(`${pathTranslation}.text5`)}
                    </a>
                  </div>
                  <div className='w-full md:w:1/2'>
                    <Typography className='font-poppins text-[#262626] font-semibold'>
                      {t(`${pathTranslation}.text11`)}
                    </Typography>
                    <a
                      href={`https://dev.danamart.id/development/dm-scf-api/writable/uploads/${reportData[selectedReport]?.modelDetail?.dataDok?.CatatanAtasLaporanKeuangan ?? ''}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className='font-poppins text-seeds-button-green break-words'
                    >
                      {t(`${pathTranslation}.text5`)}
                    </a>
                  </div>
                </div>
                <div className='flex flex-col md:flex-row gap-4 md:gap-0'>
                  <div className='w-full md:w:1/2'>
                    <Typography className='font-poppins text-[#262626] font-semibold'>
                      {t(`${pathTranslation}.text12`)}
                    </Typography>
                    <a
                      href={`https://dev.danamart.id/development/dm-scf-api/writable/uploads/${reportData[selectedReport]?.modelDetail?.dataDok?.['LaporanLaba/Rugi'] ?? ''}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className='font-poppins text-seeds-button-green break-words'
                    >
                      {t(`${pathTranslation}.text5`)}
                    </a>
                  </div>
                  <div className='w-full md:w:1/2'>
                    <Typography className='font-poppins text-[#262626] font-semibold'>
                      {t(`${pathTranslation}.text13`)}
                    </Typography>
                    <Typography className='font-poppins text-[#262626]'>
                      {reportData[selectedReport]?.modelDetail?.NamaDireksi}
                    </Typography>
                  </div>
                </div>
                <div className='flex flex-col md:flex-row gap-4 md:gap-0'>
                  <div className='w-full md:w:1/2'>
                    <Typography className='font-poppins text-[#262626] font-semibold'>
                      {t(`${pathTranslation}.text14`)}
                    </Typography>
                    <a
                      href={`https://dev.danamart.id/development/dm-scf-api/writable/uploads/${reportData[selectedReport]?.modelDetail?.dataDok?.LaporanArusKas ?? ''}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className='font-poppins text-seeds-button-green break-words'
                    >
                      {t(`${pathTranslation}.text5`)}
                    </a>
                  </div>
                  <div className='w-full md:w:1/2'>
                    <Typography className='font-poppins text-[#262626] font-semibold'>
                      {t(`${pathTranslation}.text15`)}
                    </Typography>
                    <Typography className='font-poppins text-[#262626]'>
                      {reportData[selectedReport]?.modelDetail?.NamaDewanKomisaris}
                    </Typography>
                  </div>
                </div>
                <div className='flex flex-col md:flex-row gap-4 md:gap-0'>
                  <div className='w-full md:w:1/2'>
                    <Typography className='font-poppins text-[#262626] font-semibold'>
                      {t(`${pathTranslation}.text16`)}
                    </Typography>
                    <a
                      href={`https://dev.danamart.id/development/dm-scf-api/writable/uploads/${reportData[selectedReport]?.modelDetail?.dataDok?.HasilRups ?? ''}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className='font-poppins text-seeds-button-green break-words'
                    >
                      {t(`${pathTranslation}.text5`)}
                    </a>
                  </div>
                  <div className='w-full md:w:1/2'>
                    <Typography className='font-poppins text-[#262626] font-semibold'>
                      {t(`${pathTranslation}.text17`)}
                    </Typography>
                    <Typography className='font-poppins text-[#262626]'>
                      {reportData[selectedReport]?.modelDetail?.dataDok?.tglPembagianDividen}
                    </Typography>
                  </div>
                </div>
                <div>
                  <Typography className='font-poppins text-[#262626] font-semibold'>
                    {t(`${pathTranslation}.text19`)}
                  </Typography>
                  <Typography className='font-poppins text-[#262626]'>
                    {reportData[selectedReport]?.modelDetail?.dataDok?.jmlPembagianDividen}
                  </Typography>
                </div>
                <div>
                  <Typography className='font-poppins text-[#262626] font-semibold'>
                    {reportData[selectedReport]?.modelDetail?.dataLaporan?.text1}
                  </Typography>
                  <Typography className='font-poppins text-[#262626]'>
                    {reportData[selectedReport]?.modelDetail?.dataLaporan?.value1}
                  </Typography>
                </div>
                <div>
                  <Typography className='font-poppins text-[#262626] font-semibold'>
                    {reportData[selectedReport]?.modelDetail?.dataLaporan?.text2}
                  </Typography>
                  <Typography className='font-poppins text-[#262626]'>
                    {reportData[selectedReport]?.modelDetail?.dataLaporan?.value2}
                  </Typography>
                </div>
                <div>
                  <Typography className='font-poppins text-[#262626] font-semibold'>
                    {reportData[selectedReport]?.modelDetail?.dataLaporan?.text3}
                  </Typography>
                  <Typography className='font-poppins text-[#262626]'>
                    {reportData[selectedReport]?.modelDetail?.dataLaporan?.value3}
                  </Typography>
                </div>
                <div>
                  <Typography className='font-poppins text-[#262626] font-semibold'>
                    {reportData[selectedReport]?.modelDetail?.dataLaporan?.text4}
                  </Typography>
                  <Typography className='font-poppins text-[#262626]'>
                    {reportData[selectedReport]?.modelDetail?.dataLaporan?.value4}
                  </Typography>
                </div>
              </div>
        }
      </div>

      <div className='w-full flex justify-end items-end'>
        <Button
          onClick={() => { setIsShowDetailReport(!isShowDetailReport); }}
          className="w-[200px] text-sm font-semibold bg-seeds-button-green mt-4 rounded-full capitalize"
        >
          {t(`${pathTranslation}.text19`)}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalDetailReport;
