import PageGradient from '@/components/ui/page-gradient/PageGradient';
import FeeMembership from '@/containers/social/payment/FeeMembership';
import PaymentMethod from '@/containers/social/payment/PaymentMethod';
import TnC from '@/containers/social/payment/TnC';
import withAuth from '@/helpers/withAuth';
import { promoValidate } from '@/repository/promo.repository';
import { getDetailPostSocial } from '@/repository/social.respository';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface paramsValidatePromo {
  promo_code: string;
  item_price: any;
  spot_type: string;
  item_id: string;
}

const PaymentContent: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [step, setStep] = useState<string>('fee');
  const [data, setData] = useState<any>({});
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [promo, setPromo] = useState<any>({
    final_price: 0,
    promo_code: '',
    total_discount: 0
  });
  const [params, setParams] = useState<paramsValidatePromo>({
    promo_code: '',
    item_price: '',
    spot_type: 'PREMIUM CONTENT',
    item_id: ''
  });

  const fetchDetailAsset = async (): Promise<void> => {
    try {
      if (typeof id === 'string') {
        const response = await getDetailPostSocial(id);
        setData(response.data);
        setParams(prevParams => ({
          ...prevParams,
          item_id: id,
          item_price: response.data.premium_fee
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeValue = (event: any): void => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setParams(prevParams => ({
      ...prevParams,
      [name]: value
    }));
  };

  const fetchValidatePromo = async (): Promise<void> => {
    try {
      const response = await promoValidate(params);
      setPromo(response);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Invalid Promo Code');
      console.error(error);
    }
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearch(params.promo_code);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [params.promo_code]);

  useEffect(() => {
    if (params.promo_code !== '') {
      void fetchValidatePromo();
    }
  }, [debouncedSearch]);

  useEffect(() => {
    if (id !== null) {
      void fetchDetailAsset();
    }
  }, [id]);

  return (
    <PageGradient defaultGradient className="w-full">
      {step === 'fee' ? (
        <FeeMembership
          setStep={setStep}
          detailPost={data}
          changeValue={handleChangeValue}
          errorMessage={errorMessage}
        />
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
        <PaymentMethod data={data} promo={promo} />
      ) : null}
    </PageGradient>
  );
};

export default withAuth(PaymentContent);
