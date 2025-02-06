import { ProgressBusinessGreen, ProgressBusinessGrey, ProgressDistributionGreen, ProgressDistributionGrey, ProgressHandingCashGreen, ProgressHandingCashGrey, ProgressHandingSecurityGreen, ProgressHandingSecurityGrey, ProgressListingGreen, ProgressListingGrey, ProgressPrelistingGreen, ProgressPrelistingGrey, ProgressSigningGreen, ProgressSigningGrey } from "@/assets/danamart";
import { getOfferTimelineDate } from "@/helpers/dateFormat";
import LanguageContext from "@/store/language/language-context";
import { type TimelinePenawaran } from "@/utils/interfaces/danamart.interface";
import { Typography } from "@material-tailwind/react";
import Image from 'next/image';
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  timelinePenawaran: TimelinePenawaran;
}

const ProgressStep: React.FC<Props> = ({
  timelinePenawaran
}) => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.offers.detail.progress'
  const languageCtx = useContext(LanguageContext);
  const [currectStep, setCurrentStep] = useState<number>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getLastStepName = (): string => {
    if (timelinePenawaran?.Status === '7') {
      return t(`${pathTranslation}.text8`)
    } else if (timelinePenawaran?.Status === '8') {
      return t(`${pathTranslation}.text9`)
    } else if (timelinePenawaran?.Status === '13') {
      return t(`${pathTranslation}.text10`)
    } else if (timelinePenawaran?.Status === '14') {
      return t(`${pathTranslation}.text11`)
    } else if (timelinePenawaran?.Status === '16') {
      return t(`${pathTranslation}.text12`)
    } else {
      return t(`${pathTranslation}.text8`)
    }
  }

  useEffect(() => {
    if (timelinePenawaran?.Status === "7") {
      if (timelinePenawaran?.status_sla === "Pre-Listing") {
        setCurrentStep(1)
      } else if ((timelinePenawaran?.status_sla === "Listing") || (timelinePenawaran?.status_sla === "Pendanaan Selesai")) {
        setCurrentStep(2)
      } else if (timelinePenawaran?.status_sla === "Penyerahan Efek") {
        setCurrentStep(3)
      } else if (timelinePenawaran?.status_sla === "Tanda Tangan Perjanjian") {
        setCurrentStep(4)
      } else if (timelinePenawaran?.status_sla === "Penyerahan Dana") {
        setCurrentStep(5)
      } else if (timelinePenawaran?.status_sla === "Pendistribusian Efek") {
        setCurrentStep(6)
      } else if (timelinePenawaran?.status_sla === "Pembelian Selesai") {
        setCurrentStep(7)
      } 
    } else if (
      timelinePenawaran?.Status === "8" ||
      timelinePenawaran?.Status === "13" ||
      timelinePenawaran?.Status === "14" ||
      timelinePenawaran?.Status === "16"
    ) {
      setCurrentStep(7)
    }
  }, [timelinePenawaran])

  return (
    <div className="bg-white rounded-lg flex flex-col mb-8 gap-4">
      <Typography className="font-poppins text-xl font-semibold text-[#262626]">
        {t(`${pathTranslation}.text13`)}
      </Typography>
      <div className="w-full h-[150px] xl:h-[110px] overflow-x-auto">
        <div className="relative w-[700px] lg:w-full border-t-2 border-[#BDBDBD] mt-8">
          <div className="w-[700px] lg:w-full absolute top-[-25px] flex justify-between">
            {[
              { src: currectStep > 0 ? ProgressPrelistingGreen : ProgressPrelistingGrey, label: t(`${pathTranslation}.text1`), color: currectStep > 0 ? '#4FE6AF' : '#BDBDBD' },
              { src: currectStep > 1 ? ProgressListingGreen : ProgressListingGrey, label: timelinePenawaran?.status_sla !== 'Pendanaan Selesai' ? t(`${pathTranslation}.text2`) : t(`${pathTranslation}.text3`), color: currectStep > 1 ? '#4FE6AF' : '#BDBDBD' },
              { src: currectStep > 2 ? ProgressHandingSecurityGreen : ProgressHandingSecurityGrey, label: t(`${pathTranslation}.text4`), color: currectStep > 2 ? '#4FE6AF' : '#BDBDBD' },
              { src: currectStep > 3 ? ProgressSigningGreen : ProgressSigningGrey, label: t(`${pathTranslation}.text5`), color: currectStep > 3 ? '#4FE6AF' : '#BDBDBD' },
              { src: currectStep > 4 ? ProgressHandingCashGreen : ProgressHandingCashGrey, label: t(`${pathTranslation}.text6`), color: currectStep > 4 ? '#4FE6AF' : '#BDBDBD' },
              { src: currectStep > 5 ? ProgressDistributionGreen : ProgressDistributionGrey, label: t(`${pathTranslation}.text7`), color: currectStep > 5 ? '#4FE6AF' : '#BDBDBD' },
              { src: currectStep > 6 ? ProgressBusinessGreen : ProgressBusinessGrey, label: getLastStepName(), color: currectStep > 6 ? '#4FE6AF' : '#BDBDBD' },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center w-[calc(100%/7)] gap-2 relative"
                onMouseEnter={() => { setHoveredIndex(index); }}
                onMouseLeave={() => { setHoveredIndex(null); }}
              >
                {hoveredIndex === index && (
                  <div className="absolute top-[40px] bg-white border border-gray-300 rounded-md px-2 py-1 shadow-lg z-10 text-center">
                    <Typography className="font-poppins text-sm">
                      {languageCtx.language === 'ID'
                        ? getOfferTimelineDate(
                            new Date(timelinePenawaran?.beforeTimeline[index] ?? '2024-12-31T23:59:00Z'),
                            'id-ID'
                          )
                        : getOfferTimelineDate(
                            new Date(timelinePenawaran?.beforeTimeline[index] ?? '2024-12-31T23:59:00Z'),
                            'en-US'
                          )}
                    </Typography>
                  </div>
                )}
                <div className={`flex items-center justify-center w-[50px] h-[50px] bg-white border-2 rounded-full p-2 cursor-pointer`} style={{ borderColor: item.color }}>
                  <Image
                    src={item.src}
                    alt={item.label}
                    className="w-full h-auto object-cover"
                    width={100}
                    height={100}
                  />
                </div>
                <Typography className="font-poppins text-sm text-[#BDBDBD] text-center break-words whitespace-normal">
                  {item.label}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgressStep