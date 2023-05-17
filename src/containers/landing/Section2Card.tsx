import card1 from '@/assets/landing-page/s2-card-1.png';
import user1 from '@/assets/landing-page/user-sample.png';
import type { INewsExternal } from '@/utils/interfaces/data.interfaces';
import moment from 'moment';
import Image from 'next/image';

export default function Section2Card({
  data
}: {
  data: INewsExternal;
}): React.ReactElement {
  return (
    <div className="border rounded-2xl border-gray-300 px-3 h-[150px] flex items-center bg-white cursor-pointer hover:shadow-lg transition-all ">
      <div className="flex flex-col justify-between h-[100px] w-full">
        <div className="bg-seeds-purple mb-2 w-fit px-4 py-1 rounded-full text-white text-xs tracking-widest">
          {data.source.name}
        </div>
        <div className="font-semibold tracking-wider max-w-[250px] text-ellipsis overflow-hidden">
          {data.title}
        </div>
        <div className="flex w-full tracking-widest items-center pt-4">
          <Image
            className="w-[25px] h-[25px] mr-3"
            alt={data.author ?? ''}
            src={user1}
          />
          <span className="text-gray-500 mr-8 font-thin text-sm">
            {data.author}
          </span>
          <span className="text-gray-500 mr-8 font-thin text-sm">
            {`${moment(data.publishedAt).format('DD-MM-YYYY')}`}
            {/* {`${Number(data.publishedAt).toFixed()} hours ago`} */}
          </span>
        </div>
      </div>
      {Boolean(data.urlToImage) && (
        <Image
          width={50}
          height={50}
          className="rounded-lg ml-3 w-[100px] h-[100px]"
          alt={data.title}
          src={data.urlToImage ?? card1}
        />
      )}
    </div>
  );
}
