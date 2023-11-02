import {
  ClockIcon,
  CurrencyDollarIcon,
  ShareIcon,
  UsersIcon
} from '@heroicons/react/24/outline';
import { Button, Card, Typography } from '@material-tailwind/react';
import Image from 'next/image';

interface props {
  data: any;
}

const CardPlay: React.FC<props> = ({ data }) => {
  function getFormattedDate(day: string): string {
    const today = new Date(day);
    const date = String(today.getDate()).padStart(2, '0');
    const monthIndex = today.getMonth();
    const year = String(today.getFullYear());

    const monthNames = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember'
    ];
    const month = monthNames[monthIndex];

    return date + ' ' + month + ' ' + year;
  }

  return (
    <div className="flex flex-row w-full">
      <div className="w-[10%] p-4">Aug</div>
      <Card shadow={false} className="w-[90%] my-3 border border-[#E9E9E9]">
        <Image
          width={100}
          height={100}
          sizes="100vw"
          src={
            data.banner !== undefined
              ? data.banner
              : 'https://dev-assets.seeds.finance/storage/cloud/4868a60b-90e3-4b81-b553-084ad85b1893.png'
          }
          alt="Deskripsi gambar"
          className="w-full h-auto"
          style={{ maxHeight: '200px' }}
        />
        <div className="p-4">
          <div className="flex flex-row justify-between">
            <Typography className="font-semibold text-xs text-black">
              {data.name}
            </Typography>
            <Typography className="text-[#553BB8] text-[10px] bg-[#F7F7F7] py-1 px-2">
              {data.type}
            </Typography>
          </div>
          <Typography className="text-[#BDBDBD] font-normal text-xs">
            {getFormattedDate(data.open_registration_time)}
          </Typography>
          <div className="bg-[#F7F7F7] rounded-lg mt-1 flex flex-row w-full">
            <div className="flex flex-row items-center py-2 px-1 w-1/3">
              <ClockIcon
                width={20}
                height={20}
                className="mr-2 text-[#3AC4A0]"
              />
              <div className="flex-col">
                <Typography className="text-xs font-normal">
                  Duration
                </Typography>
                <Typography className="text-xs text-black font-semibold">
                  19 Hari
                </Typography>
              </div>
            </div>
            {/* <div className="border-l border-r border-gray-400 h-6"></div> */}
            <div className="flex flex-row items-center p-1 w-1/3">
              <UsersIcon
                width={20}
                height={20}
                className="mr-2 text-[#3AC4A0]"
              />
              <div className="flex-col">
                <Typography className="text-xs font-normal">Joined</Typography>
                <Typography className="text-xs text-black font-semibold">
                  20 Players
                </Typography>
              </div>
            </div>
            {/* <div className="border-l border-r border-gray-400 h-6"></div> */}
            <div className="flex flex-row items-center p-1 w-1/3">
              <CurrencyDollarIcon
                width={20}
                height={20}
                className="mr-2 text-[#3AC4A0]"
              />
              <div className="flex-col">
                <Typography className="text-xs font-normal">Fee</Typography>
                <Typography className="text-xs text-black font-semibold">
                  IDR. {data.admission_fee}
                </Typography>
              </div>
            </div>
          </div>
          <hr className="border-dashed text-black my-2" />
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center">
              <Typography className="text-[#27A590] text-[10px] bg-[#DCFCE4] py-1 px-2">
                {data.category}
              </Typography>
              <div className="flex flex-row mx-2">
                <ShareIcon
                  width={20}
                  height={20}
                  className="mr-2 text-[#3AC4A0] bg-[#DCFCE4] p-1 rounded-full"
                />
                <Typography className="text-black text-xs">Share</Typography>
              </div>
            </div>

            <Button className="bg-[#3AC4A0] font-semibold rounded-2xl text-xs py-1 px-4">
              Open
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CardPlay;
