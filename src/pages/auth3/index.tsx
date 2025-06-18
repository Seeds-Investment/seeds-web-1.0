import AuthBoarding from '@/components/onboarding/AuthBoarding';
import AuthCarousel from '@/components/onboarding/AuthCarousel';
import AuthLayout from '@/containers/auth3/AuthLayout';
import { useState } from 'react';

export interface AnswerOption {
  header: string;
  body?: string;
  image?: string;
};

const AuthIndex: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const element = <AuthCarousel className="flex md:hidden" />;
  const form = <AuthBoarding step={step} setStep={setStep} className="mt-4" />;

  return (
    <AuthLayout 
      elementChild={element} 
      formChild={form}
    />
  );
  
};

export default AuthIndex;