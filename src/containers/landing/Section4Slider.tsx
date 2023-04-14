import { competitionCardList } from '@/utils/_static/dummy';
import Slider from '@ant-design/react-slick';
import Section4Card from './Section4Card';

export default function Section4Slider() {
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
