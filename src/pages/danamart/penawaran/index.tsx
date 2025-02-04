import ModalDetailOffer from '@/components/danamart/offer/ModalDetailOffer';
import ModalFinanceInformation from '@/components/danamart/offer/ModalFinanceOffer';
import ModalShareOffer from '@/components/danamart/offer/ModalShareOffer';
import OfferListCard from '@/components/danamart/offer/OfferListCard';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import withAuthDanamart from '@/helpers/withAuthDanamart';
import { getOffersList } from '@/repository/danamart/offers.repository';
import { type OfferData } from '@/utils/interfaces/danamart/offers.interface';
import { Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';
import { toast } from 'react-toastify';

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const NextArrow = (props: ArrowProps): React.ReactElement => {
  const { className, onClick } = props;
  return (
    <div
      className={`${
        className ?? ''
      } rounded-full absolute right-[-50px] top-1/2 transform -translate-y-1/2 cursor-pointer shadow-lg`}
      style={{ position: 'absolute', right: 10, background: '#4FE6AF' }}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props: ArrowProps): React.ReactElement => {
  const { className, onClick } = props;
  return (
    <div
      className={`${
        className ?? ''
      } rounded-full absolute left-[-50px] top-1/2 transform -translate-y-1/2 cursor-pointer shadow-lg`}
      style={{
        left: 10,
        background: '#4FE6AF'
      }}
      onClick={onClick}
    />
  );
};

const Penawaran = (): React.ReactElement => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.offers.dashboard';
  const [filterParams, setFilterParams] = useState({
    jenis: '',
    sektor: '',
    status: '',
    urutan: ''
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [offerData, setOfferData] = useState<OfferData>();
  const [isOpenModalDetail, setIsOpenModalDetail] = useState<boolean>(false);
  const [isShareModal, setIsShareModal] = useState<boolean>(false);
  const [isShowFinanceInfo, setIsShowFinanceInfo] = useState<boolean>(false);
  const [financingType, setFinancingType] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const getOffers = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await getOffersList(filterParams);
      setOfferData(response?.data);
    } catch (error) {
      toast.error(`Error fetching data: ${error as string}`);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void getOffers();
  }, []);

  useEffect(() => {
    void getOffers();
  }, [filterParams]);

  const sliderSettings = {
    className: 'center m-4 p-4',
    centerMode: true,
    infinite: true,
    centerPadding: '0px',
    slidesToShow: 3,
    speed: 500,
    autoplay: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    dots: true,
    adaptiveHeight: true,
    focusOnSelect: true,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true
        }
      }
    ]
  };

  return (
    <PageGradient defaultGradient className="w-full">
      <div className="w-full flex flex-col md:gap-8 gap-5 bg-white md:py-10 md:px-6 py-5 px-4 rounded-2xl">
        <div className="w-full flex flex-col gap-2">
          <Typography className="font-poppins font-semibold text-2xl">
            {t(`${pathTranslation}.text1`)}
          </Typography>
          <Typography className="font-poppins text-md">
            {t(`${pathTranslation}.text2`)}
          </Typography>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-4">
          <div className="w-full flex flex-col gap-2">
            <Typography className="font-poppins font-medium">
              {t(`${pathTranslation}.filter.text1`)}
            </Typography>
            <select
              value={filterParams?.jenis}
              onChange={e => {
                setFilterParams(prev => ({
                  ...prev,
                  jenis: e.target.value
                }));
              }}
              className="border rounded-full p-2 cursor-pointer"
            >
              <option value="">{t(`${pathTranslation}.filter.text2`)}</option>
              <option value="Saham">
                {t(`${pathTranslation}.filter.text3`)}
              </option>
              <option value="Obligasi">
                {t(`${pathTranslation}.filter.text4`)}
              </option>
            </select>
          </div>
          <div className="w-full flex flex-col gap-2">
            <Typography className="font-poppins font-medium">
              {t(`${pathTranslation}.filter.text5`)}
            </Typography>
            <select
              value={filterParams?.status}
              onChange={e => {
                setFilterParams(prev => ({
                  ...prev,
                  status: e.target.value
                }));
              }}
              className="border rounded-full p-2 cursor-pointer"
            >
              <option value="">{t(`${pathTranslation}.filter.text6`)}</option>
              <option value="Listing">
                {t(`${pathTranslation}.filter.text7`)}
              </option>
              <option value="Prelisting">
                {t(`${pathTranslation}.filter.text8`)}
              </option>
            </select>
          </div>
          <div className="w-full flex flex-col gap-2">
            <Typography className="font-poppins font-medium">
              {t(`${pathTranslation}.filter.text9`)}
            </Typography>
            <select
              value={filterParams?.urutan}
              onChange={e => {
                setFilterParams(prev => ({
                  ...prev,
                  urutan: e.target.value
                }));
              }}
              className="border rounded-full p-2 cursor-pointer"
            >
              <option value="">{t(`${pathTranslation}.filter.text10`)}</option>
              <option value="Jumlah_Des">
                {t(`${pathTranslation}.filter.text11`)}
              </option>
              <option value="Jumlah_Asc">
                {t(`${pathTranslation}.filter.text12`)}
              </option>
              <option value="Jangka_Desc">
                {t(`${pathTranslation}.filter.text13`)}
              </option>
              <option value="Jangka_Asc">
                {t(`${pathTranslation}.filter.text14`)}
              </option>
              <option value="Bagi_Desc">
                {t(`${pathTranslation}.filter.text15`)}
              </option>
              <option value="Bagi_Asc">
                {t(`${pathTranslation}.filter.text16`)}
              </option>
            </select>
          </div>
        </div>
        <div className="w-full my-5 h-fit cursor-pointer gap-2">
          {loading ? (
            <div className="w-full flex justify-center h-fit my-8">
              <div className="h-[60px]">
                <div className="animate-spinner w-16 h-16 border-8 border-gray-200 border-t-seeds-button-green rounded-full" />
              </div>
            </div>
          ) : (
            <Slider
              {...sliderSettings}
              className="custom-danamart-slider w-full h-fit gap-2 pt-2 pb-8 md:pb-4"
            >
              {offerData?.data?.map((offer, index) => (
                <OfferListCard
                  key={index}
                  offer={offer}
                  setIsOpenModalDetail={setIsOpenModalDetail}
                  isOpenModalDetail={isOpenModalDetail}
                  setSelectedIndex={setSelectedIndex}
                  setIsShareModal={setIsShareModal}
                  setIsShowFinanceInfo={setIsShowFinanceInfo}
                  setFinancingType={setFinancingType}
                  index={index}
                />
              ))}
            </Slider>
          )}
        </div>
        <div className="w-full flex flex-col md:flex-row gap-4 items-stretch">
          {['Prelisting', 'Listing'].map((title, index) => (
            <div
              key={index}
              className="relative p-[2px] rounded-lg flex-1 flex"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-[#B798FF] to-[#48C0AB] rounded-lg"></div>
              <div className="relative bg-white rounded-lg p-5 flex flex-col h-full">
                <div
                  className={`absolute top-0 left-0 bg-gradient-to-r ${
                    title === 'Prelisting'
                      ? 'from-[#48C0AB] to-[#B798FF]'
                      : 'from-[#66E3B6] to-[#5987CB]'
                  } text-white text-xl font-semibold py-3 px-5 rounded-br-lg`}
                >
                  {title}
                </div>

                <div className="mt-12 flex-1">
                  {title === 'Prelisting' ? (
                    <div
                      className="font-poppins"
                      dangerouslySetInnerHTML={{
                        __html: t(`${pathTranslation}.prelisting`) ?? ''
                      }}
                    />
                  ) : (
                    <div
                      className="font-poppins"
                      dangerouslySetInnerHTML={{
                        __html: t(`${pathTranslation}.listing`) ?? ''
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isOpenModalDetail && offerData !== undefined && (
        <ModalDetailOffer
          data={offerData?.data[selectedIndex]}
          setIsOpenModalDetail={setIsOpenModalDetail}
          isOpenModalDetail={isOpenModalDetail}
        />
      )}
      {isShareModal && (
        <ModalShareOffer
          onClose={() => {
            setIsShareModal(prev => !prev);
          }}
          url={offerData?.data[selectedIndex]?.prospektus ?? ''}
        />
      )}
      {isShowFinanceInfo && (
        <ModalFinanceInformation
          financingType={financingType}
          setIsShowFinanceInfo={setIsShowFinanceInfo}
          isShowFinanceInfo={isShowFinanceInfo}
        />
      )}
    </PageGradient>
  );
};

export default withAuthDanamart(Penawaran);
