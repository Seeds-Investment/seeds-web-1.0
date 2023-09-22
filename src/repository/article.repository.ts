import baseAxios from '@/utils/common/axios';

const articleService = baseAxios(
  `${process.env.NEXT_PUBLIC_URL ?? 'https://seeds-dev-gcp.seeds.finance'}`
);

export const getArticle = async (params: {
  page: number;
  limit: number;
  order_by?: string;
}): Promise<any> => {
  try {
    const response = await articleService.get('/discover/v1/article', {
      params
    });

    return { ...response, status: 200 };
  } catch (error: any) {
    return error.response;
  }
};
export const getArticleById = async (id: string): Promise<any> => {
  try {
    const response = await articleService.get(`/discover/v1/article/${id}`);
    console.log(response, '>>>>');
    return { ...response, status: 200 };
  } catch (error: any) {
    return error.response;
  }
};
