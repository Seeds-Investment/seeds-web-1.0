import DoughnutChart from '@/components/DoughnutChart';
import { XMarkIcon } from '@heroicons/react/24/outline';
import CardAssetSlider from './CardAssetSlider';

interface props {
  closePieModal: any;
  chartData: any;
  changeToAsset: any;
  selectedAsset: any[];
  changeSlider: any;
  sumAsset: number;
}

const PieMain: React.FC<props> = ({
  closePieModal,
  chartData,
  changeToAsset,
  selectedAsset,
  changeSlider,
  sumAsset
}) => {
  console.log(selectedAsset);

  return (
    <div>
      <div>
        <h1 className="font-bold text-xl text-black">Title</h1>
      </div>
      <button
        className="absolute top-5 right-5 text-gray-600 hover:text-gray-800 text-md"
        onClick={closePieModal}
      >
        <XMarkIcon className="cursor-pointer" width={30} height={30} />
      </button>

      <div className="flex items-center border-b border-gray-400 py-2 mb-5">
        <input
          type="text"
          className="ml-2 border-none outline-none"
          placeholder="Create your title Pie"
        />
      </div>

      <div className="w-[180px] h-[180px] mx-auto my-auto">
        <DoughnutChart
          data={chartData}
          centerText={'+' + sumAsset.toString() + '%'}
        />
      </div>
      <div>
        <h1 className="font-semibold text-md text-black">Amount</h1>
      </div>
      <div className="flex items-center border-b border-gray-400 py-2">
        <h1 className="font-bold text-sm items-start text-black">IDR</h1>
        <input
          type="number"
          className="ml-2 border-none outline-none text-xl font-bold"
        />
      </div>

      <div className="flex items-center py-2 justify-between">
        <h1 className="font-bold text-black">Assets</h1>
        <button
          onClick={changeToAsset}
          className="flex justify-center p-2 text-sm items-center rounded-full text-white font-semibold font-poppins h-fit bg-seeds-button-green"
        >
          Add Assets +
        </button>
      </div>

      <div>
        {selectedAsset.length !== 0
          ? selectedAsset.map((data, idx) => (
              <CardAssetSlider
                data={data}
                key={idx}
                changeSlider={changeSlider}
                index={idx}
              />
            ))
          : null}
      </div>

      <div className="flex items-center justify-center">
        <button className="text-white font-semibold font-poppins bg-seeds-button-green p-2 rounded-full mt-2 w-1/2">
          Save
        </button>
      </div>
    </div>
  );
};

export default PieMain;
