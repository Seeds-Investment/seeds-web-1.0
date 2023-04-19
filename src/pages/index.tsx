import LanguageSwitcher from '@/components/LanguageSwitcher';
import AuthLayout from '@/components/layouts/AuthLayout';
import { useTranslation } from 'react-i18next';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

export default function Home(): React.ReactElement {
  const { t } = useTranslation();
  return (
    <AuthLayout>
      <LanguageSwitcher />
      {t('greeting', { name: 'Seeds!' })}
    </AuthLayout>
  );
}
