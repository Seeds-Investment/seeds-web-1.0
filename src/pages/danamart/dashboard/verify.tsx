import AccountInformation from '@/components/danamart/verify/AccountInformation';
import FinancialInformation from '@/components/danamart/verify/FinancialInformation';
import PhotoIdCard from '@/components/danamart/verify/PhotoIdCard';
import PhotoSelfie from '@/components/danamart/verify/PhotoSelfie';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import withAuthDanamart from '@/helpers/withAuthDanamart';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { ArrowTaillessLeft } from 'public/assets/vector';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Verify = (): React.ReactElement => {
  const { t } = useTranslation();
  const [step, setStep] = useState<number>(2);

  const titles: Record<number, string> = {
    1: t('danamart.verification.photoIdCardTittle'),
    2: t('danamart.verification.accountInformationTittle'),
    3: t('danamart.verification.financialInformationTittle'),
    4: t('danamart.verification.photoSelfieTittle')
  };

  const getBarClass = (currentStep: number): string =>
    currentStep <= step ? 'bg-seeds-button-green' : 'bg-[#E9E9E9]';

  return (
    <PageGradient defaultGradient className="w-full">
      <div className="w-full flex flex-col md:gap-8 gap-5 bg-white md:py-10 md:px-6 py-5 px-4 rounded-2xl">
        <div className="w-full flex justify-start items-center gap-4">
          <Image
            src={ArrowTaillessLeft}
            alt="ArrowTaillessLeft"
            width={16}
            height={16}
            className="cursor-pointer"
            onClick={() => {
              if (step > 1) setStep(step - 1);
            }}
          />
          <Typography className="font-poppins font-semibold text-md">
            {titles[step]}
          </Typography>
          <Typography className="font-poppins font-normal text-sm text-[#BDBDBD]">
            {step} of 4
          </Typography>
        </div>
        <div className="w-full flex gap-4">
          {[1, 2, 3, 4].map(currentStep => (
            <div
              key={currentStep}
              className={`h-[6px] w-full ${getBarClass(currentStep)}`}
            />
          ))}
        </div>
        {step === 1 && <PhotoIdCard step={step} setStep={setStep} />}
        {step === 2 && <AccountInformation step={step} setStep={setStep} />}
        {step === 3 && <FinancialInformation step={step} setStep={setStep} />}
        {step === 4 && <PhotoSelfie step={step} setStep={setStep} t={t} />}
      </div>
    </PageGradient>
  );
};

export default withAuthDanamart(Verify);
