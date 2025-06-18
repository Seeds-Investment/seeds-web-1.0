import { DanamartLogo } from '@/assets/danamart';
import { type DetailProspektus } from '@/utils/interfaces/danamart.interface';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

interface Props {
  detailProspektus: DetailProspektus;
}

const News: React.FC<Props> = ({ detailProspektus }) => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.offers.detail.tab.news';
  return (
    <div className="w-full flex flex-col">
      {detailProspektus?.Data?.KabarTerbaru?.length === 0 ? (
        <Typography className="w-full text-center font-poppins">
          {t(`${pathTranslation}.text1`)}
        </Typography>
      ) : (
        detailProspektus?.Data?.KabarTerbaru?.map((item, index) => (
          <div key={index} className="mb-4">
            <div className="flex flex-col md:flex-row gap-2 justify-between items-start md:items-center mb-4">
              <div className="flex gap-4 justify-center items-center">
                <div className="flex items-center justify-center w-[35px] h-[35px] cursor-pointer">
                  <Image
                    src={DanamartLogo}
                    alt="Danamart Logo"
                    className="w-full h-auto object-cover"
                    width={100}
                    height={100}
                  />
                </div>
                <Typography className="font-poppins font-semibold text-[#262626]">
                  {item.name}
                </Typography>
              </div>
              <Typography className="font-poppins font-normal text-[#262626]">
                {item.datetime}
              </Typography>
            </div>
            <div
              className="font-poppins text-[#262626]"
              dangerouslySetInnerHTML={{ __html: item.info_update }}
            />
            {index < detailProspektus?.Data?.KabarTerbaru?.length - 1 && (
              <hr className="my-4 border-t border-gray-300" />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default News;
