import AuthBoarding from '@/components/auth/AuthBoarding';
import AuthCarousel from '@/components/auth/AuthCarousel';
import AuthLayout from '@/containers/auth/AuthLayout';

const AuthIndex: React.FC = () => {
  const element = <AuthCarousel className="flex md:hidden" />;
  const form = <AuthBoarding className="p-4 md:py-[139.5px]" />;
  return <AuthLayout elementChild={element} formChild={form} />;
};

export default AuthIndex;
