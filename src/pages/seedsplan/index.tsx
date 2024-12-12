import BgSeeds from '@/assets/seedsplan/BgSeeds.svg';
import SeedsTrio from '@/assets/seedsplan/SeedsTrio.svg';
import HowToUseSeedsplan from '@/components/seedsplan/howToUse';
import TncSeedsplan from '@/components/seedsplan/tnc';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import withAuth from '@/helpers/withAuth';
import { getUserInfo } from '@/repository/profile.repository';
import {
  getSubscriptionPlan,
  getSubscriptionStatus,
  getSubscriptionVoucher
} from '@/repository/subscription.repository';
import i18n from '@/utils/common/i18n';
import {
  type DataPlanI,
  type DataVoucherI,
  type StatusSubscription
} from '@/utils/interfaces/subscription.interface';
import { type UserInfo } from '@/utils/interfaces/tournament.interface';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaChevronRight } from 'react-icons/fa';
import { FaClockRotateLeft } from 'react-icons/fa6';
import { GoArrowLeft, GoInfinity } from 'react-icons/go';
import { HiUserGroup } from 'react-icons/hi2';
import { IoGameController } from 'react-icons/io5';
import { toast } from 'react-toastify';

const SeedsPlan: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [dataPlan, setDataPlan] = useState<DataPlanI>();
  const [subscriptionStatus, setSubscriptionStatus] =
    useState<StatusSubscription | null>(null);
  const [dataVoucher, setDataVoucher] = useState<DataVoucherI | undefined>(
    undefined
  );
  const [userInfo, setUserInfo] = useState<UserInfo>();

  const [packagePlan, setPackagePlan] = useState<string>('Silver');
  const [periodPlan, setPeriodPlan] = useState<number>(1);

  const [isActiveSubscription, setIsActiveSubscription] =
    useState<boolean>(false);
  const [showTnc, setShowTnc] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showHowToUse, setHowToUse] = useState<boolean>(false);

  const packagePlanList = [
    { name: 'Silver', badge: null },
    { name: 'Gold', badge: null },
    { name: 'Platinum', badge: t('seedsPlan.text9') }
  ];

  const seedsPlanPeriod = [
    { label: `1 ${t('seedsPlan.month')}`, period: 1, type: 'month' },
    { label: `3 ${t('seedsPlan.months')}`, period: 3, type: 'month' },
    { label: `6 ${t('seedsPlan.months')}`, period: 6, type: 'month' },
    { label: `1 ${t('seedsPlan.year')}`, period: 12, type: 'year' }
  ];

  const getPlanList = async (): Promise<void> => {
    try {
      const response = await getSubscriptionPlan();
      setDataPlan(response);
      const dataInfo = await getUserInfo();
      setUserInfo(dataInfo);
    } catch (error) {
      toast(error as string, { type: 'error' });
    }
  };

  const getVoucherList = async (id: string): Promise<void> => {
    try {
      const response = await getSubscriptionVoucher(id);
      setDataVoucher(response);
    } catch (error) {
      toast(error as string, { type: 'error' });
    }
  };

  const getStatus = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await getSubscriptionStatus();
      if (response !== undefined) {
        setSubscriptionStatus(response);
      }
    } catch (error) {
      console.error(`Error fetching data: ${error as string}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void getPlanList();
    void getStatus();
  }, []);

  useEffect(() => {
    if (subscriptionStatus !== null) {
      setIsActiveSubscription(true);
    } else {
      setIsActiveSubscription(false);
    }
  }, [subscriptionStatus]);

  const filterPlan = dataPlan?.data?.find(item => item?.name === packagePlan);
  const filterTnc =
    filterPlan?.tnc?.[i18n.language === 'id' ? 'id' : 'en'] !== ''
      ? filterPlan?.tnc[i18n.language === 'id' ? 'id' : 'en']
      : '-';

  useEffect(() => {
    if (filterPlan !== undefined) {
      void getVoucherList(filterPlan?.id);
    }
  }, [filterPlan?.id]);

  return (
    <>
      <PageGradient defaultGradient className="w-full">
        <div
          className="w-full bg-cover bg-center py-6 px-4 font-poppins md:rounded-3xl shadow-md flex flex-col justify-center items-center"
          style={{
            backgroundImage: `url(${BgSeeds.src as string})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="flex flex-row justify-between items-center w-full p-2">
            <GoArrowLeft
              onClick={() => {
                router.back();
              }}
              className="hover:scale-110 duration-150 cursor-pointer"
              size={34}
              strokeWidth={0.75}
            />
            <div className="text-xl md:text-2xl font-bold">MySeeds Plan</div>
            <FaClockRotateLeft
              onClick={async () => await router.push('/seedsplan/history')}
              className="cursor-pointer hover:scale-110 duration-150"
              size={25}
            />
          </div>
          <Image
            src={SeedsTrio}
            width={500}
            height={500}
            alt="seedsplan"
            className="w-60"
          />
          <Typography className="font-poppins font-semibold text-base md:text-lg text-center text-white">
            {t('seedsPlan.desc')}
          </Typography>
        </div>
        {loading ? (
          <div className="w-full flex justify-center h-fit mt-8">
            <div className="h-[60px]">
              <div className="animate-spinner w-16 h-16 border-8 border-gray-200 border-t-seeds-button-green rounded-full" />
            </div>
          </div>
        ) : (
          <div>
            {isActiveSubscription ? (
              <div className="w-full h-full bg-white rounded-[18px] p-7">
                <div></div>
              </div>
            ) : (
              <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 mt-0 md:mt-4 font-poppins">
                <div className="col-span-2 w-full rounded-none px-2 pb-4 to-[#536D7FCC] md:rounded-xl bg-gradient-to-b from-[#9ec849] py-4">
                  <div className="md:mt-4 flex flex-row gap-2 items-center mb-4 w-full">
                    <div className="rounded-3xl bg-white w-full">
                      {packagePlanList.map(item => (
                        <button
                          key={item.name}
                          className={`text-sm md:text-base md:p-3 p-2 font-poppins w-4/12 rounded-full duration-100 ${
                            packagePlan === item.name
                              ? 'bg-[#3AC4A0] text-white'
                              : 'bg-[#f9f9f9] text-[#bdbdbd]'
                          } font-semibold border-white border-4`}
                          onClick={() => {
                            setPackagePlan(item.name);
                            setPeriodPlan(1);
                          }}
                        >
                          {item.name}
                          {item.badge !== null && (
                            <sup className="bg-[#ff3838] md:py-1 md:px-2 px-[3px] text-white rounded-3xl md:text-xs text-[10px] font-semibold md:ml-2">
                              {item.badge}
                            </sup>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4w-full flex flex-row gap-3 mb-4">
                    {seedsPlanPeriod?.map((item, index) => {
                      return (
                        <button
                          key={index}
                          className={`px-3 py-2 rounded-lg w-3/12 font-poppins text-xs ${
                            periodPlan === item.period
                              ? 'bg-[#3ac4a0] text-white font-semibold'
                              : 'bg-transparent text-white border border-white font-normal'
                          }`}
                          onClick={() => {
                            setPeriodPlan(item.period);
                          }}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
                    {dataVoucher?.data?.map((item, index) => (
                      <div
                        className="bg-white rounded-2xl w-full h-28 grid grid-cols-4 px-1"
                        key={index}
                      >
                        <div className="col-span-1 flex justify-center items-center">
                          {item?.voucher_type === 'Premium Circle' ||
                          item?.voucher_type === 'Premium Content' ? (
                            <HiUserGroup
                              size={50}
                              className="p-3 bg-gradient-to-t from-[#3AC4A0]/0 to-[#0DB48866]/40 text-[#3AC4A0] rounded-full"
                            />
                          ) : (
                            <IoGameController
                              size={50}
                              className="p-3 bg-gradient-to-t from-[#3AC4A0]/0 to-[#0DB48866]/40 text-[#3AC4A0] rounded-full"
                            />
                          )}
                        </div>
                        <div className="col-span-2 flex flex-col justify-center gap-1">
                          <Typography className="text-[#3AC4A0] font-poppins font-semibold text-base truncate">
                            {item?.name_promo_code}
                          </Typography>
                          <div
                            className="text-[#7C7C7C] font-poppins font-normal text-xs truncate"
                            dangerouslySetInnerHTML={{
                              __html:
                                item?.description?.[
                                  i18n.language === 'id' ? 'id' : 'en'
                                ]
                            }}
                          />
                        </div>
                        <div className="col-span-1 flex justify-center items-center border-s-2 border-dashed text-[#7C7C7C]">
                          <GoInfinity
                            size={30}
                            color="#D89918"
                            strokeWidth={1}
                            className="w-10"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-span-1 w-full h-fit bg-white rounded-none md:rounded-xl p-6">
                  <div>
                    <div
                      className="flex justify-between flew-row items-center pb-3 border-b border-dashed cursor-pointer"
                      onClick={() => {
                        setShowTnc(!showTnc);
                      }}
                    >
                      <div>{t('seedsPlan.button1')}</div>
                      <div>
                        <FaChevronRight />
                      </div>
                    </div>
                    <div
                      className="flex justify-between flew-row items-center py-3 border-b border-dashed cursor-pointer"
                      onClick={() => {
                        setHowToUse(!showHowToUse);
                      }}
                    >
                      <div>{t('seedsPlan.button2')}</div>
                      <div>
                        <FaChevronRight />
                      </div>
                    </div>
                  </div>
                  <div className="mt-10 pt-5 border-t-2 border-[#EDE3FE]">
                    {filterPlan !== undefined && (
                      <div className="flex flex-col gap-2">
                        <div className="text-[#7C7C7C] text-sm">
                          {t('seedsPlan.text2')}
                          <span
                            className={`ms-5 px-2 py-1 bg-[#ff3838] text-white rounded text-xs ${
                              filterPlan?.is_promo ? '' : 'hidden'
                            }`}
                          >
                            {t('seedsPlan.text3')}
                          </span>
                        </div>
                        <div className="flex flex-row items-center justify-between">
                          <div>
                            <span
                              className={
                                filterPlan?.is_promo ? 'line-through' : ''
                              }
                            >
                              {(filterPlan?.price * periodPlan)?.toLocaleString(
                                'id-ID',
                                {
                                  currency:
                                    userInfo?.preferredCurrency ?? 'IDR',
                                  style: 'currency',
                                  maximumFractionDigits: 0
                                }
                              )}
                            </span>
                            /{periodPlan === 12 ? 1 : periodPlan}{' '}
                            {periodPlan === 1
                              ? t('seedsPlan.month')
                              : periodPlan === 12
                              ? t('seedsPlan.year')
                              : t('seedsPlan.months')}
                          </div>
                          <div
                            className={`${
                              filterPlan?.is_promo ? 'block' : 'hidden'
                            }`}
                          >
                            {(
                              filterPlan?.price_after_promo * periodPlan
                            )?.toLocaleString('id-ID', {
                              currency: userInfo?.preferredCurrency ?? 'IDR',
                              style: 'currency',
                              maximumFractionDigits: 0
                            })}
                          </div>
                        </div>
                        <button
                          onClick={async () =>
                            await router.push(
                              `/seedsplan/payment?type=${packagePlan}`
                            )
                          }
                          className="w-full py-3 bg-[#3ac4a0] rounded-3xl font-semibold transform scale-100 hover:scale-105 transition-transform duration-300 my-2"
                        >
                          {t('seedsPlan.button3')}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </PageGradient>
      <TncSeedsplan
        isOpen={showTnc}
        onClose={() => {
          setShowTnc(!showTnc);
        }}
        tnc={filterTnc as string}
      />
      <HowToUseSeedsplan
        isOpen={showHowToUse}
        onClose={() => {
          setHowToUse(!showHowToUse);
        }}
      />
    </>
  );
};

export default withAuth(SeedsPlan);
