'use-client';

import IconCompleted from '@/assets/my-profile/earning/paymentCompleted.svg';
import IconProcessed from '@/assets/my-profile/earning/paymentProcess.svg';
import IconRejected from '@/assets/my-profile/earning/paymentRejected.svg';
import EarningDetailSkeleton from '@/components/profile/earning/EarningDetailSkeleton';
import { standartCurrency } from '@/helpers/currency';
import { getEventDate } from '@/helpers/dateFormat';
import withAuth from '@/helpers/withAuth';
import { getEarningHistoryById } from '@/repository/earning.repository';
import { getUserInfo } from '@/repository/profile.repository';
import LanguageContext from '@/store/language/language-context';
import { type IEarningById, type UserInfo } from '@/utils/interfaces/earning.interfaces';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const WithdrawStatus = (): React.ReactElement => {
  const router = useRouter();
  const { t } = useTranslation();
  const pathTranslation = 'earning.earningDetail'
  const languageCtx = useContext(LanguageContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [earningData, setEarningData] = useState<IEarningById>();
  const [userInfo, setUserInfo] = useState<UserInfo>();
  
  const id = Array.isArray(router.query.id)
    ? router.query.id[0]
    : router.query.id;
  
  const fetchEarningById = async (id: string): Promise<void> => {
    try {
      setIsLoading(true);
      const result = await getEarningHistoryById(id);
      setEarningData(result)
    } catch (error) {
      toast.error(`Error fetching data: ${error as string}`);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchData = async (): Promise<void> => {
    try {
      const dataInfo = await getUserInfo();
      setUserInfo(dataInfo);
    } catch (error) {
      toast.error(`Error fetching data: ${error as string}`);
    }
  };
  
  const sourcePlay = (source: string): string => {
    if (source === 'TOURNAMENT') {
      return 'Play Tournament';
    } else if (source === 'QUIZ') {
      return 'Play Quiz';
    } else if (source === 'TEAM_BATTLE') {
      return 'Team Battle';
    } else {
      return source?.charAt(0)?.toUpperCase() + source?.slice(1)?.toLowerCase();
    }
  };  

  useEffect(() => {
    if (id !== null && id !== undefined) {
      void fetchEarningById(id);
    }
  }, [id]);
  
  useEffect(() => {
    fetchData()
      .then()
      .catch(() => {});
  }, []);

  return (
<div className="w-full flex flex-col justify-center items-center rounded-xl p-5 bg-white py-12">
  {isLoading ? (
    <EarningDetailSkeleton/>
  ) : (
    <>
      <Image
        alt=""
        src={
          earningData?.status === 'completed'
            ? IconCompleted
            : earningData?.status === 'rejected'
            ? IconRejected
            : IconProcessed
        }
        width={1000}
        height={1000}
        className="w-[200px] h-auto md:w-[250px] md:h-auto"
      />
      <p className="text-xl font-semibold text-black">
        {earningData?.status === 'completed'
          ? t(`${pathTranslation}.text1`)
          : earningData?.status === 'rejected'
          ? t(`${pathTranslation}.text3`)
          : t(`${pathTranslation}.text2`)}
      </p>
      <p className="text-[#7C7C7C] text-center">
        {earningData?.status === 'completed'
          ? t(`${pathTranslation}.text4`)
          : earningData?.status === 'rejected'
          ? t(`${pathTranslation}.text6`)
          : t(`${pathTranslation}.text5`)}
      </p>

      <div className="w-full md:w-fit md:min-w-[400px] flex flex-col gap-2 bg-[#F9F9F9] border border-[#E9E9E9] rounded-lg p-4 mt-8">
        <div className="flex flex-col md:flex-row gap-2 justify-start md:justify-between items-center">
          <Typography className="text-[#7C7C7C] text-sm">{t(`${pathTranslation}.text7`)}</Typography>
          <Typography className="text-[#262626] text-sm font-medium">
            {userInfo?.preferredCurrency ?? 'IDR'}{' '}
            {standartCurrency(earningData?.amount ?? 0).replace('Rp', '')}
          </Typography>
        </div>

        <div className="flex flex-col md:flex-row gap-2 justify-start md:justify-between items-center">
          <Typography className="text-[#7C7C7C] text-sm">{t(`${pathTranslation}.text8`)}</Typography>
          <Typography className="text-[#262626] text-sm font-medium">
            {sourcePlay(earningData?.source ?? '')}
          </Typography>
        </div>

        <div className="flex flex-col md:flex-row gap-2 justify-start md:justify-between items-center">
          <Typography className="text-[#7C7C7C] text-sm">{t(`${pathTranslation}.text9`)}</Typography>
          <Typography className="text-[#262626] text-sm font-medium">
            {earningData?.source_name}
          </Typography>
        </div>

        <div className="flex flex-col md:flex-row gap-2 justify-start md:justify-between items-center">
          <Typography className="text-[#7C7C7C] text-sm">{t(`${pathTranslation}.text10`)}</Typography>
          <Typography className="text-[#262626] text-sm font-medium">
            {languageCtx.language === 'ID'
              ? getEventDate(
                  new Date(earningData?.created_at ?? '2024-12-31T23:59:00Z'),
                  'id-ID'
                )
              : getEventDate(
                  new Date(earningData?.created_at ?? '2024-12-31T23:59:00Z'),
                  'en-US'
                )}
          </Typography>
        </div>
      </div>

      <div
        onClick={async () => await router.push('/my-profile/my-earnings')}
        className="mt-8 bg-seeds-button-green py-2 w-[200px] md:w-[350px] text-white font-poppins text-center rounded-full cursor-pointer hover:shadow-lg duration-300"
      >
        {t(`${pathTranslation}.text11`)}
      </div>
    </>
  )}
</div>

  );
};

export default withAuth(WithdrawStatus);
