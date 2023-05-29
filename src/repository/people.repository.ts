import baseAxios from '@/utils/common/axios';

const authService = baseAxios(`https://seeds-dev.seeds.finance/user/v1`);

export const searchUser = async (): Promise<any> => {
  try {
    let response = await authService.get('/search');
    return (response = { ...response, status: 200 });
  } catch (error: any) {
    return error.response;
  }
};
