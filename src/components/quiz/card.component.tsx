import type { IQuiz } from '@/utils/interfaces/quiz.interfaces';
import { ShareIcon } from '@heroicons/react/24/outline';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import TopQuizEmpty from '../../assets/play/quiz/top-quiz-empty.jpg';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
const QuizCard = ({ item }: { item: IQuiz }) => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div key={item.id} className="rounded-t-lg">
      <div className="w-full max-h-48">
        <Image
          src={
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            item.banner?.image_url ? item.banner?.image_url : TopQuizEmpty
          }
          width={1000}
          height={500}
          className="object-cover max-h-48"
        />
      </div>
      <div className="bg-gradient-to-r from-[#106B6E] to-[#96F7C1] w-full font-poppins">
        <div className="flex flex-row justify-between px-4 py-2 border-b border-dashed border-white">
          <div className="text-white text-sm font-semibold">{item.name}</div>
          <button>
            <ShareIcon width={20} height={20} className="text-white" />
          </button>
        </div>
        <div className="flex flex-row justify-between items-center px-4 py-2 pb-4">
          <div className="flex flex-row items-center gap-3 text-white text-sm">
            <div>
              <div>{t('quiz.entryFee')}</div>
              <div className="font-semibold">
                {item.admission_fee === 0
                  ? t('quiz.free')
                  : item.admission_fee.toLocaleString('id-ID', {
                      currency: 'IDR',
                      style: 'currency'
                    })}
              </div>
            </div>
            <div>
              <div>{t('quiz.duration')}</div>
              <div className="font-semibold">
                {t('quiz.dayDuration', {
                  amount: Math.floor(
                    moment(item.ended_at).diff(
                      moment(item.started_at),
                      'days',
                      true
                    )
                  )
                })}
              </div>
            </div>
            <div>
              <div>{t('quiz.players')}</div>
              <div className="font-semibold">{item.participants}</div>
            </div>
          </div>
          <div>
            <button
              onClick={() => {
                if (item.is_played) {
                  // TODO: navigate to quiz score page
                } else {
                  router.push(`/play/quiz/${item.id}`).catch(error => {
                    console.log(error);
                  });
                }
              }}
              className="bg-white text-seeds-button-green px-10 py-2 rounded-full font-semibold"
            >
              {item.is_played ? t('quiz.leaderboard') : t('quiz.play')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
