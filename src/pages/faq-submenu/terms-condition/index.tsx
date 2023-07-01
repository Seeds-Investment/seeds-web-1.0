import CAccordion from '@/components/CAccordion';
import CardGradient from '@/components/ui/card/CardGradient';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import useWindowInnerWidth from '@/hooks/useWindowInnerWidth';
import id from 'public/locales/id';
import { useTranslation } from 'react-i18next';

const TersmCondition: React.FC = () => {
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
        <p className="font-semibold text-lg font-poppins font-18 text-neutral-600 text-center">
          {t('termAndCondition.title')}
        </p>
        <div
          className={` lg:px-[10px] min-h-[calc(100vh-100px)] justify-center text-justify bg-opacity-100 bg-neutral-100 border-white py-4 border-4 ${
            width !== undefined && width > 600 ? 'w-[600px]' : 'w-full'
          } 
          ${
            width !== undefined && width < 370
              ? 'h-[38rem]'
              : width !== undefined && width < 400
              ? 'h-[45rem]'
              : width !== undefined && width < 415
              ? 'h-[48rem]'
              : ''
          } bg-white`}
        >
          <p
            className={`mb-5 font-semibold font-poppins font-14 font-600 leading-5 ${
              width !== undefined && width < 370
                ? 'h-[38rem]'
                : width !== undefined && width < 400
                ? 'h-[45rem]'
                : width !== undefined && width < 415
                ? 'h-[48rem]'
                : ''
            } bg-white`}
          >
            {t('termAndCondition.lastupdate')}{' '}
            <span className="text-purple-600">
              {t('termAndCondition.updatedate')}
            </span>
          </p>
          {t('termAndCondition.announcement')}
          <br />
          {Object.keys(id.termAndCondition.tnc.title).map((key, idx) => (
            <CAccordion
              key={key}
              title={t(`termAndCondition.tnc.title.${idx + 1}`)}
              description={
                <div className="flex flex-col self-stretch text-sm font-poppins text-14 leading-20 text-[#262626]">
                  {t(`termAndCondition.tnc.desc.${idx + 1}`)
                    .split('\n')
                    .map((paragraph, index) => (
                      <>
                        <p key={index}>{paragraph}</p>
                        <br />
                      </>
                    ))}
                </div>
              }
            />
          ))}
        </div>
      </CardGradient>
    </PageGradient>
  );
};

export default TersmCondition;
