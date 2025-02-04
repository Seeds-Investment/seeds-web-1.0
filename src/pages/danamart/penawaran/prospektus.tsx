import PageGradient from '@/components/ui/page-gradient/PageGradient';
import withAuthDanamart from '@/helpers/withAuthDanamart';
import { getDetailProspektus } from '@/repository/danamart/danamart.repository';
import { type DetailProspektus } from '@/utils/interfaces/danamart.interface';
import { Typography } from '@material-tailwind/react';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FaUserGroup } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const Prospektus = (): React.ReactElement => {
  const { t } = useTranslation();
  const router = useRouter();
  const prospektusId = router.query.id;

  const [detailProspektus, setDetailProspektus] = useState<DetailProspektus>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const thumbnailRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [value, setValue] = useState(15);
  const fetchDetailProspektus = async (): Promise<void> => {
    try {
      const response: DetailProspektus = await getDetailProspektus(
        prospektusId as string
      );
      if (response.StatusCode === '200') {
        setDetailProspektus(response);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (prospektusId !== undefined) {
      void fetchDetailProspektus();
    } else {
      void router.push('/danamart/penawaran');
    }
  }, [prospektusId]);

  const imageList = [
    'https://placehold.co/600x400',
    'https://placehold.co/500x400',
    'https://placehold.co/400x400',
    'https://placehold.co/300x400'
  ];

  const handlePrev = (): void => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? imageList.length - 1 : prevIndex - 1
    );
  };

  const handleNext = (): void => {
    setCurrentIndex(prevIndex =>
      prevIndex === imageList.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    if (thumbnailRefs.current[currentIndex] != null) {
      thumbnailRefs.current[currentIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [currentIndex]);

  return (
    <PageGradient defaultGradient className="w-full">
      <div className="w-full bg-white flex flex-col md:gap-8 gap-6 px-5 py-8">
        <Typography className="font-poppins md:text-3xl text-lg font-semibold text-[#262626]">
          {t('danamart.offers.detail.offer')} {prospektusId}
        </Typography>
        <div className="flex md:flex-col flex-col-reverse shadow-md rounded-lg p-6 md:gap-4 gap-2">
          {[
            {
              label: t('danamart.offers.detail.minimumInvest'),
              value: detailProspektus?.Data.jmlMinDana
            },
            {
              label: t('danamart.offers.detail.securitiesCode'),
              value: detailProspektus?.Data.idPinjaman
            },
            {
              label: t('danamart.offers.detail.location'),
              value: detailProspektus?.Data.Overview.Bisnis.AlamatPerusahaan
            },
            {
              label: t('danamart.offers.detail.intendFund'),
              value: detailProspektus?.Data.TPD
            }
          ].map((item, index) => (
            <div key={index} className="flex md:flex-row flex-col md:gap-8">
              <Typography className="font-poppins text-base font-normal text-[#bdbdbd] w-[250px]">
                {item.label}
              </Typography>
              <Typography className="font-poppins text-base font-normal text-[#262626] flex-1">
                {item.value}
              </Typography>
            </div>
          ))}
        </div>
        <div className="bg-white shadow-md rounded-lg flex md:flex-row flex-col md:gap-8 gap-6 p-5">
          <div className="flex flex-col gap-4">
            <div>
              <div className="relative w-[311px] h-[240px]">
                <img
                  src={imageList[currentIndex]}
                  alt="Parent Image"
                  className="bg-red-50 w-full h-full object-cover rounded-md"
                />
                <button
                  onClick={handlePrev}
                  className="absolute top-1/2 left-2 -translate-y-1/2 bg-[#DCFCE433]/50 text-[#3AC4A0] p-2 rounded-full hover:bg-[#DCFCE433]/70 transition"
                >
                  <FaChevronLeft size={20} />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute top-1/2 right-2 -translate-y-1/2 bg-[#DCFCE433]/50 text-[#3AC4A0] p-2 rounded-full hover:bg-[#DCFCE433]/70 transition"
                >
                  <FaChevronRight size={20} />
                </button>
              </div>
              <div className="max-w-[311px] overflow-x-auto no-scroll flex items-center gap-1 p-2 rounded-md shadow-lg">
                {imageList.map((item, index) => (
                  <div
                    key={index}
                    ref={el => (thumbnailRefs.current[index] = el)}
                    className="flex-shrink-0"
                  >
                    <img
                      onClick={() => {
                        setCurrentIndex(index);
                      }}
                      src={item}
                      alt="gambar"
                      className={`w-[77px] h-[60px] cursor-pointer hover:scale-110 transition duration-150 ${
                        index === currentIndex
                          ? 'border-[#3ac4a0] border-2'
                          : ''
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <Typography className="font-poppins font-normal text-[10px] text-[#bdbdbd]">
                  {detailProspektus?.Data.StatusListing}
                </Typography>
                <Typography className="flex items-center font-poppins font-normal text-[10px] text-[#bdbdbd] gap-1">
                  <FaUserGroup size={10} color="#bdbdbd" />3 Pemodal
                </Typography>
              </div>
              <div className="w-full relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={value}
                  onChange={e => {
                    setValue(Number(e.target.value));
                  }}
                  className="w-full cursor-pointer appearance-none bg-transparent"
                  style={{
                    WebkitAppearance: 'none',
                    appearance: 'none'
                  }}
                />
                <span className="absolute top-1/2 right-0 -translate-y-1/2 text-sm text-gray-600">
                  {value}%
                </span>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </PageGradient>
  );
};

export default withAuthDanamart(Prospektus);
