import baseAxios from '@/utils/common/axios';

const authService = baseAxios(`https://seeds-dev.seeds.finance/news/v1`);

export const getNews = async (): Promise<any> => {
  try {
    let response = await authService.get('/all');
    return (response = { ...response, status: 200 });
  } catch (error: any) {
    return error.response;
  }
};
