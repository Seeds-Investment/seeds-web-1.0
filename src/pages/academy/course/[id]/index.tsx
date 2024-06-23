import PaymentPopup from '@/components/academy/PaymentPopup';
import ShortDescription from '@/components/academy/ShortDescription';
import VideoPlayer from '@/components/academy/VideoPlayer';
import ModalShareCourse from '@/components/popup/ModalShareCourse';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import withAuth from '@/helpers/withAuth';
import { getClassDetail } from '@/repository/academy.repository';
import { getUserInfo } from '@/repository/profile.repository';
import { getTransactionSummary } from '@/repository/seedscoin.repository';
import i18n from '@/utils/common/i18n';
import {
  type DetailClassI,
  type LanguageDataI,
  type PriceDataI
} from '@/utils/interfaces/academy.interface';
import { type UserInfo } from '@/utils/interfaces/tournament.interface';
import { Switch } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const DetailCourse: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isShareModal, setIsShareModal] = useState<boolean>(false);
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState<DetailClassI | undefined>(undefined);
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const { t } = useTranslation();
  const [totalAvailableCoins, setTotalAvailableCoins] = useState<number>(0);

  const togglePopup = (): void => {
    setShowPopup(!showPopup);
  };

  const handleGetClass = async (): Promise<void> => {
    try {
      const responseClass = await getClassDetail(id as string);
      setData(responseClass);
      const responseUser = await getUserInfo();
      setUserInfo(responseUser);
    } catch (error: any) {
      toast(error.message, { type: 'error' });
    }
  };
  const handleGetSeedsCoin = async (): Promise<void> => {
    try {
      const dataCoins = await getTransactionSummary();
      setTotalAvailableCoins(dataCoins?.data?.total_available_coins ?? 0);
    } catch (error: any) {
      toast(error.message, { type: 'error' });
    }
  };

  useEffect(() => {
    if (id !== undefined) {
      void handleGetClass();
      void handleGetSeedsCoin();
    }
  }, [id]);

  return (
    <>
      {isShareModal && (
        <ModalShareCourse
          onClose={() => {
            setIsShareModal(prev => !prev);
          }}
          url={id as string}
        />
      )}
      <PageGradient defaultGradient className="w-full">
        <div className="bg-white p-4 rounded-xl shadow-md flex flex-col gap-5">
          <div className="relative">
            <div className="bg-white bg-opacity-40 w-full h-full z-50 absolute"></div>
            <VideoPlayer
              videoSrc={data?.video as string}
              title={data?.title as string}
            />
          </div>
          <div className="font-bold text-2xl">{data?.title}</div>
          <div className="flex flex-row gap-5">
            <div className="flex flex-row items-center gap-2">
              <Image
                src={'/assets/academy/participants-icon.svg'}
                alt="icon-participants"
                width={100}
                height={100}
                className="w-7"
              />
              100 {t('academy.detailCourse.participants')}
            </div>
            <div
              onClick={() => {
                setIsShareModal(prev => !prev);
              }}
              className="flex flex-row items-center gap-2 cursor-pointer"
            >
              <Image
                src={'/assets/academy/share-icon.svg'}
                alt="icon-participants"
                width={100}
                height={100}
                className="w-7"
              />
              {t('academy.detailCourse.share')}
            </div>
          </div>
          <div className="text-lg">
            <ShortDescription
              text={
                data?.description?.[
                  i18n?.language as keyof LanguageDataI
                ] as string
              }
            />
          </div>
          <button
            className="p-3 bg-[#7555DA] rounded-3xl w-full text-white font-bold"
            onClick={async () =>
              await router.push(`/academy/course/${id as string}/pretest`)
            }
          >
            {t('academy.detailCourse.buttonPretest')}
          </button>
        </div>
        <div className="bg-white p-4 rounded-xl mt-4 shadow-md flex flex-col gap-5">
          <div className="flex flex-row items-center justify-between p-2 rounded-xl bg-[#F0FFF4] border border-[#3AC4A0] shadow-md cursor-pointer">
            <div className="flex flex-row items-center">
              <Image
                src={'/assets/academy/voucher-icon.svg'}
                alt="voucher-icon"
                width={100}
                height={100}
                className="w-10"
              />
              Voucher & Promo
            </div>
            <Image
              src={'/assets/academy/arrow-icon.svg'}
              alt="arrow-icon"
              width={100}
              height={100}
              className="w-7"
            />
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center">
              <Image
                src={'/assets/images/goldHome.svg'}
                alt="seeds-coin-icon"
                width={100}
                height={100}
                className="w-10"
              />
              {t('academy.detailCourse.seedsCoin', {
                data: totalAvailableCoins
              })}
            </div>
            <Switch />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-1 gap-5">
            <div>
              <div className="text-xs text-[#7C7C7C]">
                {t('academy.detailCourse.entrance')}
              </div>
              <div className="font-bold">
                {data?.price?.[
                  userInfo?.preferredCurrency?.toLowerCase() as keyof PriceDataI
                ]?.toLocaleString('id-ID', {
                  currency: userInfo?.preferredCurrency ?? 'IDR',
                  style: 'currency'
                }) ?? <span className="text-red-500">IDR or USD</span>}
              </div>
            </div>
            <button
              className="p-3 bg-[#3AC4A0] rounded-3xl w-full text-white font-bold"
              onClick={togglePopup}
              hidden={
                data?.price?.[
                  userInfo?.preferredCurrency?.toLowerCase() as keyof PriceDataI
                ]?.toLocaleString('id-ID', {
                  currency: userInfo?.preferredCurrency ?? 'IDR',
                  style: 'currency'
                }) === undefined
              }
            >
              {t('academy.detailCourse.buttonEnroll')}
            </button>
          </div>
        </div>
        <PaymentPopup isOpen={showPopup} onClose={togglePopup} />
      </PageGradient>
    </>
  );
};

export default withAuth(DetailCourse);
