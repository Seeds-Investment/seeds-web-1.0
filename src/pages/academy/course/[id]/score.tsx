import PageGradient from '@/components/ui/page-gradient/PageGradient';
import { getPretestScore } from '@/repository/academy.repository';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const ScorePretest: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState('');
  const { t } = useTranslation();

  const handleGetScore = async (): Promise<void> => {
    try {
      const response = await getPretestScore(id as string);
      setData(response?.pre_test_score);
    } catch (error: any) {
      toast(error.message, { type: 'error' });
    }
  };
  useEffect(() => {
    if (id !== undefined) {
      void handleGetScore();
    }
  }, [id]);
  return (
    <>
      <PageGradient defaultGradient className="w-full">
        <div className="relative font-bold bg-white text-[#262626] md:p-4 p-3 rounded-xl mt-5 md:mt-0 w-full text-center">
          {t('academy.pretest.score')}
        </div>
        <div className="bg-white p-3 rounded-xl mt-5 shadow-md">
          <div className="flex flex-col items-center w-full md:w-5/12 mx-auto gap-5 my-20">
            <Image
              src={'/assets/academy/Seedy.svg'}
              alt="score"
              width={500}
              height={500}
              className="h-60 w-60"
            />
            <div className="font-bold text-xl">
              {t('academy.pretest.grade')}: {data}
            </div>
            <div className="text-[#7C7C7C]">{t('academy.pretest.desc')}</div>
            <button
              className="text-lg p-3 rounded-3xl bg-[#3AC4A0] w-full text-white font-medium"
              onClick={async () =>
                await router.replace(`/academy/course/${id as string}`)
              }
            >
              {t('academy.pretest.back')}
            </button>
          </div>
        </div>
      </PageGradient>
    </>
  );
};

export default ScorePretest;
