import baseAxios from '@/utils/common/axios';
import { isEmptyString, isUndefindOrNull } from '@/utils/common/utils';

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
