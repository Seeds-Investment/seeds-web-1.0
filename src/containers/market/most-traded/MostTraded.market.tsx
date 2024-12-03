import { getPlayAssetTrending } from '@/repository/play.repository';
import { trendingMarket } from '@/utils/interfaces/market.interface';
import { Avatar, Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const MostTraded = () => {
  const [trendingAsset, setTrendingAsset] = useState<trendingMarket[]>([]);

  const fetchTrendingAsset = async (): Promise<void> => {
    try {
      const response = await getPlayAssetTrending({
        page: 1,
        limit: 10,
        sortBy: 'most_traded'
      });
      setTrendingAsset(response.data.data);
      console.log(response);
    } catch (error) {
      toast.error(`error fetching data: `);
    }
  };

  useEffect(() => {
    void fetchTrendingAsset();
  }, []);

  return (
    <>
      <div
        className="flex flex-col gap-3" /*  cover tag atas -  wrap to row  */
      >
        <div className="grid grid-cols-3 grid-rows-1">
          <Typography className="text-left">Asset</Typography>
          <Typography className="text-center">Volume</Typography>
          <Typography className="text-right">Prices</Typography>
        </div>
        {trendingAsset?.map((item, index) => (
          <div key={index} className="grid grid-cols-3 grid-rows-1">
            <div className="flex flex-row gap-3 justify-start">
              <Avatar src={item.asset_icon} />
              <div>
                <Typography>{item.asset_ticker}</Typography>
                <Typography>{item.asset_name}</Typography>
              </div>
            </div>
            <Typography className="text-center">{item.volume}</Typography>
            <Typography className="text-right">{item.asset_price}</Typography>
          </div>
        ))}
      </div>
    </>
  );
};

export default MostTraded;
