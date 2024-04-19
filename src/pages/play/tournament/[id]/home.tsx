/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use-client';

import Bullish from '@/assets/play/tournament/bullish.svg';
import CardRecomendation from '@/assets/play/tournament/circleRecomendation.svg';
import CoinLogo from '@/assets/play/tournament/coinLogo.svg';
import IconCopy from '@/assets/play/tournament/copyLink.svg';
import BannerCircle from '@/assets/play/tournament/homeBannerCircle.svg';
import IconPortfolio from '@/assets/play/tournament/iconPortfolio.svg';
import IconVirtualBalance from '@/assets/play/tournament/iconVirtualBalance.svg';
import IconWatchlist from '@/assets/play/tournament/iconWatchlist.svg';
import IconWarning from '@/assets/play/tournament/miniWarning2.svg';
import IconSeeds from '@/assets/play/tournament/SeedsBannerLeaderboard.svg';
import CountdownTimer from '@/components/play/CountdownTimer';
import ModalDetailTournament from '@/components/popup/ModalDetailTournament';
import { getPlayById } from '@/repository/play.repository';
import { getUserInfo } from '@/repository/profile.repository';
import { type IDetailTournament } from '@/utils/interfaces/tournament.interface';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Settings } from 'react-slick';
import Slider from 'react-slick';
import { toast } from 'react-toastify';

