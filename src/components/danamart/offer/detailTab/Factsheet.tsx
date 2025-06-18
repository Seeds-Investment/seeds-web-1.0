import { type DetailProspektus } from '@/utils/interfaces/danamart.interface';
import { Typography } from '@material-tailwind/react';
import { useTranslation } from 'react-i18next';

interface Props {
  detailProspektus: DetailProspektus;
}

const Factsheet: React.FC<Props> = ({ detailProspektus }) => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.offers.detail.tab.factsheet';

  const extractIframeUrl = (prospektus: string): string => {
    const match = prospektus.match(/src="([^"]+)"/);
    return match !== null ? match[1] : '';
  };

  return (
    <div className="w-full flex">
      {detailProspektus?.Data?.Prospektus !== 'DOKUMEN TIDAK ADA' ? (
        <iframe
          src={extractIframeUrl(detailProspektus?.Data?.Prospektus ?? '')}
          frameBorder="0"
          height="600px"
          width="100%"
          className="border border-gray-300 rounded-md"
        ></iframe>
      ) : (
        <Typography className="w-full text-center font-poppins">
          {t(`${pathTranslation}.text1`)}
        </Typography>
      )}
    </div>
  );
};

export default Factsheet;
