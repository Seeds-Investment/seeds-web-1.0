import baseAxios from '@/utils/common/axios';

const expService = baseAxios(`https://seeds-dev.seeds.finance/earn-exp/v1/`);

export const getExpData = async (): Promise<any> => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken === null || accessToken === '') {
    return await Promise.resolve('Access token not found');
  }

  return await expService.get('tiers', {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  });
};
