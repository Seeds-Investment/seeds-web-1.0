'use-client';
import Footer from '@/components/layouts/Footer';
import Button from '@/components/ui/button/Button';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import MetaPage from '@/containers/circle/[id]/MetaComponent';
import {
  getArticle,
  getArticleById,
  getArticleCategories,
  getArticleComment,
  postComment,
  postLike
} from '@/repository/article.repository';
import { getUserInfo } from '@/repository/profile.repository';
import i18n from '@/utils/common/i18n';
import { type CategoryI } from '@/utils/interfaces/article.interface';
import { type IOtherUserProfile } from '@/utils/interfaces/user.interface';
import { Input, Typography } from '@material-tailwind/react';
import { format, parseISO } from 'date-fns';
import { id as ID } from 'date-fns/locale';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineClose } from 'react-icons/ai';
import Slider from 'react-slick';
import { toast } from 'react-toastify';
import author from '../../../../../../public/assets/author.png';
import profile from '../../../../../../public/assets/profile.png';
import SeedyEmpty from '../../../../../../public/assets/seedy-empty.svg';

export interface ArticleListRoot {
  promoCodeList: Article[];
  metadata: Metadata;
}
interface Article {
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
  meta_description: string;
  meta_title: string;
  assets: any[];
  circles: any[];
  peoples: any[];
}

interface FormRequestInterface {
  comment: string;
}

const initialFormRequest = {
  comment: ''
};

export interface Metadata {
  currentPage: number;
  limit: number;
  totalPage: number;
  totalRow: number;
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
  meta_description: string;
  meta_title: string;
  assets: any[];
  circles: any[];
  peoples: any[];
}

interface ArticleComment {
  id: string;
  name: string;
  avatar: string;
  comment: string;
  created_at: string;
}

const params = {
  page: 1,
  limit: 8,
  search: '',
  language: '',
  source: 'articles',
  order_by: 'scheduled_at,DESC',
  category: 'all'
};

const recentParams = {
  page: 1,
  limit: 3,
  search: '',
  language: '',
  source: 'articles',
  sort_by: 'recent',
  category: 'all'
};

