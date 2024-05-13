import baseAxios from '@/utils/common/axios';
import { isEmptyString, isUndefindOrNull } from '@/utils/common/utils';

export interface EventListParams {
  page: number;
  limit: number;
  search?: string | null;
  section?: string | null;
  year?: number | null;
}

const discoverService = baseAxios(
  `${
    process.env.NEXT_PUBLIC_URL ?? 'https://seeds-dev-gcp.seeds.finance'
  }/discover/v1/`
);

export const getBanner = async (params: any): Promise<any> => {
  try {
    if (isUndefindOrNull(params) || isEmptyString(params)) {
      return await Promise.resolve(null);
    }

    return await discoverService.get(`/banner`, {
      params
    });
  } catch (error: any) {
    return error.response;
  }
};
export const getBannerById = async (id: string): Promise<any> => {
  try {
    if (isUndefindOrNull(id) || isEmptyString(id)) {
      return null;
    }

    const response = await discoverService.get(`/banner/${id}`);
    return response;
  } catch (error) {
    console.error('Error fetching banner by ID:', error);
    return null;
  }
};

export const getEventList = async (params: EventListParams): Promise<any> => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken === null || accessToken === '') {
    return await Promise.resolve('Access token not found');
  }

  const sentParams =  await discoverService.get(`/event/list`, {
    params,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken ?? ''}`
    }
  });

  console.log('params repository: ', params)
  console.log('sent Params repository: ', sentParams)
  return sentParams
};