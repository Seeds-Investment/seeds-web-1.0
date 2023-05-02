import CButton from '@/components/CButton';
import { Card, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { Flags } from 'public/assets/images';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SeedsLogo from '../../assets/images/SeedsTypo.png';

interface Props {
  children: React.ReactNode;
  className: string;
}

const FormCard: React.FC<Props> = ({ children, className }: Props) => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string): void => {
    void i18n.changeLanguage(lng);
  };

  const [dropdownVisibility, setDropdownVisibility] = useState<boolean>(false);
  const [selectedLang, setSelectedLang] = useState<string>(
    i18n.language === 'id' ? 'ID' : 'US'
  );

  return (
    <Card
      className={` bg-gradient-to-br from-white   bg-opacity-10 flex-col border rounded-3xl  border-white ${className}`}
    >
      <div className="flex justify-between px-9 pt-6">
        <Image src={SeedsLogo} alt="seeds-typograph" width={120} />
        <div>
          <CButton
            onClick={() => {
              setDropdownVisibility(!dropdownVisibility);
            }}
            className={`bg-white  rounded-xl
            w-[6rem]
            lg:w-[8rem]
            shadow-xl flex items-center gap-1 lg:gap-2`}
          >
            <Image
              src={Flags[selectedLang]}
              alt="UK-flag"
              className="rounded-full hidden lg:block w-6 h-6"
            />
            <Typography className="text-black font-bold">
              {selectedLang === 'ID' ? 'ID' : 'EN'}
            </Typography>
            <div className="w-4">
              <svg
                viewBox="0 0 19 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.56093 8.23855L7.56076 8.2387L9.81026 10.2973L12.0603 8.2387L12.0599 8.23835L18.8105 2.06002L16.5605 -9.83538e-08L9.81055 6.17916L3.06062 -6.88451e-07L0.810547 2.06002L7.56093 8.23855Z"
                  fill="black"
                />
              </svg>
            </div>
          </CButton>
          {dropdownVisibility && (
            <div
              onClick={() => {
                setSelectedLang(selectedLang === 'ID' ? 'US' : 'ID');
                changeLanguage(selectedLang === 'ID' ? 'en' : 'id');
                setDropdownVisibility(!dropdownVisibility);
              }}
              className="absolute bg-white flex w-[6rem] hover:shadow-2xl gap-1 lg:gap-3 lg:w-[8rem] rounded-b-xl p-5"
            >
              <Image
                src={Flags[selectedLang === 'ID' ? 'US' : 'ID']}
                alt="flag-icon"
                className="rounded-full  w-6 h-6"
              />
              <Typography className="font-bold text-black">
                {selectedLang === 'ID' ? 'EN' : 'ID'}
              </Typography>
            </div>
          )}
        </div>
      </div>
      {children}
    </Card>
  );
};

export default FormCard;
