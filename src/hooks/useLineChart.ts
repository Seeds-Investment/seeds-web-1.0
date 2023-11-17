import { formatMonthlyChart } from '@/helpers/dateFormat';
import moment from 'moment';
import { useCallback, useMemo } from 'react';

interface IPriceBarHistory {
  close: number;
  high: number;
  low: number;
  open: number;
  timestamp: Date | string;
  volume: number;
  vwap: number;
}

interface IassetsData {
  assetType: string;
  createdAt: Date | string;
  description: string;
  exchange: string;
  exchangeCurrency: string;
  id: string;
  isActive: boolean;
  listedCountry: string;
  logo: string;
  name: string;
  priceBarHistory: IPriceBarHistory[];
  providerName: string;
  providerWebsite: string;
  realTicker: string;
  seedsTicker: string;
  updatedAt: Date | string;
  currentPrice: number;
  currentPoint: number;
  currentPl: number;
  lastUpdated: Date | string;
}

interface IuseChart {
  data: IassetsData;
  selectedTimeFrame: any;
  onchangeTimeFrame: (value: any) => void;
  chartItem: any;
}

const useLineChart = (
  data: any,
  selectedTimeFrame: string,
  fromPortfolio?: boolean
): IuseChart => {
  const priceBarHistory = useMemo(() => data?.priceBarHistory ?? [], [data]);

  //   const [selectedTimeFrame, setSelectedTimeFrame] = useState<any>(
  //     {
  //       id: 1,
  //       name: '1h',
  //       value: 'hourly',
  //     },
  //   );

  const formatDateLabel = useCallback((timeFrame: any, date: string) => {
    if (timeFrame === 'alltime') {
      return moment(date).format('YYYY');
    }
    if (timeFrame === 'yearly') {
      return moment(date).format('YYYY');
    }
    if (timeFrame === 'monthly') {
      return moment(date).format('MMM YY');
    }
    if (timeFrame === 'weekly') {
      console.log('WKWKWKWKW');
      return moment(date).format('dddd');
    }
    if (timeFrame === 'daily') {
      return moment(date).format('hh:mm A');
    }
    return moment(date).format('hh:mm A');
  }, []);

  const onchangeTimeFrame = (value: any): void => {
    // setSelectedTimeFrame(value);
  };

  const chartItem = useMemo(() => {
    const arrXLength = Array(6);
    const _priceBarHistory =
      fromPortfolio !== null
        ? data.datasets
        : priceBarHistory.map((i: any) => {
            return i.close;
          });

    if (_priceBarHistory.length < arrXLength.length) {
      const xZero = arrXLength.length - _priceBarHistory.length;
      for (let i = 0; i < 6; i++) {
        if (i < xZero) {
          _priceBarHistory.unshift(0);
        }
      }
    }
    const chart = _priceBarHistory;

    // label
    const totalGroup = 6;
    const lables = fromPortfolio !== null ? data.labels : priceBarHistory;
    const objectEachGroup = Math.ceil(lables.length / totalGroup);
    let label: any[] = [];

    // label for 1m (mothly)
    console.log('timeframe', selectedTimeFrame);
    if (selectedTimeFrame === 'weekly') {
      const lastDate = priceBarHistory[_priceBarHistory.length - 1]?.timestamp;
      if (lastDate !== null) {
        const previousSixMonths = formatMonthlyChart(new Date(lastDate));
        label = previousSixMonths;
        return { x: previousSixMonths, y: chart };
      }
    }

    for (let g = 0; g < totalGroup; g++) {
      const endIdx = (g + 1) * objectEachGroup;
      const currentGroup =
        fromPortfolio !== null
          ? lables[endIdx - 1] ?? 0
          : lables[endIdx - 1]?.timestamp ?? 0;
      if (currentGroup === 0) {
        label.unshift('');
      } else {
        const formatTime: string | never =
          fromPortfolio !== null
            ? currentGroup
            : formatDateLabel(selectedTimeFrame, currentGroup);
        label.push(formatTime);
      }
    }

    return { x: label, y: chart };
  }, [
    data,
    formatDateLabel,
    fromPortfolio,
    priceBarHistory,
    selectedTimeFrame
  ]);

  return { data, selectedTimeFrame, onchangeTimeFrame, chartItem };
};

export default useLineChart;
