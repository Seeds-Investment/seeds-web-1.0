'use client';
import { Carousel, IconButton } from '@material-tailwind/react';
import { useEffect, useState } from 'react';

const CarouselNewsMobile: React.FC = () => {
  const [carouselData, setCarouselData] = useState<any[]>([]);

  useEffect(() => {
    // Replace 'your-api-url' with the actual API endpoint
    fetch('https://seeds-dev-gcp.seeds.finance/news/v1/hot?limit=5')
      .then(response => response.json())
      .then(data => setCarouselData(data.news))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleItemClick = (link: string) => {
    window.open(link, '_blank');
  };
  return (
    <Carousel
      loop={true}
      autoplay={true}
      autoplayDelay={3000}
      className="rounded-xl"
      prevArrow={({ handlePrev }) => (
        <IconButton
          variant="text"
          color="white"
          size="lg"
          onClick={handlePrev}
          className="!absolute top-2/4 left-1 -translate-y-2/4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-8 w-8 bg-[#3AC4A0] rounded-full p-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </IconButton>
      )}
      nextArrow={({ handleNext }) => (
        <IconButton
          variant="text"
          color="white"
          size="lg"
          onClick={handleNext}
          className="!absolute top-2/4 !right-1 -translate-y-2/4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-8 w-8 bg-[#3AC4A0] rounded-full p-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </IconButton>
      )}
    >
      {carouselData.map((item, index) => (
        <div className="border-2 relative rounded-lg justify-end">
          <img
            key={index}
            src={item.imageUrl}
            alt={`image ${index + 1}`}
            className="xl:h-full h-[250px] xl:w-2/3 w-full object-cover p-3 mx-auto rounded-lg"
          />
          <div
            className="absolute inset-0 h-[240px] w-[93%] object-cover m-auto cursor-pointer bg-black bg-opacity-50 text-white rounded-lg p-5 z-20 left-0 right-0 top-0 bottom-0"
            onClick={e => {
              e.preventDefault();
              handleItemClick(item.link);
            }}
          >
            <h1 className="items-end text-start text-xs xl:text-3xl font-semibold absolute bottom-8 left-2 text-[#FFFFFF]">
              {item.title}
            </h1>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselNewsMobile;
