'use client';
import { SectionSixImageOval } from '@/constants/assets/images';
import useWindowInnerWidth from '@/hooks/useWindowInnerWidth';
import { getArticle } from '@/repository/article.repository';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const width = useWindowInnerWidth();

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
      <div className="flex flex-col w-full items-center font-poppins relative">
        <p className=" text-2xl lg:text-5xl mt-10 p-5 text-center font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#9A76FE] to-[#4FE6AF] xl:font-bold absolute z-10">
          {t('landingV2.section8.text1')} <br /> {t('landingV2.section8.text2')}
        </p>
        <Image
          src={SectionSixImageOval.src}
          alt={SectionSixImageOval.alt}
          width={400}
          height={100}
          className="w-[375px] h-[157px] top-5 lg:w-[836px] lg:h-[167px] md:top-5 relative z-1"
        />
        {width !== undefined ? (
          width > 700 ? (
            <>
              <div className="absolute bg-[#3AC4A0BF] blur-[150px] w-[300px] h-[300px] left-0 top-[10rem] rounded-full"></div>
              <div className="absolute bg-[#7F64D8] blur-[150px] w-[300px] h-[300px] right-0 top-[10rem] rounded-full"></div>
            </>
          ) : null
        ) : null}
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
