import ArticleCard from '@/components/seedsPedia/articleCard';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import Section6 from '@/containers/landing/Section6';
import { getArticle } from '@/repository/article.repository';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

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
    category: 'All'
  });
  async function fetchArticles(): Promise<void> {
    try {
      const response = await getArticle({
        ...params,
        source: params.source,
        category: params.category
      });
      console.log(response, 'abcde');

      if (response.status === 200) {
        setArticles(response.news);
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

  const updateParams = (direction: 'decrease' | 'increase'): void => {
    if (direction === 'decrease' && params.page > 1) {
      setParams(prevParams => ({
        ...prevParams,
        page: prevParams.page - 1
      }));
    } else if (direction === 'increase') {
      setParams(prevParams => ({
        ...prevParams,
        page: prevParams.page + 1
      }));
    }
  };
  const updateCategory = (newCategory: string): void => {
    setParams(prevParams => ({
      ...prevParams,
      category: newCategory
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
      <span className="-z-10 fixed bottom-10 -left-10 w-60 h-48 bg-seeds-green blur-[90px] rotate-45" />
      <span className="-z-10 fixed bottom-0 left-0 w-24 h-24 bg-seeds-green blur-[90px]" />
      <span className="-z-10 fixed -bottom-28 left-16 w-48 h-32 bg-seeds-purple-2 blur-[90px] rotate-45" />
      <span className="-z-10 fixed top-64 -right-4 w-60 h-48 bg-seeds-purple blur-[140px] rotate-45 rounded-full" />
      <span className="-z-10 fixed bottom-36 right-0 w-32 h-32 bg-seeds-purple-2 blur-[140px] rotate-90 rounded-full" />
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
            <div className="w-full lg:w-[300px] lg:h-[40px] bg-white rounded-3xl flex border-[1px] px-[8px] justify-between ">
              <input
                type="search"
                className=" text-[#7C7C7C] w-full rounded-3xl border-none lg:w-[300px] px-[8px] lg:h-[39px] "
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
                {t('articleList.text3')} :
              </div>
              <select
                className="me-5 hidden lg:block text-base font-semibold"
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
            {t('articleList.text3')} :
          </div>
          <select
            className="me-5 justify-end lg:hidden text-base font-semibold"
            aria-label="All"
          >
            <option value="option1">All</option>
            <option value="option2">All</option>
          </select>
        </div>
        <div className="lg:flex  justify-center mt-4 gap-2 ">
          <button
            className={`py-1 rounded-full text-md px-2 ${
              activeCategory === 'All'
                ? 'bg-[#3AC4A0] text-white'
                : 'text-[#3AC4A0]'
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
                : 'text-[#3AC4A0]'
            }`}
            onClick={() => {
              updateCategory('general');
            }}
          >
            General
          </button>
          <button
            className={`py-1 rounded-full text-md px-2 ${
              activeCategory === 'cripto'
                ? 'bg-[#3AC4A0] text-white'
                : 'text-[#3AC4A0]'
            }`}
            onClick={() => {
              updateCategory('cripto');
            }}
          >
            Cripto
          </button>

          <button
            className={`py-1 rounded-full text-md px-2 ${
              activeCategory === 'usstocks'
                ? 'bg-[#3AC4A0] text-white'
                : 'text-[#3AC4A0]'
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
                : 'text-[#3AC4A0]'
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
                : 'text-[#3AC4A0]'
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
                : 'text-[#3AC4A0]'
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
                : 'text-[#3AC4A0]'
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
                : 'text-[#3AC4A0]'
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

        <div className="flex justify-center mt-8">
          <div className="mt-5 pb-10 pagination">
            <div className="bg-white rounded-full cursor-pointer flex flex-row gap-3 p-2 shadow-lg">
              <div
                className="p-2"
                onClick={() => {
                  updateParams('decrease');
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M12.5 15L7.5 10L12.5 5"
                    stroke="#7C7C7C"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div
                className="rounded-full p-2 bg-gradient-to-r cursor-pointer from-[#9A76FE] to-[#4FE6AF]"
                onClick={() => {
                  updateParams('increase');
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M7.5 15L12.5 10L7.5 5"
                    stroke="white"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </PageGradient>
      <Section6 />
    </>
  );
}
