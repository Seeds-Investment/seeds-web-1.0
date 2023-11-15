import CCard from '@/components/CCard';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import { standartCurrency } from '@/helpers/currency';
import { getAssetById } from '@/repository/asset.repository';
import { StarIcon } from '@heroicons/react/24/outline';
import { Avatar, Typography } from '@material-tailwind/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const AssetDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>();

  console.log(isLoading);

  const fetchDetailAsset = async (): Promise<void> => {
    try {
      if (typeof id === 'string') {
        setIsLoading(true);
        const response = await getAssetById(id);
        setData(response.marketAsset);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchDetailAsset();
  }, [id]);

  return (
    <PageGradient defaultGradient className="w-full">
      <div className="flex flex-col md:flex-row gap-5">
        <CCard className="flex w-full md:w-1/3 p-4 md:mt-5 md:rounded-lg border-none rounded-none">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row">
              <Avatar
                size="md"
                variant="circular"
                src={data?.logo}
                alt="Avatar"
                className="mr-5"
              />
              <div className="flex flex-col w-full">
                <div className="flex flex-row gap-2">
                  <p className="text-base font-semibold font-poppins text-black">
                    {data?.realTicker} / {data?.exchangeCurrency}
                  </p>
                </div>
                <p className="text-lg font-normal text-black mb-3 font-poppins">
                  {data?.name}
                </p>
              </div>
            </div>
            <div>
              <StarIcon className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-black my-2">
            {standartCurrency(data?.lastPrice.open)}
          </p>
          <p className="text-sm font-normal text-[#5E44FF]">
            +123,13 (4,94%) - today
          </p>
        </CCard>
        <CCard className="flex w-full md:w-2/3 p-2 md:mt-5 md:rounded-lg border-none rounded-none">
          <p className="text-sm text-center items-center text-[#262626]">
            Remaining Time :
          </p>
          <p className="text-sm font-semibold text-center items-center text-[#424242]">
            03d : 12h: 60m
          </p>
          <hr className="my-3" />
          <div className="flex flex-row">
            <div className="flex-col w-1/3 text-center items-center">
              <p className="text-base font-semibold text-black">
                {standartCurrency(data?.lastPrice.open)}
              </p>
              <p className="text-base font-light text-[#7C7C7C]">Open</p>
            </div>
            <div className="flex-col w-1/3 text-center items-center">
              <p className="text-base font-semibold text-black">
                {standartCurrency(data?.lastPrice.high)}
              </p>
              <p className="text-base font-light text-[#7C7C7C]">Day High</p>
            </div>
            <div className="flex-col w-1/3 text-center items-center">
              <p className="text-base font-semibold text-black">
                {standartCurrency(data?.lastPrice.low)}
              </p>
              <p className="text-base font-light text-[#7C7C7C]">Day Low</p>
            </div>
          </div>
        </CCard>
      </div>
      <CCard className="flex p-2 mt-5 md:rounded-lg border-none rounded-none">
        <Typography className="text-center text-black text-2xl font-bold">
          Detail Asset
        </Typography>
      </CCard>
    </PageGradient>
  );
};

export default AssetDetailPage;
