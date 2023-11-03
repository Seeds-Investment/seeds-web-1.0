import baseAxios from '@/utils/common/axios';

const authService = baseAxios(
  `${
    process.env.NEXT_PUBLIC_URL ?? 'https://seeds-dev-gcp.seeds.finance'
  }/user/v1`
);

export const searchUser = async (): Promise<any> => {
  try {
    let response = await authService.get('/search');
    return (response = { ...response, status: 200 });
  } catch (error: any) {
    return error.response;
  }
};

export const verifiedUser = async (): Promise<any> => {
  try {
    const response = await authService.get('/verified?page=1&limit=7');
    return (response.data = { ...response, status: 200 });
  } catch (error: any) {
    return error.response;
  }
};
