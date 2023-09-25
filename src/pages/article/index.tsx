import handphone2 from '@/assets/landing-page/handphone2.svg';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import Section6 from '@/containers/landing/Section6';
import { getArticle } from '@/repository/article.repository';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
export interface ArticleListRoot {
  promoCodeList: Article[];
  metadata: Metadata;
}
interface Article {
  id: number;
  title: string;
  body: string;
  image: string;
  source_image: string;
  author: string;
  author_id: string;
  slug: string;
  status: string;
  scheduled_at: string;
  created_at: string;
  updated_at: string;
  formattedPublicationDate: string;
}

export interface Metadata {
  currentPage: number;
  limit: number;
  totalPage: number;
  totalRow: number;
}

const params = {
  page: 1,
  limit: 9,
  order_by: 'scheduled_at,DESC'
};

export default function ArticleList(): React.ReactElement {
  const [articles, setArticles] = useState<Article[]>([]);

  async function fetchArticles(): Promise<void> {
    try {
      const response = await getArticle(params);
      if (response.status === 200) {
        setArticles(response.data);
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
  }, []);

  const { t } = useTranslation();

  const timeAgo = (dateString: string): string => {
    const createdDate = new Date(dateString);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - createdDate.getTime();
    const secondsDifference = Math.floor(timeDifference / 1000);

    if (secondsDifference < 60) {
      return `${secondsDifference} seconds ago`;
    } else if (secondsDifference < 3600) {
      const minutes = Math.floor(secondsDifference / 60);
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (secondsDifference < 86400) {
      const hours = Math.floor(secondsDifference / 3600);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      const days = Math.floor(secondsDifference / 86400);
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    }
  };

  return (
    <>
      <PageGradient className="z-0 relative overflow-hidden flex flex-col justify-center mx-5 lg:mx-20">
        {articles !== null ? (
          <>
            <div className="flex z-10 flex-col lg:flex-row justify-between">
              <div>
                <div className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#9A76FE] to-[#4FE6AF]">
                  {t('articleList.text1')}
                </div>
              </div>
              <div className="lg:flex justify-end mt-4 ">
                <div className=" hidden lg:block mt-2 font-normal text-base mx-3 text-[#7C7C7C]">
                  {t('articleList.text3')} :
                </div>
                <select
                  className="me-5 hidden lg:block text-base font-semibold"
                  aria-label="All"
                >
                  <option value="option1">All</option>
                  <option value="option2">All</option>
                </select>
                <input
                  type="search"
                  className="w-full lg:w-[300px] lg:h-[40px] rounded-3xl border-[1px] px-[8px] justify-between py-[12px] text-[#7C7C7C] "
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="button-addon2"
                />
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
            <div className="grid z-10 lg:grid-cols-6 gap-4 mt-8">
              {articles.map(article => (
                <div
                  key={article.id}
                  className="p-4 border bg-[#F9F9F9] gap-[16px] lg:col-span-2 border-gray-300 rounded w-full"
                >
                  <Link href={`/article-list/${article.id}`}>
                    <div className="flex justify-between">
                      <div className="flex-row">
                        <div className="px-3 w-[30%] rounded-full font-poppins bg-[#5E44FF] text-xs font-normal">
                          Trends
                        </div>
                        <div className="flex justify-between flex-col">
                          <div className="mb-auto">
                            <p className="mt-2 font-semibold text-base">
                              {article.title} : {article.body}
                            </p>
                          </div>

                          <div>
                            <div className="flex mt-2 justify-between">
                              <p className="mt-1 font-normal text-sm text-[#8A8A8A]">
                                {article.author}
                              </p>
                              <p className="mt-1 font-normal text-sm text-[#8A8A8A]">
                                {timeAgo(article.created_at)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="mt-1 w-[100px] h-[100px]">
                          <Image
                            src={handphone2}
                            alt="Image"
                            width={100}
                            height={100}
                            className="h-[100px] w-[100px]"
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="w-screen h-screen bg-white"></div>
          </>
        )}
      </PageGradient>
      <Section6 />
    </>
  );
}
