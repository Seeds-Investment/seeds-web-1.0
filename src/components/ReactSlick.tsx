import common from '@/utils/common';
import { type ISlider } from '@/utils/interfaces/components.interfaces';
import Image from 'next/image';
import React, { useRef } from 'react';
import Slider from 'react-slick';
import SliderDot from './SliderDot';

export default function ReactSlick({
  data = []
}: {
  data?: ISlider[];
}): React.ReactElement {
  const sliderRef = useRef<Slider | null>(null);

  setTimeout(() => {
    sliderRef.current?.slickPlay();
  }, 5000);

  return (
    <Slider
      {...common._static.slideSettings}
      ref={sliderRef}
      customPaging={() => <SliderDot />}
    >
      {data.map((slide: ISlider, idx: number) => (
        <SliderCard key={idx} slide={slide} />
      ))}
    </Slider>
  );
}

const SliderCard = ({ slide }: { slide: ISlider }): React.ReactElement => (
  <div className="w-full flex flex-col items-center mt-3">
    <div className="w-full flex flex-col items-center mt-3">
      <Image src={slide.image} alt="" />
    </div>
    <div className="text-lg tracking-wide font-semibold mt-3">
      {slide.title}
    </div>
    <div className="text-md tracking-tight text-center font-normal mt-2 text-[#7C7C7C]">
      {slide.text}
    </div>
  </div>
);
