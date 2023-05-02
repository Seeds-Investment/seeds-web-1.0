import baseAxios from '@/utils/common/axios';

const authService = baseAxios(`https://seeds-dev.seeds.finance/circle/v1`);

export const getTrendingCircle = async (): Promise<any> => {
  try {
    let response = await authService.get('/trending');
    return (response = { ...response, status: 200 });
  } catch (error: any) {
    return error.response;
  }
};
