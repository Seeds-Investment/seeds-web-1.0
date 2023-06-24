import CAccordion from '@/components/CAccordion';
import { Button } from '@material-tailwind/react';
import Image from 'next/image';
import Faq from 'public/assets/faq.png';
import { useTranslation } from 'react-i18next';
import id from '../../../public/locales/id';

export default function FAQ(): React.ReactElement {
  const { t } = useTranslation();

  return (
    <div className="bg-black min-h-screen">
      <div className="px-5 lg:px-[100px] py-10 min-h-[calc(100vh-100px)] flex justify-between bg-opacity-80 bg-white">
        <div className="w-full rounded-2xl flex justify-center bg-white p-5 bg-opacity-50">
          <div className=" w-full lg:w-1/2 bg-white rounded-2xl p-10">
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
      </div>
    </div>
  );
}
