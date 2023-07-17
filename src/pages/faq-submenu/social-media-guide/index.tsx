import CardGradient from '@/components/ui/card/CardGradient';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import useWindowInnerWidth from '@/hooks/useWindowInnerWidth';
import React from 'react';
import { useTranslation } from 'react-i18next';

const SocialMediaGuide: React.FC = () => {
  const { t } = useTranslation();
  const width = useWindowInnerWidth();
  return (
    <PageGradient
      defaultGradient
      className={`z-0 sm:relative sm:pb-20 overflow-hidden flex flex-col items-center w-full bottom-0  ${
        width !== undefined && width < 370
          ? 'w-full'
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
        className={`z-1 relative flex flex-col justify-center items-center py-4   sm:w-[90%] sm:rounded-[18px] sm:min-h-[36rem] ${
          width !== undefined && width < 600
            ? 'w-[95%]'
            : width !== undefined && width > 600
            ? 'w-[600px]'
            : ''
        } bg-white`}
      >
        {/* Social Media Guide section */}

        <div className=" font-18 leading-7 font-bold text-neutral-500   flex flex-col items-center ">
          {t('termAndCondition.socialMediaGuide.title')}
        </div>
        <div
          className={`z-3 lg:px-[10px] min-h-[calc(100vh-100px)] p-4 relative justify-center text-justify bg-opacity-100 border-white py-4 border-4 ${
            width !== undefined && width < 600
              ? 'w-[99%] overflow-x-auto'
              : width !== undefined && width < 500
              ? 'w-[99%] overflow-x-visible'
              : width !== undefined && width < 400
              ? 'w-[99%] overflow-x-visible'
              : width !== undefined && width > 600
              ? 'w-[600px] overflow-x-visible'
              : ''
          }  ${
            width !== undefined && width < 370
              ? 'h-[50rem]'
              : width !== undefined && width < 400
              ? 'h-[50rem]'
              : width !== undefined && width < 415
              ? 'h-[48rem]'
              : ''
          } bg-white`}
        >
          <br />
          <p className="font-bold font-14 leading-5 ">
            {t('faq.socialMediaGuide.lastUpdated')}
            <span className="text-purple-700">
              {t('termAndCondition.socialMediaGuide.date')}
            </span>
          </p>
          <br />
          <p className=" font-14 leading-5 text-justify">
            {t('termAndCondition.socialMediaGuide.overview')
              .split('\n')
              .map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                  <br />
                </React.Fragment>
              ))}
          </p>

          <div>
            {/* Guidelines */}
            <p className="font-bold">
              {t('termAndCondition.socialMediaGuide.content.rules.1.title')}
            </p>
            <ul className="list-disc pl-4 ml-6">
              {Array.from({ length: 3 }, (_, index) => (
                <li key={index}>
                  {t(
                    `termAndCondition.socialMediaGuide.content.rules.1.items.${
                      index + 1
                    }`
                  )}
                </li>
              ))}
            </ul>

            {/* Dont */}
            <p className="font-bold">
              {t('termAndCondition.socialMediaGuide.content.rules.2.title')}
            </p>
            <ul className="list-disc pl-4 ml-6">
              {Array.from({ length: 15 }, (_, index) => (
                <li key={index}>
                  {t(
                    `termAndCondition.socialMediaGuide.content.rules.2.items.${
                      index + 1
                    }`
                  )}
                </li>
              ))}
            </ul>

            {/* rules */}
            <p className="font-bold">
              {t('termAndCondition.socialMediaGuide.content.rules.3.title')}
            </p>
            <ul className="list-disc pl-4 ml-6">
              {Array.from({ length: 6 }, (_, index) => (
                <li key={index}>
                  {t(
                    `termAndCondition.socialMediaGuide.content.rules.3.items.${
                      index + 1
                    }`
                  )}
                </li>
              ))}
            </ul>

            {/* consequence */}
            <p className="font-bold">
              {t('termAndCondition.socialMediaGuide.content.rules.4.title')}
            </p>
            <ul className="list-disc pl-4 ml-6">
              {Array.from({ length: 1 }, (_, index) => (
                <p key={index}>
                  {t(
                    `termAndCondition.socialMediaGuide.content.rules.4.items.${
                      index + 1
                    }`
                  )}
                </p>
              ))}
            </ul>

            {/* agreement */}
            <p className="font-bold">
              {t('termAndCondition.socialMediaGuide.content.rules.5.title')}
            </p>
            <ul className="list-disc pl-4 ml-6">
              {Array.from({ length: 1 }, (_, index) => (
                <p key={index}>
                  {t(
                    `termAndCondition.socialMediaGuide.content.rules.5.items.${
                      index + 1
                    }`
                  )}
                </p>
              ))}
            </ul>
          </div>
        </div>
      </CardGradient>
    </PageGradient>
  );
};

export default SocialMediaGuide;
