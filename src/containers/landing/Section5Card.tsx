import currency from '@/assets/landing-page/currency.png';
import gift from '@/assets/landing-page/gift.png';
import time from '@/assets/landing-page/time.png';
import users from '@/assets/landing-page/users.png';
import type { ICompetitionItem } from '@/utils/interfaces/components.interfaces';
import { Button, Typography } from '@material-tailwind/react';
import moment from 'moment';
import Image from 'next/image';

export default function Section5Card({
  data
}: {
  data: ICompetitionItem;
}): React.ReactElement {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg mr-5">
      <Image alt={data.title} src={data.photo} className="w-full" />
      <div className="absolute w-full p-3 z-20">
        <div
          className="px-2 py-1 text-xs font-semibold right-2 translate-x-[1.7rem] -translate-y-[7.5rem] bg-seeds-green-2 w-fit text-seeds-button-green rounded-md
                      md:translate-x-[7.6rem] md:-translate-y-[11.5rem]
                      lg:translate-x-[2.6rem] lg:-translate-y-[8.4rem]
                      xl:translate-x-[8.5rem] xl:-translate-y-[12rem]"
        >
          <div className="flex flex-row">
            <span className="">
              <Image src={gift} alt="user" className="w-[17px] h-[17px]" />
            </span>
            <span className="text-xs font-semibold ml-2">
              {`IDR 10.000.000`}
            </span>
          </div>
        </div>
      </div>
      <div className="px-6 py-4">
        <Typography className="font-bold text-base md:text-lg lg:text-xl mb-2">
          {data.title}
        </Typography>

        <div className="flex flex-row mb-2">
          <span className="">
            <Image src={users} alt="user" className="w-[17px] h-[17px] mr-2" />
          </span>
          <span className="text-xs font-semibold ml-2 mb-2">
            {`${data.participant.total}/${data.participant.total} Participants`}
          </span>
        </div>

        <div className="flex flex-row mb-2">
          <span className="">
            <Image src={time} alt="user" className="w-[17px] h-[17px] mr-2" />
          </span>
          <span className="text-xs font-semibold ml-2 mb-2">
            {moment(data.deadline).format('DD MMMM YYYY')}
          </span>
        </div>

        <div className="flex flex-row mb-2">
          <span className="">
            <Image
              src={currency}
              alt="user"
              className="w-[17px] h-[17px] mr-2"
            />
          </span>
          <span className="text-xs font-semibold ml-2 mb-2">{data.status}</span>
        </div>
      </div>
      <div className="px-6 pt-4 pb-2">
        <Button className="w-full bg-seeds-button-green mt-3 capitalize">
          Get A Ticket
        </Button>
      </div>
    </div>
  );

  // return (
  //   <div className="border rounded-2xl border-gray-300 w-[300px] flex flex-col items-start bg-white cursor-pointer hover:shadow-lg transition-all relative p-4 bg-opacity-70">
  //     <Image alt={data.title} src={data.photo} className="w-full" />
  //     <div className="absolute w-full flex justify-end p-3">
  //       <div className="flex justify-end px-2 py-1 bg-seeds-green-2 w-fit text-sm text-seeds-button-green rounded-md mr-8">
  //         {`IDR ${formatCurrency(data.gift)}`}
  //       </div>
  //     </div>
  //     <div className="text-lg font-medium mt-2">{data.title}</div>

  //     <table>
  //       <tbody>
  //         <tr>
  //           <td className="w-[40px]">
  //             <Image
  //               src={users}
  //               alt="user"
  //               className="w-[20px] h-[20px] mr-2"
  //             />
  //           </td>
  //           <td className="h-[30px] tracking-widest my-2 font-thin text-sm">
  //             {`${data.participant.total}/${data.participant.total} Participants`}
  //           </td>
  //         </tr>

  //         <tr>
  //           <td className=" w-[40px]">
  //             <Image src={time} alt="user" className="w-[20px] h-[20px] mr-2" />
  //           </td>
  //           <td className="h-[30px] tracking-widest my-2 font-thin text-sm">
  //             {moment(data.deadline).format('DD MMMM YYYY')}
  //           </td>
  //         </tr>

  //         <tr>
  //           <td className="w-[40px]">
  //             <Image
  //               src={currency}
  //               alt="user"
  //               className="w-[12px] h-[20px] ml-1"
  //             />
  //           </td>
  //           <td className="h-[30px] tracking-widest my-2 font-thin text-sm capitalize ">
  //             {data.status}
  //           </td>
  //         </tr>
  //       </tbody>
  //     </table>
  //     <Button className="w-full bg-seeds-button-green mt-3 capitalize">
  //       Get A Ticket
  //     </Button>
  //   </div>
  // );
}
