import Section1 from '@/containers/landing/Section1';
import Section2 from '@/containers/landing/Section2';
import Section3 from '@/containers/landing/Section3';
import Section5 from '@/containers/landing/Section5';
import aa from '@/assets/landing-page/5340.png';
import { useRef } from 'react';
import Slider from '@ant-design/react-slick';
import Image from 'next/image';

export default function Home(): React.ReactElement {
  const sliderRef = useRef(null);

  setTimeout(() => {
    sliderRef.current?.slickPlay();
  }, 5000);

  const a = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoPlay: true,
    customPaging: () => <div className="dc mt-6"></div>
  };
  return (
    <>
      <Section1 />
      <Section2 />
      <Section3 />
      <Section5 />
    </>
  );
}
