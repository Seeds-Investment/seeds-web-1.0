import withAuth from '@/helpers/withAuth';
import PaymentList from '@/containers/play/payment/PaymentList';

const PlayPayment = (): JSX.Element => {
  return <PaymentList />;
};

export default withAuth(PlayPayment);
