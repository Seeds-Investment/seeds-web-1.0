import VideoPlayer from '@/components/academy/VideoPlayer';
import ModalShareCourse from '@/components/popup/ModalShareCourse';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import {
  getClassDetail,
  getPretestScore
} from '@/repository/academy.repository';
import i18n from '@/utils/common/i18n';
import {
  type DetailClassI,
  type LanguageDataI
} from '@/utils/interfaces/academy.interface';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const LearnCourse: React.FC = () => {
  const [isShareModal, setIsShareModal] = useState<boolean>(false);
  const router = useRouter();
  const { id } = router.query;
  const { t } = useTranslation();
  const [data, setData] = useState<DetailClassI | undefined>(undefined);
  const [score, setScore] = useState<number | undefined>(undefined);

  const handleGetClass = async (): Promise<void> => {
    try {
      const responseClass = await getClassDetail(id as string);
      setData(responseClass);
      const responseScore = await getPretestScore(id as string);
      setScore(responseScore?.pre_test_score);
    } catch (error: any) {
      toast(error.message, { type: 'error' });
    }
  };

  useEffect(() => {
    if (id !== undefined) {
      void handleGetClass();
    }
  }, [id]);

  useEffect(() => {
    if (data?.is_owned === false) {
      void router.push(`/academy/course/${id as string}`);
    }
  }, [data]);

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
          <VideoPlayer
            videoSrc={data?.video as string}
            title={data?.title as string}
          />
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
          <div className="flex flex-row items-center bg-[#F7F7F7] border-2 border-[#3AC4A0] p-3 rounded-lg justify-between">
            <div className="text-lg">
              {t('academy.detailCourse.pretestScore')}
            </div>
            <div className="text-2xl font-bold text-[#27A590]">
              {score ?? 0}
            </div>
          </div>
          <div className="text-lg">
            {
              data?.description?.[
                i18n?.language as keyof LanguageDataI
              ] as string
            }
          </div>
        </div>
        <div
          className="bg-white p-4 rounded-xl mt-4 shadow-md flex flex-col gap-5"
          onClick={async () =>
            await router.push(`/academy/course/${id as string}/posttest`)
          }
        >
          <button className="p-3 bg-[#3AC4A0] rounded-3xl w-full text-white font-bold">
            Post-Test
          </button>
        </div>
      </PageGradient>
    </>
  );
};

export default LearnCourse;
