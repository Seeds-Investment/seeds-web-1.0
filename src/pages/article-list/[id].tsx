import handphone from '@/assets/landing-page/handphone.svg';
import handphone2 from '@/assets/landing-page/handphone2.svg';

import { getArticle, getArticleById } from '@/repository/article.repository';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

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

interface ArticleDetail {
  id: 'string';
  title: 'string';
  body: 'string';
  image: 'string';
  source_image: 'string';
  author: 'string';
  status: 'string';
  scheduled_at: 'string';
  created_at: 'string';
  updated_at: 'string';
}

const params = {
  page: 1,
  limit: 3,
  order_by: 'scheduled_at,DESC'
};

export default function ArticleDetailPage(): JSX.Element {
  const router = useRouter();
  const { id } = router.query;
  const [articleDetail, setArticleDetail] = useState<ArticleDetail | null>(
    null
  );
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

  useEffect(() => {
    if (typeof id === 'string') {
      // Check if id is a valid string
      const fetchArticleDetail = (): void => {
        getArticleById(id)
          .then(response => {
            if (response.status === 200) {
              setArticleDetail(response);
            }
          })
          .catch(error => {
            console.error('Error fetching article detail:', error);
          });
      };
      fetchArticleDetail();
    }
  }, [id]);

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

  if (articleDetail == null) {
    return <p>Loading...</p>;
  }
  return (
    <div className="z-0 relative overflow-hidden flex flex-col justify-center mx-5 lg:mx-20">
      <div className="w-full">
        <Image
          src={handphone}
          alt="Image"
          width={100}
          height={100}
          className="w-full"
        />
      </div>
      <div className="w-full mb-auto mt-8">
        <p className="mt-2 font-semibold text-base">
          {articleDetail.title} : {articleDetail.body}
        </p>
      </div>
      <div className="w-full">
        <div className="flex mt-8">
          <p className="mt-1 font-normal text-sm text-[#8A8A8A]">
            {articleDetail.author}
          </p>
          <p className="mx-12 mt-1 font-normal text-sm text-[#8A8A8A]">
            {timeAgo(articleDetail.created_at)}
          </p>
        </div>
      </div>
      <p className="w-full mt-8">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin bibendum
        justo at nisl varius, a fermentum nunc facilisis. Nullam egestas diam ut
        libero blandit, a varius eros sollicitudin. Curabitur varius metus nec
        congue volutpat. Vivamus non justo in tellus aliquam auctor. Sed varius
        varius velit, at tincidunt felis pellentesque eu. In hac habitasse
        platea dictumst. Donec mattis ante ut sem blandit, at bibendum elit
        varius. Duis vel sem nec ante vulputate bibendum. Nunc ac sollicitudin
        ex. Pellentesque ut ultrices odio. Nullam laoreet nibh elit, in ultrices
        justo fermentum ac. Quisque efficitur vestibulum nisl, sit amet
        facilisis justo convallis eu. Integer in libero libero. Suspendisse
        volutpat tristique libero, non cursus massa suscipit eget. Morbi
        consectetur libero ut sapien facilisis laoreet. Quisque scelerisque,
        mauris sit amet suscipit venenatis, augue elit laoreet tortor, non
        consectetur sapien nisi a arcu. In congue lorem vel justo pharetra
        auctor. Vestibulum sed fermentum tortor. Fusce tristique, tellus nec
        efficitur facilisis, arcu nunc accumsan risus, in pellentesque eros enim
        quis justo. Sed nec dui consectetur, egestas lectus in, tempus turpis.
        <br />
        <br />
        In suscipit iaculis est, eget venenatis quam accumsan vel. Nulla
        facilisi. Suspendisse potenti. Integer nec malesuada libero. Etiam in
        scelerisque elit. Curabitur a lectus libero. Vivamus dictum, leo ac
        dictum efficitur, augue lectus eleifend odio, sit amet semper quam nisl
        nec orci. Cras ut elit libero. Maecenas elementum consectetur nibh, vel
        ultricies eros dictum eu. Sed sit amet justo nec libero condimentum
        commodo non eu libero.
        <br />
        <br />
        In suscipit iaculis est, eget venenatis quam accumsan vel. Nulla
        facilisi. Suspendisse potenti. Integer nec malesuada libero. Etiam in
        scelerisque elit. Curabitur a lectus libero. Vivamus dictum, leo ac
        dictum efficitur, augue lectus eleifend odio, sit amet semper quam nisl
        nec orci. Cras ut elit libero. Maecenas elementum consectetur nibh, vel
        ultricies eros dictum eu. Sed sit amet justo nec libero condimentum
        commodo non eu libero.
      </p>
      <div>
        <div className="mt-12 flex justify-between">
          <p className="text-base font-semibold ">You May Like</p>
          <Link href={'/article-list'}>
            <p className="text-xs font-normal text-[#3AC4A0]">see all</p>
          </Link>
        </div>
        <div className="grid lg:grid-cols-6 gap-4 rounded-2xl py-10">
          {articles.map(article => (
            <div
              key={article.id}
              className="p-4 border bg-[#F9F9F9] gap-[16px] lg:col-span-2 border-gray-300 rounded-3xl w-full"
            >
              <Link href={`/article-list/${article.id}`}>
                <div className="flex justify-between">
                  <div className="flex-row">
                    <div className="px-3 w-[25%] rounded-full font-poppins bg-[#5E44FF] text-xs font-normal">
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
      </div>
    </div>
  );
}
