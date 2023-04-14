import type { ILastNews } from '@/utils/interfaces/components.interfaces';
import Image from 'next/image';

export default function Section2Card({
  data
}: {
  data: ILastNews;
}): React.ReactElement {
  return (
    <div className="border rounded-2xl border-gray-300 px-3 h-[150px] flex items-center bg-white cursor-pointer hover:shadow-lg transition-all ">
      <div className="flex flex-col justify-between h-[100px] w-full">
        <div className="bg-seeds-purple mb-2 w-fit px-4 py-1 rounded-full text-white text-xs tracking-widest">
          {data.topic}
        </div>
        <div className="font-semibold tracking-wider max-w-[250px]">
          {data.title}
        </div>
        <div className="flex w-full tracking-widest items-center">
          <Image
            className="w-[25px] h-[25px] mr-3"
            alt={data.user.name}
            src={data.user.photo}
          />
          <span className="text-gray-500 mr-8 font-thin text-sm">
            {data.user.name}
          </span>
          <span className="text-gray-500 mr-8 font-thin text-sm">
            {`${Number(data.createdAt).toFixed()} hours ago`}
          </span>
        </div>
      </div>
      <Image
        className="rounded-lg ml-3 w-[100px] h-[100px]"
        alt={data.title}
        src={data.photo}
      />
    </div>
  );
}
