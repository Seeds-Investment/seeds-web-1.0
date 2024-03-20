import { loginGuest } from '@/repository/auth.repository';
import { Button, Typography } from '@material-tailwind/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

interface IAuthBoading {
  className: string;
}

const AuthBoarding: React.FC<IAuthBoading> = ({ className }: IAuthBoading) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { quizId, withdrawal } = useRouter().query;
  const { t } = useTranslation();

  const handleGuest = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await loginGuest();
      if (response.status === 200) {
        window.localStorage.setItem('isBannerOpen', 'true');
        window.localStorage.setItem('isGuest', 'true');

        window.localStorage.removeItem('accessToken');
        window.localStorage.removeItem('keepMeLoggedIn');
        window.localStorage.removeItem('refreshToken');
        window.localStorage.removeItem('expiresAt');

        router.push('/homepage');
      }
    } catch (error: any) {
      toast(error, { type: 'error' });
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    window.localStorage.removeItem('isGuest');
    window.localStorage.removeItem('isBannerOpen');
  }, []);

  return (
    <div className={`flex flex-col items-center gap-8 ${className}`}>
      <Button
        onClick={handleGuest}
        className="font-semibold font-poppins text-base text-white bg-[#3AC4A0] rounded-full capitalize p-3.5 sm:px-24 sm:w-full w-full"
      >
        {t('authBoarding.guest1')}
        <span className="lowercase">{t('authBoarding.guest2')}</span>
        {t('authBoarding.guest3')}
      </Button>

      <Typography className="text-center font-normal font-poppins md:text-lg sm:text-base text-sm text-[#262626]">
        {t(`authBoarding.term`)}
        <br />
        <Link href={'/term-condition'} className="text-[#3AC4A0]">
          {t(`authBoarding.term2`)}
        </Link>
      </Typography>
      <div className="flex gap-4 justify-center">
        <Link
          href={
            quizId !== undefined
              ? `/auth/login?quizId=${quizId as string}`
              : withdrawal !== undefined
              ? `/auth/login?withdrawal=${withdrawal as string}`
              : '/auth/login'
          }
        >
          <Button className="font-semibold font-poppins text-[#6750A3] text-sm bg-[#E0E0E091] rounded-full sm:w-[163.5px] w-[139.5px] capitalize">
            {t(`authBoarding.login`)}
          </Button>
        </Link>
        <Link
          href={
            quizId !== undefined
              ? `/auth/register?quizId=${quizId as string}`
              : withdrawal !== undefined
              ? `/auth/register?withdrawal=${withdrawal as string}`
              : '/auth/register'
          }
        >
          <Button className="font-semibold font-poppins text-white text-sm bg-[#3AC4A0] rounded-full sm:w-[163.5px] w-[139.5px] capitalize">
            {t(`authBoarding.signup`).split(' ')[0]}{' '}
            <span className="lowercase">
              {t(`authBoarding.signup`).split(' ')?.[1]}
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AuthBoarding;
