import currency from '@/assets/landing-page/currency.png';
import time from '@/assets/landing-page/time.png';
import users from '@/assets/landing-page/users.png';
import { formatCurrency } from '@/utils/common/currency';
import { ICompetitionItem } from '@/utils/interfaces/components.interfaces';
import { Button } from '@material-tailwind/react';
import moment from 'moment';
import Image from 'next/image';

export default function Section5Card({
  data
}: {
  data: ICompetitionItem;
}): React.ReactElement {
  return (
    <div className="border rounded-2xl border-gray-300 w-[300px] flex flex-col items-start bg-white cursor-pointer hover:shadow-lg transition-all relative p-4 bg-opacity-70">
      <Image alt={data.title} src={data.photo} className="w-full" />
      <div className="absolute w-full flex justify-end p-3">
        <div className="flex justify-end px-2 py-1 bg-seeds-green-2 w-fit text-sm text-seeds-button-green rounded-md mr-8">
          {`IDR ${formatCurrency(data.gift)}`}
        </div>
      </div>
      <div className="text-lg font-semibold mt-2">{data.title}</div>

      <table>
        <tr>
          <td className="w-[40px]">
            <Image src={users} alt="user" className="w-[20px] h-[20px] mr-2" />
          </td>
          <td className="h-[30px] tracking-widest my-2 font-thin text-sm">
            {`${data.participant.total}/${data.participant.total} Participants`}
          </td>
        </tr>

        <tr>
          <td className=" w-[40px]">
            <Image src={time} alt="user" className="w-[20px] h-[20px] mr-2" />
          </td>
          <td className="h-[30px] tracking-widest my-2 font-thin text-sm">
            {moment(data.deadline).format('DD MMMM YYYY')}
          </td>
        </tr>

        <tr>
          <td className="w-[40px]">
            <Image
              src={currency}
              alt="user"
              className="w-[12px] h-[20px] ml-1"
            />
          </td>
          <td className="h-[30px] tracking-widest my-2 font-thin text-sm capitalize ">
            {data.status}
          </td>
        </tr>
      </table>
      <Button className="w-full bg-seeds-button-green mt-3 capitalize">
        Get A Ticket
      </Button>
    </div>
  );
}
