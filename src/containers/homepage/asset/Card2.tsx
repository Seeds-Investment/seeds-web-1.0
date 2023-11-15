import CCard from '@/components/CCard';

const Card2: React.FC = () => {
  return (
    <CCard className="flex w-2/3 p-2 md:mt-5 md:rounded-lg border-none rounded-none">
      <p className="text-sm text-center items-center text-[#262626]">
        Remaining Time :
      </p>
      <p className="text-sm font-semibold text-center items-center text-[#424242]">
        03d : 12h: 60m
      </p>
      <hr className="my-3" />
      <div className="flex flex-row">
        <div className="flex-col w-1/3 text-center items-center">
          <p className="text-base font-semibold text-black">IDR 500.00</p>
          <p className="text-base font-light text-[#7C7C7C]">Open</p>
        </div>
        <div className="flex-col w-1/3 text-center items-center">
          <p className="text-base font-semibold text-black">IDR 500.00</p>
          <p className="text-base font-light text-[#7C7C7C]">Day High</p>
        </div>
        <div className="flex-col w-1/3 text-center items-center">
          <p className="text-base font-semibold text-black">IDR 500.00</p>
          <p className="text-base font-light text-[#7C7C7C]">Day Low</p>
        </div>
      </div>
    </CCard>
  );
};

export default Card2;
