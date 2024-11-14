import BlurTop from '@/assets/product/BlurTop.svg';
import { SlideQuiz } from '@/components/product/SlideQuiz';
import { SlideTournament } from '@/components/product/SlideTournament';
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography
} from '@material-tailwind/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

interface DataItem {
  label: string;
  value: string;
  content: React.ReactNode;
}

const CardPlayHomepage: React.FC = () => {
  const measurement = 900;
  const [isBottom, setBottom] = useState(0);
  const { ref, inView, entry } = useInView({
    threshold: 0.2
  });
  useEffect(() => {
    const bottom = entry?.boundingClientRect.bottom ?? 0;
    setBottom(bottom);
  }, [entry]);
  const [activeTab, setActiveTab] = useState<string>('top tournament');
  const data: DataItem[] = [
    {
      label: 'Top Quiz',
      value: 'top quiz',
      content: <SlideQuiz />
    },
    {
      label: 'Top Tournament',
      value: 'top tournament',
      content: <SlideTournament />
    },
    {
      label: 'Team Battle',
      value: 'team battle',
      content: (
        <div className="flex w-full items-center justify-center h-32">
          <Typography className="font-poppins font-semibold capitalize text-lg">
            under construction
          </Typography>
        </div>
      )
    }
  ];

  return (
    <section ref={ref} className="relative w-full">
      <Image src={BlurTop} alt="BlurTop" className="w-full absolute bottom-0" />
      <div
        className={` sm:mx-5 ${
          inView && isBottom >= measurement
            ? 'animate-fade-in-slide'
            : isBottom >= measurement
            ? 'animate-fade-out-slide'
            : ''
        }`}
      >
        <Tabs value={activeTab}>
          <TabsHeader
            className="flex justify-center p-0 bg-transparent h-12 border-b border-[#7C7C7C] rounded-none"
            indicatorProps={{
              className:
                'bg-transparent border-b-4 border-[#27A590] shadow-none rounded-sm'
            }}
          >
            {data.map(({ label, value }) => (
              <Tab
                key={value}
                value={value}
                onClick={() => {
                  setActiveTab(value);
                }}
                className={`${
                  activeTab === value ? 'text-[#27A590]' : 'text-[#7C7C7C]'
                } 2xl:mx-[90px] md:mx-[10px] lg:mx-[50px] xl:mx-[80px] text-xs md:text-[18.5px] font-poppins font-normal md:font-semibold z-10 w-auto`}
              >
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody>
            {data.map(({ value, content }) => (
              <TabPanel
                key={value}
                value={value}
                className="flex justify-center p-0 my-4"
              >
                {content}
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
    </section>
  );
};

export default CardPlayHomepage;
