import Faq from '@/assets/faq.png';
import CAccordion from '@/components/CAccordion';
import Header from '@/containers/landing/Header';
import { Button } from '@material-tailwind/react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import id from '../../../public/locales/id';

export default function FAQ(): React.ReactElement {
  const { t } = useTranslation();

  return (
    <div className="bg-black min-h-screen">
      <div className="px-5 lg:px-[100px] pt-5 flex justify-between items-center bg-opacity-80 bg-white">
        <div className="w-full rounded-2xl flex justify-center bg-white p-5 relative h-[80px]">
          <Header />
        </div>
      </div>
      <div className="px-5 lg:px-[100px] py-10 min-h-[calc(100vh-100px)] flex justify-between bg-opacity-80 bg-white">
        <div className="w-full rounded-2xl flex justify-center bg-white p-5 bg-opacity-50">
          <div className="lg:w-1/2 bg-white rounded-2xl p-10">
            <br />
            <p className="font-semibold text-xl text-center">Settings</p>
            <br />
            <div className="flex justify-center w-full">
              <Image src={Faq} alt="faq" />
            </div>
            <br />
            <div className="font-semibold text-2xl flex justify-center">
              <div className=" w-[180px] text-center">{`${t(
                'faq.title'
              )}`}</div>
            </div>
            <br />
            <div className="font-semibold text-lg flex justify-center">
              <div className=" w-1/2 text-center">{`${t('faq.subTitle')}`}</div>
            </div>
            <br />
            <div className="">
              {Object.keys(id.faq.faq.title).map((key, idx) => (
                <CAccordion
                  key={key}
                  title={t(`faq.faq.title.${idx + 1}`)}
                  description={<div>{t(`faq.faq.desc.${idx + 1}`)}</div>}
                />
              ))}
            </div>
            <br />
            <div className="font-semibold text-2xl flex justify-center">
              <div className=" w-[180px] text-center">{`${t(
                'faq.footerText'
              )}`}</div>
            </div>
            <br />
            <div className="w-full flex justify-center">
              <Button className="bg-seeds-button-green">
                {t('faq.button')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
