import baseAxios from '@/utils/common/axios';
import { isEmptyString, isUndefindOrNull } from '@/utils/common/utils';
import { type IPortfolioSummary } from '@/utils/interfaces/play.interface';
interface ICreateOrderPlay {
  asset_id: string;
  type: 'BUY' | 'SELL' | string;
  amount: number;
}

export interface AssetParams {
  play_id: string;
  category?: string | null;
  currency: string;
  per_page: number;
  page: number;
}

const playService = baseAxios(
  `${
    process.env.NEXT_PUBLIC_URL ?? 'https://seeds-dev-gcp.seeds.finance'
  }/play/v1`
);

export const getPlayLeaderboard = async (): Promise<any> => {
  return await playService.get(`/leaderboard`);
};

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

export const getLeaderboardByPlayId = async (playId: string): Promise<any> => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken === null || accessToken === '') {
    return await Promise.resolve('Access token not found');
  }

  return await playService.get(`/leaderboard/${playId}/list`, {
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

export const joinTournament = async (
  playId: string,
  currency: string,
  paymentGateway: string,
  paymentMethod: string,
  phoneNumber: string,
  promoCode: string,
  invitationCode: string,
  isUseCoins: boolean
): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken === null || accessToken === '') {
      return await Promise.resolve('Access token not found');
    }

    const response = await playService.post(
      `/join`,
      {
        play_id: playId,
        currency,
        payment_gateway: paymentGateway,
        payment_method: paymentMethod,
        phone_number: phoneNumber,
        promo_code: promoCode,
        invitation_code: invitationCode,
        is_use_coins: isUseCoins
      },
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken ?? ''}`
        }
      }
    );

    return response;
  } catch (error) {
    console.error('Error joining tournament:', error);
    throw error;
  }
};

export const getPlaySimulation = async (
  datePeriod: string,
  currency: string
): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    const response = await playService.get('/simulation/user-achievement', {
      params: {
        date_period: datePeriod,
        currency
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

export const getPlaySimulationDetail = async (
  currency: string
): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken === null || accessToken === '') {
      return await Promise.resolve('Access token not found');
    }

    return await playService.get('/simulation/detail', {
      params: {
        currency
      },
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
    return await playService.get(`/trending`, {
      headers: {
        Accept: 'application/json'
      }
    });
  } catch (error) {
    console.error('Error fetching trending play list:', error);
  }
};

export const getPlayBallance = async (
  id: string,
  params: { currency: string }
): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken === null || accessToken === '') {
      return await Promise.resolve('Access token not found');
    }
    return await playService(`/${id}/balance`, {
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

export const getPlayPortfolio = async (
  id: string,
  currency: string
): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken === null || accessToken === '') {
      return await Promise.resolve('Access token not found');
    }
    return await playService(`/${id}/portfolio-summary`, {
      params: {
        currency
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

export const getOperOrderList = async (
  id: string,
  params: { currency: string }): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken === null || accessToken === '') {
      return await Promise.reject(new Error('Access token not found'));
    }
    return await playService(`/${id}/orders/open`, {
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

export const cancelOrderList = async ( playId: string, orderId: string): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken === null || accessToken === '') {
      return await Promise.reject(new Error('Access token not found'));
    }
    return await playService.delete(`/${playId}/orders/${orderId}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken ?? ''}`
      }
    });
  } catch (error) {
    await Promise.reject(error);
  }
};

export const getHistoryTransaction = async (
  id: string,
  params: { limit: number; page: number; currency: string }
): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken === null || accessToken === '') {
      return await Promise.reject(new Error('Access token not found'));
    }
    return await playService(`/${id}/history`, {
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

export const getActiveAsset = async (params: AssetParams): Promise<any> => {
  const timeoutDuration = 100000;

  try {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken === null || accessToken === '') {
      return await Promise.reject(new Error('Access token not found'));
    }

    const controller = new AbortController();
    const signal = controller.signal;

    const timeoutId = setTimeout(() => { controller.abort(); }, timeoutDuration);

    const response = await playService(`/assets/active`, {
      params,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken ?? ''}`
      },
      signal
    });

    clearTimeout(timeoutId);

    return response;
  } catch (error) {
    await Promise.reject(error);
  }
};

const paymentService = baseAxios(
  `${
    process.env.NEXT_PUBLIC_URL ?? 'https://seeds-dev-gcp.seeds.finance'
  }/payment/v1`
);

export const getPaymentById = async (id: string): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken === null || accessToken === '') {
      return await Promise.resolve('Access token not found');
    }

    const response = await paymentService.get(`/${id}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken ?? ''}`
      }
    });

    return response;
  } catch (error) {
    console.error('Error getting payment by ID:', error);
    throw error;
  }
};

export const getPlayAssetData = async (
  id: string,
  assetId: string,
  currency: string
): Promise<{ data: IPortfolioSummary } | undefined | string> => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken === null || accessToken === '') {
      return await Promise.reject(new Error('Access token not found'));
    }
    return await playService(`/${id}/assets/${assetId}`, {
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

export const validateInvitationCode = async (
  playId: string,
  invitationCode: string
): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken === null || accessToken === '') {
      return await Promise.resolve('Access token not found');
    }

    const response = await playService.get(`/invitation/validate`, {
      params: {
        play_id: playId,
        invitation_code: invitationCode
      },
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken ?? ''}`
      }
    });

    return response;
  } catch (error) {
    console.error('Error validating invitation code:', error);
    throw error;
  }
};
