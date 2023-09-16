import { Ethereum } from '@/constants/assets/icons';
import { Switch } from '@headlessui/react';
import Image from 'next/image';
import { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

const PieModal = ({ closePieModal }: any): any => {
  const [cardCount, setCardCount] = useState<number[]>([]);
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [isOn, setIsOn] = useState<boolean>(false);

  const handleSliderChange = (value: number): any => {
    setSliderValue(value);
  };

  const chartData: any = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Grey'], // Adjust the labels array to match the length of the data array
    datasets: [
      {
        label: '',
        data: [20, 20, 20, 20, 20],
        backgroundColor: ['red', 'blue', 'yellow', 'green', 'grey'] // Adjust the backgroundColor array to match the length of the data array
      }
    ]
  };

  const options = {
    plugins: {
      legend: {
        display: false
      }
    },
    cutout: '50%',
    elements: {
      arc: {
        borderWidth: 5,
        borderRadius: 10
      }
    }
  };
  const centerText = '0%';

  const textCenter = {
    id: 'textCenter',
    beforeDatasetsDraw(chart: any, args: any, pluginOptions: any) {
      const { ctx } = chart;
      ctx.save();
      ctx.font = 'bold 20px Arial';
      ctx.fillStyle = '#69FFC9';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(
        centerText,
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y
      );
    }
  };

  const addCard: any = () => {
    setCardCount([...cardCount, 0]);
  };

  const calendar: any = (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.3802 3.33203H4.71354C3.79307 3.33203 3.04688 4.07822 3.04688 4.9987V16.6654C3.04688 17.5858 3.79307 18.332 4.71354 18.332H16.3802C17.3007 18.332 18.0469 17.5858 18.0469 16.6654V4.9987C18.0469 4.07822 17.3007 3.33203 16.3802 3.33203Z"
        stroke="#262626"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.8828 1.66797V5.0013"
        stroke="#262626"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.21094 1.66797V5.0013"
        stroke="#262626"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.04688 8.33203H18.0469"
        stroke="#262626"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div>
      {/* Latar belakang semi-transparan */}
      <div className="fixed top-0 left-0 w-full h-full bg-gray-800 opacity-50 z-40"></div>

      {/* Modal */}
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 shadow-md relative overflow-y-auto max-h-screen">
          <div>
            <h1 className="font-bold text-xl">Title</h1>
            <p className="text-sm text-gray-600">
              Lorem ipsum dolor sit amet, consectetur
            </p>
          </div>
          {/* Tombol close */}
          <button
            className="absolute top-5 right-5 text-gray-600 hover:text-gray-800 text-md"
            onClick={closePieModal}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25.25 3.2175L22.7825 0.75L13 10.5325L3.2175 0.75L0.75 3.2175L10.5325 13L0.75 22.7825L3.2175 25.25L13 15.4675L22.7825 25.25L25.25 22.7825L15.4675 13L25.25 3.2175Z"
                fill="#323232"
              />
            </svg>
          </button>

          <div className="flex items-center border-b border-gray-400 py-2">
            {calendar}
            <input
              type="text"
              className="ml-2 border-none outline-none"
              placeholder="Create your title Pie"
            />
          </div>

          <div className="w-[180px] h-[180px] mx-auto my-auto">
            <Doughnut
              data={chartData}
              options={options}
              plugins={[textCenter]}
              className="rounded-full aspect-auto"
            />
          </div>
          <div>
            <h1 className="font-semibold text-md">Amount</h1>
            <p className="text-sm text-gray-600">
              Lorem ipsum dolor sit amet, consectetur
            </p>
          </div>
          <div className="flex items-center border-b border-gray-400 py-2">
            {calendar}
            <h1 className="font-bold text-sm items-start">IDR</h1>
            <input
              type="number"
              className="ml-2 border-none outline-none text-xl font-bold"
              defaultValue={0}
            />
          </div>
          <div className="flex items-center py-2 justify-between">
            <h1 className="font-bold">Assets</h1>
            <button
              onClick={addCard}
              className="flex justify-center p-2 text-sm items-center rounded-full text-white font-poppins h-fit bg-seeds-button-green"
            >
              Add Assets +
            </button>
          </div>

          {cardCount.map((_, index: number) => (
            <div key={index} className="bg-gray-100 p-2 rounded-md mt-2">
              <div className="flex justify-between">
                <div className="flex">
                  <Image
                    src={Ethereum.src}
                    alt={Ethereum.alt}
                    width={30}
                    height={30}
                  />
                  <div className="ml-2">
                    <div className="flex">
                      <h1 className="font-bold mr-1">ETH /</h1>
                      <p>BIDR</p>
                    </div>
                    <p className="text-sm text-gray-400">Etherium</p>
                  </div>
                </div>
                <div>
                  <div className="flex justify-center">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 13 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.27826 9.66141C1.16316 9.66141 1.02886 9.62306 0.932943 9.5272C0.741102 9.33547 0.741102 9.02871 0.932943 8.85615L4.53954 5.25171C4.73138 5.05998 5.03833 5.05998 5.21098 5.25171L7.26366 7.30317L11.4841 3.0852C11.676 2.89347 11.9829 2.89347 12.1556 3.0852C12.3474 3.27693 12.3474 3.58369 12.1556 3.75624L7.58981 8.31932C7.39797 8.51105 7.09102 8.51105 6.91837 8.31932L4.86566 6.26785L1.60438 9.5272C1.52765 9.62306 1.41255 9.66141 1.27826 9.66141Z"
                        fill="#7555DA"
                      />
                      <path
                        d="M11.826 6.78764C11.5574 6.78764 11.3464 6.57675 11.3464 6.30833V3.91175H8.94835C8.67977 3.91175 8.46875 3.70086 8.46875 3.43244C8.46875 3.16402 8.67977 2.95312 8.94835 2.95312H11.826C12.0945 2.95312 12.3056 3.16402 12.3056 3.43244V6.30833C12.3056 6.57675 12.0945 6.78764 11.826 6.78764Z"
                        fill="#7555DA"
                      />
                    </svg>
                    <p className="text-sm ml-1 text-purple-300">
                      {'Rp 0.4 (47%)'}
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-white inline-block rounded-full border-gray-300 border px-4 py-1">
                      <p className="font-bold text-gray-500 text-sm">20%</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="my-2">
                <input
                  type="range"
                  id="slider"
                  className="w-full h-4 rounded-full appearance-none"
                  min="0"
                  max="100"
                  value={sliderValue}
                  style={{
                    background: `linear-gradient(to right, #3AC4A0 0%, #3AC4A0 ${sliderValue}%, #ccc ${sliderValue}%, #ccc 100%)`
                  }}
                  onChange={e => handleSliderChange(Number(e.target.value))}
                />
              </div>

              <div className="flex justify-end">
                <Switch
                  checked={isOn}
                  onChange={setIsOn}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-seeds-green focus:ring-offset-2 ${
                    isOn ? 'bg-seeds-green' : 'bg-gray-200'
                  }`}
                >
                  {/* <span className="sr-only">Use setting</span> */}
                  <span
                    className={`
                      ${isOn ? 'translate-x-5' : 'translate-x-0'}
                      pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                    `}
                  >
                    <span
                      className={`
                        ${
                          isOn
                            ? 'opacity-0 duration-100 ease-out'
                            : 'opacity-100 duration-200 ease-in'
                        }
                        absolute inset-0 flex h-full w-full items-center justify-center transition-opacity
                      `}
                      aria-hidden="true"
                    >
                      <svg
                        className="h-3 w-3 text-gray-400"
                        fill="none"
                        viewBox="0 0 12 12"
                      >
                        <path
                          d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span
                      className={`
                        ${
                          isOn
                            ? 'opacity-100 duration-200 ease-in'
                            : 'opacity-0 duration-100 ease-out'
                        }
                        absolute inset-0 flex h-full w-full items-center justify-center transition-opacity
                      `}
                      aria-hidden="true"
                    >
                      <svg
                        width="9"
                        height="10"
                        viewBox="0 0 9 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.51832 9.50031H1.77889C1.10278 9.50031 0.546875 8.94536 0.546875 8.27042V5.40568C0.546875 4.73073 1.10278 4.17578 1.77889 4.17578H7.51832C8.19443 4.17578 8.75034 4.73073 8.75034 5.40568V8.27042C8.73531 8.94536 8.19443 9.50031 7.51832 9.50031ZM1.77889 5.00071C1.55352 5.00071 1.37323 5.18069 1.37323 5.40568V8.27042C1.37323 8.4954 1.55352 8.67539 1.77889 8.67539H7.51832C7.74369 8.67539 7.92398 8.4954 7.92398 8.27042V5.40568C7.92398 5.18069 7.74369 5.00071 7.51832 5.00071H1.77889Z"
                          fill="white"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M4.67619 1.31953C4.2113 1.31953 3.76545 1.49221 3.43672 1.7996C3.10799 2.10698 2.92331 2.52388 2.92331 2.95858V4.59764C2.92331 4.82394 2.72712 5.0074 2.48509 5.0074C2.24307 5.0074 2.04688 4.82394 2.04688 4.59764V2.95858C2.04688 2.30653 2.32389 1.68118 2.81698 1.2201C3.31008 0.759028 3.97885 0.5 4.67619 0.5C5.37353 0.5 6.04231 0.759028 6.5354 1.2201C7.02849 1.68118 7.30551 2.30653 7.30551 2.95858V4.59764C7.30551 4.82394 7.10931 5.0074 6.86729 5.0074C6.62527 5.0074 6.42907 4.82394 6.42907 4.59764V2.95858C6.42907 2.52388 6.24439 2.10698 5.91566 1.7996C5.58693 1.49221 5.14108 1.31953 4.67619 1.31953Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                  </span>
                </Switch>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PieModal;
