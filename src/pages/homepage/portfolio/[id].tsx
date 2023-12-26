import BallanceImage from '@/assets/ballanceCardBackground.png';
import {
  Overview,
  OverviewActive,
  Stock,
  StockActive
} from '@/assets/order-page';
import CCard from '@/components/CCard';
import ImageBackground from '@/components/ImageBackground';
import PortfolioChart from '@/components/PortfolioChart';
import Loading from '@/components/popup/Loading';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import AssetPortfolioCard from '@/containers/homepage/trending/AssetsPortfolioCard';
import AssetTrendingCardSkeleton from '@/containers/homepage/trending/skeleton/AssetsCardSkeleton';
import { formatNumber, standartCurrency } from '@/helpers/currency';
import { generateRandomColor } from '@/helpers/generateRandomColor';
import withAuth from '@/helpers/withAuth';
import {
  getPlayBallance,
  getPlayPortfolio
} from '@/repository/play.repository';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { type Ballance } from '../play-assets';

interface ChartData {
  labels: string[];
  datasets: Array<{
    data: number[];
    backgroundColor: string[];
  }>;
}

interface isUptrendType {
  summary: boolean;
  id_stock: boolean;
  us_stock: boolean;
  crypto: boolean;
  commodity: boolean;
}
interface itemPortfolioSummaryType {
  value: number;
  gnl: number;
  gnl_percentage: number;
  currency: string;
}

interface IPortfolioSummary {
  summary: itemPortfolioSummaryType;
  id_stock: itemPortfolioSummaryType;
  us_stock: itemPortfolioSummaryType;
  crypto: itemPortfolioSummaryType;
  commodity: itemPortfolioSummaryType;
  pie: {
    assets: any[];
    cash_balance: number;
    total_portfolio: number;
  };
}

const initialChartData = {
  labels: ['dummy'],
  datasets: [
    {
      data: [100],
      backgroundColor: ['#9F9F9F']
    }
  ]
};

