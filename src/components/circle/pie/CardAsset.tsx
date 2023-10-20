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
import React from 'react';

interface AssetInterface {
  id: string;
  quote: string;
  currency: string;
  image: string;
  name: string;
  price: number;
  regularPercentage: number;
}

interface props {
  data: AssetInterface;
  handleSelectedAsset: any;
  isDefaultChecked: any;
}

const CardAsset: React.FC<props> = ({
  data,
  handleSelectedAsset,
  isDefaultChecked
}) => {
  const handleArrow = (value: number): boolean => {
    if (value > 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Card shadow={false} className="w-full my-3 bg-[#F9F9F9]">
      <CardBody className="p-3 inline-block h-auto">
        <div className="flex flex-row items-center">
          <Avatar
            size="md"
            variant="circular"
            src={data.image}
            alt="tania andrew"
          />

          <div className="flex ml-5 w-1/2 flex-col gap-0.5">
            <Typography className="font-semibold text-base text-[#262626]">
              {data.quote} / {data.currency}
            </Typography>
            <Typography className="font-normal text-sm text-[#7C7C7C]">
              {data.name}
            </Typography>
          </div>

          <div className="ml-auto flex flex-col gap-0.5">
            <Typography className="font-semibold text-base text-[#262626]">
              Rp {new Intl.NumberFormat().format(data.price)}
            </Typography>
            <Typography
              className={`flex font-normal text-sm ${
                handleArrow(data.regularPercentage)
                  ? 'text-[#3AC4A0]'
                  : 'text-red-500'
              }`}
            >
              {handleArrow(data.regularPercentage) ? (
                <ArrowTrendingUpIcon height={20} width={20} className="mr-2" />
              ) : (
                <ArrowTrendingDownIcon
                  height={20}
                  width={20}
                  className="mr-2"
                />
              )}
              {data.regularPercentage.toString().substring(0, 4)}
            </Typography>
          </div>
          <div>
            <Checkbox
              className="border-[#3AC4A0]"
              color="green"
              value={JSON.stringify(data)}
              onClick={handleSelectedAsset}
              defaultChecked={isDefaultChecked(data)}
            />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default CardAsset;
