import baseAxios from '@/utils/common/axios';
import { isEmptyString, isUndefindOrNull } from '@/utils/common/utils';
interface ICreateOrderPlay {
  asset_id: string;
  type: 'BUY' | 'SELL' | string;
  amount: number;
}

const playService = baseAxios(
  `${
    process.env.NEXT_PUBLIC_URL ?? 'https://seeds-dev-gcp.seeds.finance'
  }/play/v1`
);

export const getLeaderboardDetail = async (userId: string): Promise<any> => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken === null || accessToken === '') {
    return await Promise.resolve('Access token not found');
  }

  return await playService.get(`/leaderboard/${userId}/detail`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken ?? ''}`
    }
  });
};

export const getPlayById = async (id: string): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken === null || accessToken === '') {
      return await Promise.resolve('Access token not found');
    }
    return await playService(`/${id}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken ?? ''}`
      }
    });
  } catch (error) {
    await Promise.resolve();
  }
};

export const getPlayAll = async (params: any): Promise<any> => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken === null || accessToken === '') {
    return await Promise.resolve('Access token not found');
  }

  if (isUndefindOrNull(params) || isEmptyString(params)) {
    return await Promise.resolve(null);
  }

  return await playService.get(`/list`, {
    params,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken ?? ''}`
    }
  });
};

export const getPlayJoined = async (params: any): Promise<any> => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken === null || accessToken === '') {
    return await Promise.resolve('Access token not found');
  }

  if (isUndefindOrNull(params) || isEmptyString(params)) {
    return await Promise.resolve(null);
  }

  return await playService.get(`/joined`, {
    params,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken ?? ''}`
    }
  });
};

export const getPlaySimulation = async (datePeriod: string): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    const response = await playService.get('/simulation/user-achievement', {
      params: {
        date_period: datePeriod
      },
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken ?? ''}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching play simulation:', error);
  }
};

export const getPlaySimulationDetail = async (): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken === null || accessToken === '') {
      return await Promise.resolve('Access token not found');
    }

    return await playService.get('/simulation/detail', {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken ?? ''}`
      }
    });
  } catch (error) {
    console.error('Error fetching play simulation:', error);
  }
};

export const getTrendingPlayList = async (): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken === null || accessToken === '') {
      return await Promise.resolve('Access token not found');
    }

    return await playService.get(`/trending`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken ?? ''}`
      }
    });
  } catch (error) {
    console.error('Error fetching trending play list:', error);
  }
};

export const getPlayBallance = async (id: string): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken === null || accessToken === '') {
      return await Promise.resolve('Access token not found');
    }
    return await playService(`/${id}/balance`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken ?? ''}`
      }
    });
  } catch (error) {
    await Promise.resolve();
  }
};

export const getPlayPortfolio = async (id: string): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken === null || accessToken === '') {
      return await Promise.resolve('Access token not found');
    }
    return await playService(`/${id}/portfolio-summary`, {
      params: {
        currency: 'IDR'
      },
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken ?? ''}`
      }
    });
  } catch (error) {
    await Promise.resolve();
  }
};

export const getPlayAssets = async (
  id: string,
  assetId: string
): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken === null || accessToken === '') {
      return await Promise.resolve('Access token not found');
    }
    return await playService(`/${id}/assets/${assetId}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken ?? ''}`
      }
    });
  } catch (error) {
    await Promise.resolve();
  }
};

export const createOrderPlay = async (
  body: ICreateOrderPlay,
  id: string
): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken === null || accessToken === '') {
      return await Promise.resolve('Access token not found');
    }
    if (
      isUndefindOrNull(body.amount) ||
      isUndefindOrNull(body.asset_id) ||
      isUndefindOrNull(body.type)
    ) {
      return await Promise.resolve(null);
    }

    const response = await playService.post(`/${id}/orders/create`, body, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken ?? ''}`
      }
    });
    return response;
  } catch (error) {
    return error;
  }
};
