import PageGradient from '@/components/ui/page-gradient/PageGradient';
import FeeMembership from '@/containers/social/payment/FeeMembership';
import PaymentMethod from '@/containers/social/payment/PaymentMethod';
import TnC from '@/containers/social/payment/TnC';
import withAuth from '@/helpers/withAuth';
import { getUserInfo } from '@/repository/profile.repository';
import { promoValidate } from '@/repository/promo.repository';
import { getDetailPostSocial } from '@/repository/social.respository';
import { selectPromoCodeValidationResult, setPromoCodeValidationResult } from '@/store/redux/features/promo-code';
import { type UserInfo } from '@/utils/interfaces/tournament.interface';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

interface paramsValidatePromo {
  promo_code: string;
  item_price: any;
  spot_type: string;
  item_id: string;
}

const PaymentContent: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const [step, setStep] = useState<string>('fee');
  const [data, setData] = useState<any>({});
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [userInfo, setUserInfo] = useState<UserInfo>();
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

  const promoCodeValidationResult = useSelector(
    selectPromoCodeValidationResult
  );

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
      toast.error(`${error as string}`);
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
      toast.error(`${error as string}`);
    }
  };

  const fetchData = async (): Promise<void> => {
    try {
      const dataInfo = await getUserInfo();
      setUserInfo(dataInfo);
    } catch (error) {
      toast.error(`Error fetching data: ${error as string}`);
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

  useEffect(() => {
    fetchData()
      .then()
      .catch(() => {});
    
    if (promoCodeValidationResult?.id !== id) {
      dispatch(setPromoCodeValidationResult(0));
    }
  }, []);

  return (
    <PageGradient defaultGradient className="w-full">
      {step === 'fee' ? (
        userInfo !== undefined &&
          <FeeMembership
            setStep={setStep}
            detailPost={data}
            changeValue={handleChangeValue}
            errorMessage={errorMessage}
            userInfo={userInfo}
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
