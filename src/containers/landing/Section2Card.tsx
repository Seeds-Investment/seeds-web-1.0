import CCard from '@/components/CCard';
import type { IEventHighlightLandingPage } from '@/utils/interfaces/components.interfaces';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import Link from 'next/link';

export default function Section2Card({
  data
}: {
  data: IEventHighlightLandingPage;
}): React.ReactElement {
  return (
    <div className="relative max-w-s overflow-hidden mr-5">
      <Link href={'/temporary'}>
        <Image
          alt={data.name}
          src={data.image}
          className="w-full rounded-3xl"
          width={500}
          height={500}
        />
      </Link>
      {/* <div className="absolute top-2 right-2 px-3 py-1 text-xs font-semibold bg-white text-seeds-button-green rounded-full">
        {data.status}
      </div> */}

      <div className="mt-8">
        <CCard className="-translate-y-[5rem] bg-transparent rounded-xl py-2 backdrop-blur-lg">
          <div className="items-center w-full text-white ml-5">
            <Typography className="font-semibold">{data.name}</Typography>
            <Typography className="font-normal">{data.date}</Typography>
          </div>
        </CCard>
      </div>
    </div>
  );
}
