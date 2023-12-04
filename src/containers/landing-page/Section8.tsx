'use client';
import { getArticle } from '@/repository/article.repository';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';

interface Article {
  id: string;
  title: string;
  author: string;
  link: string;
  videoUrl: string;
  imageUrl: string;
  content: string;
  sourceId: string;
  language: string;
  category: string;
  is_liked: boolean;
  publicationDate: string;
  total_likes: number;
  total_comments: number;
  total_shares: number;
}

export default function Section3(): React.ReactElement {
  const [hotNews, setHotNews] = useState<Article[]>([]);

  async function fetchHotNews(): Promise<void> {
    try {
      const response = await getArticle({
        page: 1,
        limit: 9,
        source: 'news',
        language: '',
        search: '',
        category: 'All'
      });

      setHotNews(response.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  }

  const hotNewsItemClass = '';

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      await fetchHotNews();
    };

    fetchData().catch(error => {
      console.error('Error in fetchData:', error);
    });
  }, []);

  const defaultHotNewsImage = '/assets/default-news.png';
  function isImageUrlValid(url: string): boolean {
    return url?.startsWith('http://') || url?.startsWith('https://');
  }
  //   const { t } = useTranslation();
  //   const width = useWindowInnerWidth();

  return (
    <div className="h-auto min-w-full lg:mt-20 lg:mx-12 cursor-default relative text-center">
      <div className="justify-center items-center text-center">
        <div className="absolute top-0 left-0 w-full z-10 mt-5">
          <h1 className="font-poppins font-semibold text-3xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-[#9A76FE] to-[#4FE6AF] lg:mb-4">
            Stay Informed with
          </h1>
          <h1 className="font-poppins font-semibold text-3xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-[#9A76FE] to-[#4FE6AF]">
            Our Curated Financial Updates
          </h1>
        </div>
        <div className="ms-[8%] lg:hidden relative z-0">
          <svg
            width="375"
            height="121"
            viewBox="0 0 375 121"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M37.9735 78.5318C86.6332 103.536 216.368 122.795 337.983 81.9899C490.002 30.9839 99.3853 -43.3638 15.1544 35.3065C-56.757 102.47 144.354 132.996 259.793 114.841C339.146 102.362 413.114 75.0737 353.085 45.6805C293.056 16.2874 185.929 8.04605 111.13 16.2874"
              stroke="url(#paint0_linear_310_4684)"
              stroke-width="0.601911"
              stroke-linecap="round"
            />
            <defs>
              <linearGradient
                id="paint0_linear_310_4684"
                x1="330.348"
                y1="14.7715"
                x2="177.307"
                y2="227.414"
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
      <div>
        <Slider
          slidesToShow={3}
          speed={500}
          className="my-12"
          initialSlide={0}
          // slidesToScroll={1}
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                dots: true,
                slidesToShow: 3,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 768,
              settings: {
                dots: true,
                slidesToShow: 2,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 480,
              settings: {
                dots: true,
                slidesToShow: 1
              }
            }
          ]}
        >
          {hotNews?.map((data, key) => (
            <div
              key={key}
              className={` lg:pe-5 w-[200px] flex flex-col items-start bg-transparent cursor-pointer hover:shadow-lg transition-all relative bg-opacity-70 ${hotNewsItemClass}`}
            >
              <Link href={`/seedspedia/news/${data?.id ?? 0}`}>
                {isImageUrlValid(data.imageUrl) ? (
                  <img
                    src={data.imageUrl}
                    alt={data.title}
                    className="w-full rounded-xl h-[240px]"
                  />
                ) : (
                  <img
                    src={defaultHotNewsImage}
                    alt={data.title}
                    className="w-full rounded-xl h-[240px]"
                  />
                )}
              </Link>

              <h3 className="text-xl font-poppins font-semibold p-2 text-left">
                {data.title}
              </h3>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
