import St from '@/assets/play/game-decentralize/quiz/1st-icon.svg';
import Nd from '@/assets/play/game-decentralize/quiz/2nd-icon.svg';
import Rd from '@/assets/play/game-decentralize/quiz/3rd-icon.svg';
import { formatCurrency } from '@/utils/common/currency';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { FaGift } from "react-icons/fa";


interface QuizPrizeSectionProps {
  prizes: number[];
}

const QuizPrizeSection: React.FC<QuizPrizeSectionProps> = ({ prizes }) => {
  return (
    <section className="flex flex-col gap-4">
      <Typography className="text-[20px] font-extrabold text-black">
        Quiz Prize
      </Typography>
      <div className="overflow-auto w-fit border border-gray-400 rounded-xl">
        <table className="w-fit table-auto">
          <tbody>
            {prizes.map((prize, index) => (
              <tr
                key={index}
                className="border-b border-gray-300 last:border-b-0"
              >
                <td className="px-4 py-3 font-bold flex items-center gap-2 border-r-[1px] border-gray-400">
                  {index === 0 && (
                    <Image src={St} alt="HeroIcon" className="w-[24px] " />
                  )}
                  {index === 1 && (
                    <Image src={Nd} alt="HeroIcon" className="w-[24px] " />
                  )}
                  {index === 2 && (
                    <Image src={Rd} alt="HeroIcon" className="w-[24px] " />
                  )}
                  {index > 2 && <FaGift size={20} className='m-[2px]'/>}
                  <span>{`${index + 1}${index === 0 ? 'st' : index === 1 ? 'nd' : index === 2 ? 'rd' : 'th'}`}</span>
                </td>
                <td className="px-4 py-3 text-right">{formatCurrency( prize,0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default QuizPrizeSection;
