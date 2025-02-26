import { ArrowLeftPaginationGray, ArrowLeftPaginationGreen, ArrowRightPaginationGray, ArrowRightPaginationGreen } from '@/assets/danamart';
import DetailCashCard from '@/components/danamart/outgoing-funds/DetailCashCard';
import ModalDetailOutcome from '@/components/danamart/outgoing-funds/ModalDetailOutcome';
import ModalWithdraw from '@/components/danamart/outgoing-funds/ModalWithdraw';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import { decryptResponse } from '@/helpers/cryptoDecrypt';
import { standartCurrency } from '@/helpers/currency';
import withAuthDanamart from '@/helpers/withAuthDanamart';
import { getDashboardUser } from '@/repository/danamart/danamart.repository';
import { getOutgoingFunds } from '@/repository/danamart/outgoing-funds.repository';
import { getUserInfo } from '@/repository/profile.repository';
import { type DashboardDataUser } from '@/utils/interfaces/danamart/offers.interface';
import { type OutgoingFundsData } from '@/utils/interfaces/danamart/outgoing-funds.interface';
import { type UserInfo } from '@/utils/interfaces/tournament.interface';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaRegEye } from 'react-icons/fa';
import { toast } from 'react-toastify';

const OutgoingFunds = (): React.ReactElement => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.outgoingFunds'
  const [outgoingFunds, setOutgoingFundsData] = useState<OutgoingFundsData[]>([]);
  const [entries, setEntries] = useState<number>(7);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedOutcome, setSelectedOutcome] = useState<number>(0);
  const [userData, setUserData] = useState<UserInfo>();
  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isShowModalDetailOutgoingFunds, setIsShowModalDetailOutgoingFunds] = useState<boolean>(false);
  const [isShowModalWithdraw, setIsShowModalWithdraw] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dashboardData, setDashboardData] = useState<DashboardDataUser>();
  
  const fetchDashboardUser = async (): Promise<void> => {
    try {
      const dashboard = await getDashboardUser();
      if (dashboard?.status === 200) {
        const decryptedData = JSON.parse(
          decryptResponse(dashboard.data) !== null
            ? decryptResponse(dashboard.data)
            : dashboard.data
        );
        setDashboardData(decryptedData);
      }
    } catch (error) {
      toast.error(t('danamart.dashboard.errorGetDashboard'));
    }
  };

  const getOutgoingFundsData = async (): Promise<void> => {
    try {
      const response = await getOutgoingFunds();
      if (response?.data?.StatusCode === 200) {
        setOutgoingFundsData(response?.data?.data)
      }
    } catch (error) {
      toast.error(`Error fetching data: ${error as string}`);
    }
  };
    
  const fetchUserInfo = async (): Promise<void> => {
    try {
      const res = await getUserInfo();
      setUserData(res);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const filteredData = outgoingFunds?.filter((outgoingFund) => {
    const outgoingFundString = JSON.stringify(outgoingFund).toLowerCase();
    return outgoingFundString.includes(searchQuery.toLowerCase());
  });

  const totalPages = Math.ceil(filteredData.length / entries);
  const startIndex = (currentPage - 1) * entries;
  const paginatedData = filteredData.slice(startIndex, startIndex + entries);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([fetchDashboardUser(), getOutgoingFundsData(), fetchUserInfo()]).finally(() => {
      setIsLoading(false);
    });
  }, []);
  
  const handleSort = (column: keyof OutgoingFundsData): void => {
    const newOrder = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortOrder(newOrder);

    if (column === "tgl_withdraw" || column === "ket" || column === 'status') {
      setOutgoingFundsData((prevData) =>
        [...prevData].sort((a, b) => {
          let valueA = a[column];
          let valueB = b[column];

          valueA = valueA.replace(/<br\s*\/?>/g, "").trim();
          valueB = valueB.replace(/<br\s*\/?>/g, "").trim();
          return newOrder === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        })
      )
    } else if (column === "jml_withdraw") {
      setOutgoingFundsData((prevData) =>
        [...prevData].sort((a, b) => {
          const parseNumber = (value: unknown): number => {
            if (typeof value === "string") {
              const num = parseFloat(value.replace(/[^\d.]/g, ""));
              return isNaN(num) ? 0 : num;
            }
            return typeof value === "number" ? value : 0;
          };

          const valueA = parseNumber(a[column]);
          const valueB = parseNumber(b[column]);

          return newOrder === "asc" ? valueA - valueB : valueB - valueA;
        })
      );
    }
  };
    
  const dashboardCardData: Array<{
    id: number;
    title: string;
    value: string;
    background: string;
    description: string;
  }> = [
    {
      id: 1,
      title: `${t(`${pathTranslation}.text1`)}`,
      value: dashboardData?.dataSaldoUser?.totalDana ?? 'Rp. 0',
      background: 'bg-gradient-to-tr from-[#5263F9]/20 via-white to-[#4FE6AF]/20',
      description: `${t(`${pathTranslation}.text2`)}`
    },
    {
      id: 2,
      title: `${t(`${pathTranslation}.text3`)}`,
      value: dashboardData?.dataSaldoUser?.DanaDapatDiinvestasikan ?? 'Rp. 0',
      background: 'bg-gradient-to-tl from-[#5263F9]/20 via-white to-[#4FE6AF]/20',
      description: `${t(`${pathTranslation}.text4`)}`
    },
    {
      id: 3,
      title: `${t(`${pathTranslation}.text5`)}`,
      value: dashboardData?.dataSaldoUser?.danaBisaTarik ?? 'Rp. 0',
      background: 'bg-gradient-to-br from-[#5263F9]/20 via-white to-[#4FE6AF]/20',
      description: `${t(`${pathTranslation}.text6`)}`
    },
  ];

  return (
    <PageGradient defaultGradient className="w-full">
      <div className="w-full bg-white flex flex-col px-5 py-6 rounded-lg">
        <Typography className="font-poppins md:text-2xl text-lg font-semibold text-[#262626] mb-4">
          {t(`${pathTranslation}.title`)}
        </Typography>

        {
          !isLoading ?
            <div>
              <div className="flex flex-col lg:flex-row items-center justify-center gap-4 w-full place-items-center">
                {dashboardCardData?.map(item => (
                  <DetailCashCard key={item?.id} data={item} />
                ))}
              </div>
              <div className='flex justify-center items-center md:justify-end md:items-end'>
                <Button
                  onClick={() => { setIsShowModalWithdraw(true) }}
                  className='w-full md:w-fit flex gap-2 justify-center items-center rounded-full bg-seeds-button-green border-[1px] text-sm font-semibold capitalize text-white transition-all font-poppins mt-6'
                >
                  {t(`${pathTranslation}.text7`)}
                </Button>
              </div>
            </div>
            :
            <div className="w-full flex justify-center h-fit my-16">
              <div className="h-[60px]">
                <div className="animate-spinner w-16 h-16 border-8 border-gray-200 border-t-seeds-button-green rounded-full" />
              </div>
            </div>
        }
      </div>

      {
        !isLoading &&
            <div className="w-full bg-white flex flex-col px-5 py-6 rounded-lg mt-4">
              <div className="flex flex-col gap-2">
                <div className="w-full flex flex-col md:flex-row justify-between items-center mb-4 gap-4 md:gap-0">
                  <div className="relative w-full md:max-w-[200px]">
                    <input
                      value={searchQuery}
                      onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                      id="search"
                      type="text"
                      name="search"
                      placeholder={`${t(`${pathTranslation}.filter.text7`)}`}
                      className="block w-full md:max-w-[200px] text-[#262626] text-sm h-10 placeholder:text-[#BDBDBD] focus:outline-0 disabled:bg-[#E9E9E9] p-2 pl-4 rounded-full border border-[#BDBDBD]"
                    />
                    {
                      searchQuery !== '' &&
                        <div
                          onClick={() => { setSearchQuery(''); }}
                          className="w-[20px] h-auto absolute right-[15px] top-[10px] cursor-pointer hover:scale-125 duration-200"
                        >
                          <XMarkIcon/>
                        </div>
                    }
                  </div>
                  <select
                    value={entries}
                    onChange={(e) => {
                      setEntries(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="w-full md:max-w-[250px] border rounded-full p-2 cursor-pointer"
                  >
                    <option value={7}>{t(`${pathTranslation}.filter.text1`)}</option>
                    <option value={10}>{t(`${pathTranslation}.filter.text2`)}</option>
                    <option value={25}>{t(`${pathTranslation}.filter.text3`)}</option>
                    <option value={50}>{t(`${pathTranslation}.filter.text4`)}</option>
                    <option value={75}>{t(`${pathTranslation}.filter.text5`)}</option>
                    <option value={100}>{t(`${pathTranslation}.filter.text6`)}</option>
                  </select>
                </div>
                <div className="w-full p-4 rounded-lg shadow-lg font-poppins text-sm">
                  <table className="min-w-full border border-gray-300 rounded-md">
                    <thead>
                      <tr className="text-[#27A590] font-poppins bg-[#DCFCE4]">
                        <th className="text-center p-2 border border-gray-300 cursor-pointer" onClick={() => { handleSort('tgl_withdraw'); }}>{t(`${pathTranslation}.table.text6`)}</th>
                        <th className="text-center p-2 border border-gray-300 cursor-pointer" onClick={() => { handleSort('status'); }}>{t(`${pathTranslation}.table.text7`)}</th>
                        <th className="text-center p-2 border border-gray-300 cursor-pointer" onClick={() => { handleSort('jml_withdraw'); }}>{t(`${pathTranslation}.table.text8`)}</th>
                        <th className="text-center p-2 border border-gray-300 cursor-pointer hidden md:table-cell" onClick={() => { handleSort('ket'); }}>{t(`${pathTranslation}.table.text9`)}</th>
                        <th className="text-center p-2 border border-gray-300 md:hidden table-cell"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedData?.length > 0 ? (
                        paginatedData?.map((outcome, index) => (
                          <tr
                            onClick={() => {
                              setIsShowModalDetailOutgoingFunds(true)
                              setSelectedOutcome(index)
                            }}
                            key={index} className="hover:bg-gray-50"
                          >
                            <td className="p-2 border border-gray-300">{outcome?.tgl_withdraw}</td>
                            <td className="text-center p-2 border border-gray-300">
                              <span
                                className={`px-3 py-1 rounded-lg text-sm font-medium 
                                  ${outcome?.status === '1' 
                                    ? 'bg-[#FFC107] text-[#212529]'
                                    : 'bg-[#3AC4A0] text-white'}`}
                              >
                                {outcome?.status === '1' 
                                  ? t(`${pathTranslation}.table.text10`) 
                                  : t(`${pathTranslation}.table.text11`)}
                              </span>
                            </td>
                            <td className="p-2 border border-gray-300 text-right">{`${userData?.preferredCurrency ?? 'IDR'} ${standartCurrency(Number(outcome?.jml_withdraw ?? '0') ?? 0)}`}</td>
                            <td className="p-2 border border-gray-300 hidden md:table-cell">{outcome?.ket}</td>
                            <td className="p-2 border border-gray-300 text-center md:hidden table-cell">
                              <button
                                onClick={() => {
                                  setIsShowModalDetailOutgoingFunds(true)
                                  setSelectedOutcome(index)
                                }}
                                className="flex justify-center items-center text-[#262626] hover:scale-125 duration-200"
                              >
                                <FaRegEye />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={3} className="p-4 text-center text-gray-500 md:hidden table-cell">
                            {t(`${pathTranslation}.table.text1`)}
                          </td>
                          <td colSpan={4} className="p-4 text-center text-gray-500 hidden md:table-cell">
                            {t(`${pathTranslation}.table.text1`)}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  <div className="flex justify-between items-center mt-4">
                    <span>
                      {t(`${pathTranslation}.table.text2`)} {startIndex + 1} {t(`${pathTranslation}.table.text3`)} {(startIndex + entries) < filteredData.length ? startIndex + entries : filteredData.length} {t(`${pathTranslation}.table.text4`)} {filteredData.length} {t(`${pathTranslation}.table.text5`)}
                    </span>
                    <div className="flex justify-center items-center gap-2">
                      <button
                        onClick={() => { setCurrentPage((prev) => Math.max(prev - 1, 1)); }}
                        disabled={currentPage === 1}
                        className="flex items-center justify-center w-[25px] h-[25px] cursor-pointer rounded-full"
                      >
                        <Image
                          src={currentPage === 1 ? ArrowLeftPaginationGray : ArrowLeftPaginationGreen}
                          alt="ArrowLeft"
                          className="w-full h-auto object-cover"
                          width={100}
                          height={100}
                        />
                      </button>
                      <button
                        onClick={() => { setCurrentPage((prev) => Math.min(prev + 1, totalPages)); }}
                        disabled={currentPage === totalPages}
                        className="flex items-center justify-center w-[25px] h-[25px] cursor-pointer rounded-full"
                      >
                        <Image
                          src={currentPage === totalPages ? ArrowRightPaginationGray : ArrowRightPaginationGreen}
                          alt="ArrowRight"
                          className="w-full h-auto object-cover"
                          width={100}
                          height={100}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
      }
      {isShowModalDetailOutgoingFunds && (
        <ModalDetailOutcome
          data={outgoingFunds[selectedOutcome]}
          setIsShowModalDetailOutgoingFunds={setIsShowModalDetailOutgoingFunds}
          isShowModalDetailOutgoingFunds={isShowModalDetailOutgoingFunds}
          currency={userData?.preferredCurrency ?? 'IDR'}
        />
      )}
      {isShowModalWithdraw && (
        <ModalWithdraw
          setIsShowModalWithdraw={setIsShowModalWithdraw}
          isShowModalWithdraw={isShowModalWithdraw}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
    </PageGradient>
  )
}

export default withAuthDanamart(OutgoingFunds);