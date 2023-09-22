import baseAxios from '@/utils/common/axios';
import { isEmptyString, isUndefindOrNull } from '@/utils/common/utils';

const authService = baseAxios(`https://seeds-dev.seeds.finance/asset/v1`);
const assetService = baseAxios(
  `${
    process.env.NEXT_PUBLIC_URL ?? 'https://seeds-dev-gcp.seeds.finance'
  }/asset/v1/`
);

export const getTrendingAssets = async (): Promise<any> => {
  try {
    let response = await authService.get('/trending', {
      params: {
        page: 1,
        limit: 10
      }
    });
    return (response = { ...response, status: 200 });
  } catch (error: any) {
    return error.response;
  }
};

export const assetTop = async (params: any): Promise<any> => {
  if (isUndefindOrNull(params) || isEmptyString(params)) {
    return await Promise.resolve(null);
  }

  return await assetService.get(`/trending`, {
    params,
    headers: {
      Accept: 'application/json'
    }
  });
};
