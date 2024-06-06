import { getLeaderBoardByQuizId } from '@/repository/quiz.repository';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// import { useTranslation } from 'react-i18next';
import MyPosition from '@/components/microsite-quiz/leaderboard-mocrisite-quiz/myPosition';
import Podium, {
  type LeaderData
} from '@/components/microsite-quiz/leaderboard-mocrisite-quiz/podium';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import { Button, Card, Typography } from '@material-tailwind/react';
import { useTranslation } from 'react-i18next';
import QRCode from 'react-qr-code';
import { toast } from 'react-toastify';

const LeaderBoardPage = (): React.ReactElement => {
  const router = useRouter();
  const { id } = router.query;
  const [leaderBoard, setLeaderBoard] = useState<LeaderData[]>([]);
  const [myRank, setMyRank] = useState();
  const { t } = useTranslation();

  const getleaderboardData = async (): Promise<void> => {
    try {
      const res = await getLeaderBoardByQuizId(id);
      setMyRank(res.my_rank);
      setLeaderBoard(res.data);
    } catch (error) {
      toast.error('Error get leaderboard data');
    }
  };

  useEffect(() => {
    if (id !== undefined) {
      void getleaderboardData();
    }
  }, [id]);

  return (
    <PageGradient
      defaultGradient
      className="flex justify-center h-full items-center gap-6 p-4"
    >
      <Card className="flex flex-col justify-start gap-4 w-2/3 h-full rounded-2xl p-5">
        <div
          style={{
            backgroundImage: "url('/assets/quiz/bg-leaderboard-quiz.png')"
          }}
          className="flex justify-center rounded-2xl"
        >
          <Podium leaderboard={leaderBoard} />
        </div>
        {myRank !== undefined && myRank > 0 ? (
          <MyPosition leaderboard={leaderBoard} myRank={myRank} />
        ) : null}

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="px-2 py-5 text-center text-sm font-semibold font-poppins text-[#7C7C7C]">
                Rank
              </th>
              <th className="px-4 py-5 text-start text-sm font-semibold font-poppins text-[#7C7C7C]">
                Player
              </th>
              <th className="px-4 py-5 text-center text-sm font-semibold font-poppins text-[#7C7C7C]">
                Total Point
              </th>
            </tr>
          </thead>
          <tbody>
            {leaderBoard?.slice(3).map((leader, index) => (
              <tr key={index} className="border-b">
                <td className="px-2 py-5 text-center">{leader?.rank}.</td>
                <td className="px-4 py-5 text-start flex">
                  <div className="">
                    <img
                      src={leader?.avatar}
                      alt={leader?.name}
                      className="w-10 h-10 rounded-full"
                    />
                  </div>
                  <div className="mx-3">
                    <h1 className="text-base font-normal font-poppins text-[#262626]">
                      {leader?.name}
                    </h1>
                    <h1 className="text-sm font-normal font-poppins text-[#7C7C7C]">
                      @{leader?.seeds_tag}
                    </h1>
                  </div>
                </td>
                <td className="px-4 py-5 text-center text-base font-normal font-poppins">
                  {leader?.score}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Card className="flex flex-col justify-between items-center w-1/3 h-full p-4">
        <Typography className="font-semibold font-poppins text-xl text-[#262626]">
          Scan this!
        </Typography>
        <QRCode value="https://seeds.finance/" size={200} />
        <div className="flex flex-col gap-4 justify-center items-center w-full bg-[#E3FFF8] px-3.5 py-2.5">
          <Typography className="font-semibold font-poppins text-base text-[#262626]">
            Download Seeds App
          </Typography>
          <div className="flex w-full justify-evenly">
            <div className="flex flex-col gap-4 items-center">
              <QRCode
                value="https://apps.apple.com/id/app/seeds-investing-together/id6443659980"
                size={114}
              />
              <Typography className="font-normal font-poppins text-base text-[#262626]">
                App Store
              </Typography>
            </div>
            <div className="flex flex-col gap-4 items-center">
              <QRCode
                value="https://play.google.com/store/apps/details?id=com.seeds.investment&hl=en&gl=US"
                size={114}
              />
              <Typography className="font-normal font-poppins text-base text-[#262626]">
                Play Store
              </Typography>
            </div>
          </div>
        </div>
        <Button
          onClick={async () => {
            await router.replace('/microsite-quiz');
          }}
          className="bg-[#3AC4A0] w-full rounded-full normal-case font-poppins font-semibold text-white text-sm"
        >
          {t('quiz.playAgain')}
        </Button>
      </Card>
    </PageGradient>
  );
};

export default LeaderBoardPage;
