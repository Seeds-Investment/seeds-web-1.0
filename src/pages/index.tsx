import LanguageSwitcher from '@/components/LanguageSwitcher';
import AuthLayout from '@/components/layouts/AuthLayout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

export default function Home(): React.ReactElement {
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('isRegistering') === 'true') {
      router
        .push('/auth/register')
        .then()
        .catch(() => {});
    }
  }, [router]);

  return (
    <AuthLayout>
      <>
        <LanguageSwitcher />
        {t('greeting', { name: 'Seeds!' })}
      </>
    </AuthLayout>
  );
}
