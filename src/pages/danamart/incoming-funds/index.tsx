import { ArrowLeftPaginationGray, ArrowLeftPaginationGreen, ArrowRightPaginationGray, ArrowRightPaginationGreen, ArrowTailRightGreen, BankBCA, BankBNI, BankBRI, BankMandiri, BankPermata } from '@/assets/danamart';
import ModalDetailBank from '@/components/danamart/incoming-funds/ModalDetailBank';
import ModalDetailIncome from '@/components/danamart/incoming-funds/ModalDetailIncome';
import ModalDownloadReport from '@/components/danamart/incoming-funds/ModalDownloadReport';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import { decryptResponse } from '@/helpers/cryptoDecrypt';
import { standartCurrency } from '@/helpers/currency';
import withAuthDanamart from '@/helpers/withAuthDanamart';
import { getProfileUser } from '@/repository/danamart/danamart.repository';
import { getIncomingFunds } from '@/repository/danamart/incoming-funds.repository';
import { getUserInfo } from '@/repository/profile.repository';
import LanguageContext from '@/store/language/language-context';
import { bankInstructionsEnglish } from '@/utils/_static/bank-en';
import { bankInstructionsIndonesian } from '@/utils/_static/bank-id';
import { type UserProfile } from '@/utils/interfaces/danamart.interface';
import { type IncomingFundsData } from '@/utils/interfaces/danamart/incoming-funds.interface';
import { type UserInfo } from '@/utils/interfaces/tournament.interface';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button, Typography } from '@material-tailwind/react';
import Image, { type StaticImageData } from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaRegEye } from 'react-icons/fa';
import { toast } from 'react-toastify';

