import withAuth from '@/helpers/withAuth';
import PaymentStatus from '@/containers/play/payment-status';

const PlayPaymentStatus = (): JSX.Element => {
  return <PaymentStatus />;
};

export default withAuth(PlayPaymentStatus);