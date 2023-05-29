import icon from '@/assets/landing-page/s4-card-icon.png';
import type { ICompetitionItem } from '@/utils/interfaces/components.interfaces';
import Image from 'next/image';

export default function Section4Card({
  data
}: {
  data: ICompetitionItem;
}): React.ReactElement {
  return (
    <div className="border rounded-xl border-gray-100 w-[200px] flex flex-col items-start bg-white cursor-pointer hover:shadow-lg transition-all relative bg-opacity-70">
      <Image alt={data.title} src={data.photo} className="w-full rounded-xl" />
      <div className="p-2">
        <div className="text-sm my-2 font-medium">{data.title}</div>
        <div className="flex items-center text-sm text-gray-400">
          <Image src={icon} alt="user" className="w-[15px] h-[15px] mr-2" />
          {data.status}
        </div>
      </div>
    </div>
  );
}
