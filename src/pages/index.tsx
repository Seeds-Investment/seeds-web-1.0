import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

export default function Home(): React.ReactElement {
  const { t } = useTranslation();
  return (
    <>
      <LanguageSwitcher />
      {t('greeting', { name: 'Seeds!' })}
    </>
  );
}
