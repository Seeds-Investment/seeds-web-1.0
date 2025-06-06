import { Typography } from '@material-tailwind/react';

interface Props {
  data: {
    textButton?: string;
    reverseBg?: boolean;
    icon: React.ReactNode;
    title: string;
    desc: string;
    value: string;
  };
}

const DashboardCard: React.FC<Props> = ({ data }) => {
  return (
    <div
      className={`w-full md:w-[292px] h-[184px] md:h-[200px] rounded-lg shadow-md ${
        data.reverseBg === true ? 'bg-gradient-to-tr' : 'bg-gradient-to-bl'
      } from-[#4FE6AF]/20 via-white to-[#5263F980]/20`}
    >
      <div className="flex flex-col gap-4 md:py-7 py-5 px-4">
        {data.textButton !== undefined ? (
          <button className="border border-[#3ac4a0] font-poppins font-semibold text-xs text-[#3ac4a0] hover:shadow-[0_0_5px_#3ac4a0] duration-150 cursor-pointer rounded-full py-1 px-4 flex items-center w-fit gap-1">
            {data.textButton}
            {data.icon}
          </button>
        ) : (
          <div className="flex justify-center items-center rounded-sm bg-gradient-to-b from-[#EDE3FE] to-[#FFFFFF] w-10 h-10">
            {data.icon}
          </div>
        )}
        <div className="flex flex-col gap-2">
          <Typography className="font-poppins font-normal text-base text-[#262626]">
            {data.title}
          </Typography>
          <div className="flex flex-col gap-1">
            <Typography className="font-poppins font-semibold text-base text-[#262626]">
              {data.value}
            </Typography>
            <Typography className="font-poppins font-normal text-sm text-[#7C7C7C] line-clamp-2">
              {data.desc}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
