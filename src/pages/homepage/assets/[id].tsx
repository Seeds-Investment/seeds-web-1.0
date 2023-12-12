import CCard from '@/components/CCard';
import LineChart from '@/components/LineChart';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import Card1 from '@/containers/homepage/asset/Card1';
import Card2 from '@/containers/homepage/asset/Card2';
import useLineChart from '@/hooks/useLineChart';
import { getDetailAsset } from '@/repository/asset.repository';
import { Button, Tab, Tabs, TabsHeader } from '@material-tailwind/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const dataTab = [
  { label: '1d', value: 'daily' },
  { label: '1w', value: 'weekly' },
  { label: '1m', value: 'monthly' },
  { label: '1y', value: 'yearly' },
  { label: 'All', value: 'alltime' }
];

const AssetDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { playId } = router.query;
  const [data, setData] = useState<any>();
  const [params, setParams] = useState({
    tf: 'daily',
    currency: 'IDR'
  });
  const { chartItem } = useLineChart(data, params.tf);

  const handleChangeParams = (value: string): void => {
    setParams(prevState => ({
      ...prevState,
      tf: value
    }));
  };

  const fetchDetailAsset = async (): Promise<void> => {
    try {
      if (typeof id === 'string') {
        const response = await getDetailAsset(id, params);
        setData(response.marketAsset);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id !== null) {
      void fetchDetailAsset();
    }
  }, [id, params]);

  return (
    <PageGradient defaultGradient className="w-full">
      <div className="flex flex-col md:flex-row gap-5">
        <Card1 data={data} />
        <Card2 data={data} />
      </div>

      <CCard className="flex p-2 mt-5 md:rounded-lg border-none rounded-none">
        <div className="h-[35rem] mb-5">
          <LineChart data={chartItem} />
        </div>

        <Tabs value={'daily'}>
          <TabsHeader
            className="bg-transparent rounded-xl"
            indicatorProps={{
              className: 'bg-gray-900/10 rounded-xl shadow-none !text-gray-900'
            }}
          >
            {dataTab.map(({ label, value }) => (
              <Tab
                key={value}
                value={value}
                onClick={() => {
                  handleChangeParams(value);
                }}
                className={`${
                  params.tf === value
                    ? 'bg-[#3AC4A0] text-white rounded-xl'
                    : 'bg-[#F9F9F9] text-[#7C7C7C]'
                } text-base z-0 py-2 font-semibold`}
              >
                {label}
              </Tab>
            ))}
          </TabsHeader>
        </Tabs>
      </CCard>
      {playId !== undefined && (
        <CCard className="flex p-2 mt-5 md:rounded-lg border-none rounded-none">
          <div className="flex justify-between gap-2">
            <Button
              variant="outlined"
              className="normal-case border rounded-full w-full py-2 border-[#3AC4A0] text-[#3AC4A0] font-poppins"
              onClick={() => {
                router
                  .push(
                    `/homepage/order/${id as string}?transaction=sell&playId=${
                      playId as string
                    }`
                  )
                  .catch(err => {
                    console.log(err);
                  });
              }}
            >
              Sell
            </Button>
            <Button
              variant="filled"
              className="normal-case rounded-full w-full py-2 bg-[#3AC4A0] text-white font-poppins"
              onClick={() => {
                router
                  .push(
                    `/homepage/order/${id as string}?transaction=buy&playId=${
                      playId as string
                    }`
                  )
                  .catch(err => {
                    console.log(err);
                  });
              }}
            >
              Buy
            </Button>
          </div>
        </CCard>
      )}
    </PageGradient>
  );
};

export default AssetDetailPage;
