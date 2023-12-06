import NewsCard from '@/components/homepage/newsCard';
import { getArticle } from '@/repository/article.repository';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
export interface ArticleListRoot {
  promoCodeList: Article[];
  metadata: Metadata;
}
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

export interface Metadata {
  currentPage: number;
  limit: number;
  totalPage: number;
  totalRow: number;
}

export default function NewsPage(): React.ReactElement {
  const [articles, setArticles] = useState<Article[]>([]);
  const [hotNews, setHotNews] = useState<Article[]>([]);

  const [activeCategory, setActiveCategory] = useState('All');
  const [params, setParams] = useState({
    page: 1,
    limit: 4,
    source: 'news',
    language: '',
    search: '',
    category: 'All',
    totalPage: 9
  });

  async function fetchArticles(): Promise<void> {
    try {
      const response = await getArticle({
        ...params,
        source: params.source,
        category: params.category
      });

      if (response.status === 200) {
        setArticles(response.data);
      } else {
        console.error('Failed to fetch articles:', response);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  }

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

      if (response.status === 200) {
        setHotNews(response.data);
      } else {
        console.error('Failed to fetch articles:', response);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  }

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      await fetchArticles();
      await fetchHotNews();
    };

    fetchData().catch(error => {
      console.error('Error in fetchData:', error);
    });
  }, [params]);

  const updateCategory = (newCategory: string): void => {
    setParams(prevParams => ({
      ...prevParams,
      category: newCategory.toLowerCase()
    }));

    setActiveCategory(newCategory);
  };
  const hotNewsItemClass = 'mb-2 mx-48';

  const categoryItemClass = 'py-1 rounded-full text-center w-full text-md px-2';

  const categories = [
    'All',
    'Business',
    'Entertainment',
    'Health',
    'Politics',
    'Science',
    'Sports',
    'Technology',
    'Top',
    'World'
  ];

  const defaultHotNewsImage = '/assets/default-news.png';
  function isImageUrlValid(url: string): boolean {
    return url?.startsWith('http://') || url?.startsWith('https://');
  }
  return (
    <>
      <div className="lg:hidden mt-4 ">
        <Slider
          slidesToShow={4}
          speed={500}
          initialSlide={0}
          responsive={[
            {
              breakpoint: 768,
              settings: {
                dots: false,
                slidesToShow: 4,
                slidesToScroll: 1
              }
            }
          ]}
        >
          {categories.map((category, key) => (
            <div
              key={key}
              className={`${categoryItemClass} ${
                activeCategory === category
                  ? 'bg-[#3AC4A0] text-white text-xs'
                  : 'text-[#3AC4A0] bg-[#F9F9F9] text-xs'
              }`}
              onClick={() => {
                updateCategory(category);
              }}
            >
              {category}
            </div>
          ))}
        </Slider>
      </div>
      <div className="hidden lg:flex  justify-center mt-4 gap-2 ">
        <button
          className={`py-1 rounded-full text-xs px-4 ${
            activeCategory === 'All'
              ? 'bg-[#3AC4A0] text-white'
              : 'text-[#3AC4A0] bg-[#F9F9F9]'
          }`}
          onClick={() => {
            updateCategory('All');
          }}
        >
          All
        </button>
        <button
          className={`py-1 rounded-full text-xs px-2 ${
            activeCategory === 'business'
              ? 'bg-[#3AC4A0] text-white'
              : 'text-[#3AC4A0] bg-[#F9F9F9]'
          }`}
          onClick={() => {
            updateCategory('business');
          }}
        >
          Business
        </button>
        <button
          className={`py-1 rounded-full text-xs px-2 ${
            activeCategory === 'entertainment'
              ? 'bg-[#3AC4A0] text-white'
              : 'text-[#3AC4A0] bg-[#F9F9F9]'
          }`}
          onClick={() => {
            updateCategory('entertainment');
          }}
        >
          Entertainment
        </button>

        <button
          className={`py-1 rounded-full text-xs px-2 ${
            activeCategory === 'health'
              ? 'bg-[#3AC4A0] text-white'
              : 'text-[#3AC4A0] bg-[#F9F9F9]'
          }`}
          onClick={() => {
            updateCategory('health');
          }}
        >
          Health
        </button>
        <button
          className={`py-1 rounded-full text-xs px-2 ${
            activeCategory === 'politics'
              ? 'bg-[#3AC4A0] text-white'
              : 'text-[#3AC4A0] bg-[#F9F9F9]'
          }`}
          onClick={() => {
            updateCategory('politics');
          }}
        >
          Politics
        </button>
        <button
          className={`py-1 rounded-full text-xs px-2 ${
            activeCategory === 'science'
              ? 'bg-[#3AC4A0] text-white'
              : 'text-[#3AC4A0] bg-[#F9F9F9]'
          }`}
          onClick={() => {
            updateCategory('science');
          }}
        >
          Science
        </button>
        <button
          className={`py-1 rounded-full text-xs px-2 ${
            activeCategory === 'sports'
              ? 'bg-[#3AC4A0] text-white'
              : 'text-[#3AC4A0] bg-[#F9F9F9]'
          }`}
          onClick={() => {
            updateCategory('sports');
          }}
        >
          Sports
        </button>
        <button
          className={`py-1 rounded-full text-xs px-2 ${
            activeCategory === 'technology'
              ? 'bg-[#3AC4A0] text-white'
              : 'text-[#3AC4A0] bg-[#F9F9F9]'
          }`}
          onClick={() => {
            updateCategory('technology');
          }}
        >
          Technology
        </button>
        <button
          className={`py-1 rounded-full text-xs px-2 ${
            activeCategory === 'top'
              ? 'bg-[#3AC4A0] text-white'
              : 'text-[#3AC4A0] bg-[#F9F9F9]'
          }`}
          onClick={() => {
            updateCategory('top');
          }}
        >
          Top
        </button>
        <button
          className={`py-1 rounded-full text-xs px-2 ${
            activeCategory === 'world'
              ? 'bg-[#3AC4A0] text-white'
              : 'text-[#3AC4A0] bg-[#F9F9F9]'
          }`}
          onClick={() => {
            updateCategory('world');
          }}
        >
          World
        </button>
      </div>
      <Slider
        slidesToShow={2}
        speed={500}
        className="my-12"
        initialSlide={0}
        // slidesToScroll={1}
        responsive={[
          {
            breakpoint: 1024,
            settings: {
              dots: true,
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 768,
            settings: {
              dots: true,
              slidesToShow: 2,
              slidesToScroll: 2
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
        {hotNews.map((data, key) => (
          <div
            key={key}
            className={` lg:pe-5 w-[200px] flex flex-col items-start bg-transparent cursor-pointer hover:shadow-lg transition-all relative bg-opacity-70 ${hotNewsItemClass}`}
          >
            <Link href={`/homepage/news/${data?.id ?? 0}`}>
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
            <div className="absolute top-0 right-5 bg-[#5E44FF] rounded-3xl text-white px-3 py-2 m-2 text-center">
              Hot News
            </div>
            <h3 className="absolute bottom-0 left-0 right-0 bg-transparent text-white p-2 text-left">
              {data.title}
            </h3>
          </div>
        ))}
      </Slider>
      <div className="grid z-10 lg:grid-cols-4 gap-4 mt-8">
        {articles.map(article => {
          return <NewsCard key={article.id} articleId={article.id} />;
        })}
      </div>
      <div className="text-center justify-center mt-3">
        <Link
          href={'/homepage/articles'}
          className="text-md mt-3 font-normal text-[#3AC4A0]"
        >
          See More
        </Link>
      </div>
    </>
  );
}
