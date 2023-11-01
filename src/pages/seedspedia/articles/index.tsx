import ArtPagination from '@/components/ArtPagination';
import ArticleCard from '@/components/seedsPedia/articleCard';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import Section6 from '@/containers/landing/Section6';
import { getArticle } from '@/repository/article.repository';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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

export default function ArticleList(): React.ReactElement {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [params, setParams] = useState({
    page: 1,
    limit: 9,
    source: 'articles',
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
        setArticles(response.news);
      } else {
        console.error('Failed to fetch articles:', response);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  }

  const categoryItemClass = 'py-1 rounded-full text-center w-full text-md px-2';

  const categories = [
    'All',
    'General',
    'Crypto',
    'Us Stocks',
    'Indo Stocks',
    'Commodities',
    'Indices',
    'Forex',
    'Finance'
  ];

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      await fetchArticles();
    };

    fetchData().catch(error => {
      console.error('Error in fetchData:', error);
    });
  }, [params]);

  useEffect(() => {
    setParams(prevParams => ({
      ...prevParams,
      search: searchInput,
      page: 1
    }));

    void fetchArticles();
  }, [searchInput]);

  const updateCategory = (newCategory: string): void => {
    setParams(prevParams => ({
      ...prevParams,
      category: newCategory.toLowerCase()
    }));

    setActiveCategory(newCategory);
  };

  const { t } = useTranslation();

  // const timeAgo = (dateString: string): string => {
  //   const createdDate = new Date(dateString);
  //   const currentDate = new Date();
  //   const timeDifference = currentDate.getTime() - createdDate.getTime();
  //   const secondsDifference = Math.floor(timeDifference / 1000);

  //   if (secondsDifference < 60) {
  //     return `${secondsDifference} seconds ago`;
  //   } else if (secondsDifference < 3600) {
  //     const minutes = Math.floor(secondsDifference / 60);
  //     return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  //   } else if (secondsDifference < 86400) {
  //     const hours = Math.floor(secondsDifference / 3600);
  //     return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  //   } else {
  //     const days = Math.floor(secondsDifference / 86400);
  //     return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  //   }
  // };

  const customGradient = (
    <>
      <span className="-z-10 lg:fixed hidden lg:block bottom-6 -left-10 w-64 h-48 bg-seeds-green blur-[110px] rotate-45" />
      <span className="-z-10 lg:fixed hidden lg:block bottom-0 left-6 w-64 h-24 bg-seeds-green blur-[110px]" />
      {/* <span className="-z-10  hidden lg:block -bottom-28 left-16 w-[15rem] h-64 bg-seeds-purple-2 blur-[90px] rotate-45" /> */}
      <span className="-z-10 lg:fixed hidden lg:block bottom-[11rem] -right-1 w-96 h-64 bg-seeds-purple-2 blur-[160px] rotate-45 rounded-full" />
      <span className="-z-10 lg:fixed hidden lg:block bottom-36 right-0 w-[10rem] h-64 bg-seeds-purple-2 blur-[160px] rotate-60 rounded-full" />
    </>
  );

  return (
    <>
      <PageGradient
        customGradient={customGradient}
        className="z-0 relative overflow-hidden flex flex-col justify-center mx-5 lg:mx-20"
      >
        <div className="flex z-10 flex-col lg:flex-row justify-between">
          <div className="flex flex-col">
            <div className="text-3xl font-semibold bg-clip-text text-black">
              {t('articleList.text1')}
            </div>
            <div className=" text-md font-normal text-gray-500">
              {t('articleList.text2')}
            </div>
          </div>
          <div className="lg:flex-col  justify-end mt-4  ">
            <div className="w-full lg:w-[300px] lg:h-[40px] bg-white rounded-3xl flex border-black border-[1px] px-[8px] justify-between ">
              <input
                type="search"
                className=" text-[#7C7C7C] w-full border-none rounded-3xl lg:w-[340px] px-[8px] focus:outline-none lg:h-[38px] "
                placeholder="Search"
                aria-label="Search"
                aria-describedby="button-addon2"
                onChange={e => {
                  setSearchInput(e.target.value);
                }}
              />
              <svg
                className="mt-2 me-3"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z"
                  fill="#262626"
                />
              </svg>
            </div>
            <div className="lg:flex  justify-end mt-4 ">
              <div className="hidden lg:block mt-2 font-normal text-base mx-3 text-[#7C7C7C]">
                {t('articleList.text3')}
              </div>
              <select
                className="me-5 bg-transparent mt-1 hidden lg:block text-base font-semibold"
                aria-label="All"
              >
                <option value="option1">All</option>
                <option value="option2">All</option>
              </select>
            </div>
          </div>
        </div>
        <div className="lg:hidden z-10 flex justify-end mt-5">
          <div className=" justify-end lg:hidden first-line:mt-2 font-normal text-base mx-3 text-[#7C7C7C]">
            {t('articleList.text3')}
          </div>
          <select
            className="me-5 justify-end bg-transparent mt-1 lg:hidden text-base font-semibold"
            aria-label="All"
          >
            <option value="option1">All</option>
            <option value="option2">All</option>
          </select>
        </div>

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
                    ? 'bg-[#3AC4A0] text-white'
                    : 'text-[#3AC4A0] bg-[#F9F9F9]'
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
            className={`py-1 rounded-full text-md px-4 ${
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
            className={`py-1 rounded-full text-md px-2 ${
              activeCategory === 'general'
                ? 'bg-[#3AC4A0] text-white'
                : 'text-[#3AC4A0] bg-[#F9F9F9]'
            }`}
            onClick={() => {
              updateCategory('general');
            }}
          >
            General
          </button>
          <button
            className={`py-1 rounded-full text-md px-2 ${
              activeCategory === 'crypto'
                ? 'bg-[#3AC4A0] text-white'
                : 'text-[#3AC4A0] bg-[#F9F9F9]'
            }`}
            onClick={() => {
              updateCategory('crypto');
            }}
          >
            Crypto
          </button>

          <button
            className={`py-1 rounded-full text-md px-2 ${
              activeCategory === 'usstocks'
                ? 'bg-[#3AC4A0] text-white'
                : 'text-[#3AC4A0] bg-[#F9F9F9]'
            }`}
            onClick={() => {
              updateCategory('usstocks');
            }}
          >
            Us Stocks
          </button>
          <button
            className={`py-1 rounded-full text-md px-2 ${
              activeCategory === 'indostocks'
                ? 'bg-[#3AC4A0] text-white'
                : 'text-[#3AC4A0] bg-[#F9F9F9]'
            }`}
            onClick={() => {
              updateCategory('indostocks');
            }}
          >
            Indo Stocks
          </button>
          <button
            className={`py-1 rounded-full text-md px-2 ${
              activeCategory === 'commodities'
                ? 'bg-[#3AC4A0] text-white'
                : 'text-[#3AC4A0] bg-[#F9F9F9]'
            }`}
            onClick={() => {
              updateCategory('commodities');
            }}
          >
            Commodities
          </button>
          <button
            className={`py-1 rounded-full text-md px-2 ${
              activeCategory === 'indices'
                ? 'bg-[#3AC4A0] text-white'
                : 'text-[#3AC4A0] bg-[#F9F9F9]'
            }`}
            onClick={() => {
              updateCategory('indices');
            }}
          >
            Indices
          </button>
          <button
            className={`py-1 rounded-full text-md px-2 ${
              activeCategory === 'forex'
                ? 'bg-[#3AC4A0] text-white'
                : 'text-[#3AC4A0] bg-[#F9F9F9]'
            }`}
            onClick={() => {
              updateCategory('forex');
            }}
          >
            Forex
          </button>
          <button
            className={`py-1 rounded-full text-md px-2 ${
              activeCategory === 'finance'
                ? 'bg-[#3AC4A0] text-white'
                : 'text-[#3AC4A0] bg-[#F9F9F9]'
            }`}
            onClick={() => {
              updateCategory('finance');
            }}
          >
            Finance
          </button>
        </div>
        <div className="grid z-10 lg:grid-cols-6 gap-4 mt-8">
          {articles.map(article => {
            return <ArticleCard key={article.id} articleId={article.id} />;
          })}
        </div>

        <div className="hidden lg:flex  justify-center mx-auto my-8">
          <ArtPagination
            currentPage={params.page}
            totalPages={params.totalPage}
            onPageChange={page => {
              setParams({ ...params, page });
            }}
          />
        </div>
      </PageGradient>
      <Section6 />
    </>
  );
}
