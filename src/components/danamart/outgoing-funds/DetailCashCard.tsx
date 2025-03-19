import { Typography } from '@material-tailwind/react';

interface Props {
  data: {
    title: string;
    value: string;
    background: string;
    description: string;
  };
}

const DetailCashCard: React.FC<Props> = ({ data }) => {
  return (
    <div
      className={`w-full flex justify-start items-center h-fit md:h-[200px] rounded-lg shadow-md ${data.background}`}
    >
      <div className="flex flex-col gap-4 md:py-12 py-5 px-4">
        <div className="flex flex-col gap-2">
          <Typography className="font-poppins font-normal text-base text-seeds-button-green">
            {data.title}
          </Typography>
          <div className="flex flex-col gap-1">
            <Typography className="font-poppins font-semibold text-base text-[#262626]">
              {data.value}
            </Typography>
          </div>
          <Typography className="font-poppins font-normal text-[#7C7C7C] text-sm">
            {data.description}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default DetailCashCard;
