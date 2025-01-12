import PhotoIdCard from '@/components/danamart/verify/photo-id-card';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import withAuthDanamart from '@/helpers/withAuthDanamart';
import React, { useState } from 'react';

const Verify = (): React.ReactElement => {
	const [step, setStep] = useState<string>('id-card');
	
  return (
    <PageGradient defaultGradient className="w-full">
      <div className="flex flex-col md:gap-8 gap-5 bg-white md:py-8 md:px-5 py-5 px-4 rounded-2xl">
				{
					step === 'id-card' &&
						<PhotoIdCard step={step} setStep={setStep}/>
				}
      </div>
    </PageGradient>
  );
};

export default withAuthDanamart(Verify);
