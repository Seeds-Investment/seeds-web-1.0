import { formatCurrency } from '@/utils/common/currency';
import { Typography } from '@material-tailwind/react';


interface EntranceFeeSectionProps {
  fee: number;
}

const EntranceFeeSection: React.FC<EntranceFeeSectionProps> = ({ fee }) => {
  return (
    <section className="flex flex-col gap-4">
      <Typography className="text-[20px] font-extrabold text-black">
        Quiz Prize
      </Typography>
      <div className="flex flex-row justify-between items-center gap-4 px-4 py-4 border-[1px] border-gray-400 rounded-xl shadow-md">
        <div className="flex flex-col justify-center ">
          <Typography className="text-[16px] font-semibold text-gray-500">
            Entrance Fee
          </Typography>
        </div>
        <div className="flex flex-col justify-center ">
          <Typography className="text-[16px] font-semibold text-black">
            {formatCurrency(fee,0)}
          </Typography>
        </div>
      </div>
    </section>
  );
};

export default EntranceFeeSection;
