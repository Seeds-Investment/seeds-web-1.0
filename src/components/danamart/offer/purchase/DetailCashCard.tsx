import { Typography } from '@material-tailwind/react';

interface Props {
  data: {
    icon: React.ReactNode;
    title: string;
    value: string;
    background: string;
  };
}

const DetailCashCard: React.FC<Props> = ({ data }) => {
  return (
    <div
      className={`w-full h-fit rounded-lg shadow-md ${data.background}`}
    >
      <div className="flex flex-col gap-4 md:py-7 py-5 px-4">
        <div className="flex justify-center items-center rounded-full shrink-0 bg-gradient-to-b from-[#EDE3FE] to-[#FFFFFF] w-10 h-10">
          {data.icon}
        </div>
        <div className="flex flex-col gap-2">
          <Typography className="font-poppins font-normal text-base text-seeds-button-green">
            {data.title}
          </Typography>
          <div className="flex flex-col gap-1">
            <Typography className="font-poppins font-semibold text-base text-[#262626]">
              {data.value}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailCashCard;
