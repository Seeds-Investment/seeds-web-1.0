import { generateRandomColor } from '@/helpers/generateRandomColor';
import { type ForYouPostI, type Pie } from '@/utils/interfaces/play.interface';
import moment from 'moment';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import PieAssetPost from './PieAssetPost';

interface props {
  item: ForYouPostI;
}

export interface ChartData {
  labels: string[];
  datasets: Array<{
    data: number[];
    backgroundColor: string[];
  }>;
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

const SocialCard: React.FC<props> = ({ item }) => {
  const [chartData, setChartData] = useState<ChartData>(initialChartData);
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

    item.pie.forEach((item: Pie) => {
      convertedData.labels.push(item.name);
      convertedData.datasets[0].data.push(item.allocation);
      convertedData.datasets[0].backgroundColor.push(generateRandomColor());
    });

    setChartData(convertedData);
  };

  useEffect(() => {
    if (item?.pie?.length > 0) {
      handleSetChartData();
    }
  }, []);

  return (
    <div className="border border-[#E9E9E9] rounded-md flex flex-col justify-start gap-2 p-2 min-w-[280px] max-w-[350px] mr-4">
      <div className="flex p-2 justify-between items-center">
        <div className="flex gap-2 items-center">
          <Image
            alt="Profile Image"
            width="48"
            height="48"
            src={item?.owner?.avatar}
            className="rounded-full"
          />
          <p className="font-bold text-black text-lg">
            @{item?.owner?.seeds_tag}
          </p>
        </div>
        <p className="font-thin text-[#7C7C7C] text-sm">
          {/* {item?.created_at} */}
          {moment(new Date()).diff(moment(item?.created_at), 'hours')}h
        </p>
      </div>
      <p className="text-[#262626] px-2">{item?.content_text}</p>
      {item?.pie?.length > 0 && (
        <PieAssetPost data={item} chartData={chartData} />
      )}
    </div>
  );
};

export default SocialCard;
