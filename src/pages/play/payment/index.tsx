import PaymentList from '@/containers/play/payment/PaymentList';
import withAuth from '@/helpers/withAuth';

const PlayPayment = (): JSX.Element => {
  return <PaymentList monthVal="1 month" />;
};

export default withAuth(PlayPayment);
