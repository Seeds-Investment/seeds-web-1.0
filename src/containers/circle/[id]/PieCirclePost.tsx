'use client';
import CCard from '@/components/CCard';
import DoughnutChart from '@/components/DoughnutChart';
import {
  Bitcoin,
  Copy,
  Dogecoin,
  Ethereum,
  EyePurple
} from '@/constants/assets/icons';
import { Sprout } from '@/constants/assets/images';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
interface props {
  data: any;
}
const PieCirclePost: React.FC<props> = ({ data }): JSX.Element => {
  function formatDate(inputDateString: any): string {
    const date = new Date(inputDateString);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear().toString();

    return `${day}/${month}/${year}`;
  }

  const chartData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green'], // Adjust the labels array to match the length of the data array
    datasets: [
      {
        label: '',
        data: [10, 19, 32, 10],
        backgroundColor: ['red', 'blue', 'yellow', 'green'] // Adjust the backgroundColor array to match the length of the data array
      }
    ]
  };
  return (
    <CCard className="md:max-w-[530px] md:max-h-[285px] p-5 bg-[#F7FBFA]">
      <div className="flex gap-5 items-center">
        <Image
          src={data?.issuer_data.avatar}
          alt="avatar"
          width={48}
          height={48}
          className="outline outline-[#5E44FF] rounded-full"
        />
        <div>
          <div className="flex gap-2 w-full">
            <Typography className="text-black sm:text-xs md:text-lg">
              {data?.issuer_data.name}
            </Typography>
            <Image src={Sprout.src} alt={Sprout.alt} height={22} width={22} />
          </div>
          {/* <div className="flex items-center gap-2">
              <Typography>@ismael</Typography>
              <Image src={Dot.src} alt={Dot.alt} width={8} height={8} />
              <Typography>09/03/2023</Typography>
              <Image src={Dot.src} alt={Dot.alt} width={8} height={8} />
              <Typography>12.39 PM</Typography>
            </div> */}
        </div>
      </div>
      <div className="flex justify-between ">
        <div className="flex flex-col gap-3">
          <Typography className="mt-4  aspect-auto">Metaverse Receh</Typography>
          <div className="flex gap-1">
            <Image
              src={Ethereum.src}
              alt={Ethereum.alt}
              width={30}
              height={30}
            />
            <Image src={Bitcoin.src} alt={Bitcoin.alt} width={30} height={30} />
            <Image
              src={Dogecoin.src}
              alt={Dogecoin.alt}
              width={30}
              height={30}
            />
          </div>
          <Typography variant="paragraph" className="font-bold">
            Rp.63.100.120
          </Typography>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-[100px] lg:w-[130px] aspect-auto">
            <DoughnutChart data={chartData} centerText="+43%" />
          </div>
          <div className="flex justify-end">
            <div className="bg-[#5E44FF] flex gap-1 justify-center items-center w-fit aspect-auto rounded-full p-2 ">
              <Image src={Copy.src} alt={Copy.alt} width={20} height={20} />
              <Typography className="text-white hidden md:flex">
                Copy Pie
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-2 w-full">
        <div className="flex gap-1 md:gap-3 items-center w-1/2">
          <Image
            src={EyePurple.src}
            alt={EyePurple.alt}
            height={25}
            width={25}
            className="aspect-auto"
          />
          <Typography className="text-sm">{data.privacy}</Typography>
        </div>
        <div>
          <Typography className="font-light text-sm text-gray-400">
            {formatDate(data.created_at)},19.05.50 WIB
          </Typography>
        </div>
      </div>
    </CCard>
  );
};

export default PieCirclePost;
