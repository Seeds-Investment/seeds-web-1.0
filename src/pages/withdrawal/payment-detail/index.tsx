import PaymentDetail from '@/components/quiz/PaymentDetail';
import withAuth from '@/helpers/withAuth';

const PaymentIndex: React.FC = () => {
  return <PaymentDetail />;
};

export default withAuth(PaymentIndex);
