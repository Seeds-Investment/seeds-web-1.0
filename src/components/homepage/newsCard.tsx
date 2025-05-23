'use-client';
import { type Article } from '@/containers/homepage/news/NewsPage';
import { getErrorMessage } from '@/utils/error/errorHandler';
import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';
import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
interface ArticleCardProps {
  articles: Article;
}

const NewsCard: React.FC<ArticleCardProps> = ({ articles }) => {
  const { t } = useTranslation();
  const baseUrl =
    process.env.NEXT_PUBLIC_DOMAIN ?? 'https://user-dev-ali.seeds.finance/';

  function isImageUrlValid(url: string): boolean {
    return url?.startsWith('http://') || url?.startsWith('https://');
  }

  function formatDateToIndonesian(dateStr: string): string {
    try {
      const parsedDate = parseISO(dateStr);
      const formattedDate = format(parsedDate, 'd MMMM ', { locale: id });

      return formattedDate;
    } catch (error) {
      console.error('Error parsing or formatting date:', error);
      return '';
    }
  }

  function formatDateToIndonesianAgo(dateStr: string): string {
    try {
      const parsedDate = parseISO(dateStr);
      const distance = formatDistanceToNow(parsedDate, { locale: id });
      return `.  ${distance}`;
    } catch (error) {
      console.error('Error parsing or formatting date:', error);
      return '';
    }
  }

  const defaultNews = '/assets/default-news.png';
  const imageUrl = articles?.imageUrl ?? defaultNews;
  const isImageValid = isImageUrlValid(imageUrl);
  return (
    <>
      <div className="bg-[#FFF] flex lg:col-span-2 xl:rounded-[18px] pb-6 w-full relative shadow-md">
        <div className="px-4 py-3 w-3/4">
          <div className="flex flex-row justify-between"></div>
          <Link
            href={`/homepage/news/${articles?.id ?? 0}`}
            className="text-base font-semibold text-[#000] my-4"
          >
            {articles?.title}
          </Link>
          <div className="flex flex-row justify-between bottom-2 w-full gap-4 right-5 absolute">
            <div className="flex flex-row ms-7 justify-between">
              <p className="text-xs font-normal text-[#8A8A8A]">
                {formatDateToIndonesian(articles?.publicationDate ?? '')}
              </p>
              <p className="text-xs font-normal text-[#7C7C7C]">
                {formatDateToIndonesianAgo(articles?.publicationDate ?? '')}
              </p>
            </div>
            
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              className="cursor-pointer"
              onClick={async () => {
                const articleName = articles?.title ?? '';
                const shareUrl = `${baseUrl}/homepage/news/${articles?.id}`;
                if (navigator?.share !== null && navigator?.share !== undefined) {
                  try {
                    await navigator.share({
                      title: articleName,
                      text: `${t('articleList.text29')}`,
                      url: shareUrl,
                    });
                  } catch (error: any) {
                    toast.error(getErrorMessage(error));
                  }
                } else {
                  alert(t('articleList.text30'));
                }
              }}
            >
              <path
                d="M18.0059 8.07788C19.6627 8.07788 21.0059 6.73474 21.0059 5.07788C21.0059 3.42103 19.6627 2.07788 18.0059 2.07788C16.349 2.07788 15.0059 3.42103 15.0059 5.07788C15.0059 6.73474 16.349 8.07788 18.0059 8.07788Z"
                stroke="#262626"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.00586 15.0779C7.66271 15.0779 9.00586 13.7347 9.00586 12.0779C9.00586 10.421 7.66271 9.07788 6.00586 9.07788C4.34901 9.07788 3.00586 10.421 3.00586 12.0779C3.00586 13.7347 4.34901 15.0779 6.00586 15.0779Z"
                stroke="#262626"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.0059 22.0779C19.6627 22.0779 21.0059 20.7347 21.0059 19.0779C21.0059 17.421 19.6627 16.0779 18.0059 16.0779C16.349 16.0779 15.0059 17.421 15.0059 19.0779C15.0059 20.7347 16.349 22.0779 18.0059 22.0779Z"
                stroke="#262626"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.5957 13.5879L15.4257 17.5679"
                stroke="#262626"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.4157 6.58789L8.5957 10.5679"
                stroke="#262626"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <div className="lg:px-4 lg:py-4 py-3 px-1 flex flex-col ">
          <Link href={`/homepage/news/${articles?.id ?? 0}`}>
            {isImageValid ? (
              <img
                src={imageUrl}
                alt={articles?.title}
                className="w-[153px] object-cover h-[160px] rounded-[18px]"
              />
            ) : (
              <img
                src={defaultNews}
                alt={articles?.title}
                className="w-[153px] object-cover h-[160px] rounded-[18px]"
              />
            )}
          </Link>
        </div>
      </div>
    </>
  );
};

export default NewsCard;
