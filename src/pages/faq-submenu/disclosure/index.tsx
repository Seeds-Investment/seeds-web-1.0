import CardGradient from '@/components/ui/card/CardGradient';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import useWindowInnerWidth from '@/hooks/useWindowInnerWidth';
import { useTranslation } from 'react-i18next';

const Disclosure: React.FC = () => {
  const { t } = useTranslation();
  const width = useWindowInnerWidth();
  return (
    <PageGradient
      defaultGradient
      className={`z-0 sm:relative sm:pb-20  overflow-hidden flex flex-col items-center w-full bottom-0  ${
        width !== undefined && width < 370
          ? 'w-[90%]'
          : width !== undefined && width < 500
          ? 'w-[90%]'
          : width !== undefined && width < 400
          ? 'w-[40%]'
          : width !== undefined && width > 600
          ? 'w-[600px]'
          : ''
      } ${
        width !== undefined && width < 370
          ? 'h-[50rem]'
          : width !== undefined && width < 400
          ? 'h-[50rem]'
          : width !== undefined && width < 415
          ? 'h-[48rem]'
          : ''
      } bg-white`}
    >
      <CardGradient
        defaultGradient
        className={`z-1 relative overflow-hidden flex flex-col justify-center items-center py-4  sm:w-[90%] sm:rounded-[18px] sm:min-h-[36rem] ${
          width !== undefined && width < 600
            ? 'w-full'
            : width !== undefined && width < 500
            ? 'w-[90%]'
            : width !== undefined && width < 400
            ? 'w-[40%]'
            : width !== undefined && width > 600
            ? 'w-[600px]'
            : ''
        } bg-white`}
      >
        {/* Closure section */}
        <div
          className={`z-2 lg:px-[10px] min-h-[calc(100vh-100px)] relative justify-center text-justify bg-opacity-100  border-white py-4 border-4 ${
            width !== undefined && width < 600
              ? 'w-[95%]'
              : width !== undefined && width < 500
              ? 'w-[90%]'
              : width !== undefined && width < 400
              ? 'w-[40%]'
              : width !== undefined && width > 600
              ? 'w-[600px]'
              : ''
          } ${
            width !== undefined && width < 370
              ? 'h-[50rem]'
              : width !== undefined && width < 400
              ? 'h-[50rem]'
              : width !== undefined && width < 415
              ? 'h-[48rem]'
              : ''
          } bg-white`}
        >
          <div className="font-poppins font-18 leading-7 font-bold text-neutral-500 flex flex-col items-center">
            {t('faq.disclosure.title')}
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
      </CardGradient>
    </PageGradient>
  );
};

export default Disclosure;
