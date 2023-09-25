import baseAxios from '@/utils/common/axios';

const articleService = baseAxios(
  `${process.env.NEXT_PUBLIC_URL ?? 'https://seeds-dev-gcp.seeds.finance'}`
);

export const getArticle = async (params: {
  page: number;
  limit: number;
}): Promise<any> => {
  try {
    const response = await articleService.get('/news/v1/all', {
      params
    });

    return { ...response, status: 200 };
  } catch (error: any) {
    return error.response;
  }
};
export const getArticleById = async (id: string): Promise<any> => {
  try {
    const response = await articleService.get(`/news/v1/${id}`);
    console.log(response, '>>>>');
    return { ...response, status: 200 };
  } catch (error: any) {
    return error.response;
  }
};
export const getArticleComment = async (id: string): Promise<any> => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken === null || accessToken === '') {
    return await Promise.resolve('Access token not found');
  }

  return await articleService.get(`/news/v1/comment/${id}`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken ?? ''}`
    }
  });
};
