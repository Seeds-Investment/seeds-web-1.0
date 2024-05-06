import Endpoints from '@/utils/_static/endpoint';
import baseAxios from '@/utils/common/axios';
import { isEmptyString, isUndefindOrNull } from '@/utils/common/utils';
import { toast } from 'react-toastify';

interface WatchlistForm {
  play_id: string;
  name: string;
  image: File | string;
  asset_list: string[];
}

const marketService = baseAxios(
  `${
    process.env.NEXT_PUBLIC_URL ?? 'https://seeds-dev-gcp.seeds.finance'
  }/market/v1`
);

export const getMarketList = async (params: any): Promise<any> => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken === null || accessToken === '') {
    return await Promise.resolve('Access token not found');
  }

  if (isUndefindOrNull(params) || isEmptyString(params)) {
    return await Promise.resolve(null);
  }

  return await marketService.get(`/list`, {
    params,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken ?? ''}`
    }
  });
};

export const getMarketCurrency = async (): Promise<any> => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken === null || accessToken === '') {
    return await Promise.resolve('Access token not found');
  }

  return await marketService.get(`/currency`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken ?? ''}`
    }
  });
};

export const getAssetOverview = async (id: string): Promise<any> => {
  if (isUndefindOrNull(id) || isEmptyString(id)) {
    return await Promise.resolve(null);
  }

  const path = Endpoints.asset.getAssetOverview.replace(':id', id);
  return await marketService.get(path, {
    headers: {
      Accept: 'application/json'
    }
  });
};

export const getAssetAnalysis = async (id: string): Promise<any> => {
  if (isUndefindOrNull(id) || isEmptyString(id)) {
    return await Promise.resolve(null);
  }

  const path = Endpoints.asset.getAssetAnalysis.replace(':id', id);
  return await marketService.get(path, {
    headers: {
      Accept: 'application/json'
    }
  });
};

export const getAssetFinancial = async (
  id: string,
  type: string,
  years: string,
  sort: string
): Promise<any> => {
  if (isUndefindOrNull(id) || isEmptyString(id)) {
    return await Promise.resolve(null);
  }

  const path = Endpoints.asset.getAssetFinancial.replace(':id', id);
  const params = {
    type,
    years,
    sort
  };
  return await marketService.get(path, {
    params,
    headers: {
      Accept: 'application/json'
    }
  });
};

export const getAssetKeyStat = async (id: string): Promise<any> => {
  if (isUndefindOrNull(id) || isEmptyString(id)) {
    return await Promise.resolve(null);
  }

  const path = Endpoints.asset.getAssetKeyStat.replace(':id', id);
  return await marketService.get(path, {
    headers: {
      Accept: 'application/json'
    }
  });
};

export const getAssetProfile = async (id: string): Promise<any> => {
  if (isUndefindOrNull(id) || isEmptyString(id)) {
    return await Promise.resolve(null);
  }

  const path = Endpoints.asset.getAssetProfile.replace(':id', id);
  return await marketService.get(path, {
    headers: {
      Accept: 'application/json'
    }
  });
};

export const getAssetNews = async (id: string): Promise<any> => {
  if (isUndefindOrNull(id) || isEmptyString(id)) {
    return await Promise.resolve(null);
  }

  const path = Endpoints.asset.getAssetNews.replace(':id', id);
  const params = {
    page: 1,
    limit: 3
  };
  return await marketService.get(path, {
    params,
    headers: {
      Accept: 'application/json'
    }
  });
};

export const getWatchlist = async (
  params: { play_id: string }
): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken === null || accessToken === '') {
      return await Promise.resolve('Access token not found');
    }
    return await marketService(`/watchlist`, {
      params,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken ?? ''}`
      }
    });
  } catch (error) {
    await Promise.resolve();
  }
};


export const createWatchlist = async (formData: WatchlistForm): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken === null || accessToken === '') {
      return await Promise.reject(new Error('Access token not found'));
    }
    return await marketService.post(`/watchlist`, formData, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken ?? ''}`
      }
    });
  } catch (error) {
    await Promise.resolve();
  }
};

export const deleteWatchlist = async (id: string): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken === null || accessToken === '') {
      return await Promise.reject(new Error('Access token not found'));
    }

    const response = await marketService.delete(`/watchlist/${id}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken ?? ''}`
      }
    });
    console.log('rez: ', response)
    return response
  } catch (error) {
    toast.error(`Error fetching data: ${error as string}`);
  }
};