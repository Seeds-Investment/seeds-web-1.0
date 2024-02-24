import CloseButtonWithdrawal from '@/assets/play/quiz/CloseButtonWithdrawal.svg';
import { useAppSelector } from '@/store/redux/store';
import { Dialog, DialogBody, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

interface IModalQuizWinner {
  open: boolean;
  handleOpen: () => void;
  score: number;
  prize: number;
  quizId: string;
}

const ModalQuizWinner: React.FC<IModalQuizWinner> = ({
  open,
  handleOpen,
  score,
  prize,
  quizId
}: IModalQuizWinner) => {
  const { dataUser } = useAppSelector(state => state.user);
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <Dialog
      open={open}
      handler={handleOpen}
      size="md"
      className="h-screen md:h-auto md:p-5 flex flex-col items-center md:relative absolute bottom-0 m-0 rounded-b-none md:rounded-2xl min-w-full"
    >
      <DialogBody className="flex flex-col items-center md:gap-5 gap-4 p-0 h-full w-full">
        <div className="flex flex-row-reverse justify-between items-center w-full">
          <Image
            src={CloseButtonWithdrawal}
            alt="CloseButtonWithdrawal"
            className="cursor-pointer z-10"
            onClick={() => {
              handleOpen();
            }}
          />
        </div>

        <div className="overflow-auto flex flex-col items-center h-full w-full">
          <Typography className="hidden md:block font-poppins font-semibold text-xl text-center text-wrap text-[#262626]">
            {t('quiz.winnerModalTitle')}
          </Typography>
          <div
            className="w-full flex flex-col items-center justify-center p-4"
            style={{
              backgroundImage: "url('/assets/quiz/quizWinnerBg.png')",
              backgroundSize: 'contain'
            }}
          >
            <Typography className="block md:hidden font-poppins font-semibold text-xl text-center text-wrap text-[#262626]">
              {t('quiz.winnerModalTitle')}
            </Typography>
            <Image
              width={78}
              height={78}
              src="/assets/quiz/crown-duotone.png"
              alt="crown"
            />
            <Image
              width={162}
              height={162}
              style={{
                objectFit: 'contain'
              }}
              src={dataUser?.avatar}
              className="rounded-full mb-4 w-[162px] h-[162px]"
              alt="profile"
            />
            <Typography className="font-poppins font-semibold text-lg text-[#262626]">
              {dataUser?.name}
            </Typography>
            <Typography className="font-poppins text-lg text-[#262626] mb-4">
              {t('quiz.score')} {score}
            </Typography>
          </div>
          <Typography className="font-poppins font-semibold text-lg text-[#262626] mb-4">
            {t('quiz.earn')} {prize.toLocaleString('id-ID')}
          </Typography>
          <Typography className="font-poppins text-lg text-[#262626] mb-4 text-center px-8">
            {t('quiz.tax')}
          </Typography>
          <div className="w-2/3 gap-4 flex flex-col py-4">
            <button
              onClick={() => {
                router.push(`/withdrawal?quizId=${quizId}`).catch(err => {
                  console.log(err);
                });
              }}
              className={`bg-[#A75CF4] relative flex items-center justify-center border-2 border-white w-full h-14 rounded-full shadow-sm shadow-gray-600 drop-shadow-sm hover:opacity-90`}
            >
              <div
                className={`h-12 w-full bg-[#C286FF] rounded-full absolute inset-0`}
              />
              <div className="z-10 text-center text-xl font-semibold text-white">
                {t('quiz.withdraw')}
              </div>
            </button>
            <button
              onClick={() => {
                router.push(`/play/quiz/${quizId}/leaderboard`).catch(err => {
                  console.log(err);
                });
              }}
              className={`bg-[#4EC307] relative flex items-center justify-center border-2 border-white w-full h-14 rounded-full shadow-sm shadow-gray-600 drop-shadow-sm hover:opacity-90`}
            >
              <div
                className={`h-12 w-full bg-[#67EB00] rounded-full absolute inset-0`}
              />
              <div className="z-10 text-center text-xl font-semibold text-white">
                {t('quiz.leaderboard')}
              </div>
            </button>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default ModalQuizWinner;
