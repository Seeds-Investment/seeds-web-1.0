import baseAxios from '@/utils/common/axios';
import { isEmptyString, isUndefindOrNull } from '@/utils/common/utils';

const socialService = baseAxios(
  `${
    process.env.NEXT_PUBLIC_URL ?? 'https://seeds-dev-gcp.seeds.finance'
  }/post/`
);

export const getSocialPostFollowing = async (params: any): Promise<any> => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken === null || accessToken === '') {
    return await Promise.resolve('Access token not found');
  }

  if (isUndefindOrNull(params) || isEmptyString(params)) {
    return await Promise.resolve(null);
  }

  return await socialService.get(`/v2/list/socials`, {
    params,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken ?? ''}`
    }
  });
};

export const getSocialPostForYou = async (params: any): Promise<any> => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken === null || accessToken === '') {
    return await Promise.resolve('Access token not found');
  }

  if (isUndefindOrNull(params) || isEmptyString(params)) {
    return await Promise.resolve(null);
  }

  return await socialService.get(`/v2/list/for-you`, {
    params,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken ?? ''}`
    }
  });
};

export const getSocialPostMySpace = async (params: any): Promise<any> => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken === null || accessToken === '') {
    return await Promise.resolve('Access token not found');
  }

  if (isUndefindOrNull(params) || isEmptyString(params)) {
    return await Promise.resolve(null);
  }

  return await socialService.get(`/saving/v1/list`, {
    params,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken ?? ''}`
    }
  });
};

export const getHashtagSocial = async (params: any): Promise<any> => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken === null || accessToken === '') {
    return await Promise.resolve('Access token not found');
  }

  if (isUndefindOrNull(params) || isEmptyString(params)) {
    return await Promise.resolve(null);
  }

  return await socialService.get(`/v2/find/hashtag`, {
    params,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken ?? ''}`
    }
  });
};
