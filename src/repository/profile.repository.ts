import baseAxios from '@/utils/common/axios';

const profileService = baseAxios(`https://seeds-dev.seeds.finance/user/v1/`);

export const getUserInfo = async (): Promise<any> => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken === null || accessToken === '') {
    return await Promise.resolve('Access token not found');
  }

  return await profileService.get('', {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken ?? ''}`
    }
  });
};
