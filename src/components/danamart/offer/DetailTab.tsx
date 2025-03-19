import {
  TabDiscussGray,
  TabDiscussGreen,
  TabFactsheetGray,
  TabFactsheetGreen,
  TabInvestorGray,
  TabInvestorGreen,
  TabNewsGray,
  TabNewsGreen,
  TabOverviewGray,
  TabOverviewGreen,
  TabReportGray,
  TabReportGreen
} from '@/assets/danamart';
import { type DetailProspektus } from '@/utils/interfaces/danamart.interface';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Discuss from './detailTab/Discuss';
import Factsheet from './detailTab/Factsheet';
import Investor from './detailTab/Investor';
import News from './detailTab/News';
import Overview from './detailTab/Overview';
import Report from './detailTab/Report';

interface Props {
  detailProspektus: DetailProspektus;
}

const DetailTab: React.FC<Props> = ({ detailProspektus }) => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.offers.detail.tab.title';
  const [activeTab, setActiveTab] = useState<string>('overview');

  return (
    <div className="flex flex-col gap-4 mt-6 mb:mt-8">
      {/* Tab */}
      <div className="w-full flex justify-start xl:justify-between items-end flex-wrap">
        <div
          onClick={() => {
            setActiveTab('overview');
          }}
          className={`flex justify-center items-center gap-2 py-2 px-4 cursor-pointer ${
            activeTab === 'overview' ? 'border-b-[3px] border-[#27A590]' : ''
          }`}
        >
          <div className="flex items-center justify-center w-[35px] h-[35px] cursor-pointer">
            <Image
              src={
                activeTab === 'overview' ? TabOverviewGreen : TabOverviewGray
              }
              alt={
                activeTab === 'overview'
                  ? 'TabOverviewGreen'
                  : 'TabOverviewGray'
              }
              className="w-full h-auto object-cover"
              width={100}
              height={100}
            />
          </div>
          <Typography
            className={`font-poppins ${
              activeTab === 'overview' ? 'text-[#27A590] font-medium' : ''
            }`}
          >
            {t(`${pathTranslation}.text1`)}
          </Typography>
        </div>
        <div
          onClick={() => {
            setActiveTab('investor');
          }}
          className={`flex justify-center items-center gap-2 py-2 px-4 cursor-pointer ${
            activeTab === 'investor' ? 'border-b-[3px] border-[#27A590]' : ''
          }`}
        >
          <div className="flex items-center justify-center w-[35px] h-[35px] cursor-pointer">
            <Image
              src={
                activeTab === 'investor' ? TabInvestorGreen : TabInvestorGray
              }
              alt={
                activeTab === 'investor'
                  ? 'TabInvestorGreen'
                  : 'TabInvestorGray'
              }
              className="w-full h-auto object-cover"
              width={100}
              height={100}
            />
          </div>
          <Typography
            className={`font-poppins ${
              activeTab === 'investor' ? 'text-[#27A590] font-medium' : ''
            }`}
          >
            {t(`${pathTranslation}.text2`)}
          </Typography>
        </div>
        <div
          onClick={() => {
            setActiveTab('news');
          }}
          className={`flex justify-center items-center gap-2 py-2 px-4 cursor-pointer ${
            activeTab === 'news' ? 'border-b-[3px] border-[#27A590]' : ''
          }`}
        >
          <div className="flex items-center justify-center w-[35px] h-[35px] cursor-pointer">
            <Image
              src={activeTab === 'news' ? TabNewsGreen : TabNewsGray}
              alt={activeTab === 'news' ? 'TabNewsGreen' : 'TabNewsGray'}
              className="w-full h-auto object-cover"
              width={100}
              height={100}
            />
          </div>
          <Typography
            className={`font-poppins ${
              activeTab === 'news' ? 'text-[#27A590] font-medium' : ''
            }`}
          >
            {t(`${pathTranslation}.text3`)}
          </Typography>
        </div>
        <div
          onClick={() => {
            setActiveTab('discuss');
          }}
          className={`flex justify-center items-center gap-2 py-2 px-4 cursor-pointer ${
            activeTab === 'discuss' ? 'border-b-[3px] border-[#27A590]' : ''
          }`}
        >
          <div className="flex items-center justify-center w-[35px] h-[35px] cursor-pointer">
            <Image
              src={activeTab === 'discuss' ? TabDiscussGreen : TabDiscussGray}
              alt={
                activeTab === 'discuss' ? 'TabDiscussGreen' : 'TabDiscussGray'
              }
              className="w-full h-auto object-cover"
              width={100}
              height={100}
            />
          </div>
          <Typography
            className={`font-poppins ${
              activeTab === 'discuss' ? 'text-[#27A590] font-medium' : ''
            }`}
          >
            {t(`${pathTranslation}.text4`)}
          </Typography>
        </div>
        <div
          onClick={() => {
            setActiveTab('factsheet');
          }}
          className={`flex justify-center items-center gap-2 py-2 px-4 cursor-pointer ${
            activeTab === 'factsheet' ? 'border-b-[3px] border-[#27A590]' : ''
          }`}
        >
          <div className="flex items-center justify-center w-[35px] h-[35px] cursor-pointer">
            <Image
              src={
                activeTab === 'factsheet' ? TabFactsheetGreen : TabFactsheetGray
              }
              alt={
                activeTab === 'factsheet'
                  ? 'TabFactsheetGreen'
                  : 'TabFactsheetGray'
              }
              className="w-full h-auto object-cover"
              width={100}
              height={100}
            />
          </div>
          <Typography
            className={`font-poppins ${
              activeTab === 'factsheet' ? 'text-[#27A590] font-medium' : ''
            }`}
          >
            {t(`${pathTranslation}.text5`)}
          </Typography>
        </div>
        <div
          onClick={() => {
            setActiveTab('report');
          }}
          className={`flex justify-center items-center gap-2 py-2 px-4 cursor-pointer ${
            activeTab === 'report' ? 'border-b-[3px] border-[#27A590]' : ''
          }`}
        >
          <div className="flex items-center justify-center w-[35px] h-[35px] cursor-pointer">
            <Image
              src={activeTab === 'report' ? TabReportGreen : TabReportGray}
              alt={activeTab === 'report' ? 'TabReportGreen' : 'TabFReportGray'}
              className="w-full h-auto object-cover"
              width={100}
              height={100}
            />
          </div>
          <Typography
            className={`font-poppins ${
              activeTab === 'report' ? 'text-[#27A590] font-medium' : ''
            }`}
          >
            {t(`${pathTranslation}.text6`)}
          </Typography>
        </div>
      </div>

      {/* Content */}
      <div>
        {activeTab === 'overview' ? (
          <Overview detailProspektus={detailProspektus} />
        ) : activeTab === 'investor' ? (
          <Investor detailProspektus={detailProspektus} />
        ) : activeTab === 'news' ? (
          <News detailProspektus={detailProspektus} />
        ) : activeTab === 'discuss' ? (
          <Discuss idPembiayaan={detailProspektus?.Data?.idPinjaman} />
        ) : activeTab === 'factsheet' ? (
          <Factsheet detailProspektus={detailProspektus} />
        ) : (
          <Report activeTab={activeTab} />
        )}
      </div>
    </div>
  );
};

export default DetailTab;
