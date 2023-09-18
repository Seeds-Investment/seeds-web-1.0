import bg from '@/assets/landing-page/bg-discover.png';
import faq from '@/assets/landing-page/faq.png';
import CarouselNewsDesktop from '@/components/carousel/CarouselNewsDesktop';
import CarouselNewsMobile from '@/components/carousel/CarouselNewsMobile';
import {
  Accordion,
  AccordionBody,
  AccordionHeader
} from '@material-tailwind/react';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Section5(): React.ReactElement {
  const { t } = useTranslation();
  const [open, setOpen] = useState(1);

  const handleOpen = (value: number): void => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <div>
      <div className="min-w-full h-auto cursor-default mt-7 md:mt-4 text-start xl:text-center lg:mb-10 font-poppins bg-gradient-to-b from-[#EDF2F700]  to-[#E2E8F0]">
        <span className="text-3xl font-semibold px-6  bg-clip-text text-transparent bg-gradient-to-b from-[#9A76FE] to-[#4FE6AF] mr-2 md:text-5xl lg:text-7xl pb-4">
          {t('landing.section5.text1')}
        </span>
        <h2 className="text-2xl font-normal text-[#7C7C7C] px-6 mt-5 xl:w-[50%] mx-auto">
          {t('landing.section5.text2')}
        </h2>
        <div className="h-full flex items-center justify-center mt-7">
          {/* Parent container */}
          <div className="xl:w-4/5 w-[90%] bg-white bg-opacity-40 border xl:border-[#4FE6AF] border-[#7555DA] rounded-lg xl:rounded-[24px] shadow-md overflow-hidden text-center xl:p-5">
            <div className="bg-white bg-opacity-40 xl:p-4 relative">
              {/* Carousel container with overflow hidden */}
              <section className="xl:block hidden">
                <Image
                  src={bg}
                  alt="bg"
                  width={1200}
                  className="absolute -top-4 left-8"
                />
                <CarouselNewsDesktop />
              </section>
              <section className="xl:hidden block">
                <CarouselNewsMobile />
              </section>
            </div>
          </div>
        </div>
        <div className="mt-[150px] flex flex-col">
          <div className="flex flex-row w-full justify-center">
            <span className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-[#9A76FE] to-[#4FE6AF] mr-2 md:text-5xl lg:text-7xl pb-4">
              {t('landing.section6.text1')}
            </span>
            <span className="text-3xl font-semibold bg-clip-text text-transparent bg-[#201B1C] mr-2 md:text-5xl lg:text-7xl pb-4">
              {t('landing.section6.text2')}
            </span>
          </div>
          <p className="text-2xl font-normal text-[#262626] text-center px-4 mt-5">
            {t('landing.section6.text3')}
          </p>
          <div>
            <img
              src="/assets/images/communities.png"
              alt=""
              className="mt-10 xl:block hidden w-full h-full"
            />
            <img
              src="/assets/images/community.png"
              alt=""
              className="-mt-[200px] xl:hidden block w-full h-full"
            />
          </div>
        </div>
      </div>
      <div className="mt-20">
        <Image
          src={faq}
          alt="faq"
          className="absolute right-0 left-0 mx-auto -mt-5 xl:block hidden"
        />
        <div className="flex flex-col w-full justify-center text-center">
          <span className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-[#9A76FE] to-[#4FE6AF] mr-2 md:text-5xl lg:text-7xl pb-4">
            {t('landing.section7.text1')}
          </span>
          <span className="text-2xl font-normal text-[#201B1C] xl:mt-5 px-5">
            {t('landing.section7.text2')}
          </span>
          <div className="xl:w-2/3 w-[90%] mx-auto mt-5 text-start font-poppins">
            <Accordion
              open={open === 1}
              className="mb-2 rounded-lg border border-[#E9E9E9] px-4 backdrop-blur-sm"
            >
              <AccordionHeader
                onClick={() => {
                  handleOpen(1);
                }}
                className={`border-b-0 transition-colors ${
                  open === 1 ? 'text-blue-500 hover:!text-blue-700' : ''
                }`}
              >
                I want to ask more about Seeds products and services
              </AccordionHeader>
              <AccordionBody className="pt-0 text-base font-normal">
                You can contact our team via email contact: info@seeds.finance
              </AccordionBody>
            </Accordion>
            <Accordion
              open={open === 2}
              className="mb-2 rounded-lg border border-[#E9E9E9] px-4 backdrop-blur-sm"
            >
              <AccordionHeader
                onClick={() => {
                  handleOpen(2);
                }}
                className={`border-b-0 transition-colors ${
                  open === 2 ? 'text-blue-500 hover:!text-blue-700' : ''
                }`}
              >
                How safe is it to invest in Seeds?
              </AccordionHeader>
              <AccordionBody className="pt-0 text-base font-normal">
                Seeds has been formally operating in Indonesia under the name
                PT. Technological Investment Seed and has been registered with
                the Ministry of Communication and Information Technology
                (KOMINFO).
              </AccordionBody>
            </Accordion>
            <Accordion
              open={open === 3}
              className="mb-2 rounded-lg border border-[#E9E9E9] px-4 backdrop-blur-sm"
            >
              <AccordionHeader
                onClick={() => {
                  handleOpen(3);
                }}
                className={`border-b-0 transition-colors ${
                  open === 3 ? 'text-blue-500 hover:!text-blue-700' : ''
                }`}
              >
                How can I access Seeds?
              </AccordionHeader>
              <AccordionBody className="pt-0 text-base font-normal">
                You can download the Seeds application via the Google Playstore
                for those of you who are Android users and the Apple Appstore
                for iOS users. Apart from that, you can also explore the Seeds
                feature through the seeds.finance website
              </AccordionBody>
            </Accordion>
            <Accordion
              open={open === 4}
              className="mb-2 rounded-lg border border-[#E9E9E9] px-4 backdrop-blur-sm"
            >
              <AccordionHeader
                onClick={() => {
                  handleOpen(4);
                }}
                className={`border-b-0 transition-colors ${
                  open === 4 ? 'text-blue-500 hover:!text-blue-700' : ''
                }`}
              >
                What investment products are available at Seeds?
              </AccordionHeader>
              <AccordionBody className="pt-0 text-base font-normal">
                You can invest in various US stocks and cryptocurrencies (many
                more to come!)
              </AccordionBody>
            </Accordion>
            <Accordion
              open={open === 5}
              className="mb-2 rounded-lg border border-[#E9E9E9] px-4 backdrop-blur-sm"
            >
              <AccordionHeader
                onClick={() => {
                  handleOpen(5);
                }}
                className={`border-b-0 transition-colors ${
                  open === 5 ? 'text-blue-500 hover:!text-blue-700' : ''
                }`}
              >
                How can I access Seeds?
              </AccordionHeader>
              <AccordionBody className="pt-0 text-base font-normal">
                You can download the Seeds application via the Google Playstore
                for those of you who are Android users and the Apple Appstore
                for iOS users. Apart from that, you can also explore the Seeds
                feature through the seeds.finance website
              </AccordionBody>
            </Accordion>
            <Accordion
              open={open === 6}
              className="rounded-lg border border-[#E9E9E9] px-4 backdrop-blur-sm"
            >
              <AccordionHeader
                onClick={() => {
                  handleOpen(6);
                }}
                className={`border-b-0 transition-colors ${
                  open === 6 ? 'text-blue-500 hover:!text-blue-700' : ''
                }`}
              >
                What is Seeds?
              </AccordionHeader>
              <AccordionBody className="pt-0 text-base font-normal">
                Seeds is the first social investing platform in Indonesia that
                gives users access to US stocks and cryptocurrencies (many more
                to come!).
              </AccordionBody>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
