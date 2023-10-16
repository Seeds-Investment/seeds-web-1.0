'use-client';
import { getArticleById } from '@/repository/article.repository';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface ArticleCardProps {
  articleId: string;
}

interface ArticleDetail {
  id: number;
  title: string;
  author: string;
  link: string;
  videoUrl: string;
  imageUrl: string;
  content: string;
  sourceId: string;
  language: string;
  category: string;
  publicationDate: string;
  total_likes: number;
  total_comments: number;
  total_shares: number;
  is_liked: boolean;
}

const NewsCard: React.FC<ArticleCardProps> = ({ articleId }) => {
  const [articleDetail, setArticleDetail] = useState<ArticleDetail | null>(
    null
  );
  const [open] = useState(false);

  const stripHtmlTags = (html: any): string => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;
    return (tempElement.textContent ?? tempElement.innerText ?? '').toString();
  };

  const cleanedContent = stripHtmlTags(articleDetail?.content ?? '');

  function LimitString({
    text,
    limit
  }: {
    text: string;
    limit: number;
  }): JSX.Element {
    const [showFullText] = useState(false);

    const truncatedText = showFullText ? text : text.slice(0, limit);

    return (
      <div>
        <p className="text-base font-normal text-[#7C7C7C] my-2">
          {truncatedText}...
        </p>
        {!showFullText && text.length > limit && (
          <button className="text-[#7555DA] text-base font-normal underline">
            Read More
          </button>
        )}
      </div>
    );
  }

  useEffect(() => {
    if (typeof articleId !== 'string') {
      // Check if articleId is a valid non-empty string
      const fetchArticleDetail = (): void => {
        getArticleById(articleId)
          .then(response => {
            if (response.status === 200) {
              setArticleDetail(response.news);
            }
            console.log(response);
          })
          .catch(error => {
            console.error('Error fetching article detail:', error);
          });
      };
      fetchArticleDetail();
    }
  }, [articleId]);

  function isImageUrlValid(url: string): boolean {
    return url?.startsWith('http://') || url?.startsWith('https://');
  }

  const defaultNews = '/assets/default-news.png';
  const imageUrl = articleDetail?.imageUrl ?? defaultNews;
  const isImageValid = isImageUrlValid(imageUrl);
  return (
    <>
      {open && (
        <div
          id="myToast"
          className="fixed right-10 z-50 bottom-10 px-5 py-4 border-r-8 border-blue-500 bg-white drop-shadow-lg"
        >
          <p className="text-sm">
            <span className="mr-2 inline-block px-3 py-1 rounded-full bg-blue-500 text-white font-extrabold">
              i
            </span>
            Article copied to Clipboard
          </p>
        </div>
      )}
      <div className="bg-[#FFF]  flex lg:col-span-2 xl:rounded-[18px] pb-6 w-full relative shadow-md">
        <div className="p-4 w-3/4">
          {/* <div className="flex flex-row justify-between">
            <p className="text-base font-normal text-[#7C7C7C]">
              {articleDetail?.author}
            </p>
            <p className="text-base font-normal text-[#8A8A8A]">
              {formatDateToIndonesian(articleDetail?.publicationDate ?? '')}
            </p>
          </div> */}
          <h1 className="text-lg font-semibold text-[#000] my-4">
            {articleDetail?.title}
          </h1>
          <Link href={`/seedspedia/news/${articleDetail?.id ?? 0}`}>
            <LimitString text={cleanedContent} limit={100} />
          </Link>
        </div>
        <div className="p-4 w-[45%] flex flex-col ">
          <Link href={`/seedspedia/article/${articleDetail?.id ?? 0}`}>
            {isImageValid ? (
              <img
                src={imageUrl}
                alt={articleDetail?.title}
                className="w-full h-[238px] rounded-[18px]"
              />
            ) : (
              <img
                src={defaultNews}
                alt={articleDetail?.title}
                className="w-full h-[238px] rounded-[18px]"
              />
            )}
          </Link>
        </div>
      </div>
    </>
  );
};

export default NewsCard;
