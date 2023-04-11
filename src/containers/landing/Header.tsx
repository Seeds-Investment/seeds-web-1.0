import flagId from '@/assets/flag-id.png';
import flagUs from '@/assets/flag-us.png';
import seeds from '@/assets/logo-seeds.png';
import { Button } from '@material-tailwind/react';
import Image from 'next/image';
import { useState } from 'react';
export default function Header(): React.ReactElement {
  const [active, setActive] = useState<string>('id');
  const isId = active === 'id';
  return (
    <div className="absolute top-[20px] flex items-center w-full justify-between px-20 z-20">
      <Image alt="img" className="" src={seeds} />
      <div className="flex justify-between w-[350px]">
        <div className="flex items-center w-[200px] justify-between">
          <div
            className={`${
              isId && 'border border-seeds-purple'
            } flex w-[80px] text-sm items-center bg-gray-300 rounded-full p-2 justify-center cursor-pointer hover:shadow-lg transition-all`}
          >
            ID
            <Image className="ml-1 w-[20px]" src={flagId} alt="id" />
          </div>
          <div className="px-3 text-center font-light ml-2">|</div>
          <div
            className={`${
              !isId && 'border border-seeds-purple'
            } flex w-[80px] text-sm items-center bg-gray-300 rounded-full p-2 justify-center ml-2 cursor-pointer hover:shadow-lg transition-all`}
          >
            EN
            <Image className="ml-1 w-[20px]" src={flagUs} alt="en" />
          </div>
        </div>
        <Button className="capitalize text-md font-normal bg-seeds-button-green rounded-full w-[110px]">
          Join Us
        </Button>
      </div>
    </div>
  );
}
