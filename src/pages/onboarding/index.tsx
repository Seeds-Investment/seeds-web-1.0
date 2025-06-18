import AuthBoarding from '@/components/onboarding/AuthBoarding';
import AuthCarousel from '@/components/onboarding/AuthCarousel';
import AuthLayout from '@/containers/onboarding/OnboardingLayout';
import { getOnboardingQuestion } from '@/repository/onboarding.repository';
import LanguageContext from '@/store/language/language-context';
import { type OnboardQuestionI } from '@/utils/interfaces/onboarding.interface';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface Params {
  page: number;
  limit: number;
  language: string;
}

export interface AnswerOption {
  header: string;
  body?: string;
  image?: string;
};

const AuthIndex: React.FC = () => {
  const languageCtx = useContext(LanguageContext);
  const [step, setStep] = useState<number>(0);
  const [onboardQuestion, setOnboardQuestion] = useState<OnboardQuestionI>();
  const [answers, setAnswers] = useState<Record<number, AnswerOption[]>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const element = <AuthCarousel className="flex md:hidden" />;
  const form = <AuthBoarding step={step} setStep={setStep} className="mt-4" />;
  
  const [params, setParams] = useState<Params>({
    page: 1,
    limit: 10,
    language: languageCtx?.language === 'EN' ? 'en' : 'id'
  });

  const fetchOnboardingQuestion = async (params: Params): Promise<void> => {
    try {
      const response = await getOnboardingQuestion(params);
      setOnboardQuestion(response)
    } catch (error) {
      toast.error(`Error fetching data: ${error as string}`);
    }
  };
  
  useEffect(() => {
    if (step === 2) {
      void fetchOnboardingQuestion(params);
    }
  }, [step, params]);

  return (
    onboardQuestion !== undefined && currentQuestionIndex !== undefined ?
      <AuthLayout 
        onboardQuestion={onboardQuestion}
        currentQuestionIndex={currentQuestionIndex}
        setCurrentQuestionIndex={setCurrentQuestionIndex}
        step={step} 
        setStep={setStep}
        answers={answers}
        setAnswers={setAnswers} 
        elementChild={element} 
        formChild={form}
        setParams={setParams}
      />
      :
      <AuthLayout 
        currentQuestionIndex={currentQuestionIndex}
        setCurrentQuestionIndex={setCurrentQuestionIndex}
        step={step} 
        setStep={setStep}
        answers={answers}
        setAnswers={setAnswers} 
        elementChild={element} 
        formChild={form} 
        setParams={setParams}
      />
  );
  
};

export default AuthIndex;
