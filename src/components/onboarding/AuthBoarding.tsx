import withRedirect from '@/helpers/withRedirect';
import { Button } from '@material-tailwind/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  className: string;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const AuthBoarding: React.FC<Props> = ({ className, step, setStep }: Props) => {
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    window.localStorage.removeItem('isGuest');
    window.localStorage.removeItem('isBannerOpen');
  }, []);

  return (
    <div className={`flex flex-col items-center gap-4 ${className} md:pb-32`}>
      <Button
        onClick={() => {
          setStep(1)
        }}
        className="font-semibold font-poppins text-base text-white bg-gradient-to-b from-[#3AC4A0] to-[#177C62] border-2 border-[#88FFA69E] rounded-xl normal-case w-full md:w-[400px]"
      >
        {t('onboarding.welcomeButton.start')}
      </Button>
      <Button
        onClick={async () => {
          await withRedirect(router, router.query, '/auth/verification');
        }}
        className="font-semibold font-poppins text-base bg-gradient-to-b from-[#3AC4A0] to-[#177C62] border-2 border-[#3AC4A0] bg-clip-text text-transparent rounded-xl normal-case w-full md:w-[400px]"
      >
        {t('onboarding.welcomeButton.login')}
      </Button>
    </div>
  );
};

export default AuthBoarding;
