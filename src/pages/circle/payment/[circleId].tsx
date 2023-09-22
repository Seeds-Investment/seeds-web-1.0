import CirclePaymentLayout from '@/components/layouts/CirclePaymentLayout';
import Loading from '@/components/popup/Loading';
import PaymentList from '@/containers/play/payment/PaymentList';
import {
  getDetailCircle,
  getStatusCircle
} from '@/repository/circleDetail.repository';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ChooseSubs from './ChooseSubs';

const CirclePayment: React.FC = () => {
  const router = useRouter();
  const circleId: string | any = router.query.circleId;
  const [pages, setPages] = useState('chooseSubs');
  const [dataPost, setDataPost]: any = useState();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const height = useWindowInnerHeight();
  const fetchDetailCircle = async (): Promise<void> => {
    try {
      setIsLoading(true);

      const { data } = await getDetailCircle({ circleId });

      setDataPost(data);
    } catch (error: any) {
      console.error('Error fetching Circle Post:', error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchUserInfo = async (): Promise<void> => {
    try {
      setIsLoading(true);

      const { data } = await getStatusCircle({ circleId });
      const { status }: any = data;
      if (status === 'accepted') {
        router.push(`/circle`).catch(error => {
          console.log(error);
        });
      }
    } catch (error: any) {
      console.error('Error fetching Circle Post:', error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    void fetchDetailCircle();
    void fetchUserInfo();
  }, [circleId]);

  const handlePages = (): any => {
    if (pages === 'chooseSubs') {
      return <ChooseSubs setPages={setPages} dataPost={dataPost} />;
    } else if (pages === 'terms') {
      return <div></div>;
    }
  };
  return (
    <>
      {isLoading ? <Loading /> : <></>}
      {pages === 'choosePayment' ? (
        <PaymentList dataPost={dataPost} />
      ) : (
        <CirclePaymentLayout>
          <div className="bg-white w-screen sm:w-full h-fit mb-10 rounded-xl">
            {handlePages()}
          </div>
        </CirclePaymentLayout>
      )}
    </>
  );
};

export default CirclePayment;
