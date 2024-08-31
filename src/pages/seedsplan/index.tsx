import BgSeeds from '@/assets/seedsplan/BgSeeds.svg';
import SeedsPlanSilver from '@/assets/seedsplan/seedsPlanSilver.svg';
import SeedsTrio from '@/assets/seedsplan/SeedsTrio.svg';
import HowToUseSeedsplan from '@/components/seedsplan/howToUse';
import TncSeedsplan from '@/components/seedsplan/tnc';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import { getEventDate } from '@/helpers/dateFormat';
import { getUserInfo } from '@/repository/profile.repository';
import {
  getSubscriptionPlan,
  getSubscriptionStatus,
  getSubscriptionVoucher
} from '@/repository/subscription.repository';
import LanguageContext from '@/store/language/language-context';
import i18n from '@/utils/common/i18n';
import {
  type ActiveSubscriptionStatus,
  type DataPlanI,
  type DataVoucherI
} from '@/utils/interfaces/subscription.interface';
import { type UserInfo } from '@/utils/interfaces/tournament.interface';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaChevronRight } from 'react-icons/fa';
import { GiBackwardTime } from 'react-icons/gi';
import { HiUserGroup } from 'react-icons/hi2';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { IoGameController } from 'react-icons/io5';
import { toast } from 'react-toastify';

