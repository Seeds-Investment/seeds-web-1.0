import PageGradient from '@/components/ui/page-gradient/PageGradient';
import FeeMembership from '@/containers/social/payment/FeeMembership';
import PaymentMethod from '@/containers/social/payment/PaymentMethod';
import TnC from '@/containers/social/payment/TnC';
import { getDetailPostSocial } from '@/repository/social.respository';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const PaymentContent: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [step, setStep] = useState<string>('fee');
  const [data, setData] = useState<any>({});

  const fetchDetailAsset = async (): Promise<void> => {
    try {
      if (typeof id === 'string') {
        const response = await getDetailPostSocial(id);
        setData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id !== null) {
      void fetchDetailAsset();
    }
  }, [id]);

  return (
    <PageGradient defaultGradient className="w-full">
      {step === 'fee' ? (
        <FeeMembership setStep={setStep} detailPost={data} />
      ) : step === 'tnc' ? (
        <div className="lg:mx-20">
          <TnC
            stepBack={() => {
              setStep('fee');
            }}
            stepNext={() => {
              setStep('payment');
            }}
          />
        </div>
      ) : step === 'payment' ? (
        <PaymentMethod data={data} />
      ) : null}
    </PageGradient>
  );
};

export default PaymentContent;
