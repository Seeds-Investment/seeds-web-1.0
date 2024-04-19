import { calculatePercentageDifference } from '@/helpers/currency';
import { getDetailAsset } from '@/repository/asset.repository';
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';
import {
  Avatar,
  Card,
  CardBody,
  Checkbox,
  Typography
} from '@material-tailwind/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
interface props {
  id: string;
  userInfo: any;
  handleSelectedAsset?: any;
  isDefaultChecked?: any;
  isClick?: boolean;
  playId?: string;
}

const AssetPortfolioCard: React.FC<props> = ({
  id,
  handleSelectedAsset,
  userInfo,
  isDefaultChecked,
  isClick = false,
  playId
}) => {
  const [data, setData] = useState<any>();

  const router = useRouter();
  const handleArrow = (value: number): boolean => {
    if (value > 0) {
      return true;
    } else {
      return false;
    }
  };
  const [params] = useState({
    tf: 'daily'
  });

  const fetchDetailAsset = async (currency: string): Promise<void> => {
    try {
      if (typeof id === 'string') {
        const response = await getDetailAsset(id, { ...params, currency });
        setData(response.marketAsset);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id !== null && userInfo !== undefined) {
      void fetchDetailAsset(userInfo.preferredCurrency);
    }
  }, [id, userInfo]);

  return (
    <Card
      shadow={false}
      className={`w-full my-3 bg-[#F9F9F9] ${isClick ? 'cursor-pointer' : ''}`}
      onClick={
        isClick
          ? () => {
              router
                .push(
                  `${
                    playId !== undefined
                      ? `/homepage/assets/${
                          data?.id as string
                        }?playId=${playId}`
                      : `/homepage/assets/${data?.id as string}`
                  }`
                )
                .catch(error => {
                  console.log(error);
                });
            }
          : () => {}
      }
    >
      <CardBody className="p-3 inline-block h-auto">
        <div className="flex flex-row items-center">
          <Avatar size="md" variant="circular" src={data?.logo} alt="logo" />

          <div className="flex ml-5 w-1/2 flex-col gap-0.5">
            <div className="flex flex-row">
              <Typography className="font-semibold text-base text-[#262626]">
                {data?.realTicker} /
              </Typography>
              <Typography className="font-normal ml-1 text-base text-[#262626]">
                {data?.assetType === 'CRYPTO' && 'B'}
                {userInfo?.preferredCurrency}
              </Typography>
            </div>
            <Typography className="font-normal text-sm text-[#7C7C7C]">
              {data?.name}
            </Typography>
          </div>

          <div className="ml-auto flex flex-col gap-0.5">
            <div className="flex justify-end">
              <Typography className="font-semibold text-sm text-[#262626]">
                {userInfo?.preferredCurrency}{' '}
                {new Intl.NumberFormat().format(data?.lastPrice?.open)}
              </Typography>
            </div>
            <div className="flex justify-end">
              <Typography
                className={`flex font-normal text-sm ${
                  handleArrow(
                    calculatePercentageDifference(
                      data?.lastPrice?.open,
                      data?.lastPrice?.close
                    )?.value
                  )
                    ? 'text-[#3AC4A0]'
                    : 'text-red-500'
                }`}
              >
                {handleArrow(
                  calculatePercentageDifference(
                    data?.lastPrice?.open,
                    data?.lastPrice?.close
                  )?.value
                ) ? (
                  <ArrowTrendingUpIcon
                    height={20}
                    width={20}
                    className="mr-2"
                  />
                ) : (
                  <ArrowTrendingDownIcon
                    height={20}
                    width={20}
                    className="mr-2"
                  />
                )}
                (
                {
                  calculatePercentageDifference(
                    data?.lastPrice?.open,
                    data?.lastPrice?.close
                  )?.value
                }{' '}
                %)
              </Typography>
            </div>
          </div>
          {handleSelectedAsset !== undefined ? (
            <div>
              <Checkbox
                className="border-[#3AC4A0]"
                color="green"
                value={JSON.stringify(data)}
                onClick={handleSelectedAsset}
                defaultChecked={isDefaultChecked(data)}
              />
            </div>
          ) : null}
        </div>
      </CardBody>
    </Card>
  );
};

export default AssetPortfolioCard;
