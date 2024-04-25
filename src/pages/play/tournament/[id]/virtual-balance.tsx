/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use-client';

import { getUserInfo } from '@/repository/profile.repository';
import { getQuizById } from '@/repository/quiz.repository';
import { type IDetailQuiz } from '@/utils/interfaces/quiz.interfaces';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
// import { useTranslation } from 'react-i18next';
import CoinLogo from '@/assets/play/tournament/coinLogo.svg';
import { toast } from 'react-toastify';
import { Cell, Pie, PieChart } from 'recharts';

interface EntryType {
  name: string;
}

const VirtualBalance = (): React.ReactElement => {
  const router = useRouter();
  const id = router.query.id;
  // const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [detailQuiz, setDetailQuiz] = useState<IDetailQuiz>();
  const [userInfo, setUserInfo] = useState<any>();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const dataInfo = await getUserInfo();

        setUserInfo(dataInfo);
      } catch (error: any) {
        toast.error('Error fetching data:', error.message);
      }
    };

    fetchData()
      .then()
      .catch(() => {});
  }, []);

  const getDetail = useCallback(
    async (currency: string) => {
      try {
        setLoading(true);
        const resp: IDetailQuiz = await getQuizById({
          id: id as string,
          currency
        });
        setDetailQuiz(resp);
      } catch (error) {
        toast(`ERROR fetch tournament ${error as string}`);
      } finally {
        setLoading(false);
      }
    },
    [id]
  );

  useEffect(() => {
    if (id) {
      getDetail(userInfo?.preferredCurrency ?? '');
    }
  }, [id, userInfo]);

  if (detailQuiz === undefined && loading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="animate-spinner w-10 h-10" />
      </div>
    );
  }

  const data = [
    { name: 'Cash Used', currency: 'IDR', value: 5510000 },
    { name: 'Cash Available', currency: 'BIDR', value: 15000000 }
  ];
  const COLORS = ['#DD2525', '#3AC4A0'];

  const renderLabel = (entry: EntryType): string => {
    return entry.name;
  };

  return (
    <>
      <div className='w-full flex flex-col justify-center items-center rounded-xl font-poppins p-5 bg-white'>
        <div className='flex justify-start w-full'>
          <Typography className='text-xl font-semibold'>
            Virtual Balance
          </Typography>
        </div>

        <div className="md:hidden w-full mt-4 flex justify-center items-center relative">
          <PieChart width={300} height={300}>
            <Pie
              data={data}
              cx={145}
              cy={145}
              innerRadius={100}
              outerRadius={140}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
          <div className="mt-4 flex flex-col justify-center items-center absolute top-[110px] font-poppins">
            <div className="text-[#BDBDBD]">Total Cash</div>
            <div className="font-semibold">IDR 20.510.000</div>
          </div>
        </div>
        <div className="hidden md:flex w-full mt-4 justify-center items-center relative">
          <PieChart width={600} height={350}>
            <Pie
              data={data}
              cx={295}
              cy={170}
              innerRadius={100}
              outerRadius={140}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              labelLine={true}
              label={renderLabel}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
          <div className="flex flex-col justify-center items-center absolute top-[150px] font-poppins">
            <div className="text-[#BDBDBD]">Total Cash</div>
            <div className="font-semibold">IDR 20.510.000</div>
          </div>
        </div>
        <div className="w-full xl:w-[80%] md:mt-4 mb-4 flex flex-col gap-4 justify-center items-center">
          {data.map((datas, index) => (
            <div key={index} className="flex gap-2 justify-center items-center">
              <div
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                className="w-[20px] h-[20px] rounded-md"
              />
              <div className="7C7C7C">{datas.name}</div>
              <div className="font-semibold">IDR {datas.value}</div>
            </div>
          ))}
        </div>

        <div className="w-full mt-4">
          <Typography className="text-xl font-semibold mb-4">
            Transaction
          </Typography>
          <div className="gap-2">
            <div className="bg-[#4DA81C] pl-1 rounded-lg shadow-lg text-xs md:text-sm">
              <div className="w-full flex justify-between items-center p-2 mt-4 bg-[#F9F9F9] md:bg-white border border-[#E9E9E9] md:border-none rounded-tl-lg">
                <div className="flex gap-2 md:gap-4">
                  <Image
                    alt=""
                    src={CoinLogo}
                    className="w-[30px] md:w-[40px]"
                  />
                  <div className="flex flex-col justify-start items-start">
                    <div className="flex gap-1 text-sm md:text-md xl:text-lg">
                      <div className="font-semibold">ETH /</div>
                      <div>BIDR</div>
                    </div>
                    <div className="text-[#4DA81C] text-xs md:text-sm">
                      Pending Order- Buy Limit
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-end items-end">
                  <div className="text-[#7C7C7C] text-[10px] md:text-sm">
                    11-04-2022
                  </div>
                  <div className="text-[#27A590] font-semibold xl:text-lg">
                    Open
                  </div>
                </div>
              </div>
              <div className="bg-[#E9E9E9] p-2 flex justify-between">
                <div className="text-[#7C7C7C] ">Take Profit</div>
                <div className="font-semibold">2%</div>
              </div>
              <div className=" bg-white p-2 flex justify-between">
                <div className="text-[#7C7C7C] ">Stop Loss</div>
                <div className="font-semibold">3%</div>
              </div>
              <div className=" bg-[#E9E9E9] p-2 flex justify-between">
                <div className="text-[#7C7C7C] ">Amount</div>
                <div className="font-semibold">2 ETH</div>
              </div>
              <div className="text-[#7C7C7C] bg-white p-2 flex justify-between">
                <div className="">
                  <div className="text-[#7C7C7C]">Price</div>
                  <div className="text-black font-semibold">Rp 30.575.000</div>
                </div>
                <div className="flex flex-col justify-end items-end">
                  <div className="text-[#7C7C7C]">Total</div>
                  <div className="text-black font-semibold">Rp 61.153.000</div>
                </div>
              </div>
              <div className="flex justify-center items-center bg-white">
                <div className="text-[#DD2525] font-semibold border border-[#DD2525] px-4 py-2 my-4 w-[80%] md:w-[300px] rounded-full text-center cursor-pointer">
                  Cancel
                </div>
              </div>
            </div>
            <div className="bg-[#4DA81C] pl-1 rounded-lg shadow-lg text-xs md:text-sm">
              <div className="w-full flex justify-between items-center p-2 mt-4 bg-[#F9F9F9] md:bg-white border border-[#E9E9E9] md:border-none rounded-tl-lg">
                <div className="flex gap-2 md:gap-4">
                  <Image
                    alt=""
                    src={CoinLogo}
                    className="w-[30px] md:w-[40px]"
                  />
                  <div className="flex flex-col justify-start items-start">
                    <div className="flex gap-1 text-sm md:text-md xl:text-lg">
                      <div className="font-semibold">ANTM /</div>
                      <div>IDX</div>
                    </div>
                    <div className="text-[#4DA81C] text-xs md:text-sm">
                      Pending Order- Buy Limit
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-end items-end">
                  <div className="text-[#7C7C7C] text-[10px] md:text-sm">
                    11-04-2022
                  </div>
                  <div className="text-[#27A590] font-semibold xl:text-lg">
                    Open
                  </div>
                </div>
              </div>
              <div className="bg-[#E9E9E9] p-2 flex justify-between">
                <div className="text-[#7C7C7C] ">Take Profit</div>
                <div className="font-semibold">2%</div>
              </div>
              <div className=" bg-white p-2 flex justify-between">
                <div className="text-[#7C7C7C] ">Stop Loss</div>
                <div className="font-semibold">3%</div>
              </div>
              <div className=" bg-[#E9E9E9] p-2 flex justify-between">
                <div className="text-[#7C7C7C] ">Amount</div>
                <div className="font-semibold">2 Lot</div>
              </div>
              <div className="text-[#7C7C7C] bg-white p-2 flex justify-between">
                <div className="">
                  <div className="text-[#7C7C7C]">Price</div>
                  <div className="text-black font-semibold">Rp 30.575.000</div>
                </div>
                <div className="flex flex-col justify-end items-end">
                  <div className="text-[#7C7C7C]">Total</div>
                  <div className="text-black font-semibold">Rp 61.153.000</div>
                </div>
              </div>
              <div className="flex justify-center items-center bg-white">
                <div className="text-[#DD2525] font-semibold border border-[#DD2525] px-4 py-2 my-4 w-[80%] md:w-[300px] rounded-full text-center cursor-pointer">
                  Cancel
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VirtualBalance;
