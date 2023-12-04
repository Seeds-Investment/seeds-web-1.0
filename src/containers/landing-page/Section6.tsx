import events1 from '@/assets/landing-page/events1.jpg';
import events2 from '@/assets/landing-page/events2.jpg';
import events3 from '@/assets/landing-page/events3.jpg';
import events4 from '@/assets/landing-page/events4.jpg';
import next from '@/assets/landing-page/next.svg';
import prev from '@/assets/landing-page/prev.svg';
import Image from 'next/image';
import { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

export default function Section6(): React.ReactElement {
  const [sliderIndex, setSliderIndex] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    beforeChange: (current: number, next: number) => {
      setSliderIndex(next);
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: false,
          slidesToShow: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          dots: false,
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          dots: true,
          slidesToShow: 1
        }
      }
    ]
  };

  const eventsImages = [events1, events2, events3, events4];

  const handlePrevious = (): void => {
    setSliderIndex(prevIndex =>
      prevIndex > 0 ? prevIndex - 1 : eventsImages.length - 1
    );
  };

  const handleNext = (): void => {
    setSliderIndex(prevIndex =>
      prevIndex < eventsImages.length - 1 ? prevIndex + 1 : 0
    );
  };
  return (
    <div className="h-auto min-w-full mt-20 cursor-default relative text-center">
      <div className="justify-center items-center text-center mb-5">
        <div className="absolute top-0 left-0 w-full  z-10 lg:mt-5">
          <h1 className="font-poppins font-semibold text-3xl lg:text-6xl lg:mt-5 mt-2 bg-clip-text text-transparent bg-gradient-to-r from-[#9A76FE] to-[#4FE6AF]">
            Seeds Events
          </h1>
        </div>
        <div className="ms-[13%] lg:hidden relative z-0">
          <svg
            width="289"
            height="49"
            viewBox="0 0 289 49"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30.0624 31.6218C67.3033 41.4974 166.594 49.1038 259.67 32.9876C376.015 12.8424 77.0629 -16.5218 12.5981 14.5496C-42.4381 41.0766 111.479 53.1328 199.828 45.9625C260.559 41.0336 317.17 30.256 271.228 18.6469C225.285 7.03788 143.298 3.78289 86.0517 7.03788"
              stroke="url(#paint0_linear_314_4968)"
              stroke-width="0.601911"
              stroke-linecap="round"
            />
            <defs>
              <linearGradient
                id="paint0_linear_314_4968"
                x1="253.826"
                y1="6.43916"
                x2="212.216"
                y2="118.472"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#4FE6AF" />
                <stop offset="1" stop-color="#9A76FE" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="lg:ms-[20%] hidden lg:block lg:w-full relative z-0">
          <svg
            width="838"
            height="159"
            viewBox="0 0 838 159"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M85.6556 103.29C194.134 136.279 483.357 161.687 754.477 107.852C1093.38 40.5586 222.563 -57.5304 34.7841 46.2615C-125.53 134.873 322.813 175.146 580.165 151.194C757.069 134.729 921.968 98.7275 788.144 59.9483C654.319 21.1691 415.498 10.2961 248.746 21.1691"
              stroke="url(#paint0_linear_213_3314)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient
                id="paint0_linear_213_3314"
                x1="737.456"
                y1="19.1691"
                x2="583.922"
                y2="379.638"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4FE6AF" />
                <stop offset="1" stopColor="#9A76FE" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <Slider {...settings} initialSlide={sliderIndex}>
        {eventsImages.map((image, index) => (
          <div key={index} className="w-1/3 lg:m-12">
            <Image
              src={image}
              alt={`Event ${index + 1}`}
              width={300}
              height={300}
              className="w-[350px] h-[350px] object-cover"
            />
          </div>
        ))}
      </Slider>
      <div className="flex justify-end lg:justify-center lg:mt-2 mt-5 mx-3">
        <button
          className="rounded-full lg:p-2 border lg:mx-6 mx-3 p-1 border-1 border-[#4FE6AF]"
          onClick={handlePrevious}
        >
          <Image src={prev} alt="Previous" className="cursor-pointer" />
        </button>
        <button
          className="rounded-full lg:p-2 lg:mx-6 border mx-3 p-1 border-1 border-[#4FE6AF]"
          onClick={handleNext}
        >
          <Image src={next} alt="Next" className="cursor-pointer" />
        </button>
      </div>
    </div>
  );
}
