import CCard from '@/components/CCard';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { Avatar } from '@material-tailwind/react';
import Image from 'next/image';
import { Sprout } from 'public/assets/images';

const Card2: React.FC = () => {
  return (
    <CCard className="flex p-8 md:mt-5 md:rounded-lg border-none rounded-none md:mx-7 lg:mx-12">
      <div className="flex flex-row">
        <Avatar
          size="md"
          variant="circular"
          src="https://picsum.photos/seed/picsum/200/300"
          alt="Avatar"
          className="mr-5"
        />
        <div className="flex flex-col w-full">
          <div className="flex flex-row">
            <p className="text-base font-semibold text-black">Anika Curtis</p>
            <CheckCircleIcon
              width={20}
              height={20}
              color="#5E44FF"
              className="mx-2"
            />
            <Image src={Sprout.src} alt={Sprout.alt} width={20} height={20} />
            <p className="font-normal text-sm bg-[#DCFCE4] text-[#1A857D] rounded-2xl px-3 py-1 ml-2">
              Investor
            </p>
          </div>
          <p className="text-base font-light text-[#7C7C7C] mb-3">@anika</p>

          <div className="border border-[#7C7C7C] rounded-2xl w-full p-4">
            <p>What do you want to discuss? </p>
            <p>Start a post</p>
          </div>
        </div>
      </div>
    </CCard>
  );
};

export default Card2;
