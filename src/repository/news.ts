import BaseAxios from '@/utils/common/axios';

const service = BaseAxios('https://seeds-dev.seeds.finance/', false);

export const getNews = async (): Promise<any> => {
  try {
    return await service(`/news/v1/all`);
  } catch (error) {
    console.log('error on get news');
  }
};
