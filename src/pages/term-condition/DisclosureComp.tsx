import useWindowInnerWidth from '@/hooks/useWindowInnerWidth';
import router from 'next/router';
import { useTranslation } from 'react-i18next';

const Disclosure: React.FC = () => {
  const { t } = useTranslation();
  const width = useWindowInnerWidth();
  const cancelHandler = async (): Promise<void> => {
    try {
      await router.push('/faq-submenu');
    } catch (error) {
      console.error('Error navigating to FAQ submenu:', error);
    }
  };
  return (
    <div className="max-h-96 overflow-auto pr-4">
      <div className="w-full  rounded-2xl flex flex-col justify-center items-center">
        <div className="font-poppins font-18 leading-7 font-bold text-neutral-500 flex flex-col items-center">
          {t('faq.disclosure.title')}
        </div>
      </div>

      <br />
      <p className="font-bold font-14 leading-5 font-poppins">
        {t('faq.disclosure.lastUpdated')}
        <span className="text-purple-700">{t('faq.disclosure.date')}</span>
      </p>
      <br />
      <p className="font-poppins font-14 leading-5 text-justify">
        {t('faq.disclosure.overview')}
      </p>
    </div>
  );
};

export default Disclosure;
