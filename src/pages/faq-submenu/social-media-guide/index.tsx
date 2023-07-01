import CardGradient from '@/components/ui/card/CardGradient';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import useWindowInnerWidth from '@/hooks/useWindowInnerWidth';
import id from 'public/locales/id';
import React from 'react';
import { useTranslation } from 'react-i18next';

const SocialMediaGuide: React.FC = () => {
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
        {/* Social Media Guide section */}
        <div className="w-[600px] bg-white opacity-100 border-4 border-white font-poppins flex flex-col  ">
          <div className=" font-18 leading-7 font-bold text-neutral-500 flex flex-col items-center ">
            {t('faq.socialMediaGuide.title')}
          </div>

          <br />
          <p className="font-bold font-14 leading-5 ">
            {t('faq.socialMediaGuide.lastUpdated')}
            <span className="text-purple-700">
              {t('faq.socialMediaGuide.date')}
            </span>
          </p>
          <br />
          <p className=" font-14 leading-5 text-justify">
            {t('faq.socialMediaGuide.overview')
              .split('\n')
              .map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                  <br />
                </React.Fragment>
              ))}
          </p>
          <div className="w-full">
            {Object.values(id.faq.socialMediaGuide.content.rules).map(
              (content, idx) => (
                <div key={idx}>
                  <p className="font-bold">{content.title}</p>
                  {idx !== 3 && idx !== 4 ? (
                    <ul>
                      {Object.values(content.items).map((item, index) => (
                        <li className="text-justify list-decimal" key={index}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <>
                      {Object.values(content.items).map((item, index) => (
                        <p className="text-justify" key={index}>
                          {' '}
                          {item}
                        </p>
                      ))}
                    </>
                  )}
                  <br />
                </div>
              )
            )}
          </div>
        </div>
      </CardGradient>
    </PageGradient>
  );
};

export default SocialMediaGuide;
