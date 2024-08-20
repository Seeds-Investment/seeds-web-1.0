import CurveLower from '@/assets/seedsplan/curveLower.svg';
import CurveUpper from '@/assets/seedsplan/curveUpper.svg';
import SeedsPlanSilver from '@/assets/seedsplan/seedsPlanSilver.svg';
import ConfirmationUnsubscribe from '@/components/seedsplan/confirmation-unsubscribe';
import HowToUseSeedsplan from '@/components/seedsplan/howToUse';
import TncSeedsplan from '@/components/seedsplan/tnc';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { HiUserGroup } from 'react-icons/hi2';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { IoGameController } from 'react-icons/io5';

const SeedsPlanDetail: React.FC = () => {
  const [subscription, setSubscription] = useState<string>('');
  const [category, setCategory] = useState('All');
  const [packagePlan, setPackagePlan] = useState('Silver');
  const [showTnc, setShowTnc] = useState(false);
  const [showHowToUse, setHowToUse] = useState(false);
  const [unsubscribeModal, setUnsubscribeModal] = useState(false);
  const router = useRouter();
  const categorySeedsPlan = [
    'All',
    'Play Arena',
    'Play Quiz',
    'Circle Premium'
  ];

  const voucherSeedsPlanSilver = [
    {
      title: 'Quiz',
      description: 'Free to join 3 circle',
      benefit: 'Total benefit 80 rb',
      amount: 1,
      category: 'Play Quiz'
    },
    {
      title: 'Play Arena',
      description: 'Free to join 3 circle',
      benefit: 'Total benefit 80 rb',
      amount: 3,
      category: 'Play Arena'
    },
    {
      title: 'Circle',
      description: 'Free to join 3 circle',
      benefit: 'Total benefit 80 rb',
      amount: 7,
      category: 'Circle Premium'
    }
  ];
  const voucherSeedsPlanGold = [
    {
      title: 'Quiz Gold',
      description: 'Free to join 3 circle',
      benefit: 'Total benefit 80 rb',
      amount: 1,
      category: 'Play Quiz'
    },
    {
      title: 'Play Arena Gold',
      description: 'Free to join 3 circle',
      benefit: 'Total benefit 80 rb',
      amount: 3,
      category: 'Play Arena'
    },
    {
      title: 'Circle Gold',
      description: 'Free to join 3 circle',
      benefit: 'Total benefit 80 rb',
      amount: 7,
      category: 'Circle Premium'
    }
  ];

  const filteredDataSilver = voucherSeedsPlanSilver?.filter(
    item => item.category === category
  );
  const filteredDataGold = voucherSeedsPlanGold?.filter(
    item => item.category === category
  );

  const togglePopupTnc = (): void => {
    setShowTnc(!showTnc);
  };
  const togglePopupHowToUse = (): void => {
    setHowToUse(!showHowToUse);
  };
  const toggleUnsubscribe = (): void => {
    setUnsubscribeModal(!unsubscribeModal);
  };

  const handleView = (): void => {
    if (subscription === '') {
      setSubscription('a')
    } else {
      setSubscription('')
    }
  };

  return (
    <>
      <PageGradient defaultGradient className="w-full">
        <div className='flex flex-col lg:grid lg:grid-cols-3 gap-4 mt-0 md:mt-4 font-poppins'>
          <div
            className={`
              col-span-2 w-full rounded-none px-2 pb-4 bg-[#F6F6F6] md:rounded-xl py-4
              ${
                packagePlan === 'Silver' ? 'to-[#cec9c9]' : 'to-[#f7fb43]'
              }
            `}
          >
            <div className='flex justify-center items-center relative mb-4'>
              <div className='text-xl md:text-2xl font-semibold'  onClick={() => { handleView(); }}>
                MySeeds Plan
              </div>
              <div
                onClick={() => {
                  router.back();
                }}
                className="absolute left-2 transform scale-100 hover:scale-110 transition-transform duration-300 cursor-pointer"
              >
                <IoMdArrowRoundBack size={30} />
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="rounded-3xl bg-white w-full md:w-10/12">
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
                    Best
                  </span>
                </button>
              </div>
            </div>
            <div className='bg-[#F6F6F6] w-full py-2 md:mt-4 md:rounded-t-xl flex justify-center items-center'>
              <div className='w-full md:fit md:max-w-3/4 flex py-4 px-2 gap-2 rounded-xl border border-[#27A590] bg-white justify-center items-center'>
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
                      Silver
                    </div>
                    <div className='w-fit flex justify-center items-center text-xs rounded-full bg-[#BAFBD0] text-[#3AC4A0] px-4'>
                      Active
                    </div>
                  </div>
                  <div className='text-[9px] md:text-sm py-1 rounded-full md:w-fit text-nowrap'>
                    Bisa hemat hingga Rp 150.000, setiap bulannya
                  </div>
                  <div className='text-[9px] md:text-xs px-4 py-1 rounded-full text-[#378D12] border border-[#378D12] md:w-fit text-nowrap'>
                    Your plan will expire on January 25, 2025. 13:08
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-row gap-3 flex-wrap justify-center mb-4 w-full mt-2'>
              {categorySeedsPlan?.map((item, index) => {
                return (
                  <button
                    key={index}
                    className={`px-3 py-1 rounded-3xl ${
                      category === item
                        ? 'bg-[#3ac4a0] text-black'
                        : 'bg-[#ffffff] text-[#bdbdbd]'
                    }`}
                    onClick={() => {
                      setCategory(item);
                    }}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
            <div className='grid grid-cols-1 xl:grid-cols-2 gap-3'>
              {packagePlan === 'Silver'
                ? (category !== 'All'
                    ? filteredDataSilver
                    : voucherSeedsPlanSilver
                  ).map((item, index) => {
                    return (
                      <>
                        <div
                          className="bg-white rounded-2xl w-full h-32 grid grid-cols-4"
                          key={index}
                        >
                          <div className="col-span-1 flex justify-center items-center">
                            {item.category === 'Circle Premium' ? (
                              <HiUserGroup
                                size={60}
                                className="p-3 bg-[#3AC4A0] text-[#487209] rounded-full"
                              />
                            ) : (
                              <IoGameController
                                size={60}
                                className="p-3 bg-[#3AC4A0] text-[#487209] rounded-full"
                              />
                            )}
                          </div>
                          <div className="col-span-2 flex flex-col justify-center">
                            <div className="text-[#3AC4A0] font-bold truncate">
                              {item.title}
                            </div>
                            <div className="text-[#7C7C7C] font-light truncate">
                              {item.description}
                            </div>
                            <div className="font-bold truncate">
                              {item.benefit}
                            </div>
                          </div>
                          <div className="col-span-1 flex flex-col justify-center items-center border-s-2 border-dashed text-[#7C7C7C] relative">
                            <div className="font-bold text-2xl">
                              {item.amount}
                            </div>
                            <div className="font-light">Voucher</div>
                            <Image
                              src={CurveUpper}
                              width={500}
                              height={500}
                              alt="seedsplan"
                              className="w-[50px] h-fit absolute top-0 left-[-26px]"
                            />
                            <Image
                              src={CurveLower}
                              width={500}
                              height={500}
                              alt="seedsplan"
                              className="w-[50px] h-fit absolute bottom-0 left-[-26px]"
                            />
                          </div>
                        </div>
                      </>
                    );
                  })
                : (category !== 'All'
                    ? filteredDataGold
                    : voucherSeedsPlanGold
                  ).map((item, index) => {
                    return (
                      <>
                        <div
                          className="bg-white rounded-2xl w-full h-32 grid grid-cols-4"
                          key={index}
                        >
                          <div className="col-span-1 flex justify-center items-center">
                            {item.category === 'Circle Premium' ? (
                              <HiUserGroup
                                size={60}
                                className="p-3 bg-[#3AC4A0] text-[#487209] rounded-full"
                              />
                            ) : (
                              <IoGameController
                                size={60}
                                className="p-3 bg-[#3AC4A0] text-[#487209] rounded-full"
                              />
                            )}
                          </div>
                          <div className="col-span-2 flex flex-col justify-center">
                            <div className="text-[#3AC4A0] font-bold truncate">
                              {item.title}
                            </div>
                            <div className="text-[#7C7C7C] font-light truncate">
                              {item.description}
                            </div>
                            <div className="font-bold truncate">
                              {item.benefit}
                            </div>
                          </div>
                          <div className="col-span-1 flex flex-col justify-center items-center border-s-2 border-dashed text-[#7C7C7C]">
                            <div className="font-bold text-2xl">
                              {item.amount}
                            </div>
                            <div className="font-light">Voucher</div>
                          </div>
                        </div>
                      </>
                    );
                  })}
            </div>
          </div>
          <div className="col-span-1 w-full h-fit bg-white rounded-none md:rounded-xl p-6">
            <div>
              <div
                className="flex justify-between flew-row items-center pb-3 border-b border-dashed cursor-pointer"
                onClick={togglePopupTnc}
              >
                <div>Terms & Conditions</div>
                <div>
                  <FaChevronRight />
                </div>
              </div>
              <div
                className="flex justify-between flew-row items-center py-3 border-b border-dashed cursor-pointer"
                onClick={togglePopupHowToUse}
              >
                <div>How to Use Voucher</div>
                <div>
                  <FaChevronRight />
                </div>
              </div>
            </div>
            <div className="mt-10 pt-5 border-t-2 border-[#EDE3FE]">
              {packagePlan === 'Silver' ? (
                <>
                  <button className="w-full py-3 bg-[#3ac4a0] rounded-3xl font-semibold transform scale-100 hover:scale-105 transition-transform duration-300">
                    Subscribe Now!
                  </button>
                  <button
                    onClick={toggleUnsubscribe}
                    className="w-full py-3 rounded-3xl font-semibold transform scale-100 hover:scale-105 transition-transform duration-300 mt-4 text-[#FF4A2B] border border-[#FF4A2B]"
                  >
                    Unsubscribe
                  </button>
                </>
              ) : (
                <>
                  <button className="w-full py-3 bg-[#3ac4a0] rounded-3xl font-semibold transform scale-100 hover:scale-105 transition-transform duration-300">
                    Subscribe Now!
                  </button>
                  <button 
                    onClick={toggleUnsubscribe}
                    className="w-full py-3 rounded-3xl font-semibold transform scale-100 hover:scale-105 transition-transform duration-300 mt-4 text-[#FF4A2B] border border-[#FF4A2B]"
                  >
                    Unsubscribe
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </PageGradient>
      <ConfirmationUnsubscribe isOpen={unsubscribeModal} onClose={toggleUnsubscribe} />
      <TncSeedsplan isOpen={showTnc} onClose={togglePopupTnc} />
      <HowToUseSeedsplan isOpen={showHowToUse} onClose={togglePopupHowToUse} />
    </>
  );
};

export default SeedsPlanDetail;