const PortfolioPage: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { id } = router.query;
  const [chartData, setChartData] = useState<ChartData>(initialChartData);
  const [ballance, setBallance] = useState<Ballance>({
    balance: 0,
    portfolio: 0,
    total_sell: 0,
    total_buy: 0,
    currency: 'IDR'
  });
  const [portfolio, setPortfolio] = useState<IPortfolioSummary | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const tabData = [
    {
      name: t('social.pieSection.overview'),
      value: 'overview',
      svg: Overview,
      svgActive: OverviewActive
    },
    {
      name: t('social.pieSection.stocks'),
      value: 'STOCK',
      svg: Stock,
      svgActive: StockActive
    },
    {
      name: t('social.pieSection.crypto'),
      value: 'CRYPTO',
      svg: Stock,
      svgActive: StockActive
    },
    {
      name: 'Fractional Bond',
      value: 'fractional',
      svg: Stock,
      svgActive: StockActive
    }
  ];

  const filterAssetsList = useCallback((): any[] => {
    const newData = portfolio?.pie.assets.filter(el => {
      if (activeTab === 'fractional') {
        if (el.exchange !== 'STOCK' && el.exchange !== 'CRYPTO') {
          return el;
        }
      } else if (activeTab === 'overview') {
        return el;
      } else {
        if (el.exchange === activeTab) {
          return el;
        }
      }
      return undefined;
    });
    return newData as any[];
  }, [activeTab, portfolio]);

  const isUptrend: isUptrendType = {
    summary: (portfolio?.summary?.gnl_percentage as number) >= 0,
    id_stock: (portfolio?.id_stock?.gnl_percentage as number) >= 0,
    us_stock: (portfolio?.us_stock?.gnl_percentage as number) >= 0,
    crypto: (portfolio?.crypto?.gnl_percentage as number) >= 0,
    commodity: (portfolio?.commodity?.gnl_percentage as number) >= 0
  };

  const handleSetChartData = (): void => {
    const convertedData: ChartData = {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: []
        }
      ]
    };

    portfolio?.pie.assets.forEach((item: any) => {
      convertedData.labels.push(item.ticker);
      convertedData.datasets[0].data.push(item.percentage);
      convertedData.datasets[0].backgroundColor.push(generateRandomColor());
    });

    setChartData(convertedData);
  };

  useEffect(() => {
    if (portfolio?.pie !== undefined) {
      handleSetChartData();
    }
  }, [portfolio]);

  const fetchPlayBallance = async (): Promise<void> => {
    try {
      const response = await getPlayBallance(id as string);
      setBallance(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPlayPortfolio = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await getPlayPortfolio(id as string);
      setPortfolio(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id !== undefined) {
      void fetchPlayBallance();
      void fetchPlayPortfolio();
    }
  }, [id]);

  const handleActiveTab = (val: string): void => {
    setActiveTab(val);
  };

  return (
    <PageGradient defaultGradient className="w-full">
      {isLoading && <Loading />}
      <CCard className="flex flex-col w-full p-5 border-none rounded-xl">
        <div className="flex z-10 flex-col lg:flex-row justify-between pb-4">
          <div className="flex flex-col">
            <div className="sm:text-3xl text-2xl font-semibold bg-clip-text text-black font-poppins">
              {t('playSimulation.portfolio')}
            </div>
          </div>
        </div>
        <ImageBackground className="rounded-2xl" imageUrl={BallanceImage.src}>
          <div className="p-5">
            <Typography className="text-white font-poppins mb-2">
              {t('playSimulation.investmentValue')}
            </Typography>
            <Typography className="text-white font-poppins text-xl font-semibold mb-2">
              {`${ballance?.currency} ${standartCurrency(
                portfolio?.summary?.value
              ).replace('Rp', '')}`}
            </Typography>
            <div className="flex gap-2">
              <Typography
                className={`${
                  isUptrend.summary ? 'text-[#B7EE79]' : 'text-[#DD2525]'
                } font-poppins text-xs font-light`}
              >
                {`${ballance?.currency} ${standartCurrency(
                  portfolio?.summary?.gnl
                ).replace('Rp', '')}`}
              </Typography>
              <Typography
                className={`${
                  isUptrend.summary ? 'text-[#B7EE79]' : 'text-[#DD2525]'
                } font-poppins text-xs font-light`}
              >
                {`(${isUptrend.summary ? '+' : '-'}${
                  portfolio?.summary?.gnl_percentage.toFixed(2) as string
                })`}
                %{' '}
                <span className="text-white">{t('playSimulation.today')}</span>
              </Typography>
            </div>
          </div>
        </ImageBackground>
        <div className="flex justify-center mt-4">
          <div className="w-[200px]">
            {portfolio !== null && (
              <PortfolioChart
                data={chartData}
                centerText={`${ballance?.currency} ${
                  portfolio?.summary?.gnl >= 0
                    ? formatNumber(portfolio?.summary?.gnl)
                    : 0
                }`}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="mt-4">
            <Typography className="text-black font-poppins mb-1 text-lg font-semibold bg-clip-text">
              {t('playSimulation.portfolio')}
            </Typography>
            <Typography className="text-black font-poppins text-base font-light bg-clip-text">
              {t('playSimulation.yourAssetsPortfolio')}
            </Typography>
          </div>
          <div className="my-4 w-full">
            <div className="flex gap-2 overflow-auto w-ful no-scroll">
              {tabData.map((el, i: number) => {
                return (
                  <Button
                    key={i}
                    variant={el.value === activeTab ? 'filled' : 'outlined'}
                    className={`normal-case text-xs min-w-fit rounded-lg p-2 gap-2 flex items-center font-semibold ${
                      el.value !== activeTab
                        ? 'border border-[#3AC4A0] text-[#3AC4A0]'
                        : 'bg-[#3AC4A0] text-white'
                    } font-poppins`}
                    onClick={() => {
                      handleActiveTab(el.value);
                    }}
                  >
                    <Image
                      src={el.value === activeTab ? el.svg : el.svgActive}
                      alt="svg"
                      width={20}
                      height={20}
                    />
                    {el.name}
                  </Button>
                );
              })}
            </div>
          </div>
          {isLoading ? (
            <AssetTrendingCardSkeleton />
          ) : (
            filterAssetsList()?.map((el: any) => {
              console.log(el);

              return <AssetPortfolioCard id={el.id} key={el.id} />;
            })
          )}
        </div>
      </CCard>
    </PageGradient>
  );
};

export default withAuth(PortfolioPage);
