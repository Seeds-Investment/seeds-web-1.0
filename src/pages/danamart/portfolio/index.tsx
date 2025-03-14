import { ArrowLeftPaginationGray, ArrowLeftPaginationGreen, ArrowRightPaginationGray, ArrowRightPaginationGreen } from '@/assets/danamart';
import ModalCostReturn from '@/components/danamart/portfolio/ModalCostReturn';
import ModalFinancingInformation from '@/components/danamart/portfolio/ModalFinancingInformation';
import ModalOfferInformation from '@/components/danamart/portfolio/ModalOfferInformation';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import { standartCurrency } from '@/helpers/currency';
import withAuthDanamart from '@/helpers/withAuthDanamart';
import { getPortfolio } from '@/repository/danamart/portfolio.repository';
import { type PortfolioData } from '@/utils/interfaces/danamart/portfolio.interface';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HiDotsVertical } from "react-icons/hi";
import { toast } from 'react-toastify';

const Portfolio = (): React.ReactElement => {
  const router = useRouter();
  const { t } = useTranslation();
  const pathTranslation = 'danamart.portfolio'
  const [portfolioData, setPortfolioData] = useState<PortfolioData[]>([]);
  const [entries, setEntries] = useState<number>(7);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isShowOptions, setIsShowOptions] = useState<boolean>(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const [isShowModalOfferInformation, setIsShowModalOfferInformation] = useState<boolean>(false);
  const [isShowModalFinancingInformation, setIsShowModalFinancingInformation] = useState<boolean>(false);
  const [isShowModalCostReturn, setIsShowModalCostReturn] = useState<boolean>(false);

  const menu = [
    {
      id: 1,
      title: t(`${pathTranslation}.table.dropdown.text1`),
      action: setIsShowModalOfferInformation,
      color: 'default'
    },
    {
      id: 2,
      title: t(`${pathTranslation}.table.dropdown.text2`),
      action: setIsShowModalFinancingInformation,
      color: 'default'
    },
    {
      id: 3,
      title: t(`${pathTranslation}.table.dropdown.text3`),
      action: setIsShowModalCostReturn,
      color: 'default'
    },
    {
      id: 4,
      title: t(`${pathTranslation}.table.dropdown.text4`),
      action: 'redirect',
      color: 'default'
    },
    {
      id: 5,
      title: t(`${pathTranslation}.table.dropdown.text5`),
      action: '',
      color: 'red'
    }
  ]

  const getPortfolioData = async (): Promise<void> => {
    try {
      setIsLoading(true)
      const response = await getPortfolio();
      if (response?.data?.data !== undefined) {
        setPortfolioData(response?.data?.data)
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false)
    }
  };
  
  useEffect(() => {
    void getPortfolioData();
  }, []);

  const handleSort = (column: keyof PortfolioData): void => {
    const newOrder = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortOrder(newOrder);

    if (column === "kodeEfek" || column === "pinjamanId") {
      setPortfolioData((prevData) =>
        [...prevData].sort((a, b) => {
          let valueA = a[column];
          let valueB = b[column];

          valueA = valueA.replace(/<br\s*\/?>/g, "").trim();
          valueB = valueB.replace(/<br\s*\/?>/g, "").trim();
          return newOrder === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        })
      )
    } else if ((column === "hargaPerlembarSaham") || (column === "hargalembarSaham") || ((column === "jangkaWaktu"))) {
      setPortfolioData((prevData) =>
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
    } else if (column === "imbalHasil") {
      setPortfolioData((prevData) =>
        [...prevData].sort((a, b) => {
          const valueA = a[column];
          const valueB = b[column];
          const newValueA = (a[column]) === '-' ? 0 : (Number(valueA.replace(/%\s*p\.a/i, "").trim().replace(",", ".")));
          const newValueB = (b[column]) === '-' ? 0 : (Number(valueB.replace(/%\s*p\.a/i, "").trim().replace(",", ".")));

          return newOrder === 'asc' ? newValueA - newValueB : newValueB - newValueA;
        })
      );
    } else if (column === "modalInfoPendanaan") {
      setPortfolioData((prevData) =>
        [...prevData].sort((a, b) => {
          const valueA = a.modalInfoPendanaan.jumlahPembelian;
          const valueB = b.modalInfoPendanaan.jumlahPembelian;
          const newValueA = valueA === '-' ? 0 : Number(valueA.replace("Rp. ", "").replace(/\./g, ""));
          const newValueB = valueB === '-' ? 0 : Number(valueB.replace("Rp. ", "").replace(/\./g, ""));

          return newOrder === 'asc' ? newValueA - newValueB : newValueB - newValueA;
        })
      );
    }
  };

  const filteredData = portfolioData?.filter((portfolio) => {
    const reportString = JSON.stringify(portfolio).toLowerCase();
    return reportString.includes(searchQuery.toLowerCase());
  });

  const totalPages = Math.ceil(filteredData.length / entries);
  const startIndex = (currentPage - 1) * entries;
  const paginatedData = filteredData.slice(startIndex, startIndex + entries);

  const convertCurrencyToNumber = (value: string): number => {
    return Number(value.replace(/[^\d]/g, ''));
  }

  return (
    <PageGradient defaultGradient className="w-full">
      <div className="w-full bg-white flex flex-col px-5 py-8 rounded-lg">
        <Typography className="font-poppins md:text-2xl text-lg font-semibold text-[#262626] mb-4">
          {t(`${pathTranslation}.title`)}
        </Typography>
        {
          !isLoading ?
            <div className='relative'>
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
              <div className="w-full p-4 rounded-lg shadow-lg font-poppins text-sm overflow-x-scroll">
                <table className="min-w-full border border-gray-300 rounded-md">
                  <thead>
                    <tr className="text-[#27A590] font-poppins bg-[#DCFCE4]">
                      <th className="text-center p-2 border-b border-gray-300 w-64 cursor-pointer" rowSpan={2} onClick={() => { handleSort('kodeEfek'); }}>{t(`${pathTranslation}.table.text6`)}</th>
                      <th className="text-center p-2 border border-gray-300 w-64 cursor-pointer" rowSpan={2} onClick={() => { handleSort('pinjamanId'); }}>{t(`${pathTranslation}.table.text7`)}</th>
                      <th className="text-center p-2 border border-gray-300 w-128" colSpan={2}>{t(`${pathTranslation}.table.text8`)}</th>
                      <th className="text-center p-2 border border-gray-300 w-192" colSpan={3}>{t(`${pathTranslation}.table.text9`)}</th>
                      <th className="text-center p-2 border border-gray-300 w-64 cursor-pointer" rowSpan={2} onClick={() => { handleSort('modalInfoPendanaan'); }}>{t(`${pathTranslation}.table.text10`)}</th>
                      <th className="text-left p-2 w-20" rowSpan={2}></th>
                    </tr>
                    <tr className="text-[#27A590] font-poppins bg-[#DCFCE4]">
                      <th className="text-center p-2 border border-gray-300 w-64 cursor-pointer" onClick={() => { handleSort('hargaPerlembarSaham'); }}>{t(`${pathTranslation}.table.text11`)}</th>
                      <th className="text-center p-2 border border-gray-300 w-64 cursor-pointer" onClick={() => { handleSort('hargalembarSaham'); }}>{t(`${pathTranslation}.table.text12`)}</th>
                      <th className="text-center p-2 border border-gray-300 w-64 cursor-pointer" onClick={() => { handleSort('imbalHasil'); }}>{t(`${pathTranslation}.table.text13`)}</th>
                      <th className="text-center p-2 border border-gray-300 w-64 cursor-pointer" onClick={() => { handleSort('jangkaWaktu'); }}>{t(`${pathTranslation}.table.text14`)}</th>
                      <th className="text-center p-2 border border-gray-300 w-64 cursor-pointer" onClick={() => { handleSort('jatuhTempo'); }}>{t(`${pathTranslation}.table.text15`)}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData?.length > 0 ? (
                      paginatedData?.map((portfolio, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td
                            className="p-2 border-b border-gray-300 text-center"
                            dangerouslySetInnerHTML={{
                              __html: portfolio.kodeEfek ?? ''
                            }}
                          />
                          <td className="p-2 border border-gray-300 text-center">{portfolio.pinjamanId}</td>
                          <td className="p-2 border border-gray-300 text-right">{portfolio?.hargaPerlembarSaham !== '-' ? `IDR ${standartCurrency(convertCurrencyToNumber(portfolio?.hargaPerlembarSaham ?? '') ?? 0)}` : portfolio?.hargalembarSaham}</td>
                          <td className="p-2 border border-gray-300">{portfolio.hargalembarSaham}</td>
                          <td className="p-2 border border-gray-300 text-right">{portfolio.imbalHasil}</td>
                          <td className="p-2 border border-gray-300 text-right">{portfolio.jangkaWaktu}</td>
                          <td className="p-2 border border-gray-300 text-right">{portfolio.jatuhTempo}</td>
                          <td className="p-2 border border-gray-300 text-right">{`IDR ${standartCurrency(convertCurrencyToNumber(portfolio?.modalInfoPendanaan?.jumlahPembelian ?? '') ?? 0)}`}</td>
                          <td className="p-2 border border-gray-300 text-center">
                            <button
                              onClick={() => {
                                setSelectedPortfolio(index);
                                setIsShowOptions(!isShowOptions)
                              }}
                              className="w-full flex justify-center items-center text-[#262626] hover:scale-125 duration-200"
                            >
                              <HiDotsVertical />
                            </button>
                            {(isShowOptions) && (selectedPortfolio === index) && (
                              <div className={`absolute right-0 md:right-[50px] bottom-[${index * 40 + 80}px] md:bottom-[${index * 40 + 40}px] w-[300px] bg-white rounded-lg shadow-lg z-10 p-2`}>
                                <div className="text-sm text-gray-700 text-left">
                                  {menu?.map((option, i) => (
                                    <React.Fragment key={i}>
                                      <div
                                        className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${option?.color === 'red' ? 'text-[#DA2D1F]' : 'text-[#7C7C7C]'}`}
                                        onClick={async() => {
                                          setIsShowOptions(!isShowOptions)
                                          if (typeof option?.action === 'function') option?.action(true);
                                          if (option?.action === 'redirect') {
                                            await router.push(`/danamart/offer/prospectus/${portfolio?.pinjamanId}`)
                                          }
                                        }}
                                      >
                                        {option?.title}
                                      </div>
                                      {option.id === 4 && <hr className="my-1 border-t border-gray-300" />}
                                    </React.Fragment>
                                  ))}
                                </div>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={9} className="p-4 text-center text-gray-500">
                          {t(`${pathTranslation}.table.text1`)}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                {
                  portfolioData?.length > 0 &&
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
                }
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
      {isShowModalOfferInformation && (
        <ModalOfferInformation
          data={portfolioData[selectedPortfolio]?.informasiPenawaran}
          setIsShowModalOfferInformation={setIsShowModalOfferInformation}
          isShowModalOfferInformation={isShowModalOfferInformation}
        />
      )}
      {isShowModalFinancingInformation && (
        <ModalFinancingInformation
          data={portfolioData[selectedPortfolio]?.modalInfoPendanaan}
          setIsShowModalFinancingInformation={setIsShowModalFinancingInformation}
          isShowModalFinancingInformation={isShowModalFinancingInformation}
        />
      )}
      {isShowModalCostReturn && (
        <ModalCostReturn
          data={portfolioData[selectedPortfolio]?.modalInfoBiayaBunga}
          setIsShowModalCostReturn={setIsShowModalCostReturn}
          isShowModalCostReturn={isShowModalCostReturn}
        />
      )}
    </PageGradient>
  )
}

export default withAuthDanamart(Portfolio);