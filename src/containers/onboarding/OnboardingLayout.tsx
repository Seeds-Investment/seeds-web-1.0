/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import LeftBanner from '@/assets/onboarding/onboard-welcome-0.png';
import Ornament from '@/assets/onboarding/welcome-ornament.png';
import AuthCarousel from '@/components/onboarding/AuthCarousel';
import LogoLanguage from '@/components/onboarding/LogoLanguage';
import OnboardingQuestions from '@/components/onboarding/OnboardingQuestions';
import QuestionDone from '@/components/onboarding/QuestionDone';
import QuestionPreparation from '@/components/onboarding/QuestionPreparation';
import SplashScreen from '@/components/onboarding/SplashScreen';
import Redirecting from '@/components/popup/Redirecting';
import { setTranslationToLocalStorage } from '@/helpers/translation';
import { type AnswerOption } from '@/pages/onboarding';
import LanguageContext from '@/store/language/language-context';
import { getLocalStorage } from '@/utils/common/localStorage';
import { type OnboardQuestionI } from '@/utils/interfaces/onboarding.interface';
import {
  Typography
} from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { type ReactElement, useCallback, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

interface Params {
  page: number;
  limit: number;
  language: string;
}

interface IAuthLayout {
  elementChild: ReactElement;
  formChild: ReactElement;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  answers: Record<number, AnswerOption[]>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<number, AnswerOption[]>>>;
  onboardQuestion?: OnboardQuestionI;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  setParams: React.Dispatch<React.SetStateAction<Params>>;
}

const OnboardingLayout: React.FC<IAuthLayout> = ({
  elementChild,
  formChild,
  step,
  setStep,
  onboardQuestion,
  answers,
  setAnswers,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  setParams
}: IAuthLayout) => {
  const { t } = useTranslation();
  const languageCtx = useContext(LanguageContext);
  const [selectedLanguage, setSelectedLanguage] = useState<'EN' | 'ID'>('EN');
  const router = useRouter();
  const [height, setHeight] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [openRedirecting, setOpenRedirecting] = useState<boolean>(false);
  const [isShowSplash, setIsShowSplash] = useState<boolean>(true);
  const [isFading, setIsFading] = useState<boolean>(false);

  const [showQuestion, setShowQuestion] = useState<boolean>(false);
  
  const handleLanguageChange = async (language: 'EN' | 'ID'): Promise<void> => {
    setSelectedLanguage(language);
    languageCtx.languageHandler(language);
    await setTranslationToLocalStorage(language);
    setOpen(!open);
    setParams(prev => ({
      ...prev,
      language: languageCtx?.language === 'EN' ? 'id' : 'en'
    }));    
  };

  const handleRedirecting = (): void => {
    setOpenRedirecting(!openRedirecting);
  };

  const getLastTranslation = useCallback(async (): Promise<void> => {
    try {
      if (typeof window !== 'undefined') {
        const translation = getLocalStorage('translation', 'EN');
        languageCtx.languageHandler(translation as 'EN' | 'ID');
        setSelectedLanguage(translation);
      }
    } catch {
      toast.error('Error in translation');
    }
  }, []);

  useEffect(() => {
    setHeight(window.innerHeight);
    void getLastTranslation();

    const timeout1 = setTimeout(() => {
      setIsFading(true);
    }, 2500);
  
    const timeout2 = setTimeout(() => {
      setIsShowSplash(false);
    }, 3300);

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

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, []);

  useEffect(() => {
    if (step === 1) {
      const timer = setTimeout(() => {
        setShowQuestion(true);
      }, 3000);
  
      return () => { clearTimeout(timer); };
    }
  }, [step]);

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
        
        {isShowSplash && (
          <SplashScreen isFading={isFading} />
        )}

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
              step={step}
            />
            
            {
              step === 0 ? (
                <>
                  {/* Wide Screen */}
                  <AuthCarousel className="flex" />
                  {formChild}
                </>
              ) : step === 1 ? (
                <QuestionPreparation showQuestion={showQuestion} setStep={setStep} />
              ) : ((step === 2 && onboardQuestion?.data !== undefined && currentQuestionIndex !== undefined) ? (
                <OnboardingQuestions 
                  setStep={setStep}
                  onboardQuestion={onboardQuestion}
                  answers={answers}
                  setAnswers={setAnswers}
                  currentQuestionIndex={currentQuestionIndex}
                  setCurrentQuestionIndex={setCurrentQuestionIndex}
                />
              ) : step === 3 && (
                <QuestionDone 
                  setStep={setStep}
                  setAnswers={setAnswers}
                  setCurrentQuestionIndex={setCurrentQuestionIndex}
                />
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OnboardingLayout;
