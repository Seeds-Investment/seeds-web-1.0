import CAccordion from '@/components/CAccordion';
import CardGradient from '@/components/ui/card/CardGradient';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import useWindowInnerWidth from '@/hooks/useWindowInnerWidth';
import { Button } from '@material-tailwind/react';
import Image from 'next/image';
import Faq from 'public/assets/faq.png';
import { useTranslation } from 'react-i18next';
import id from '../../../public/locales/id';

export default function FAQ(): React.ReactElement {
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
            <br />
            <p className="font-semibold text-lg font-poppins font-18 text-neutral-600 text-center">
              {t('faq.settings')}
            </p>
            <br />
            <div className="flex justify-center w-full">
              <Image src={Faq} alt="faq" />
            </div>
            <br />
            <div className="font-semibold text-2xl flex justify-center">
              <div className=" w-[411px] text-center">{`${t(
                'faq.title'
              )}`}</div>
            </div>
            <br />
            <div className="font-semibold text-lg flex justify-center">
              <div className=" w-[320px] text-center">{`${t(
                'faq.subTitle'
              )}`}</div>
            </div>
            <br />
            <div className="">
              {Object.keys(id.faq.faq.title).map((key, idx) => (
                <CAccordion
                  key={key}
                  title={t(`faq.faq.title.${idx + 1}`)}
                  titleColor="#3AC4A0"
                  description={
                    <div className="flex flex-col self-stretch text-sm font-poppins text-14 leading-20 text-[#262626]">
                      {t(`faq.faq.desc.${idx + 1}`)}
                    </div>
                  }
                />
              ))}
            </div>
            <br />
            <div className="font-semibold text-xl flex justify-center text-neutral-600">
              <div className=" w-[210px] h-[56px] text-center">{`${t(
                'faq.footerText'
              )}`}</div>
            </div>
            <br />
            <div className="w-full flex justify-center">
              <Button className="bg-seeds-button-green rounded-full">
                {t('faq.button')}
              </Button>
            </div>
          </div>
        </div>
      </CardGradient>
    </PageGradient>
  );
}
