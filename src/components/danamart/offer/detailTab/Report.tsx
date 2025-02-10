import { ArrowLeftPaginationGray, ArrowLeftPaginationGreen, ArrowRightPaginationGray, ArrowRightPaginationGreen } from "@/assets/danamart";
import { getOfferReport } from "@/repository/danamart/offers.repository";
import { type ReportI } from "@/utils/interfaces/danamart/offers.interface";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from 'next/image';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { toast } from "react-toastify";
import ModalDetailReport from "../ModalDetailReport";

interface Props {
  activeTab: string;
}

const Report: React.FC<Props> = ({ activeTab }) => {
  const router = useRouter();
  const id = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id;
  const [reportData, setReportData] = useState<ReportI[]>([]);
  const [entries, setEntries] = useState<number>(7);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isShowDetailReport, setIsShowDetailReport] = useState<boolean>(false);
  const [selectedReport, setSelectedReport] = useState<number>(0);

  const getOffers = async (id: string): Promise<void> => {
    try {
      const response = await getOfferReport({ pinjaman_id: id });
      setReportData(response?.data?.data)
    } catch (error) {
      toast.error(`Error fetching data: ${error as string}`);
    }
  };

  useEffect(() => {
    if (activeTab === 'report' && (id !== undefined)) {
      void getOffers(id);
    }
  }, [id, activeTab]);

  const filteredData = reportData?.filter((report) => {
    const reportString = JSON.stringify(report).toLowerCase();
    return reportString.includes(searchQuery.toLowerCase());
  });

  const totalPages = Math.ceil(filteredData.length / entries);
  const startIndex = (currentPage - 1) * entries;
  const paginatedData = filteredData.slice(startIndex, startIndex + entries);

  return (
    <div className="flex flex-col gap-2">
      <div className="w-full flex flex-col md:flex-row justify-between items-center mb-4 gap-4 md:gap-0">
        <div className="relative w-full md:max-w-[200px]">
          <input
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            id="search"
            type="text"
            name="search"
            placeholder="Search"
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
          <option value={7}>Show 7 entries</option>
          <option value={10}>Show 10 entries</option>
          <option value={25}>Show 25 entries</option>
          <option value={50}>Show 50 entries</option>
          <option value={75}>Show 75 entries</option>
          <option value={100}>Show 100 entries</option>
        </select>
      </div>
      <div className="w-full p-4 rounded-lg shadow-lg font-poppins text-sm">
        <table className="min-w-full border border-gray-300 rounded-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-2 border-b border-gray-300">Report Date</th>
              <th className="text-left p-2 border-b border-gray-300">Report Type</th>
              <th className="text-left p-2 border-b border-gray-300"></th>
            </tr>
          </thead>
          <tbody>
            {paginatedData?.length > 0 ? (
              paginatedData.map((report, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-2 border-b border-gray-300">{report.tglLaporan}</td>
                  <td className="p-2 border-b border-gray-300">{report.jenisLaporan}</td>
                  <td className="p-2 border-b border-gray-300">
                    <button
                      onClick={() => {
                        setIsShowDetailReport(true)
                        setSelectedReport(index)
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
                  No reports found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4">
          <span>
            Showing {startIndex + 1} to {(startIndex + entries) < filteredData.length ? startIndex + entries : filteredData.length} of {filteredData.length} entries
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
      {isShowDetailReport && (
        <ModalDetailReport
          reportData={reportData}
          selectedReport={selectedReport}
          setIsShowDetailReport={setIsShowDetailReport}
          isShowDetailReport={isShowDetailReport}
        />
      )}
    </div>
  );
};

export default Report;
