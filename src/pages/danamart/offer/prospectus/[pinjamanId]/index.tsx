import DetailTab from '@/components/danamart/offer/DetailTab';
import ModalProgressOffer from '@/components/danamart/offer/ModalProgressOffer';
import ModalReport from '@/components/danamart/offer/ModalReport';
import ModalWaitListing from '@/components/danamart/offer/ModalWaitListing';
import ProgressStep from '@/components/danamart/offer/ProgressStep';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import withAuthDanamart from '@/helpers/withAuthDanamart';
import { getDetailProspektus } from '@/repository/danamart/danamart.repository';
import { getOffersList } from '@/repository/danamart/offers.repository';
import { type DetailProspektus } from '@/utils/interfaces/danamart.interface';
import {
  type OfferData,
  type OfferList
} from '@/utils/interfaces/danamart/offers.interface';
import { Button, Typography } from '@material-tailwind/react';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FaChevronLeft,
  FaChevronRight,
  FaFacebook,
  FaInstagram,
  FaLinkedin
} from 'react-icons/fa';
import { FaUserGroup } from 'react-icons/fa6';
import { FiAlertOctagon } from 'react-icons/fi';
import { toast } from 'react-toastify';

const Prospectus = (): React.ReactElement => {
  const { t } = useTranslation();
  const router = useRouter();
  const prospectusId = router.query.pinjamanId;

  const [detailProspektus, setDetailProspektus] = useState<DetailProspektus>();
  const [offerData, setOfferData] = useState<OfferData>();
  const [prospectusOffer, setProspectusOffer] = useState<OfferList>();
  const [isShowModalProgress, setIsShowModalProgress] =
    useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const thumbnailRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [isShowReportForm, setIsShowReportForm] = useState<boolean>(false);
  const [isShowWaitListingModal, setIsShowWaitListingModal] = useState<boolean>(false);

  const fetchDetailProspektus = async (): Promise<void> => {
    try {
      const response: DetailProspektus = await getDetailProspektus(
        prospectusId as string
      );
      if (response.StatusCode === '200') {
        setDetailProspektus(response);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getOffers = async (): Promise<void> => {
    try {
      const response = await getOffersList({
        jenis: '',
        sektor: '',
        status: '',
        urutan: ''
      });
      setOfferData(response?.data);
    } catch (error) {
      toast.error(`Error fetching data: ${error as string}`);
    }
  };

  useEffect(() => {
    if (prospectusId !== undefined) {
      setIsLoading(true);
      Promise.all([fetchDetailProspektus(), getOffers()]).finally(() => {
        setIsLoading(false);
      });
    } else {
      void router.push('/danamart/penawaran');
    }
  }, [prospectusId]);

  useEffect(() => {
    if (offerData !== undefined && detailProspektus !== undefined) {
      setProspectusOffer(
        offerData?.data.find(item => item.pinjaman_id === prospectusId)
      );
    }
  }, [offerData]);

  const handlePrev = (): void => {
    if (detailProspektus !== undefined) {
      setCurrentIndex(prevIndex =>
        prevIndex === 0
          ? detailProspektus.Data.gambarProspektus.length - 1
          : prevIndex - 1
      );
    }
  };

  const handleNext = (): void => {
    if (detailProspektus !== undefined) {
      setCurrentIndex(prevIndex =>
        prevIndex === detailProspektus?.Data?.gambarProspektus?.length - 1
          ? 0
          : prevIndex + 1
      );
    }
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

  const getSecurityType = (jenisEfek: string): string => {
    const lowerCaseEfek = jenisEfek.toLowerCase();
    if (lowerCaseEfek.includes('saham')) {
      return 'stock';
    } else if (lowerCaseEfek.includes('obligasi')) {
      return 'bond';
    }
    return 'unknown';
  };

  const isButtonDisabled = (): boolean => {
    if (detailProspektus?.Data?.StatusListing === "Pembelian Selesai" && detailProspektus?.Data?.cekOmbak !== "1") {
      return true
    } else {
      return false
    }
  }

  return (
    <PageGradient defaultGradient className="w-full">
      {!isLoading && detailProspektus != null && prospectusOffer != null ? (
        <div className="w-full bg-white flex flex-col px-5 py-8 rounded-lg">
          <Typography className="font-poppins md:text-3xl text-lg font-semibold text-[#262626] mt-6 mb:mt-8">
            {t('danamart.offers.detail.offer')} {prospectusId}
          </Typography>
          <div className="flex md:flex-col flex-col-reverse shadow-md rounded-lg p-6 md:gap-4 gap-2">
            {[
              {
                label: t('danamart.offers.detail.minimumInvest'),
                value: prospectusOffer?.jml_pendanaan
              },
              {
                label: t('danamart.offers.detail.securitiesCode'),
                value: detailProspektus?.Data.idPinjaman
              },
              {
                label: t('danamart.offers.detail.location'),
                value: prospectusOffer?.lokasi
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
          <div className="bg-white shadow-md rounded-lg flex md:flex-row flex-col md:gap-8 gap-6 p-5 mt-6 mb:mt-8">
            <div className="flex flex-col gap-4">
              <div className="flex justify-end items-center gap-4 md:hidden">
                <a
                  target="_blank"
                  href={detailProspektus?.Data?.Sosmed.facebook}
                >
                  <FaFacebook
                    size={24}
                    color="#3AC4A0"
                    className="cursor-pointer hover:scale-110 transition duration-150"
                  />
                </a>
                <a
                  target="_blank"
                  href={detailProspektus?.Data?.Sosmed.linkedin}
                >
                  <FaLinkedin
                    size={24}
                    color="#3AC4A0"
                    className="cursor-pointer hover:scale-110 transition duration-150"
                  />
                </a>
                <a
                  target="_blank"
                  href={detailProspektus?.Data?.Sosmed.instagram}
                >
                  <FaInstagram
                    size={24}
                    color="#3AC4A0"
                    className="cursor-pointer hover:scale-110 transition duration-150"
                  />
                </a>
              </div>
              <div>
                <div className="relative md:w-[311px] w-full h-[240px]">
                  {detailProspektus?.Data?.gambarProspektus[
                    currentIndex
                  ]?.includes('<iframe') ? (
                    <div
                      className="w-full h-full rounded-md overflow-hidden"
                      dangerouslySetInnerHTML={{
                        __html: detailProspektus?.Data?.gambarProspektus[
                          currentIndex
                        ].replace(
                          '<iframe',
                          '<iframe style="width:100%; height:100%; max-height:240px;"'
                        )
                      }}
                    />
                  ) : (
                    <img
                      src={
                        detailProspektus?.Data?.gambarProspektus[currentIndex]
                      }
                      alt="Parent Image"
                      className="bg-red-50 w-full h-full object-cover rounded-md"
                      width={311}
                      height={240}
                    />
                  )}

                  <button
                    onClick={handlePrev}
                    className="absolute top-1/2 left-0 -translate-y-1/2 bg-[#DCFCE433]/50 text-[#3AC4A0] p-2 rounded-full hover:bg-[#DCFCE433]/70 transition"
                  >
                    <FaChevronLeft size={20} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute top-1/2 right-0 -translate-y-1/2 bg-[#DCFCE433]/50 text-[#3AC4A0] p-2 rounded-full hover:bg-[#DCFCE433]/70 transition"
                  >
                    <FaChevronRight size={20} />
                  </button>
                </div>
                <div className="w-full md:max-w-[311px] overflow-x-auto no-scroll flex items-center gap-1 p-2 rounded-md shadow-lg">
                  {detailProspektus?.Data?.gambarProspektus.map(
                    (item, index) => (
                      <div
                        key={index}
                        ref={el => (thumbnailRefs.current[index] = el)}
                        className="flex-shrink-0"
                      >
                        {item?.includes('<iframe') ? (
                          <div
                            onClick={() => {
                              setCurrentIndex(index);
                            }}
                            className={`w-[77px] h-[60px] flex items-center justify-center bg-gray-200 cursor-pointer hover:scale-110 transition duration-150 rounded-md ${
                              index === currentIndex
                                ? 'border-[#3ac4a0] border-2'
                                : ''
                            }`}
                          >
                            🎥
                          </div>
                        ) : (
                          <img
                            onClick={() => {
                              setCurrentIndex(index);
                            }}
                            src={item}
                            alt="gambar"
                            width={77}
                            height={60}
                            className={`w-[77px] h-[60px] cursor-pointer hover:scale-110 transition duration-150 rounded-md ${
                              index === currentIndex
                                ? 'border-[#3ac4a0] border-2'
                                : ''
                            }`}
                          />
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <Typography className="font-poppins font-normal text-[10px] text-[#bdbdbd]">
                    {detailProspektus?.Data.StatusListing}
                  </Typography>
                  <Typography className="flex items-center font-poppins font-normal text-[10px] text-[#bdbdbd] gap-1">
                    <FaUserGroup size={10} color="#bdbdbd" />{' '}
                    {prospectusOffer?.total_pemodal}
                  </Typography>
                </div>
                <div className="flex items-center gap-4 w-full">
                  <div className="flex w-full h-[5px] bg-gray-200 rounded-full">
                    <div
                      className="bg-[#4FE6AF] transition-all duration-300 relative"
                      style={{ width: `${prospectusOffer?.progresEfek}%` }}
                    >
                      <div className="rounded-full w-[9px] h-[9px] bg-[#4FE6AF] absolute right-[-10px] top-1/2 transform -translate-y-1/2 z-10" />
                    </div>
                    <div
                      className="bg-[#4FE6AF] opacity-20 transition-all duration-300"
                      style={{
                        width: `${100 - prospectusOffer?.progresEfek}%`
                      }}
                    ></div>
                  </div>
                  <Typography className="font-poppins font-normal text-[10px] text-[#262626]">
                    {prospectusOffer?.progresEfek % 10 === 0
                      ? prospectusOffer?.progresEfek
                      : prospectusOffer?.progresEfek > 99.999999999
                      ? (
                          Math.floor(prospectusOffer?.progresEfek * 10000) /
                          10000
                        ).toFixed(4)
                      : prospectusOffer?.progresEfek?.toFixed(0)}
                    %
                  </Typography>
                </div>
                <Button
                  onClick={async () => {
                    if (detailProspektus?.Data?.StatusListing === 'Pre-Listing') {
                      setIsShowWaitListingModal(true);
                    } else {
                      await router.push(
                        `/danamart/offer/prospectus/${
                          prospectusId as string
                        }/purchase?UserPeminjamId=${
                          detailProspektus?.Data?.BeliEfek?.UserPinjamanId
                        }&type=${
                          getSecurityType(detailProspektus?.Data?.jenisEfek)
                        }${detailProspektus?.Data?.cekOmbak === '1'
                          ? `&co=true`
                          : `&co=false`
                        }`
                      );
                    }
                  }}
                  disabled={isButtonDisabled()}
                  className="md:w-[311px] w-full h-[52px] bg-[#3AC4A0] text-white rounded-full"
                >
                  {t('danamart.offers.detail.buy')}
                </Button>
                <Typography
                  onClick={() => {
                    setIsShowReportForm(true);
                  }}
                  className="font-semibold font-poppins text-[#3ac4a0] text-base flex items-center gap-2 cursor-pointer"
                >
                  <FiAlertOctagon size={20} />
                  {t('danamart.offers.detail.report')}
                </Typography>
              </div>
            </div>
            <div className="flex flex-col gap-8 w-full">
              <div className="md:flex justify-end items-center gap-3 hidden">
                <a
                  target="_blank"
                  href={detailProspektus?.Data?.Sosmed.facebook}
                >
                  <FaFacebook
                    size={24}
                    color="#3AC4A0"
                    className="cursor-pointer hover:scale-110 transition duration-150"
                  />
                </a>
                <a
                  target="_blank"
                  href={detailProspektus?.Data?.Sosmed.linkedin}
                >
                  <FaLinkedin
                    size={24}
                    color="#3AC4A0"
                    className="cursor-pointer hover:scale-110 transition duration-150"
                  />
                </a>
                <a
                  target="_blank"
                  href={detailProspektus?.Data?.Sosmed.instagram}
                >
                  <FaInstagram
                    size={24}
                    color="#3AC4A0"
                    className="cursor-pointer hover:scale-110 transition duration-150"
                  />
                </a>
              </div>
              <div className="flex flex-col gap-6">
                <Typography className="font-poppins font-semibold text-base text-[#262626]">
                  {detailProspektus?.Data?.NamaPenerbit}
                </Typography>
                <div className="flex md:flex-row flex-col gap-6">
                  <div className="flex flex-col gap-2 w-full md:w-1/2 border-b border-[#bdbdbd]">
                    <Typography className="font-poppins font-semibold text-base text-[#bdbdbd]">
                      {t('danamart.offers.detail.securitiesType')}
                    </Typography>
                    <Typography className="font-poppins font-normal text-base text-[#262626] py-3 ">
                      {detailProspektus?.Data?.jenisEfek}
                    </Typography>
                  </div>
                  <div className="flex flex-col gap-2 w-full md:w-1/2 border-b border-[#bdbdbd]">
                    <Typography className="font-poppins font-semibold text-base text-[#bdbdbd]">
                      {t('danamart.offers.detail.intendedUseOfFunds')}
                    </Typography>
                    <Typography className="font-poppins font-normal text-base text-[#262626] py-3 ">
                      {detailProspektus?.Data?.TPD}
                    </Typography>
                  </div>
                </div>
                <div className="flex md:flex-row flex-col gap-6">
                  <div className="flex flex-col gap-2 w-full md:w-1/2 border-b border-[#bdbdbd]">
                    <Typography className="font-poppins font-semibold text-base text-[#bdbdbd]">
                      {t('danamart.offers.detail.offeredAmount')}
                    </Typography>
                    <Typography className="font-poppins font-normal text-base text-[#262626] py-3 ">
                      {detailProspektus?.Data?.jmlDana}
                    </Typography>
                  </div>
                  <div className="flex flex-col gap-2 w-full md:w-1/2 border-b border-[#bdbdbd]">
                    <Typography className="font-poppins font-semibold text-base text-[#bdbdbd]">
                      {t('danamart.offers.detail.minimumInvestmentAmount')}
                    </Typography>
                    <Typography className="font-poppins font-normal text-base text-[#262626] py-3 ">
                      {detailProspektus?.Data?.jmlMinDana}
                    </Typography>
                  </div>
                </div>
                <div className="flex md:flex-row flex-col gap-6">
                  <div className="flex flex-col gap-2 w-full md:w-1/2 border-b border-[#bdbdbd]">
                    <Typography className="font-poppins font-semibold text-base text-[#bdbdbd]">
                      {t('danamart.offers.detail.coupon')}
                    </Typography>
                    <Typography className="font-poppins font-normal text-base text-[#262626] py-3 ">
                      {detailProspektus?.Data?.Kupon}
                    </Typography>
                  </div>
                  <div className="flex flex-col gap-2 w-full md:w-1/2 border-b border-[#bdbdbd]">
                    <Typography className="font-poppins font-semibold text-base text-[#bdbdbd]">
                      {t('danamart.offers.detail.tenor')}
                    </Typography>
                    <Typography className="font-poppins font-normal text-base text-[#262626] py-3 ">
                      {prospectusOffer?.tenor}
                    </Typography>
                  </div>
                </div>
                <div className="flex md:flex-row flex-col gap-6">
                  <div className="flex flex-col gap-2 w-full md:w-1/2 border-b border-[#bdbdbd]">
                    <Typography className="font-poppins font-semibold text-base text-[#bdbdbd]">
                      {t('danamart.offers.detail.guarantee')}
                    </Typography>
                    <Typography className="font-poppins font-normal text-base text-[#262626] py-3 ">
                      {detailProspektus?.Data?.Jaminan}
                    </Typography>
                  </div>
                  <div className="flex flex-col gap-2 w-full md:w-1/2 border-b border-[#bdbdbd]">
                    <Typography className="font-poppins font-semibold text-base text-[#bdbdbd]">
                      {t('danamart.offers.detail.offerType')}
                    </Typography>
                    <Typography className="font-poppins font-normal text-base text-[#262626] py-3 ">
                      {detailProspektus?.Data?.JenisPenawaran}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Penawaran */}
          <ProgressStep
            setIsShowModalProgress={setIsShowModalProgress}
            timelineOffer={detailProspektus?.Data?.TimelinePenawaran}
          />
          <hr />
          <DetailTab detailProspektus={detailProspektus} />
        </div>
      ) : (
        <div className="w-full flex justify-center h-fit mt-16">
          <div className="h-[60px]">
            <div className="animate-spinner w-16 h-16 border-8 border-gray-200 border-t-seeds-button-green rounded-full" />
          </div>
        </div>
      )}
      {isShowModalProgress && (
        <ModalProgressOffer
          setIsShowModalProgress={setIsShowModalProgress}
          isShowModalProgress={isShowModalProgress}
        />
      )}
      {isShowReportForm && (
        <ModalReport
          url={prospectusOffer?.prospektus ?? ''}
          setIsShowReportForm={setIsShowReportForm}
          isShowReportForm={isShowReportForm}
        />
      )}
      {isShowWaitListingModal && (
        <ModalWaitListing
          setIsShowWaitListingModal={setIsShowWaitListingModal}
          isShowWaitListingModal={isShowWaitListingModal}
        />
      )}
    </PageGradient>
  );
};

export default withAuthDanamart(Prospectus);
