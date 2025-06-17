import AuthArrowDown from '@/assets/auth/AuthArrowDown.svg';
import AuthGlobeLanguage from '@/assets/auth/AuthGlobeLanguage.svg';
import SeedsLogo from '@/assets/landing-page/header/SeedsLogo.svg';
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography
} from '@material-tailwind/react';
import Image from 'next/image';

type Language = 'EN' | 'ID';

interface ILogoLanguage {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedLanguage: string;
  handleLanguageChange: (lang: Language) => void;
  className: string;
  menuClassName: string;
  step?: number;
}

const languageList = [
  { id: 1, language: 'ID' },
  { id: 2, language: 'EN' }
];

const LogoLanguage: React.FC<ILogoLanguage> = ({
  open,
  setOpen,
  selectedLanguage,
  handleLanguageChange,
  className,
  menuClassName,
  step
}: ILogoLanguage) => {
  return (
    <div className={`${className}`}>
      <Image src={SeedsLogo} alt="SeedsLogo" className="w-[84.41px] lg:w-fit hidden md:flex" />
      {
        step !== 2 &&
          <Menu open={open} handler={setOpen}>
            <MenuHandler>
              <Button
                ripple={false}
                className="flex justify-between items-center lg:w-[136.62px] w-[97px] bg-gradient-to-b from-[#177C62] to-[#3AC4A0] rounded-full lg:p-2.5 px-2.5 py-1"
              >
                <div className="flex lg:gap-1.5 gap-[3px] items-center">
                  <Image
                    src={AuthGlobeLanguage}
                    alt="AuthGlobeLanguage"
                    className="w-[19px] lg:w-fit"
                  />
                  <Typography className="font-normal font-poppins text-xl text-white">
                    {selectedLanguage}
                  </Typography>
                </div>
    
                <Image
                  src={AuthArrowDown}
                  alt="AuthArrowDown"
                  className={`w-[12px] lg:w-fit ${
                    open ? 'transition-all rotate-180' : 'transition-all rotate-0'
                  }`}
                />
              </Button>
            </MenuHandler>
            <MenuList
              className={`${menuClassName} min-w-fit flex-col items-center p-0 bg-transparent border-none shadow-none`}
            >
              {languageList
                .filter(item => item.language !== selectedLanguage)
                .map((item, index) => {
                  return (
                    <MenuItem
                      className="p-0 lg:w-[136.62px] w-[97px] bg-white rounded-full"
                      onClick={() => {
                        handleLanguageChange(item.language as 'EN' | 'ID');
                      }}
                      key={index.toString()}
                    >
                      <Button
                        ripple={false}
                        className="flex justify-between items-center lg:w-[136.62px] w-[97px] bg-gradient-to-b from-[#177C62] to-[#3AC4A0] rounded-full lg:p-2.5 px-2.5 py-1 hover:shadow-none shadow-none"
                      >
                        <div className="flex lg:gap-1.5 gap-[3px] items-center">
                          <Image
                            src={AuthGlobeLanguage}
                            alt="AuthGlobeLanguage"
                            className="w-[19px] lg:w-fit"
                          />
                          <Typography className="font-normal font-poppins text-xl text-white">
                            {item.language}
                          </Typography>
                        </div>
                      </Button>
                    </MenuItem>
                  );
                })}
            </MenuList>
          </Menu>
      }
    </div>
  );
};

export default LogoLanguage