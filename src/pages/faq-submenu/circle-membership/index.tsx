import CAccordion from '@/components/CAccordion';
import CardGradient from '@/components/ui/card/CardGradient';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import useWindowInnerWidth from '@/hooks/useWindowInnerWidth';
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
              {t('termAndCondition.circleMembership.title')}
            </p>
            <br />
            <p className="font-bold font-14 leading-5 font-poppins">
              {t('termAndCondition.circleMembership.lastupdate')}
              <span className="text-purple-700">
                {t('termAndCondition.circleMembership.updatedate')}
              </span>
            </p>
            <br />
            <p className="font-poppins font-14 leading-5 text-justify">
              {t(`termAndCondition.circleMembership.announcement`)}
            </p>
            <br />

            <div className="">
              {/* Services */}
              <CAccordion
                key={1}
                title={t(`termAndCondition.circleMembership.content.title.1`)}
                description={
                  <div className="flex flex-col self-stretch text-sm font-poppins text-14 leading-20 text-[#262626]">
                    {t(`termAndCondition.circleMembership.content.desc.1`)
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

              {/* Circle Owners Responsibilities */}
              <CAccordion
                key={2}
                title={t(`termAndCondition.circleMembership.content.title.2`)}
                description={
                  <div className="flex flex-col self-stretch text-sm font-poppins text-14 leading-20 text-[#262626]">
                    {t(`termAndCondition.circleMembership.content.desc.2`)
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

              {/* Fee and Commission */}
              <CAccordion
                key={3}
                title={t(`termAndCondition.circleMembership.content.title.3`)}
                description={
                  <div className="flex flex-col self-stretch text-sm font-poppins text-14 leading-20 text-[#262626]">
                    {t(`termAndCondition.circleMembership.content.desc.3`)
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

              {/* Utilization and Protection of Personal Data */}
              <CAccordion
                key={4}
                title={t(`termAndCondition.circleMembership.content.title.4`)}
                description={
                  <div className="flex flex-col self-stretch text-sm font-poppins text-14 leading-20 text-[#262626]">
                    {t(`termAndCondition.circleMembership.content.desc.4`)
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
              {/* Intellectual Property */}
              <CAccordion
                key={5}
                title={t(`termAndCondition.circleMembership.content.title.5`)}
                description={
                  <div className="flex flex-col self-stretch text-sm font-poppins text-14 leading-20 text-[#262626]">
                    {t(`termAndCondition.circleMembership.content.desc.5`)
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

              {/* Limitation Of Liability */}
              <CAccordion
                key={6}
                title={t(`termAndCondition.circleMembership.content.title.6`)}
                description={
                  <div className="flex flex-col self-stretch text-sm font-poppins text-14 leading-20 text-[#262626]">
                    {t(`termAndCondition.circleMembership.content.desc.6`)
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

              {/* Immediate Termination */}
              <CAccordion
                key={7}
                title={t(`termAndCondition.circleMembership.content.title.7`)}
                description={
                  <div className="flex flex-col self-stretch text-sm font-poppins text-14 leading-20 text-[#262626]">
                    {t(`termAndCondition.circleMembership.content.desc.7`)
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

              {/* Governing Law */}
              <CAccordion
                key={8}
                title={t(`termAndCondition.circleMembership.content.title.8`)}
                description={
                  <div className="flex flex-col self-stretch text-sm font-poppins text-14 leading-20 text-[#262626]">
                    {t(`termAndCondition.circleMembership.content.desc.8`)
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

              {/* Dispute Settlement */}
              <CAccordion
                key={9}
                title={t(`termAndCondition.circleMembership.content.title.9`)}
                description={
                  <div className="flex flex-col self-stretch text-sm font-poppins text-14 leading-20 text-[#262626]">
                    {t(`termAndCondition.circleMembership.content.desc.9`)
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
            </div>
          </div>
        </div>
      </CardGradient>
    </PageGradient>
  );
};

export default CircleMembership;
