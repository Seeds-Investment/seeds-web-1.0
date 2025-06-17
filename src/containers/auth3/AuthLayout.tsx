/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import LeftBanner from '@/assets/onboarding/onboard-welcome-0.png';
import Ornament from '@/assets/onboarding/welcome-ornament.png';
import Signup from '@/components/auth3/Signup';
import LogoLanguage from '@/components/onboarding/LogoLanguage';
import Redirecting from '@/components/popup/Redirecting';
import { setTranslationToLocalStorage } from '@/helpers/translation';
import { getLocalStorage } from '@/utils/common/localStorage';
import {
  Typography
} from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { type ReactElement, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

interface IAuthLayout {
  elementChild: ReactElement;
  formChild: ReactElement;
}

const AuthLayout: React.FC<IAuthLayout> = ({
  elementChild,
  formChild
}: IAuthLayout) => {
  const { t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<'EN' | 'ID'>('EN');
  const router = useRouter();
  const [height, setHeight] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [openRedirecting, setOpenRedirecting] = useState<boolean>(false);
  
  const handleLanguageChange = async (language: 'EN' | 'ID'): Promise<void> => {
    setSelectedLanguage(language);
    await setTranslationToLocalStorage(language);
    setOpen(!open);
  };

  const handleRedirecting = (): void => {
    setOpenRedirecting(!openRedirecting);
  };

  const getLastTranslation = useCallback(async (): Promise<void> => {
    try {
      if (typeof window !== 'undefined') {
        const translation = getLocalStorage('translation', 'EN');
        setSelectedLanguage(translation);
      }
    } catch {
      toast.error('Error in translation');
    }
  }, []);

  useEffect(() => {
    setHeight(window.innerHeight);
    void getLastTranslation();

    if (
      localStorage.getItem('accessToken') !== null &&
      parseInt(localStorage.getItem('expiresAt') as string) > Date.now() / 1000
    ) {
      if (window.location.pathname !== '/auth/change-phone-number') {
        router
          .push('/homepage')
          .then()
          .catch(() => {});
        handleRedirecting();
      }
    } else {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('accessToken-danamart');
    }
  }, []);

  return (
    <>
      <Redirecting open={openRedirecting} handleOpen={handleRedirecting} />
      <div
        className={`flex md:mt-0 flex-row items-center ${
          height >= 700 ? 'h-full ' : ''
        }`}
      >
        <div className="hidden md:flex flex-col md:justify-center md:w-[37%] w-full h-full bg-gradient-to-b from-[#3AC4A0] to-[#177C62] shrink-0 relative ">
          <Image src={Ornament} alt="Ornament" className="w-[330px] h-auto absolute top-0 right-0 z-0" />
          <div className="flex flex-col justify-center items-center gap-4 md:gap-0">
            <div className='flex flex-col justify-center items-center md:justify-start md:items-start md:px-[15%]'>
              <Image src={LeftBanner} alt="LeftBanner" className="w-[300px] md:w-[375px] h-auto z-10" />
              <Typography className="font-semibold font-poppins xl:text-4xl text-xl text-white mt-16 text-left">
                {t('onboarding.leftBanner.text1')}
              </Typography>
              <Typography className="font-poppins xl:text-xl text-lg text-white text-left mt-2">
                {t('onboarding.leftBanner.text2')}
              </Typography>
            </div>
            {elementChild}
          </div>

          {/* Mobile */}
          <div className="w-full md:hidden p-[18px] rounded-t-[35px] h-full">
            <div className="bg-gradient-to-t rounded-[19px] from-[#48C0ABB2] via-[#66B5C2B2] to-[#B798FFB2] p-[2px] ">
              <div className="flex relative justify-center items-center bg-white w-full rounded-[19px]">
                {formChild}
              </div>
            </div>
          </div>
        </div>

        {/* Wide Screen */}
        <div className="flex justify-center items-center md:items-start w-full md:w-[63%] h-full relative overflow-y-scroll md:pt-16">
          <Image
            src={Ornament}
            alt="Ornament"
            className="absolute md:hidden top-0 right-0 w-[60%] h-auto z-0"
          />
          <div className="w-full px-4 md:px-0 md:w-4/5 flex flex-col gap-0 z-10">
            {/* Wide Screen */}
            <LogoLanguage
              open={open}
              setOpen={setOpen}
              selectedLanguage={selectedLanguage}
              handleLanguageChange={handleLanguageChange}
              className="flex justify-end md:justify-between mt-8 md:mt-0"
              menuClassName="flex"
            />
            
            <Signup />
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
