/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use-client';

import Bullish from '@/assets/play/tournament/bullish.svg';
import CoinLogo from '@/assets/play/tournament/coinLogo.svg';
import BannerCircle from '@/assets/play/tournament/homeBannerCircle.svg';
import IconOverviewActive from '@/assets/play/tournament/iconOverviewActive.svg';
import IconOverviewInactive from '@/assets/play/tournament/iconOverviewInactive.svg';
import IconPortfolio2 from '@/assets/play/tournament/iconPortfolio2.svg';
import IconStocksActive from '@/assets/play/tournament/iconStocksActive.svg';
import IconStocksInactive from '@/assets/play/tournament/iconStocksInactive.svg';
import TriangleBearish from '@/assets/play/tournament/triangleBearish.svg';
import { getUserInfo } from '@/repository/profile.repository';
import { getQuizById } from '@/repository/quiz.repository';
import { type IDetailQuiz } from '@/utils/interfaces/quiz.interfaces';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
// import { useTranslation } from 'react-i18next';
import { PortfolioFilter } from '@/utils/interfaces/tournament.interface';
import { toast } from 'react-toastify';
import { Cell, Pie, PieChart } from 'recharts';

interface StatusPortfolio {
  id: number;
  title: string;
  status: PortfolioFilter;
  iconActive: HTMLImageElement;
  iconInactive: HTMLImageElement;
}

interface EntryType {
  name: string;
}

