import star from '@/assets/temporary-page/star.svg';
import CCard from '@/components/CCard';
import { getTrendingCircle } from '@/repository/circle.repository';
import { Typography } from '@material-tailwind/react';
import { downloadOurApp } from '@/utils/_static';
import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Image from 'next/image';

const fetch = async (
  setNews: Dispatch<SetStateAction<never[]>>
): Promise<void> => {
  const res = await getTrendingCircle();

  const data: never[] = res?.result;
  setNews(data);
};

export default function Section1(): React.ReactElement {
  const { t } = useTranslation();
  const [list, setList] = useState([]);
  useEffect(() => {
    void fetch(setList);
  }, []);

  console.log(list);

  return (
    <div className="mb-10 p-3 min-w-full cursor-default md:p-8" >
      <CCard className="bg-clip overflow-hidden md:h-[410px] lg:h-[480px] shadow-lg rounded-xl lg:p-5 outline">
        <div className="flex flex-col p-6 bg-ellipse-purple">
          <div className="mb-4">
            <Typography className="text-[24px] text-[#262626] font-bold lg:text-[64px] tracking-wider">
              {t('temporary.welcome.1')}
            </Typography>
            <Typography className="text-[24px] text-[#262626] font-bold tracking-wider">
              {t('temporary.welcome.2')}
            </Typography>
            <Typography className="text-l text-[#262626] font-normal tracking-wider mt-3">
              {t('temporary.description')}
            </Typography>
          </div>
          <div className="flex justify-around mb-3">
            {downloadOurApp
              .filter((data, i) => i <= 1)
              .map((data, key) => (
                <div key={key} className='flex flex-col items-center'>
                  <Link key={key} href={data.url}>
                    <Image alt="" src={data.icon} />
                  </Link>
                  <div className="flex mt-3">
                    <Typography className="mr-2 text-xl text-[#262626] font-semibold tracking-wider">
                      {data.rate}
                    </Typography>
                    <div>
                      <div className='flex'>
                        <Image alt="" src={star} />
                        <Image alt="" src={star} />
                        <Image alt="" src={star} />
                        <Image alt="" src={star} />
                        <Image alt="" src={star} />
                      </div>
                      <Typography className="text-xs text-[#262626] font-normal tracking-wider">
                      {t('temporary.review', {review: data.reviews})}
                    </Typography>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </CCard>
    </div>
  );
}
