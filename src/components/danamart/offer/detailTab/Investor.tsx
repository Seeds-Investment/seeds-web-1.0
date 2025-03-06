import { TabInvestorAverage, TabInvestorBiggest, TabInvestorFewest, TabInvestorTotal } from "@/assets/danamart";
import { type DetailProspektus } from "@/utils/interfaces/danamart.interface";
import { Typography } from "@material-tailwind/react";
import Image from 'next/image';
import { useTranslation } from "react-i18next";
import { standartCurrency } from '../../../../helpers/currency';

interface Props {
  detailProspektus: DetailProspektus;
}

const Investor: React.FC<Props> = ({
  detailProspektus
}) => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.offers.detail.tab.investorCorner'
  return (
    <>
      <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-2 lg:gap-4">
        <div className="flex justify-start items-center w-full mt-4 p-4 gap-4 rounded-lg shadow-xl">
          <div className="flex justify-center items-center w-[70px] h-[70px] border-2 border-[#4FE6AF] bg-[#EDFDF1] rounded-full p-4 flex-shrink-0">
            <Image
              src={TabInvestorTotal}
              alt="TabInvestorTotal"
              className="w-full h-auto"
              width={1000}
              height={1000}
            />
          </div>
          <div>
            <Typography className="font-poppins text-[#677788]">
              {t(`${pathTranslation}.text1`)}
            </Typography>
            <Typography className="font-poppins font-semibold text-lg text-[#262626]">
              {detailProspektus?.Data?.investorCornerCount ?? 0}
            </Typography>
          </div>
        </div>
        <div className="flex justify-start items-center w-full mt-4 p-4 gap-4 rounded-lg shadow-xl">
          <div className="flex justify-center items-center w-[70px] h-[70px] border-2 border-[#4FE6AF] bg-[#EDFDF1] rounded-full p-4 flex-shrink-0">
            <Image
              src={TabInvestorBiggest}
              alt="TabInvestorBiggest"
              className="w-full h-auto"
              width={1000}
              height={1000}
            />
          </div>
          <div>
            <Typography className="font-poppins text-[#677788]">
              {t(`${pathTranslation}.text2`)}
            </Typography>
            <Typography className="font-poppins font-semibold text-lg text-[#262626]">
              {standartCurrency(detailProspektus?.Data?.investorCornerMax) ?? 0}
            </Typography>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-2 lg:gap-4">
        <div className="flex justify-start items-center w-full mt-4 p-4 gap-4 rounded-lg shadow-xl">
          <div className="flex justify-center items-center w-[70px] h-[70px] border-2 border-[#4FE6AF] bg-[#EDFDF1] rounded-full p-4 flex-shrink-0">
            <Image
              src={TabInvestorFewest}
              alt="TabInvestorFewest"
              className="w-full h-auto"
              width={1000}
              height={1000}
            />
          </div>
          <div>
            <Typography className="font-poppins text-[#677788]">
              {t(`${pathTranslation}.text3`)}
            </Typography>
            <Typography className="font-poppins font-semibold text-lg text-[#262626]">
              {standartCurrency(detailProspektus?.Data?.investorCornerMin ?? 0)}
            </Typography>
          </div>
        </div>
        <div className="flex justify-start items-center w-full mt-4 p-4 gap-4 rounded-lg shadow-xl">
          <div className="flex justify-center items-center w-[70px] h-[70px] border-2 border-[#4FE6AF] bg-[#EDFDF1] rounded-full p-4 flex-shrink-0">
            <Image
              src={TabInvestorAverage}
              alt="TabInvestorAverage"
              className="w-full h-auto"
              width={1000}
              height={1000}
            />
          </div>
          <div>
            <Typography className="font-poppins text-[#677788]">
              {t(`${pathTranslation}.text4`)}
            </Typography>
            <Typography className="font-poppins font-semibold text-lg text-[#262626]">
              {standartCurrency(detailProspektus?.Data?.investorCornerAvg ?? 0)}
            </Typography>
          </div>
        </div>
      </div>
    </>
  )
}

export default Investor