export default function ArticleDetailPage(): JSX.Element {
  const router = useRouter();
  const { id } = router.query;
  const accessToken =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  const [userInfo, setUserInfo] = useState<IOtherUserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [comment, setComment] = useState('');
  const [articleDetail, setArticleDetail] = useState<ArticleDetail | null>(
    null
  );
  const { t } = useTranslation();
  const [articleComment, setArticleComment] = useState<ArticleComment[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [recentArticles, setRecentArticles] = useState<Article[]>([]);
  const [formRequest, setFormRequest] =
    useState<FormRequestInterface>(initialFormRequest);
  const baseUrl =
    process.env.NEXT_PUBLIC_DOMAIN ?? 'https://user-dev-ali.seeds.finance/';
  const [categories, setCategories] = useState<CategoryI[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const filteredCategories = useMemo(() => {
    return categories?.filter(
      item =>
        item?.category !== 'crime' &&
        item?.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, categories]);

  async function fetchArticles(): Promise<void> {
    try {
      const response = await getArticle({ ...params, language: i18n.language });
      const responseRecent = await getArticle({ ...recentParams, language: i18n.language });
      if (response.status === 200) {
        setArticles(response.data);
      } else {
        console.error('Failed to fetch articles:', response);
      }
      if (responseRecent.status === 200) {
        setRecentArticles(responseRecent?.data);
      } else {
        console.error('Failed to fetch articles:', responseRecent);
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
  }, [i18n.language]);

  useEffect(() => {
    void fetchData();
    void fetchArticleCategory();
  }, []);
  
  const fetchData = async (): Promise<void> => {
    try {
      const response = await getUserInfo();
      setUserInfo(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchArticleCategory = async (): Promise<void> => {
    try {
      const response = await getArticleCategories();
      setCategories(response?.data)

    } catch (error) {
      console.log(error);
    }
  };

  const capitalizeWords = (str: string): string => {
    return str.replace(/\b\w/g, char => char.toUpperCase());
  }

  useEffect(() => {
    if (typeof id === 'string') {
      // Check if id is a valid string
      const fetchArticleDetail = (): void => {
        getArticleById(Number(id))
          .then(response => {
            if (response.status === 200) {
              setArticleDetail(response.news);
              console.log(response.news);
            }
          })
          .catch(error => {
            console.error('Error fetching article detail:', error);
          });
      };
      const fetchArticleComment = (): void => {
        getArticleComment(id)
          .then(response => {
            if (response.status === 200) {
              setArticleComment(response.comments);
            }
          })
          .catch(error => {
            console.error('Error fetching article detail:', error);
          });
      };
      fetchArticleComment();
      fetchArticleDetail();
    }
  }, [id]);

  function formatDateToIndonesian(dateStr: string): string {
    try {
      const parsedDate = parseISO(dateStr);
      const formattedDate = format(parsedDate, 'd MMMM yyyy', {
        locale: ID
      }); // id adalah kode bahasa Indonesia

      return formattedDate;
    } catch (error) {
      console.error('Error parsing or formatting date:', error);
      return ''; // Mengembalikan string kosong jika terjadi kesalahan
    }
  }

  const updateComment = (comment: string): void => {
    setComment(comment);
    setFormRequest(prevState => ({
      ...prevState,
      comment
    }));
  };

  const submitComment = async (articleId: number): Promise<void> => {
    try {
      setLoading(true);
      const response = await postComment(formRequest, articleId);
      if (response.status === 200) {
        setLoading(false);
        setComment('');
        setFormRequest(prevState => ({
          ...prevState,
          comment: ''
        }));
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const likeArticle = async (articleId: number): Promise<void> => {
    try {
      const response = await postLike(formRequest, articleId);
      if (response.status === 200) {
        if (response.is_liked === true) {
          setArticleDetail(prevArticleDetail => {
            if (prevArticleDetail !== null) {
              return {
                ...prevArticleDetail,
                total_likes: prevArticleDetail?.total_likes + 1,
                is_liked: true
              };
            }
            return prevArticleDetail;
          });
        } else {
          setArticleDetail(prevArticleDetail => {
            if (prevArticleDetail !== null) {
              return {
                ...prevArticleDetail,
                total_likes: prevArticleDetail?.total_likes - 1,
                is_liked: false
              };
            }
            return prevArticleDetail;
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  function formatDate(inputDate: string): string {
    const date = new Date(inputDate);
    // Remove milliseconds to avoid precision issues
    date.setMilliseconds(0);

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options).replace(',', '');
  }

  function isImageUrlValid(url: string): boolean {
    return url?.startsWith('http://') || url?.startsWith('https://');
  }

  if (articleDetail == null) {
    return <p>Loading...</p>;
  }

  const defaultNews = '/assets/default-news.png';
  const imageUrl = articleDetail?.imageUrl;
  const hotNewsItemClass = 'mb-2 me-12';

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
        <p className="text-sm font-normal text-[#7C7C7C] my-2">
          {truncatedText}...
        </p>
        {!showFullText && text.length > limit && (
          <button className="text-[#7555DA] text-base font-normal underline"></button>
        )}
      </div>
    );
  }

  const stripHtmlTags = (html: any): string => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;
    return (tempElement.textContent ?? tempElement.innerText ?? '').toString();
  };

  const isImageValid = isImageUrlValid(imageUrl);
  return (
    <>
      {articleDetail.meta_description.length > 0 &&
        articleDetail.meta_title.length > 0 && (
          <MetaPage
            pageDescription={articleDetail.meta_description}
            pageTitle={articleDetail.meta_title}
          />
        )}
      <PageGradient className="z-0 flex justify-center mt-20">
        <div className="z-20 relative overflow-hidden flex flex-col justify-center max-w-[1024px]">
          <Typography className="mt-5 md:mt-8 mb-4 text-2xl lg:text-5xl font-semibold bg-clip-text text-black px-5 font-poppins md:text-center bg-orange-300">
            {articleDetail.title}
          </Typography>

          <div className='flex mb-6 px-5 md:justify-center'>
            <div className='flex justify-center text-sm md:text-lg items-center text-seeds-button-green border border-[#f2f2f2] rounded-full px-4 py-2'>
              {articleDetail?.category}
            </div>
          </div>

          <div className="w-full md:px-5">
            {isImageValid ? (
              <img
                src={imageUrl}
                alt="Image"
                className=" object-cover md:rounded-2xl w-full"
              />
            ) : (
              <img
                src={defaultNews}
                alt="Image"
                className=" object-cover md:rounded-2xl w-full"
              />
            )}
          </div>

          <div className="flex flex-row justify-between items-center my-4 px-5 md:hidden">
            <div className="flex gap-3 justify-center items-center">
              <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden shrink-0">
                <Image 
                  src={
                    articleDetail?.author === 'No Author'
                      ? profile
                      : author
                  } 
                  alt="Author" 
                  layout="fill" 
                  objectFit="cover" 
                />
              </div>
              <div className="flex flex-col">
                <Typography className="text-sm md:text-xl font-semibold text-[#262626] mt-2">
                  {articleDetail.author}
                </Typography>
                <p className="text-sm font-semibold text-[#8A8A8A]">
                  {formatDateToIndonesian(articleDetail?.publicationDate)}
                </p>
              </div>
            </div>
            <div className="flex flex-row justify-center items-center">
              {articleDetail?.is_liked !== undefined &&
              articleDetail.is_liked ? (
                <div
                  className="rounded-full p-1 w-8 h-8 bg-green-500 cursor-pointer"
                  onClick={async () => {
                    await likeArticle(articleDetail?.id ?? 0);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M7 11L11 2C11.7956 2 12.5587 2.31607 13.1213 2.87868C13.6839 3.44129 14 4.20435 14 5V9H19.66C19.9499 8.99672 20.2371 9.0565 20.5016 9.17522C20.7661 9.29393 21.0016 9.46873 21.1919 9.68751C21.3821 9.90629 21.5225 10.1638 21.6033 10.4423C21.6842 10.7207 21.7035 11.0134 21.66 11.3L20.28 20.3C20.2077 20.7769 19.9654 21.2116 19.5979 21.524C19.2304 21.8364 18.7623 22.0055 18.28 22H7M7 11V22M7 11H4C3.46957 11 2.96086 11.2107 2.58579 11.5858C2.21071 11.9609 2 12.4696 2 13V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H7"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              ) : (
                <div
                  className={`rounded-full p-1 w-8 h-8 cursor-pointer ${
                    articleDetail.is_liked ? 'bg-green-500' : 'bg-[#BDBDBD]'
                  }`}
                  onClick={async () => {
                    await likeArticle(articleDetail?.id ?? 0);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M7 11L11 2C11.7956 2 12.5587 2.31607 13.1213 2.87868C13.6839 3.44129 14 4.20435 14 5V9H19.66C19.9499 8.99672 20.2371 9.0565 20.5016 9.17522C20.7661 9.29393 21.0016 9.46873 21.1919 9.68751C21.3821 9.90629 21.5225 10.1638 21.6033 10.4423C21.6842 10.7207 21.7035 11.0134 21.66 11.3L20.28 20.3C20.2077 20.7769 19.9654 21.2116 19.5979 21.524C19.2304 21.8364 18.7623 22.0055 18.28 22H7M7 11V22M7 11H4C3.46957 11 2.96086 11.2107 2.58579 11.5858C2.21071 11.9609 2 12.4696 2 13V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H7"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
              <p className="align-middle mx-2 mt-1">
                {' '}
                +{articleDetail?.total_likes}
              </p>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={async () => {
                  const articleName = articleDetail?.title ?? '';
                  const formattedName = articleName
                    .replace(/[^\w\s-]/gi, '')
                    .split(' ')
                    .filter(Boolean)
                    .join('-');
                  const shareUrl = `${baseUrl}/seedspedia/articles/${articleDetail?.id}/${formattedName ?? ''}`;
                  if (navigator?.share !== null && navigator?.share !== undefined) {
                    try {
                      await navigator.share({
                        title: articleName,
                        text: `${t('articleList.text28')}`,
                        url: shareUrl,
                      });
                    } catch {
                      toast(t('articleList.text31'));
                    }
                  } else {
                    alert(t('articleList.text30'));
                  }
                }}
              >
                <path
                  d="M21.5612 19.6496C20.8499 19.6496 20.1936 19.8897 19.6795 20.2907L14.5087 16.6916C14.5953 16.2344 14.5953 15.7659 14.5087 15.3087L19.6795 11.7096C20.1936 12.1106 20.8499 12.3507 21.5612 12.3507C23.2132 12.3507 24.5558 11.059 24.5558 9.46953C24.5558 7.8801 23.2132 6.58838 21.5612 6.58838C19.9091 6.58838 18.5665 7.8801 18.5665 9.46953C18.5665 9.74804 18.6064 10.0145 18.6838 10.2691L13.7726 13.6904C13.0439 12.7612 11.8859 12.1586 10.5808 12.1586C8.3747 12.1586 6.58789 13.8777 6.58789 16.0001C6.58789 18.1226 8.3747 19.8417 10.5808 19.8417C11.8859 19.8417 13.0439 19.239 13.7726 18.3099L18.6838 21.7312C18.6064 21.9857 18.5665 22.2546 18.5665 22.5308C18.5665 24.1202 19.9091 25.4119 21.5612 25.4119C23.2132 25.4119 24.5558 24.1202 24.5558 22.5308C24.5558 20.9413 23.2132 19.6496 21.5612 19.6496ZM21.5612 8.22103C22.2774 8.22103 22.8588 8.78046 22.8588 9.46953C22.8588 10.1586 22.2774 10.718 21.5612 10.718C20.8449 10.718 20.2635 10.1586 20.2635 9.46953C20.2635 8.78046 20.8449 8.22103 21.5612 8.22103ZM10.5808 18.113C9.37042 18.113 8.38468 17.1646 8.38468 16.0001C8.38468 14.8357 9.37042 13.8873 10.5808 13.8873C11.7911 13.8873 12.7768 14.8357 12.7768 16.0001C12.7768 17.1646 11.7911 18.113 10.5808 18.113ZM21.5612 23.7793C20.8449 23.7793 20.2635 23.2198 20.2635 22.5308C20.2635 21.8417 20.8449 21.2823 21.5612 21.2823C22.2774 21.2823 22.8588 21.8417 22.8588 22.5308C22.8588 23.2198 22.2774 23.7793 21.5612 23.7793Z"
                  fill="#262626"
                />
              </svg>
            </div>
          </div>
          
          <div className='px-5 md:flex'>
            <div className='hidden md:flex w-1/3 flex-col pt-4 pr-4'>
              <Typography className='font-poppins text-sm text-[#7C7C7C] mb-2'>
                {t('articleList.text17')}
              </Typography>
              <div className="flex gap-3 justify-start items-center pb-4 mb-4 border-b border-[#BDBDBD]">
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                  <Image src={author} alt="Author" layout="fill" objectFit="cover" />
                </div>
                <div className="flex flex-col">
                  <Typography className="text-sm font-semibold text-[#262626] mt-2">
                    {articleDetail.author}
                  </Typography>
                  <p className="text-sm font-semibold text-[#8A8A8A]">
                    {formatDateToIndonesian(articleDetail?.publicationDate)}
                  </p>
                </div>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div className='flex justify-center items-center gap-2'>
                  {articleDetail?.is_liked !== undefined && articleDetail.is_liked ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="#3AC4A0"
                      className="cursor-pointer"
                      onClick={async () => {
                        await likeArticle(articleDetail?.id ?? 0);
                      }}
                    >
                      <path
                        d="M7.00293 11.0779L11.0029 2.07788C11.7986 2.07788 12.5616 2.39395 13.1243 2.95656C13.6869 3.51917 14.0029 4.28223 14.0029 5.07788V9.07788H19.6629C19.9528 9.0746 20.24 9.13438 20.5045 9.2531C20.769 9.37181 21.0045 9.54661 21.1948 9.76539C21.385 9.98417 21.5254 10.2417 21.6063 10.5201C21.6871 10.7986 21.7064 11.0912 21.6629 11.3779L20.2829 20.3779C20.2106 20.8548 19.9684 21.2895 19.6008 21.6019C19.2333 21.9143 18.7653 22.0833 18.2829 22.0779H7.00293M7.00293 11.0779V22.0779M7.00293 11.0779H4.00293C3.4725 11.0779 2.96379 11.2886 2.58872 11.6637C2.21364 12.0387 2.00293 12.5474 2.00293 13.0779V20.0779C2.00293 20.6083 2.21364 21.117 2.58872 21.4921C2.96379 21.8672 3.4725 22.0779 4.00293 22.0779H7.00293"
                        stroke="#3AC4A0"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <div
                      className={`flex justify-center items-center rounded-full p-1 w-8 h-8 cursor-pointer ${
                        articleDetail.is_liked ? 'bg-green-500' : 'bg-[#BDBDBD]'
                      }`}
                      onClick={async () => {
                        await likeArticle(articleDetail?.id ?? 0);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M7 11L11 2C11.7956 2 12.5587 2.31607 13.1213 2.87868C13.6839 3.44129 14 4.20435 14 5V9H19.66C19.9499 8.99672 20.2371 9.0565 20.5016 9.17522C20.7661 9.29393 21.0016 9.46873 21.1919 9.68751C21.3821 9.90629 21.5225 10.1638 21.6033 10.4423C21.6842 10.7207 21.7035 11.0134 21.66 11.3L20.28 20.3C20.2077 20.7769 19.9654 21.2116 19.5979 21.524C19.2304 21.8364 18.7623 22.0055 18.28 22H7M7 11V22M7 11H4C3.46957 11 2.96086 11.2107 2.58579 11.5858C2.21071 11.9609 2 12.4696 2 13V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H7"
                          stroke="white"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                  <span className="mx-2 text-[#3AC4A0]">
                    +{articleDetail?.total_likes}
                  </span>
                </div>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={async () => {
                    const articleName = articleDetail?.title ?? '';
                    const formattedName = articleName
                      .replace(/[^\w\s-]/gi, '')
                      .split(' ')
                      .filter(Boolean)
                      .join('-');
                    const shareUrl = `${baseUrl}/seedspedia/articles/${articleDetail?.id}/${formattedName ?? ''}`;
                    if (navigator?.share !== null && navigator?.share !== undefined) {
                      try {
                        await navigator.share({
                          title: articleName,
                          text: `${t('articleList.text28')}`,
                          url: shareUrl,
                        });
                      } catch {
                        toast(t('articleList.text31'));
                      }
                    } else {
                      alert(t('articleList.text30'));
                    }
                  }}
                  className='cursor-pointer'
                >
                  <path
                    d="M21.5612 19.6496C20.8499 19.6496 20.1936 19.8897 19.6795 20.2907L14.5087 16.6916C14.5953 16.2344 14.5953 15.7659 14.5087 15.3087L19.6795 11.7096C20.1936 12.1106 20.8499 12.3507 21.5612 12.3507C23.2132 12.3507 24.5558 11.059 24.5558 9.46953C24.5558 7.8801 23.2132 6.58838 21.5612 6.58838C19.9091 6.58838 18.5665 7.8801 18.5665 9.46953C18.5665 9.74804 18.6064 10.0145 18.6838 10.2691L13.7726 13.6904C13.0439 12.7612 11.8859 12.1586 10.5808 12.1586C8.3747 12.1586 6.58789 13.8777 6.58789 16.0001C6.58789 18.1226 8.3747 19.8417 10.5808 19.8417C11.8859 19.8417 13.0439 19.239 13.7726 18.3099L18.6838 21.7312C18.6064 21.9857 18.5665 22.2546 18.5665 22.5308C18.5665 24.1202 19.9091 25.4119 21.5612 25.4119C23.2132 25.4119 24.5558 24.1202 24.5558 22.5308C24.5558 20.9413 23.2132 19.6496 21.5612 19.6496ZM21.5612 8.22103C22.2774 8.22103 22.8588 8.78046 22.8588 9.46953C22.8588 10.1586 22.2774 10.718 21.5612 10.718C20.8449 10.718 20.2635 10.1586 20.2635 9.46953C20.2635 8.78046 20.8449 8.22103 21.5612 8.22103ZM10.5808 18.113C9.37042 18.113 8.38468 17.1646 8.38468 16.0001C8.38468 14.8357 9.37042 13.8873 10.5808 13.8873C11.7911 13.8873 12.7768 14.8357 12.7768 16.0001C12.7768 17.1646 11.7911 18.113 10.5808 18.113ZM21.5612 23.7793C20.8449 23.7793 20.2635 23.2198 20.2635 22.5308C20.2635 21.8417 20.8449 21.2823 21.5612 21.2823C22.2774 21.2823 22.8588 21.8417 22.8588 22.5308C22.8588 23.2198 22.2774 23.7793 21.5612 23.7793Z"
                    fill="#262626"
                  />
                </svg>
              </div>
              
              <div className='mt-12'>
                <div className="relative w-full mb-3">
                  <input
                    type="text"
                    placeholder={`${t('articleList.text23')}`}
                    value={searchTerm}
                    onChange={e => { setSearchTerm(e.target.value); }}
                    className="w-full px-4 py-2 pr-10 border border-gray-400 text-gray-800 placeholder-gray-500 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-seeds-button-green focus:border-seeds-button-green transition duration-200"
                  />
                  {searchTerm !== '' && (
                    <AiOutlineClose
                      onClick={() => { setSearchTerm(''); }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-red-500"
                      size={18}
                    />
                  )}
                </div>

                <Typography className='text-xl font-semibold font-poppins mb-3'>
                  {t('articleList.text18')}
                </Typography>

                <div className='h-[300px] overflow-y-auto scrollbar-article-hide'>
                  <div>
                    {
                      filteredCategories?.length > 0 ?filteredCategories?.map((item, index) => (
                        <div
                          key={index}
                          className='h-full hover:bg-[#E9E9E9] duration-200'
                        >
                          <div
                            className='flex justify-start items-start border-t border-[#7C7C7C] py-2 text-sm text-[#7C7C7C] gap-2 cursor-pointer'
                            onClick={async () => {
                              await router.push(`/seedspedia?category=${item?.category}&activeTabParams=article`);
                            }}
                          >
                            <Typography className='font-poppins text-xs w-[24px] text-center'>
                              {index < 9 ? `0${index + 1}` : `${index + 1}`}
                            </Typography>
                            <Typography className='font-poppins text-sm truncate'>
                              {item?.category === 'all' ? t('articleList.text13') : capitalizeWords(item.category)}
                            </Typography>
                          </div>
                        </div>
                      ))
                      :
                      (
                        <div className='flex flex-col justify-center items-center gap-2'>
                          <div className='w-[100px] h-auto'>
                            <Image
                              alt={'SeedyEmpty'}
                              src={SeedyEmpty}
                              width={1000}
                              height={1000}
                              className='w-full h-auto'
                            />
                          </div>
                          <Typography className="font-poppins font-medium text-md text-[#7C7C7C] text-center">
                            {t('articleList.text19')}
                          </Typography>
                          <Typography className="font-poppins text-sm text-center">
                            {t('articleList.text20')}
                          </Typography>
                        </div>
                      )
                    }
                  </div>
                </div>
              </div>

              <div className='mt-8'>
                <Typography className='text-xl font-semibold font-poppins mb-3'>
                  {t('articleList.text21')}
                </Typography>
                <div>
                  {recentArticles?.map(recent => (
                    <div
                      key={recent.id}
                      className={`w-full flex cursor-pointer transition-all ${hotNewsItemClass} border-t border-[#7C7C7C] font-poppins`}
                    >
                      <Link
                        href={`/seedspedia/articles/${recent?.id ?? 0}/${
                          recent?.title
                            ?.replace(/[^\w\s]/gi, '')
                            .split(' ')
                            .join('-')
                        }`}
                        className='rounded-lg hover:shadow-lg duration-300'
                      >
                        <div className="flex justify-between gap-2 p-2">
                          <div className="flex-row">
                            <div className="h-full flex justify-between flex-col">
                              <div className="">
                                <h1 className="text-[#7C7C7C] text-xs rounded-full">
                                  {recent?.category}
                                </h1>
                                <h1 className="text-base font-semibold text-[#000] my-1">
                                  {recent?.title !== undefined &&
                                  recent.title.length > 45
                                    ? `${recent.title.slice(0, 45)}...`
                                    : recent?.title}
                                </h1>
                              </div>

                              <div className='flex justify-between items-center mt-2'>
                                <Typography className='text-xs font-poppins truncate max-w-[60%]'>
                                  {t('articleList.text22')} {recent?.author}
                                </Typography>
                                <Typography className="font-normal font-poppins text-xs text-[#8A8A8A]">
                                  {formatDateToIndonesian(
                                    recent?.publicationDate
                                  )}
                                </Typography>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="z-10 flex flex-col text-justify w-full md:w-2/3 md:mt-4 md:pl-10">
              <p
                className="w-full mt-2 text-justify"
                dangerouslySetInnerHTML={{ __html: `${articleDetail?.content}` }}
              ></p>
              <div className="z-10 my-4">
                <div>
                  <p className="font-bold text-md">People </p>
                  <div className="flex flex-row gap-3">
                    {articleDetail?.peoples?.map(people => (
                      <p
                        key={people.id}
                        className="text-md flex underline text-[#3AC4A0]"
                      >
                        {people.name}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              <div className="my-4">
                <div>
                  <p className="font-bold text-md">Circle </p>
                  <div className="flex flex-row gap-3">
                    {articleDetail?.circles?.map(circle => (
                      <p
                        key={circle.id}
                        className="text-md flex flex-row underline text-[#3AC4A0]"
                      >
                        {circle.name}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              <div className="my-4">
                <div>
                  <p className="font-bold text-md">Assets </p>
                  <div className="flex flex-row gap-3">
                    {articleDetail?.assets?.map(assets => (
                      <p
                        key={assets.id}
                        className="text-md flex underline text-[#3AC4A0]"
                      >
                        {assets.name}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col px-2 border-t-4 py-5 mt-4 border-[#7555DA]">
                {accessToken !== null && userInfo !== null ? (
                  <div className="flex flex-row gap-3 my-6 w-full">
                    <img
                      src={userInfo.avatar}
                      className="xl:w-[75px] h-full rounded-full"
                      alt=""
                    />
                    <div className="flex flex-col gap-2 w-full">
                      <h1 className="text-[#201B1C] text-lg font-semibold">
                        {userInfo.name}
                      </h1>
                      <div className="w-full rounded-lg border-1 border border-[#3AC4A0]">
                        <Input
                          placeholder={`${t('articleList.text27')}`}
                          className="focus:outline-none "
                          onChange={e => {
                            updateComment(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="pt-7">
                      <Button
                        disabled={comment === '' && loading}
                        label={t('articleList.text24')}
                        containerClasses="xl:w-[196px] h-full p-1 rounded-full bg-[#3AC4A0]"
                        onClick={async () => {
                          await submitComment(articleDetail.id);
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                <h1 className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#9A76FE] to-[#4FE6AF] w-max">
                  {articleDetail?.total_comments} {articleDetail?.total_comments > 1 ? t('articleList.text26') : t('articleList.text25')}
                </h1>
                {articleDetail.total_comments !== 0 ? (
                  <div className="flex flex-col">
                    {articleComment?.map(article => (
                      <div
                        key={article?.id}
                        className="flex flex-col mt-5 bg-[#E9E9E94D]/30 p-4 gap-3 rounded-xl"
                      >
                        <div className="flex flex-row">
                          <img
                            src={article?.avatar}
                            alt=""
                            className="xl:w-[48px] xl:h-[48px] rounded-full"
                          />
                          <div className="xl:ml-4">
                            <h1 className="text-[#201B1C] text-lg font-semibold">
                              {article?.name}
                            </h1>
                            <p className="text-[#7C7C7C] text-sm font-normal">
                              {formatDate(article?.created_at)}
                            </p>
                          </div>
                        </div>
                        <p className="text-[#201B1C] text-base font-normal">
                          {article?.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="mt-4 flex z-10 justify-between">
                <p className="text-3xl font-bold ">{t('articleList.text6')} </p>
                <Link href={'/seedspedia?activeTabParams=article'}>
                  <p className="flex text-md border border-1 p-2 font-semibold">
                    {t('articleList.text8')}
                    <span className="mt-1">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.16602 10H15.8327"
                          stroke="#262626"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10 4.16675L15.8333 10.0001L10 15.8334"
                          stroke="#262626"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </p>
                </Link>
              </div>
              <div className="">
                <Slider
                  slidesToShow={1}
                  slidesToScroll={1}
                  speed={500}
                  autoplay={true}
                  infinite={true}
                  dots={true}
                  className="mb-12 mt-6"
                  initialSlide={1}
                  responsive={[
                    {
                      breakpoint: 1920,
                      settings: {
                        dots: true,
                        slidesToShow: 1,
                      }
                    },
                    {
                      breakpoint: 1280,
                      settings: {
                        dots: true,
                        slidesToShow: 1,
                      }
                    },
                  ]}
                >
                  {articles?.map(article => (
                    <div
                      key={article.id}
                      className={`lg:px-5 w-[200px] flex cursor-pointer transition-all ${hotNewsItemClass}`}
                    >
                      <Link
                        href={`/seedspedia/articles/${article?.id ?? 0}/${
                          article?.title
                            ?.replace(/[^\w\s]/gi, '')
                            .split(' ')
                            .join('-')
                        }`}
                      >
                        <div className="flex justify-between bg-[#E9E9E980] rounded-2xl p-2 gap-2 hover:shadow-lg">
                          <div className="flex-row">
                            <div className="h-full flex justify-between flex-col">
                              <div className="">
                                <h1 className="bg-[#DCFCE4] text-xs font-semibold w-fit truncate text-center text-[#3AC4A0] py-1 px-2 rounded-full">
                                  {article?.category}
                                </h1>
                                <h1 className="text-base font-semibold text-[#000] my-1">
                                  {article?.title !== undefined &&
                                  article.title.length > 45
                                    ? `${article.title.slice(0, 45)}...`
                                    : article?.title}
                                </h1>
                                <Link
                                  className="text-sm hidden md:flex"
                                  href={`/seedspedia/articles/${article?.id ?? 0}/${
                                    article?.title
                                      ?.replace(/[^\w\s]/gi, '')
                                      .split(' ')
                                      .join('-')
                                  }`}
                                >
                                  <LimitString
                                    text={stripHtmlTags(article?.content ?? '')}
                                    limit={80}
                                  />
                                </Link>
                              </div>

                              <div>
                                <div className="flex justify-between">
                                  <p className="font-normal text-sm text-[#8A8A8A]">
                                    {formatDateToIndonesian(
                                      articleDetail?.publicationDate
                                    )}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="w-auto min-w-[100px] h-[120px]">
                              {isImageUrlValid(article.imageUrl) ? (
                                <img
                                  src={article?.imageUrl}
                                  alt=""
                                  className="w-[100px] h-full object-cover rounded-2xl"
                                />
                              ) : (
                                <img
                                  src={defaultNews}
                                  alt=""
                                  className="w-[100px] h-full object-cover rounded-2xl"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </PageGradient>
      <Footer />
    </>
  );
}
