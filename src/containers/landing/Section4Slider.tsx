import { competitionCardList } from '@/utils/_static/dummy';
import type { Settings } from '@ant-design/react-slick';
import Slider from '@ant-design/react-slick';
import React from 'react';
import Section4Card from './Section4Card';

export default function Section4Slider(): React.ReactElement {
  const settings: Settings = {
    slidesToShow: 2
  };
  return (
    <Slider {...settings}>
      {competitionCardList.map((data, key) => (
        <Section4Card key={key} data={data} />
      ))}
    </Slider>
  );
}
