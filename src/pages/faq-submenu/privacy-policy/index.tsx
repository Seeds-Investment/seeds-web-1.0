import CardGradient from '@/components/ui/card/CardGradient';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import useWindowInnerWidth from '@/hooks/useWindowInnerWidth';
import id from 'public/locales/id';
import { useTranslation } from 'react-i18next';

const PrivacyPolicy: React.FC = () => {
  const { t } = useTranslation();
  const width = useWindowInnerWidth();
  return (
    <PageGradient
      defaultGradient
      className="z-0 sm:relative sm:pb-20 absolute overflow-hidden flex flex-col items-center w-full bottom-0"
    >
      <CardGradient
        defaultGradient
        className={`relative overflow-hidden flex flex-col items-center py-4 w-full sm:w-[90%] sm:rounded-[18px] sm:min-h-[36rem] ${
          width !== undefined && width < 370
            ? 'h-[38rem]'
            : width !== undefined && width < 400
            ? 'h-[45rem]'
            : width !== undefined && width < 415
            ? 'h-[48rem]'
            : ''
        } bg-white`}
      >
        {/* Closure section */}
        <div className="w-[600px] bg-white opacity-100 h-full border-4 border-white flex flex-col  ">
          <div className="font-poppins font-18 leading-7 font-bold text-neutral-500 flex flex-col items-center">
            {t('faq.privacy.title')}
          </div>

          <br />
          <p className="font-bold font-14 leading-5 font-poppins">
            {t('faq.privacy.lastUpdated')}
            <span className="text-purple-700">{t('faq.disclosure.date')}</span>
          </p>
          <br />
          <p className="font-bold font-18 font-poppins">Overview:</p>
          <br />
          <div>
            {id.faq.privacy.overview.title.map((title, index) => (
              <div key={index}>
                <p className="font-bold">{t(title)}</p>
                <p className="text-justify">
                  {t(id.faq.privacy.overview.desc[index])}
                </p>
                {index === 2 && (
                  <p>
                    When you sign up for the Seeds app, we may collect a variety
                    of personal data that includes the following:
                    <br />
                    Your name
                    <br />
                    No Identity (KTP / SIM / Passport)
                    <br />
                    Gender
                    <br />
                    Home address
                    <br />
                    Phone number
                    <br />
                    Your email address
                    <br />
                    Your Phone`&apos;`s Contact List
                    <br />
                    Your Savings Account Number
                    <br />
                    Your social media account (Facebook)
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardGradient>
    </PageGradient>
  );
};

export default PrivacyPolicy;
