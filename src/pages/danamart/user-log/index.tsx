import {
  ArrowLeftPaginationGray,
  ArrowLeftPaginationGreen,
  ArrowRightPaginationGray,
  ArrowRightPaginationGreen
} from '@/assets/danamart';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import withAuthDanamart from '@/helpers/withAuthDanamart';
import { getUserLog } from '@/repository/danamart/user-log.repository';
import { type UserLogData } from '@/utils/interfaces/danamart/user-log.interface';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

interface ParamsI {
  start_date: string;
  end_date: string;
}

const UserLog = (): React.ReactElement => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.userLog';
  const [userLogData, setUserLogData] = useState<UserLogData[]>([]);
  const [entries, setEntries] = useState<number>(7);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [params, setParams] = useState<ParamsI>({
    start_date: '',
    end_date: ''
  });

  const getUserLogData = async (params: ParamsI): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await getUserLog(params);
      if (response?.data?.data !== undefined) {
        setUserLogData(response?.data?.data);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void getUserLogData(params);
  }, []);

  const handleSort = (column: keyof UserLogData | 'index'): void => {
    const newOrder =
      sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortOrder(newOrder);

    setUserLogData(prevData => {
      if (column === 'index') {
        return [...prevData].reverse();
      } else {
        return [...prevData].sort((a, b) => {
          let valueA = a[column];
          let valueB = b[column];

          valueA = valueA.trim();
          valueB = valueB.trim();
          return newOrder === 'asc'
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        });
      }
    });
  };

  const filteredData = userLogData?.filter(userLog => {
    const userLogString = JSON.stringify(userLog).toLowerCase();
    return userLogString.includes(searchQuery.toLowerCase());
  });

  const totalPages = Math.ceil(filteredData?.length / entries);
  const startIndex = (currentPage - 1) * entries;
  const paginatedData = filteredData.slice(startIndex, startIndex + entries);

  return (
    <PageGradient defaultGradient className="w-full">
      <div className="w-full bg-white flex flex-col px-5 py-8 rounded-lg">
        <Typography className="font-poppins md:text-2xl text-lg font-semibold text-[#262626] mb-4">
          {t(`${pathTranslation}.title`)}
        </Typography>
        {!isLoading ? (
          <div className="relative">
            <div className="w-full flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
              <div className="w-full">
                <Typography className="font-poppins text-sm font-medium text-[#262626]">
                  {t(`${pathTranslation}.filter.text8`)}
                </Typography>
                <input
                  type="date"
                  value={params.start_date}
                  onChange={e => {
                    setParams(prev => ({
                      ...prev,
                      start_date: e.target.value
                    }));
                  }}
                  className="border rounded p-2 w-full"
                />
              </div>
              <div className="w-full">
                <Typography className="font-poppins text-sm font-medium text-[#262626]">
                  {t(`${pathTranslation}.filter.text9`)}
                </Typography>
                <input
                  type="date"
                  value={params.end_date}
                  onChange={e => {
                    setParams(prev => ({ ...prev, end_date: e.target.value }));
                  }}
                  className="border rounded p-2 w-full"
                />
              </div>
              <Button
                onClick={() => {
                  void getUserLogData(params);
                }}
                disabled={params?.start_date === '' || params?.end_date === ''}
                className="shrink-0 md:mt-5 rounded-full w-full md:w-fit md:px-8 px-5 py-3 capitalize font-medium text-sm disabled:bg-[#BDBDBD] disabled:text-[#7C7C7C] bg-[#3AC4A0] text-white font-poppins"
              >
                {t(`${pathTranslation}.filter.text10`)}
              </Button>
              <Button
                onClick={() => {
                  setParams({
                    start_date: '',
                    end_date: ''
                  });
                  void getUserLogData({ start_date: '', end_date: '' });
                }}
                disabled={params?.start_date === '' && params?.end_date === ''}
                className="shrink-0 md:mt-5 rounded-full w-full md:w-fit md:px-8 px-5 py-3 capitalize font-medium text-sm disabled:bg-[#BDBDBD] disabled:text-[#7C7C7C] bg-[#3AC4A0] text-white font-poppins"
              >
                {t(`${pathTranslation}.filter.text11`)}
              </Button>
            </div>
            <div className="w-full flex flex-col md:flex-row justify-between items-center mb-4 gap-4 md:gap-0">
              <div className="relative w-full md:max-w-[200px]">
                <input
                  value={searchQuery}
                  onChange={e => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  id="search"
                  type="text"
                  name="search"
                  placeholder={`${t(`${pathTranslation}.filter.text7`)}`}
                  className="block w-full md:max-w-[200px] text-[#262626] text-sm h-10 placeholder:text-[#BDBDBD] focus:outline-0 disabled:bg-[#E9E9E9] p-2 pl-4 rounded-full border border-[#BDBDBD]"
                />
                {searchQuery !== '' && (
                  <div
                    onClick={() => {
                      setSearchQuery('');
                    }}
                    className="w-[20px] h-auto absolute right-[15px] top-[10px] cursor-pointer hover:scale-125 duration-200"
                  >
                    <XMarkIcon />
                  </div>
                )}
              </div>
              <select
                value={entries}
                onChange={e => {
                  setEntries(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="w-full md:max-w-[250px] border rounded-full p-2 cursor-pointer"
              >
                <option value={7}>
                  {t(`${pathTranslation}.filter.text1`)}
                </option>
                <option value={10}>
                  {t(`${pathTranslation}.filter.text2`)}
                </option>
                <option value={25}>
                  {t(`${pathTranslation}.filter.text3`)}
                </option>
                <option value={50}>
                  {t(`${pathTranslation}.filter.text4`)}
                </option>
                <option value={75}>
                  {t(`${pathTranslation}.filter.text5`)}
                </option>
                <option value={100}>
                  {t(`${pathTranslation}.filter.text6`)}
                </option>
              </select>
            </div>
            <div className="w-full p-4 rounded-lg shadow-lg font-poppins text-sm overflow-x-scroll">
              <table className="min-w-full border border-gray-300 rounded-md">
                <thead>
                  <tr className="text-[#27A590] font-poppins bg-[#DCFCE4]">
                    <th
                      className="text-center p-2 border-b border-gray-300 cursor-pointer"
                      onClick={() => {
                        handleSort('index');
                      }}
                    >
                      #
                    </th>
                    <th
                      className="text-center p-2 border-b border-gray-300 cursor-pointer"
                      onClick={() => {
                        handleSort('datetime');
                      }}
                    >
                      Tanggal
                    </th>
                    <th
                      className="text-center p-2 border border-gray-300 cursor-pointer"
                      onClick={() => {
                        handleSort('jenis_aksi');
                      }}
                    >
                      Aktivitas
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData?.length > 0 ? (
                    paginatedData?.map((userLog, i) => {
                      const displayedIndex =
                        sortColumn === 'index' && sortOrder === 'desc'
                          ? paginatedData?.length - i
                          : i + 1;

                      return (
                        <tr key={i} className="hover:bg-gray-50">
                          <td className="p-2 border border-gray-300 text-center">
                            {displayedIndex}
                          </td>
                          <td className="p-2 border border-gray-300">
                            {userLog?.datetime}
                          </td>
                          <td className="p-2 border border-gray-300">
                            {userLog?.jenis_aksi}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={9} className="p-4 text-center text-gray-500">
                        {t(`${pathTranslation}.table.text1`)}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {userLogData?.length > 0 && (
                <div className="flex justify-between items-center mt-4">
                  <span>
                    {t(`${pathTranslation}.table.text2`)} {startIndex + 1}{' '}
                    {t(`${pathTranslation}.table.text3`)}{' '}
                    {startIndex + entries < filteredData.length
                      ? startIndex + entries
                      : filteredData.length}{' '}
                    {t(`${pathTranslation}.table.text4`)} {filteredData.length}{' '}
                    {t(`${pathTranslation}.table.text5`)}
                  </span>
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() => {
                        setCurrentPage(prev => Math.max(prev - 1, 1));
                      }}
                      disabled={currentPage === 1}
                      className="flex items-center justify-center w-[25px] h-[25px] cursor-pointer rounded-full"
                    >
                      <Image
                        src={
                          currentPage === 1
                            ? ArrowLeftPaginationGray
                            : ArrowLeftPaginationGreen
                        }
                        alt="ArrowLeft"
                        className="w-full h-auto object-cover"
                        width={100}
                        height={100}
                      />
                    </button>
                    <button
                      onClick={() => {
                        setCurrentPage(prev => Math.min(prev + 1, totalPages));
                      }}
                      disabled={currentPage === totalPages}
                      className="flex items-center justify-center w-[25px] h-[25px] cursor-pointer rounded-full"
                    >
                      <Image
                        src={
                          currentPage === totalPages
                            ? ArrowRightPaginationGray
                            : ArrowRightPaginationGreen
                        }
                        alt="ArrowRight"
                        className="w-full h-auto object-cover"
                        width={100}
                        height={100}
                      />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="w-full flex justify-center h-fit my-16">
            <div className="h-[60px]">
              <div className="animate-spinner w-16 h-16 border-8 border-gray-200 border-t-seeds-button-green rounded-full" />
            </div>
          </div>
        )}
      </div>
    </PageGradient>
  );
};

export default withAuthDanamart(UserLog);
