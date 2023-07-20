const AssetsCard: React.FC = () => {
  return (
    <section className="bg-[#F9F9F9] rounded-xl p-3 h-auto w-[343px] gap-[10px] flex flex-row justify-between">
      <section className="flex flex-row gap-4">
        <img
          src="/assets/ether.png"
          className="w-10 h-10 self-center align-middle items-center"
          alt=""
        />
        <section className="flex flex-col justify-between">
          <h1 className="text-xs font-normal">
            {' '}
            <span className="text-sm font-semibold">ETH /</span> BIDR
          </h1>
          <p className="text-[#7C7C7C] text-xs font-normal">Ethereum</p>
        </section>
      </section>
      <section className="flex flex-col justify-between">
        <h1 className="text-sm font-semibold">Rp 3.575.000</h1>
        <span className="text-xs flex flex-row justify-end font-normal text-[#3AC4A0]">
          {' '}
          <img
            src="/assets/vector/chart-up.png"
            className="w-3 h-3 mr-1"
            alt=""
          />
          (47%)
        </span>
      </section>
    </section>
  );
};

export default AssetsCard;
