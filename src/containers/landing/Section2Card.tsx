import s5photo from '@/assets/landing-page/s5-card-image.png';
import CCard from '@/components/CCard';
import type { IEventHighlightLandingPage } from '@/utils/interfaces/components.interfaces';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';

export default function Section2Card({
  data
}: {
  data: IEventHighlightLandingPage;
}): React.ReactElement {
  return (
    <div className="max-w-sm rounded overflow-hidden mr-5">
      <Image
        alt={data.name}
        src={s5photo}
        width={500}
        height={500}
        className="w-full"
      />
      <div
        className="px-5 py-1 text-xs font-semibold right-2 translate-x-[9rem] -translate-y-[8.5rem] bg-white w-fit text-seeds-button-green rounded-2xl
                    md:translate-x-[13rem] md:-translate-y-[11.5rem]
                    lg:translate-x-[8rem] lg:-translate-y-[8rem]
                    xl:translate-x-[13rem] xl:-translate-y-[12rem] xl:text-lg"
      >
        {data.status}
      </div>

      <div className="">
        <CCard className="-translate-y-[3rem] bg-transparent rounded-xl backdrop-blur-lg">
          <div className="items-center w-full text-white ml-5">
            <Typography className="font-semibold">{data.name}</Typography>
            <Typography className="font-normal">{data.date}</Typography>
          </div>
        </CCard>
      </div>
    </div>
  );
}
