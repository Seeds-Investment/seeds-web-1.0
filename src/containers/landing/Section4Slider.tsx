import { competitionCardList } from '@/utils/_static/dummy';
import Slider from '@ant-design/react-slick';
import React from 'react';
import Section4Card from './Section4Card';

export default function Section4Slider(): React.ReactElement {
  return (
    <>
      <Slider slidesToShow={2}>
        {competitionCardList.map((data, idx) => (
          <Section4Card key={idx} data={data} />
        ))}
      </Slider>
    </>
  );
}
