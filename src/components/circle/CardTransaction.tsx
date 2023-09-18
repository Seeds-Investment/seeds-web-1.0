import { ArrowUpCircleIcon } from '@heroicons/react/24/outline';
import { Card, Typography } from '@material-tailwind/react';

interface props {
  data: Transaction;
}

interface Transaction {
  id: string;
  circle_id: string;
  title: string;
  status: string;
  amount: number;
  timestamp: string;
}

const CardTransaction: React.FC<props> = ({ data }) => {
  return (
    <Card className="flex flex-row w-full p-4 rounded-none bg-[#F9F9F9]">
      <div className="w-1/2 flex flex-row items-center justify-start">
        <div>
          <ArrowUpCircleIcon className="w-7 h-7 text-[#27A590] mr-2" />
        </div>
        <div>
          <Typography className="text-sm text-left font-semibold text-[#262626]">
            {data.title}
          </Typography>
          <Typography className="text-xs text-left font-normal text-[#7C7C7C]">
            IDR {data.amount}
          </Typography>
          <Typography className="text-[12px] text-left italic text-[#BDBDBD]">
            ID: {data.circle_id}
          </Typography>
        </div>
      </div>
      <div className="w-1/2 items-center justify-center">
        <Typography className="text-xs text-end font-semibold mb-2 text-[#4DA81C]">
          {data.status}
        </Typography>
        <Typography className="text-xs text-end text-[#7C7C7C]">
          {data.timestamp}
        </Typography>
      </div>
    </Card>
  );
};

export default CardTransaction;
