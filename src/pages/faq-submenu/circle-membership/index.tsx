import CAccordion from '@/components/CAccordion';
import CardGradient from '@/components/ui/card/CardGradient';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import useWindowInnerWidth from '@/hooks/useWindowInnerWidth';
import id from 'public/locales/id';
import { useTranslation } from 'react-i18next';

const CircleMembership: React.FC = () => {
  const width = useWindowInnerWidth();
  const { t } = useTranslation();

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
        <div className="w-full bg-white rounded-2xl flex justify-center p-5  ">
          <div className=" w-[600px] lg:w-1/2  border-neutral-50 border-0 p-10">
            <p className="font-semibold text-lg font-poppins leading-7 text-[18px]  text-stone-900 text-center">
              {t('faq.circleMembership.title')}
            </p>
            <br />
            <p className="font-bold font-14 leading-5 font-poppins">
              {t('faq.circleMembership.lastUpdated')}
              <span className="text-purple-700">
                {t('faq.circleMembership.date')}
              </span>
            </p>
            <br />
            <p className="font-poppins font-14 leading-5 text-justify">
              {t('faq.circleMembership.overview')}
            </p>
            <br />

            <div className="">
              {Object.keys(id.faq.circleMembership.content.title).map(
                (key, idx) => (
                  <CAccordion
                    key={key}
                    title={t(`faq.circleMembership.content.title.${idx + 1}`)}
                    titleColor="#3AC4A0"
                    description={
                      <div className="flex flex-col self-stretch text-sm font-poppins text-14 leading-20 text-[#262626]">
                        {t(`faq.circleMembership.content.desc.${idx + 1}`)}
                      </div>
                    }
                  />
                )
              )}
            </div>
          </div>
        </div>
      </CardGradient>
    </PageGradient>
  );
};

export default CircleMembership;
