import baseAxios from '@/utils/common/axios';

const earningService = baseAxios(
  `${
    process.env.NEXT_PUBLIC_URL ?? 'https://seeds-dev-gcp.seeds.finance'
  }/my-earning/v1`
);

export const getEarningBalance = async (currency: string): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken === null || accessToken === '') {
      return await Promise.resolve('Access token not found');
    }
    console.log('sent params ', currency)
    return await earningService.get(`/balance`, {
      params: {
        currency
      },
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken ?? ''}`
      }
    });
  } catch (error) {
    await Promise.reject(error);
  }
};

export const getEarningHistory = async (
  params: { limit: number; page: number; currency: string }
): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken === null || accessToken === '') {
      return await Promise.reject(new Error('Access token not found'));
    }
    return await earningService.get(`/history`, {
      params,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken ?? ''}`
      }
    });
  } catch (error) {
    await Promise.reject(error);
  }
};