import { IoIosArrowUp } from 'react-icons/io';
const ALeaderBoardCard: React.FC = () => {
  return (
    <section className="flex flex-row justify-around mb-5 w-[20vw]">
      <section className="flex flex-col">
        <h1 className="text-[#262626] text-xl font-semibold self-center align-middle items-center">
          1
        </h1>
        <IoIosArrowUp className="text-[#3AC4A0]" />
      </section>
      <img src="/assets/leaderboard-play.png" className="w-10 h-10" alt="" />
      <section className="flex flex-col justify-around">
        <h1 className="text-xs font-semibold text-[#262626]">
          Cheyenne Ekstrom Bothman
        </h1>
        <section className="flex flex-row text-xs font-normal gap-2">
          <h1 className="text-[#262626]">Rp 3.575.000</h1>
          <img src="/assets/vector/chart-up.png" className="w-3 h-3" alt="" />
          <h1 className="text-[#3AC4A0]">(47%)</h1>
        </section>
      </section>
    </section>
  );
};

export default ALeaderBoardCard;
