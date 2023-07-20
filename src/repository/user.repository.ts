import baseAxios from '@/utils/common/axios';
import type { IChangePasswordPayload } from '@/utils/interfaces/payload.interfaces';

const authService = baseAxios(
  `${
    process.env.NEXT_PUBLIC_URL ?? 'https://seeds-dev-gcp.seeds.finance'
  }/user/v1`
);

export const patchChangePassword = async (
  payload: IChangePasswordPayload
): Promise<any> => {
  return await authService.patch(`/change-password`, payload);
};

export const getUserProviders = async (): Promise<any> => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken === null || accessToken === '') {
    return await Promise.resolve('Access token not found');
  }

  return await authService.get('/providers', {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken ?? ''}`
    }
  });
};

export const follow = async (userId: string): Promise<any> => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken === null || accessToken === '') {
    return await Promise.resolve('Access token not found');
  }
  
  return await authService.post('/following', 
  { following_id: userId },
  {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken ?? ''}`
    }
  });
};

export const linkAccount = async (identifier: string): Promise<string> => {
  const pin = localStorage.getItem('pin');

  if (pin === null || pin === '') {
    return await Promise.resolve('Pin is incorrect');
  } else {
    const provider = localStorage.getItem('provider') ?? '';
    return await authService.post(`/providers/${provider}`, {
      provider,
      identifier,
      _pin: pin
    });
  }
};