const IncomingFunds = (): React.ReactElement => {
  const { t } = useTranslation();
  const languageCtx = useContext(LanguageContext);
  const pathTranslation = 'danamart.incomingFunds'
  const [incomingFunds, setIncomingFunds] = useState<IncomingFundsData[]>([]);
  const [entries, setEntries] = useState<number>(7);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedIncome, setSelectedIncome] = useState<number>(0);
  const [userData, setUserData] = useState<UserInfo>();
  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isShowModalDetailIncomeFunds, setIsShowModalDetailIncomeFunds] = useState<boolean>(false);
  const [isShowDownloadReport, setIsShowDownloadReport] = useState<boolean>(false);
  const [isShowDetailBank, setIsShowDetailBank] = useState<boolean>(false);
  const [selectedBankIndex, setSelectedBankIndex] = useState<number>(0);
  const [userProfileData, setUserProfileData] = useState<UserProfile>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getIncomingFundsData = async (): Promise<void> => {
    try {
      const response = await getIncomingFunds();
      if (response?.data?.StatusCode === '200') {
        setIncomingFunds(response?.data?.data)
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
  
  const fetchUserProfile = async (): Promise<void> => {
    try {
      const profile = await getProfileUser();
      if (profile?.status === 200) {
        const decryptedProfile = JSON.parse(
          decryptResponse(profile.data) !== null
            ? decryptResponse(profile.data)
            : profile.data
        );
        setUserProfileData(decryptedProfile);
      }
    } catch (error) {
      toast.error(t('danamart.dashboard.errorGetUserProfile'));
    }
  };

  const bankList = [
    {
      id: 0,
      name: 'BCA',
    },
    {
      id: 1,
      name: 'MANDIRI',
    },
    {
      id: 2,
      name: 'BRI',
    },
    {
      id: 3,
      name: 'PERMATA',
    },
    {
      id: 4,
      name: 'BNI',
    },
    {
      id: 5,
      name: 'LAIN',
    }
  ]
  
  const handleBankLogo = (bankName: string): StaticImageData => {
    if (bankName === 'BCA') return BankBCA;
    if (bankName === 'MANDIRI') return BankMandiri;
    if (bankName === 'PERMATA') return BankPermata;
    if (bankName === 'BNI') return BankBNI;
    return BankBRI;
  };

  const filteredData = incomingFunds?.filter((incomingFund) => {
    const incomingFundString = JSON.stringify(incomingFund).toLowerCase();
    return incomingFundString.includes(searchQuery.toLowerCase());
  });

  const totalPages = Math.ceil(filteredData.length / entries);
  const startIndex = (currentPage - 1) * entries;
  const paginatedData = filteredData.slice(startIndex, startIndex + entries);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([getIncomingFundsData(), fetchUserProfile(), fetchUserInfo()]).finally(() => {
      setIsLoading(false);
    });
  }, []);
  
  const handleSort = (column: keyof IncomingFundsData): void => {
    const newOrder = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortOrder(newOrder);

    if (column === "tgl_deposit" || column === "ket") {
      setIncomingFunds((prevData) =>
        [...prevData].sort((a, b) => {
          let valueA = a[column];
          let valueB = b[column];

          valueA = valueA.replace(/<br\s*\/?>/g, "").trim();
          valueB = valueB.replace(/<br\s*\/?>/g, "").trim();
          return newOrder === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        })
      )
    } else if (column === "jml_deposit") {
      setIncomingFunds((prevData) =>
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
  
  const bankInstructions = languageCtx?.language === 'ID' ? bankInstructionsIndonesian : bankInstructionsEnglish;
  const selectedBank = bankList[selectedBankIndex]?.name as keyof typeof bankInstructions;
  const bankData = selectedBank in bankInstructions ? bankInstructions[selectedBank] : [];

  return (
    <PageGradient defaultGradient className="w-full">
      <div className="w-full bg-white flex flex-col px-5 py-6 rounded-lg">
        <Typography className="font-poppins md:text-2xl text-lg font-semibold text-[#262626] mb-4">
          {t(`${pathTranslation}.title`)}
        </Typography>

        {
          !isLoading ?
            <div>
              <Typography className="font-poppins text-lg font-semibold text-seeds-button-green mb-4">
                {t(`${pathTranslation}.text1`)}
              </Typography>
              <div className="w-full flex flex-wrap gap-4">
                {bankList?.map((bank, index) => (
                  <div
                    key={index}
                    onClick={() => { 
                      setIsShowDetailBank(true)
                      setSelectedBankIndex(index)
                    }}
                    className="flex justify-center items-center w-[calc(50%-0.5rem)] border border-[#E9E9E9] rounded-lg py-8 cursor-pointer"
                  >
                    {
                      bank?.name !== 'LAIN' ?
                        <Image
                          src={handleBankLogo(bank?.name)}
                          alt="BankLogo"
                          className="w-[60%] lg:w-[40%] h-auto object-cover"
                          width={1000}
                          height={1000}
                        />
                        :
                        <div className='flex flex-col md:flex-row gap-2 justify-center items-center'>
                          <Typography className="font-poppins text-md md:text-2xl font-semibold text-seeds-button-green">
                            {t(`${pathTranslation}.text2`)}
                          </Typography>
                          <Image
                            src={ArrowTailRightGreen}
                            alt="BankLogo"
                            className="w-[20px] h-auto object-cover text-seeds-button-green"
                            width={1000}
                            height={1000}
                        />
                        </div>
                    }
                  </div>
                ))}
              </div>
              <div className='flex justify-center items-center md:justify-end md:items-end'>
                <Button
                  onClick={() => { setIsShowDownloadReport(true) }}
                  className='w-full md:w-fit flex gap-2 justify-center items-center rounded-full bg-seeds-button-green border-[1px] text-sm font-semibold capitalize text-white transition-all font-poppins mt-6'
                >
                  {t(`${pathTranslation}.text3`)}
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
                        <th className="text-left p-2 border border-gray-300 cursor-pointer" onClick={() => { handleSort('tgl_deposit'); }}>{t(`${pathTranslation}.table.text6`)}</th>
                        <th className="text-left p-2 border border-gray-300 cursor-pointer" onClick={() => { handleSort('jml_deposit'); }}>{t(`${pathTranslation}.table.text7`)}</th>
                        <th className="text-left p-2 border border-gray-300 cursor-pointer hidden md:table-cell" onClick={() => { handleSort('ket'); }}>{t(`${pathTranslation}.table.text8`)}</th>
                        <th className="text-left p-2 border border-gray-300 md:hidden table-cell"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedData?.length > 0 ? (
                        paginatedData?.map((income, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="p-2 border border-gray-300">{income?.tgl_deposit}</td>
                            <td className="p-2 border border-gray-300 text-right">{`${userData?.preferredCurrency ?? 'IDR'} ${standartCurrency(Number(income?.jml_deposit ?? '0') ?? 0)}`}</td>
                            <td className="p-2 border border-gray-300 hidden md:table-cell">{income?.ket}</td>
                            <td className="p-2 border border-gray-300 text-center md:hidden table-cell">
                              <button
                                onClick={() => {
                                  setIsShowModalDetailIncomeFunds(true)
                                  setSelectedIncome(index)
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
                          <td colSpan={3} className="p-4 text-center text-gray-500">
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
      {isShowModalDetailIncomeFunds && (
        <ModalDetailIncome
          data={incomingFunds[selectedIncome]}
          setIsShowModalDetailIncomeFunds={setIsShowModalDetailIncomeFunds}
          isShowModalDetailIncomeFunds={isShowModalDetailIncomeFunds}
          currency={userData?.preferredCurrency ?? 'IDR'}
        />
      )}
      {isShowDetailBank && userProfileData !== undefined && (
        <ModalDetailBank
          setIsShowDetailBank={setIsShowDetailBank}
          isShowDetailBank={isShowDetailBank}
          bankList={bankList}
          selectedBankIndex={selectedBankIndex}
          userProfileData={userProfileData}
          bankData={bankData}
        />
      )}
      {isShowDownloadReport && userProfileData !== undefined && (
        <ModalDownloadReport
          setIsShowDownloadReport={setIsShowDownloadReport}
          isShowDownloadReport={isShowDownloadReport}
          userProfileData={userProfileData}
        />
      )}
    </PageGradient>
  )
}

export default withAuthDanamart(IncomingFunds);