const SeedsPlan: React.FC = () => {
  const [subscription, setSubscription] = useState<string>('');
  const [category, setCategory] = useState('All');
  const [packagePlan, setPackagePlan] = useState('Silver');
  const [showTnc, setShowTnc] = useState(false);
  const [showHowToUse, setHowToUse] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();
  const languageCtx = useContext(LanguageContext);
  const [dataPlan, setDataPlan] = useState<DataPlanI | undefined>(undefined);
  const [subscriptionStatus, setSubscriptionStatus] = useState<ActiveSubscriptionStatus>();
  const [dataVoucher, setDataVoucher] = useState<DataVoucherI | undefined>(
    undefined
  );
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const categorySeedsPlan = [
    { label: 'All', category: 'All' },
    { label: 'Play Arena', category: 'Paid Tournament' },
    { label: 'Play Quiz', category: 'Paid Quiz' },
    { label: 'Circle Premium', category: 'Premium Circle' },
    { label: 'Content Premium', category: 'Premium Content' }
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
      const response = await getSubscriptionStatus();
      setSubscriptionStatus(response?.active_subscription)
    } catch (error) {
      toast(error as string, { type: 'error' });
    }
  };

  useEffect(() => {
    void getPlanList();
    void getStatus()

    if (subscriptionStatus !== null) {
      setSubscription('active')
    } else {
      setSubscription('non-active')
    }
  }, []);

  const togglePopupTnc = (): void => {
    setShowTnc(!showTnc);
  };
  const togglePopupHowToUse = (): void => {
    setHowToUse(!showHowToUse);
  };

  const filterPlan = dataPlan?.data?.find(item => item?.name === packagePlan);
  const filterTnc =
    filterPlan?.tnc?.[i18n.language === 'id' ? 'id' : 'en'] !== ''
      ? filterPlan?.tnc[i18n.language === 'id' ? 'id' : 'en'].replace(
          /\n/g,
          '<br />'
        )
      : '-';

  useEffect(() => {
    if (filterPlan !== undefined) {
      void getVoucherList(filterPlan?.id);
    }
  }, [filterPlan?.id]);

  const filteredDataVoucher = dataVoucher?.data?.filter(
    item => item?.voucher_type === category
  );

  return (
    <>
      <PageGradient defaultGradient className="w-full">
        <div
          className="w-full bg-cover bg-center py-6 px-4 font-poppins md:rounded-xl shadow-md flex flex-col justify-center items-center"
          style={{
            backgroundImage: `url(${BgSeeds.src as string})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="mb-4 flex flex-row justify-between items-center w-full">
            <div
              onClick={() => {
                router.back();
              }}
              className="transform scale-100 hover:scale-110 transition-transform duration-300 cursor-pointer"
            >
              <IoMdArrowRoundBack size={35} />
            </div>
            <div className="text-xl md:text-2xl font-bold">MySeeds Plan</div>
            <div className="border-4 border-white text-white bg-[#487209] rounded-full p-2">
              <GiBackwardTime size={25} style={{ strokeWidth: 10 }}/>
            </div>
          </div>
          <Image
            src={SeedsTrio}
            width={500}
            height={500}
            alt="seedsplan"
            className="w-60"
          />
          <div className="font-semibold text-sm md:text-lg text-center">
            {t('seedsPlan.desc')}
          </div>
        </div>
        <div className={
          subscription === 'non-active'
           ? 'flex flex-col lg:grid lg:grid-cols-3 gap-4 mt-0 md:mt-4 font-poppins'
           : 'w-full'
        }>
          {
            subscription === 'active' &&
              <div className='bg-[#F6F6F6] w-full py-2 px-2 md:px-0 md:mt-4 md:rounded-t-xl flex justify-center items-center'>
                <div className='w-full md:w-3/4 flex py-4 px-2 gap-2 rounded-xl border border-[#27A590] bg-white justify-center items-center'>
                  <div className='w-[50px] h-[50px] md:mx-4'>
                    <Image
                      src={SeedsPlanSilver}
                      width={500}
                      height={500}
                      alt="seedsplan"
                      className="w-full h-full"
                    />
                  </div>
                  <div className='md:w-full'>
                    <div className='w-full flex justify-between'>
                      <div className='text-sm font-semibold'>
                        {t('seedsPlan.text7')}{subscriptionStatus?.subscription_type_id ?? 'Silver'}
                      </div>
                      <div className='w-fit flex justify-center items-center text-xs rounded-full bg-[#BAFBD0] text-[#3AC4A0] px-4'>
                        {t('seedsPlan.text8')}
                      </div>
                    </div>
                    <div className='text-[9px] md:text-xs px-4 py-1 rounded-full text-[#378D12] border border-[#378D12] md:w-fit text-wrap mt-2'>
                      {t('seedsPlan.text11')}
                      {languageCtx.language === 'ID'
                        ? getEventDate(
                          new Date(subscriptionStatus?.ended_at ?? '2024-12-31T23:59:00Z'), 'id-ID'
                        )
                        : getEventDate(
                          new Date(subscriptionStatus?.ended_at ?? '2024-12-31T23:59:00Z'), 'en-US'
                        )}
                    </div>
                  </div>
                </div>
              </div>
          }
          <div
            className={`
              col-span-2 w-full rounded-none px-2 pb-4
              ${
                packagePlan === 'Silver' ? 'to-[#cec9c9]' : 'to-[#f7fb43]'
              }
              ${
                subscription === 'non-active' ? 'md:rounded-xl bg-gradient-to-b from-[#9ec849] py-4' : 'md:rounded-b-xl bg-[#F6F6F6] flex flex-col justify-center items-center'
              }
            `}
          >
          {
            subscription === 'non-active' &&
              <div className={`${subscription === 'non-active' ? 'mt-4' : 'w-full md:w-3/4 mt-2'} flex flex-row gap-3 flex-wrap justify-center mb-4`}>
                <div className="rounded-3xl bg-white w-11/12 lg:w-10/12">
                  <button
                    className={`text-xl p-3 w-1/2 rounded-3xl ${
                      packagePlan === 'Silver'
                        ? 'bg-[#3AC4A0]'
                        : 'bg-[#f9f9f9] text-[#bdbdbd]'
                    } font-semibold border-white border-2`}
                    onClick={() => {
                      setPackagePlan('Silver');
                      setCategory('All');
                    }}
                  >
                    Silver
                  </button>
                  <button
                    className={`text-xl p-3 w-1/2 rounded-3xl ${
                      packagePlan === 'Gold'
                        ? 'bg-[#3AC4A0]'
                        : 'bg-[#f9f9f9] text-[#bdbdbd]'
                    } font-semibold border-white border-2 relative`}
                    onClick={() => {
                      setPackagePlan('Gold');
                      setCategory('All');
                    }}
                  >
                    Gold
                    <span className="px-2 py-1 bg-[#ff3838] text-white rounded-3xl text-xs absolute top-0 right-0 2xl:right-16 font-normal">
                      {t('seedsPlan.text9')}
                    </span>
                  </button>
                </div>
              </div>
          }
            <div className={`${subscription === 'non-active' ? 'mt-4' : 'w-full md:w-3/4 mt-2'} flex flex-row gap-3 flex-wrap justify-center mb-4`}>
              {categorySeedsPlan?.map((item, index) => {
                return (
                  <button
                    key={index}
                    className={`px-3 py-1 rounded-3xl ${
                      category === item.category
                        ? 'bg-[#3ac4a0] text-black'
                        : 'bg-[#ffffff] text-[#bdbdbd]'
                    }`}
                    onClick={() => {
                      setCategory(item.category);
                    }}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
            <div className={`${subscription === 'non-active' ? '' : 'w-full md:w-3/4'} grid grid-cols-1 xl:grid-cols-2 gap-3`}>
              {packagePlan === 'Silver'
                ? (category !== 'All'
                    ? filteredDataVoucher
                    : dataVoucher?.data
                  )?.map((item, index) => {
                    return (
                      <>
                        <div
                          className="bg-white rounded-2xl w-full h-28 grid grid-cols-5 px-1"
                          key={index}
                        >
                          <div className="col-span-1 flex justify-center items-center">
                            {item?.voucher_type === 'Premium Circle' ||
                            item?.voucher_type === 'Premium Content' ? (
                              <HiUserGroup
                                size={50}
                                className="p-3 bg-[#3AC4A0] text-[#487209] rounded-full"
                              />
                            ) : (
                              <IoGameController
                                size={50}
                                className="p-3 bg-[#3AC4A0] text-[#487209] rounded-full"
                              />
                            )}
                          </div>
                          <div className="col-span-3 flex flex-col justify-center">
                            <div className="text-[#3AC4A0] font-bold text-sm truncate">
                              {item?.name_promo_code}
                            </div>
                            <div
                              className="text-[#7C7C7C] font-light text-xs truncate"
                              dangerouslySetInnerHTML={{
                                __html:
                                  item?.description?.[
                                    i18n.language === 'id' ? 'id' : 'en'
                                  ]
                              }}
                            />
                            <div className="font-bold text-sm truncate">
                              {t('seedsPlan.text6')}{' '}
                              {`${
                                item?.is_percentage
                                  ? `${item?.discount_percentage}%`
                                  : item?.discount_amount?.toLocaleString(
                                      'id-ID',
                                      {
                                        currency:
                                          userInfo?.preferredCurrency ?? 'IDR',
                                        style: 'currency',
                                        maximumFractionDigits: 0
                                      }
                                    )
                              }`}
                            </div>
                          </div>
                          <div className="col-span-1 flex flex-col justify-center items-center border-s-2 border-dashed text-[#7C7C7C]">
                            <div className="font-bold text-xl">
                              {item?.quantity}
                            </div>
                            <div className="font-light text-xs">Voucher</div>
                          </div>
                        </div>
                      </>
                    );
                  })
                : (category !== 'All'
                    ? filteredDataVoucher
                    : dataVoucher?.data
                  )?.map((item, index) => {
                    return (
                      <>
                        <div
                          className="bg-white rounded-2xl w-full h-28 grid grid-cols-5 px-1"
                          key={index}
                        >
                          <div className="col-span-1 flex justify-center items-center">
                            {item?.voucher_type === 'Premium Circle' ||
                            item?.voucher_type === 'Premium Content' ? (
                              <HiUserGroup
                                size={50}
                                className="p-3 bg-[#3AC4A0] text-[#487209] rounded-full"
                              />
                            ) : (
                              <IoGameController
                                size={50}
                                className="p-3 bg-[#3AC4A0] text-[#487209] rounded-full"
                              />
                            )}
                          </div>
                          <div className="col-span-3 flex flex-col justify-center">
                            <div className="text-[#3AC4A0] font-bold text-sm truncate">
                              {item?.name_promo_code}
                            </div>
                            <div
                              className="text-[#7C7C7C] font-light text-xs truncate"
                              dangerouslySetInnerHTML={{
                                __html:
                                  item?.description?.[
                                    i18n.language === 'id' ? 'id' : 'en'
                                  ]
                              }}
                            />
                            <div className="font-bold text-sm truncate">
                              {t('seedsPlan.text6')}{' '}
                              {`${
                                item?.is_percentage
                                  ? `${item?.discount_percentage}%`
                                  : item?.discount_amount?.toLocaleString(
                                      'id-ID',
                                      {
                                        currency:
                                          userInfo?.preferredCurrency ?? 'IDR',
                                        style: 'currency',
                                        maximumFractionDigits: 0
                                      }
                                    )
                              }`}
                            </div>
                          </div>
                          <div className="col-span-1 flex flex-col justify-center items-center border-s-2 border-dashed text-[#7C7C7C]">
                            <div className="font-bold text-xl">
                              {item?.quantity}
                            </div>
                            <div className="font-light text-xs">Voucher</div>
                          </div>
                        </div>
                      </>
                    );
                  })}
            </div>
            {
              subscription === 'active' &&
                <div className='hidden md:flex w-full px-2 py-4 justify-center items-center'>
                  <div
                    onClick={async() => await router.push('/seedsplan/detail')}
                    className='bg-[#3AC4A0] w-1/2 max-w-[300px] text-center py-2 font-semibold rounded-full cursor-pointer'
                  >
                    {t('seedsPlan.text10')}
                  </div>
                </div>
            }
          </div>
          {
            subscription === 'active' &&
              <div className='md:hidden bg-white w-full px-2 py-4 flex justify-center items-center'>
                <div
                  onClick={async() => await router.push('/seedsplan/detail')}
                  className='bg-[#3AC4A0] w-full md:w-1/2 text-center py-2 font-semibold rounded-full cursor-pointer'
                >
                  {t('seedsPlan.text10')}
                </div>
              </div>
          }
          {
            subscription === 'non-active' &&
              <div className="col-span-1 w-full h-fit bg-white rounded-none md:rounded-xl p-6">
                <div>
                  <div
                    className="flex justify-between flew-row items-center pb-3 border-b border-dashed cursor-pointer"
                    onClick={togglePopupTnc}
                  >
                    <div>{t('seedsPlan.button1')}</div>
                    <div>
                      <FaChevronRight />
                    </div>
                  </div>
                  <div
                    className="flex justify-between flew-row items-center py-3 border-b border-dashed cursor-pointer"
                    onClick={togglePopupHowToUse}
                  >
                    <div>{t('seedsPlan.button2')}</div>
                    <div>
                      <FaChevronRight />
                    </div>
                  </div>
                </div>
                <div className="mt-10 pt-5 border-t-2 border-[#EDE3FE]">
                  {packagePlan === 'Silver' ? (
                    <>
                      <div className="flex flex-col gap-2 mb-10">
                        <div className="text-[#7C7C7C] text-sm">
                          {t('seedsPlan.text2')}
                          <span className="ms-5 px-2 py-1 bg-[#ff3838] text-white rounded text-xs">
                            {t('seedsPlan.text3')}
                          </span>
                        </div>
                        <div className="flex flex-row items-center justify-between">
                          <div>
                            <span className="line-through">
                              {(
                                (filterPlan?.price as number) + 20000
                              )?.toLocaleString('id-ID', {
                                currency: userInfo?.preferredCurrency ?? 'IDR',
                                style: 'currency',
                                maximumFractionDigits: 0
                              })}
                            </span>
                            /{t('seedsPlan.text4')}
                          </div>
                          <div>
                            {filterPlan?.price?.toLocaleString('id-ID', {
                              currency: userInfo?.preferredCurrency ?? 'IDR',
                              style: 'currency',
                              maximumFractionDigits: 0
                            })}
                          </div>
                        </div>
                        <div className="font-light text-xs text-[#7C7C7C]">
                          {t('seedsPlan.text5')}
                        </div>
                      </div>
                      <button
                        onClick={async() => await router.push(`/seedsplan/payment?type=${packagePlan}`)}
                        className="w-full py-3 bg-[#3ac4a0] rounded-3xl font-semibold transform scale-100 hover:scale-105 transition-transform duration-300"
                      >
                        {t('seedsPlan.button3')}
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col gap-2 mb-10">
                        <div className="text-[#7C7C7C] text-sm">
                          {t('seedsPlan.text2')}
                          <span className="ms-5 px-2 py-1 bg-[#ff3838] text-white rounded text-xs">
                            {t('seedsPlan.text3')}
                          </span>
                        </div>
                        <div className="flex flex-row items-center justify-between">
                          <div>
                            <span className="line-through">
                              {(
                                (filterPlan?.price as number) + 20000
                              )?.toLocaleString('id-ID', {
                                currency: userInfo?.preferredCurrency ?? 'IDR',
                                style: 'currency',
                                maximumFractionDigits: 0
                              })}
                            </span>
                            /{t('seedsPlan.text4')}
                          </div>
                          <div>
                            {filterPlan?.price?.toLocaleString('id-ID', {
                              currency: userInfo?.preferredCurrency ?? 'IDR',
                              style: 'currency',
                              maximumFractionDigits: 0
                            })}
                          </div>
                        </div>
                        <div className="font-light text-xs text-[#7C7C7C]">
                          {t('seedsPlan.text5')}
                        </div>
                      </div>
                      <button
                        onClick={async() => await router.push(`/seedsplan/payment?type=${packagePlan}`)}
                        className="w-full py-3 bg-[#3ac4a0] rounded-3xl font-semibold transform scale-100 hover:scale-105 transition-transform duration-300"
                      >
                        {t('seedsPlan.button3')}
                      </button>
                    </>
                  )}
                </div>
              </div>
          }
        </div>
      </PageGradient>
      <TncSeedsplan
        isOpen={showTnc}
        onClose={togglePopupTnc}
        tnc={filterTnc as string}
      />
      <HowToUseSeedsplan isOpen={showHowToUse} onClose={togglePopupHowToUse} />
    </>
  );
};

export default SeedsPlan;
