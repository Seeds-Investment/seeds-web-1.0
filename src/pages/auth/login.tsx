import SeedyAuthLogin from '@/assets/auth/SeedyAuthLogin.png';
import AuthLogin from '@/components/auth/AuthLogin';
import AuthLayout from '@/containers/auth/AuthLayout';
import Image from 'next/image';

const Login: React.FC = () => {
  const element = (
    <Image
      src={SeedyAuthLogin}
      alt="SeedyAuthLogin"
      className="md:hidden flex self-center w-1/2"
    />
  );
  const form = <AuthLogin />;
  return <AuthLayout elementChild={element} formChild={form} />;
};

export default Login;