const settings: Settings = {
  slidesToShow: 3,
  speed: 500,
  slidesToScroll: 1,
  dots: true,
  infinite: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        dots: true,
        slidesToShow: 4
      }
    },
    {
      breakpoint: 768,
      settings: {
        dots: true,
        slidesToShow: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        dots: true,
        slidesToShow: 1
      }
    }
  ]
};
const TournamentHome = (): React.ReactElement => {
  const router = useRouter();
  const id = router.query.id;
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [detailTournament, setDetailTournament] = useState<IDetailTournament>();
  const [userInfo, setUserInfo] = useState<any>();
  const [isDetailModal, setIsDetailModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const dataInfo = await getUserInfo();

        setUserInfo(dataInfo);
      } catch (error: any) {
        toast.error('Error fetching data:', error.message);
      }
    };

    fetchData()
      .then()
      .catch(() => {});
  }, []);

  const getDetail = useCallback(async () => {
    try {
      setLoading(true);
      const resp: IDetailTournament = await getPlayById(id as string);
      setDetailTournament(resp);
    } catch (error) {
      toast(`ERROR fetch tournament ${error as string}`);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id !== null && userInfo !== undefined) {
      getDetail();
    }
  }, [id, userInfo]);

  if (detailTournament === undefined && loading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="animate-spinner w-10 h-10" />
      </div>
    );
  }

  const handleCopyClick = async (): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const textToCopy = `${detailTournament?.play_id}`;
    await navigator.clipboard.writeText(textToCopy).then(() => {
      toast('Play ID copied!');
    });
  };

  return (
    <>
      {isDetailModal && (
        <ModalDetailTournament
          onClose={() => {
            setIsDetailModal(prev => !prev);
          }}
        />
      )}
      <div className="flex flex-col justify-center items-center rounded-xl font-poppins p-5 bg-white">
        <div className="flex justify-start w-full gap-2">
          <Typography className="text-xl font-semibold">
            {detailTournament?.name}
          </Typography>
          <Image
            onClick={() => {
              setIsDetailModal(true);
            }}
            alt=""
            src={IconWarning}
            className="w-[20px] cursor-pointer"
          />
        </div>
        <div className="text-[14px] flex justify-start items-center gap-2 py-2 w-full">
          <Typography className="font-poppins">
            Play ID : {detailTournament?.play_id}
          </Typography>
          <button onClick={handleCopyClick}>
            <Image alt="" src={IconCopy} className="w-[20px]" />
          </button>
        </div>
        <div className="w-full p-5 bg-gradient-to-br from-[#50D4B2] from-50% to-[#E2E2E2] rounded-xl h-[250px] relative">
          <div className="flex flex-col justify-start gap-2 md:gap-0">
            <Typography className="text-white font-poppins z-20 text-sm md:text-lg">
              Total Investment
            </Typography>
            <Typography className="text-white text-[26px] font-semibold font-poppins z-20">
              IDR 4.490.000
            </Typography>
            <Typography className="text-white font-poppins z-20 text-sm md:text-lg">
              Total Return IDR 44.500.400 (+2.8%)
            </Typography>
            <Typography className="text-white font-poppins z-20 text-sm md:text-lg">
              Virtual Balance : 100.000.000
            </Typography>
          </div>
          <Image
            alt=""
            src={BannerCircle}
            className="absolute top-0 right-0 z-10"
          />
          <div className="w-full xl:w-3/4 flex justify-center items-center gap-8 bg-white absolute p-4 bottom-[-45px] m-auto left-0 right-0 z-30 rounded-xl shadow-lg">
            <div
              onClick={async () =>
                await router.push('/play/tournament/1/portfolio')
              }
              className="flex flex-col justify-center items-center gap-2 cursor-pointer"
            >
              <Image
                alt=""
                src={IconPortfolio}
                className="w-[30px] md:w-[45px]"
              />
              <Typography className="text-[#262626] font-poppins text-sm md:text-lg text-center">
                Portfolio
              </Typography>
            </div>
            <div
              onClick={async () =>
                await router.push('/play/tournament/1/virtual-balance')
              }
              className="flex flex-col justify-center items-center gap-2 cursor-pointer"
            >
              <Image
                alt=""
                src={IconVirtualBalance}
                className="w-[30px] md:w-[45px]"
              />
              <Typography className="text-[#262626] font-poppins text-sm md:text-lg text-center">
                Virtual Balance
              </Typography>
            </div>
            <div className="flex flex-col justify-center items-center gap-2 cursor-pointer">
              <Image
                alt=""
                src={IconWatchlist}
                className="w-[30px] md:w-[45px]"
              />
              <Typography className="text-[#262626] font-poppins text-sm md:text-lg text-center">
                Watchlist
              </Typography>
            </div>
          </div>
        </div>
        <div className="mt-16 w-full">
          <div className="flex flex-col w-full justify-center items-center">
            <div className="text-lg font-semibold">
              {t('tournament.detailRemaining')}
            </div>
            <CountdownTimer
              className="text-md text-[#FDBA22] font-semibold mt-2 font-poppins"
              deadline={
                detailTournament?.end_time
                  ? detailTournament.end_time.toString()
                  : ''
              }
            />
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#E9E9E9] from-70% to-white w-full flex justify-between items-center relative mt-4 cursor-pointer rounded-xl p-4">
          <Image
            alt=""
            src={IconSeeds}
            className="w-[60px] md:w-[80px] xl:ml-8"
          />
          <div className="w-full lg:flex lg:justify-between ml-2">
            <div className="flex flex-col justify-center items-start text-sm lg:text-lg">
              <div>{t('tournament.leaderboardBanner1')}</div>
              <div className="flex gap-2">
                <div>{t('tournament.leaderboardBanner2')}</div>
                <div className="text-[#3AC4A0] font-semibold">Leaderboard</div>
              </div>
            </div>
            <div className="bg-[#3AC4A0] text-white flex justify-center items-center w- lg:w-[300px] lg:text-lg text-xs rounded-full px-4 py-1 mt-2 xl:mr-8">
              {t('tournament.leaderboardBanner3')}
            </div>
          </div>
        </div>

        <div className="w-full mt-4">
          <Typography className="text-xl font-semibold text-[#3AC4A0]">
            Tournament Assets
          </Typography>
          <input
            id="search"
            type="text"
            name="search"
            placeholder="Search"
            readOnly={false}
            disabled={false}
            className="mt-4 block w-full text-[#262626] h-11 leading-4 placeholder:text-[#BDBDBD] focus:outline-0 disabled:bg-[#E9E9E9] p-3 pl-8 rounded-xl border border-[#BDBDBD]"
          />
          <div className="flex justify-between items-center p-4 mt-4">
            <div className="flex gap-4">
              <Image alt="" src={CoinLogo} className="w-[40px]" />
              <div className="flex flex-col justify-center items-start">
                <div className="flex gap-1">
                  <div className="font-semibold">ETH /</div>
                  <div>BIDR</div>
                </div>
                <div className="text-[#7C7C7C]">Ethereum</div>
              </div>
            </div>
            <div className="flex flex-col justify-end items-end">
              <div className="font-semibold">IDR 3.575.000</div>
              <div className="flex justify-center gap-2">
                <Image alt="" src={Bullish} className="w-[20px]" />
                <div className="text-[#3AC4A0]">(47%)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full rounded-lg mt-4 p-5 bg-white">
        <Typography className="text-xl font-semibold text-[#3AC4A0]">
          {t('tournament.circleRecommendation')}
        </Typography>
        <div className="w-full overflow-hidden mt-4">
          <Slider {...settings}>
            <div className="w-full lg:w-1/3 p-2">
              <Image alt="" src={CardRecomendation} className="" />
            </div>
            <div className="w-full lg:w-1/3 p-2">
              <Image alt="" src={CardRecomendation} className="" />
            </div>
            <div className="w-full lg:w-1/3 p-2">
              <Image alt="" src={CardRecomendation} className="" />
            </div>
          </Slider>
        </div>
      </div>
    </>
  );
};

export default TournamentHome;
