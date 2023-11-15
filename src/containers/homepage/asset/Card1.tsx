import CCard from '@/components/CCard';
import { Avatar } from '@material-tailwind/react';
import { StarIcon } from 'public/assets/vector';

interface props {
  data: any;
  isLoading: boolean;
}

const Card1: React.FC<props> = ({ data, isLoading }) => {
  return (
    <CCard className="flex w-1/3 p-2 md:mt-5 md:rounded-lg border-none rounded-none">
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
            <p className="text-base font-light text-[#7C7C7C] mb-3 font-poppins">
              {data?.name}
            </p>
          </div>
        </div>
        <div>
          <StarIcon className="w-5 h-5" />
        </div>
      </div>
      <p className="text-2xl font-semibold text-black my-2">
        IDR {data?.lastPrice.open}
      </p>
      <p className="text-sm font-normal text-[#5E44FF]">
        +123,13 (4,94%) - today
      </p>
    </CCard>
  );
};

export default Card1;