const Portfolio = (): React.ReactElement => {
  const router = useRouter();
  const id = router.query.id;
  // const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [detailQuiz, setDetailQuiz] = useState<IDetailQuiz>();
  const [userInfo, setUserInfo] = useState<any>();
  const [portfolioActiveTab, setPortfolioActiveTab] = useState(
    PortfolioFilter.OVERVIEW
  );

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

  const getDetail = useCallback(
    async (currency: string) => {
      try {
        setLoading(true);
        const resp: IDetailQuiz = await getQuizById({
          id: id as string,
          currency
        });
        setDetailQuiz(resp);
      } catch (error) {
        toast(`ERROR fetch tournament ${error as string}`);
      } finally {
        setLoading(false);
      }
    },
    [id]
  );

  useEffect(() => {
    if (id) {
      getDetail(userInfo?.preferredCurrency ?? '');
    }
  }, [id, userInfo]);

  if (detailQuiz === undefined && loading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="animate-spinner w-10 h-10" />
      </div>
    );
  }

  const statusPortfolio: StatusPortfolio[] = [
    {
      id: 0,
      title: 'Overview',
      status: PortfolioFilter.OVERVIEW,
      iconActive: IconOverviewActive,
      iconInactive: IconOverviewInactive
    },
    {
      id: 0,
      title: 'Stocks',
      status: PortfolioFilter.STOCKS,
      iconActive: IconStocksActive,
      iconInactive: IconStocksInactive
    },
    {
      id: 0,
      title: 'Cryptos',
      status: PortfolioFilter.CRYPTOS,
      iconActive: IconStocksActive,
      iconInactive: IconStocksInactive
    },
    {
      id: 0,
      title: 'Fractional Bond',
      status: PortfolioFilter.FRACTIONAL_BOND,
      iconActive: IconStocksActive,
      iconInactive: IconStocksInactive
    }
  ];

  const data = [
    { name: 'TSL', currency: 'BIDR', value: 100 },
    { name: 'ETH', currency: 'BIDR', value: 90 },
    { name: 'BNB', currency: 'BIDR', value: 80 },
    { name: 'SHB', currency: 'BIDR', value: 45 },
    { name: 'BTC', currency: 'BIDR', value: 30 },
    { name: 'CTK', currency: 'BIDR', value: 80 },
    { name: 'PRO', currency: 'BIDR', value: 45 },
    { name: 'TKO', currency: 'BIDR', value: 30 }
  ];
  const COLORS = [
    '#F44336',
    '#E81E63',
    '#9C27B0',
    '#673AB7',
    '#3F51B5',
    '#2196F3',
    '#03A9F4',
    '#00BCD4',
    '#009688',
    '#4CAF50',
    '#8BC34A',
    '#CDDC39',
    '#FFEB3B',
    '#FFC107',
    '#FF9800',
    '#FF5722',
    '#795548',
    '#9E9E9E',
    '#607D8B',
    '#000000'
  ];

  const renderLabel = (entry: EntryType): string => {
    return entry.name;
  };

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center rounded-xl font-poppins p-5 bg-white">
        <div className="flex justify-start w-full">
          <Typography className="text-xl font-semibold">Portfolio</Typography>
        </div>
        <div className="w-full p-5 bg-gradient-to-br from-[#50D4B2] from-50% to-[#E2E2E2] rounded-xl h-[150px] relative overflow-hidden mt-4">
          <div className="flex flex-col justify-start gap-2 md:gap-0">
            <Typography className="text-white font-poppins z-20 text-sm md:text-lg">
              Investment Value
            </Typography>
            <Typography className="text-white text-[26px] font-semibold font-poppins z-20">
              IDR 4.490.000
            </Typography>
            <div className="flex gap-2">
              <Image alt="" src={TriangleBearish} className="w-[20px]" />
              <Typography className="text-[#DD2525] font-poppins z-20 text-sm md:text-lg">
                -IDR 23,000 (-0.87%)
              </Typography>
              <Typography className="text-white font-poppins z-20 text-sm md:text-lg">
                Today
              </Typography>
            </div>
          </div>
          <Image
            alt=""
            src={BannerCircle}
            className="absolute top-0 right-0 z-10"
          />
        </div>

        <div className="w-full mt-4 flex justify-center items-center relative">
          <PieChart width={390} height={390}>
            <Pie
              data={data}
              cx={190}
              cy={190}
              innerRadius={100}
              outerRadius={140}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              labelLine={true}
              label={renderLabel}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
          <div className="flex flex-col justify-center items-center absolute top-[170px] font-poppins">
            <div className="text-[#BDBDBD]">Total Portfolio</div>
            <div className="font-semibold">IDR 180.890</div>
          </div>
        </div>
        <div className="w-full xl:w-[80%] md:mt-4 mb-4 flex flex-wrap gap-4 justify-center items-center">
          {data.map((datas, index) => (
            <div key={index} className="flex gap-2">
              <div
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                className="w-[20px] h-[20px] rounded-md"
              />
              <div className="font-semibold">{datas.name} /</div>
              <div>{datas.currency}</div>
              <div className="text-seeds-button-green">+25%</div>
            </div>
          ))}
        </div>

        <div className="w-full mt-4">
          <div className="flex gap-2">
            <Image alt="" src={IconPortfolio2} className="w-[30px]" />
            <Typography className="text-xl font-semibold">Portfolio</Typography>
          </div>
          <Typography className="text-lg mt-4">
            Your assets Portfolio
          </Typography>

          {/* Filter Section */}
          <div className="w-full flex items-start justify-start mt-4">
            <div className="flex flex-row items-center gap-3 max-w-full overflow-x-auto no-scroll">
              {statusPortfolio.map(item => (
                <button
                  className={`w-full flex gap-2 border px-4 py-2 font-poppins rounded-lg text-sm text-nowrap ${
                    item.status === portfolioActiveTab
                      ? 'border-seeds-button-green bg-seeds-button-green text-white'
                      : 'border-seeds-button-green bg-white text-seeds-button-green'
                  }`}
                  key={item.id}
                  onClick={() => {
                    setPortfolioActiveTab(item.status);
                  }}
                >
                  <Image
                    alt=""
                    src={
                      item.status === portfolioActiveTab
                        ? item.iconActive
                        : item.iconInactive
                    }
                    className="w-[20px]"
                  />
                  <div className="mr-4">{item.title}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <div
              onClick={async () =>
                await router.push(
                  'play/tournament/1/portfolio/detail-portfolio'
                )
              }
              className="flex justify-between items-center p-4 mt-4 bg-[#F9F9F9] md:bg-white border border-[#E9E9E9] md:border-none rounded-lg"
            >
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
            <div
              onClick={async () =>
                await router.push(
                  'play/tournament/1/portfolio/detail-portfolio'
                )
              }
              className="flex justify-between items-center p-4 mt-4 bg-[#F9F9F9] md:bg-white border border-[#E9E9E9] md:border-none rounded-lg"
            >
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
            <div
              onClick={async () =>
                await router.push(
                  'play/tournament/1/portfolio/detail-portfolio'
                )
              }
              className="flex justify-between items-center p-4 mt-4 bg-[#F9F9F9] md:bg-white border border-[#E9E9E9] md:border-none rounded-lg"
            >
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
      </div>
    </>
  );
};

export default Portfolio;
