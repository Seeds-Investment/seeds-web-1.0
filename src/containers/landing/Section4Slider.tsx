import type { ICompetitionItem } from '@/utils/interfaces/components.interfaces';
import type { Settings } from '@ant-design/react-slick';
import Slider from '@ant-design/react-slick';
import React from 'react';
import Section4Card from './Section4Card';

export default function Section4Slider({
  list
}: {
  list: ICompetitionItem[];
}): React.ReactElement {
  const settings: Settings = {
    slidesToShow: 2
  };
  return (
    <Slider {...settings}>
      {list.map((data, key) => (
        <Section4Card key={key} data={data} />
      ))}
    </Slider>
  );
}
