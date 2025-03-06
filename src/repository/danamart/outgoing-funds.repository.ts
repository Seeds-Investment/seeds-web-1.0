import { type RequestWithdrawI } from '@/hooks/danamart/useRequestWithdrawal';
import axios from 'axios';

const danamartApi = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_DANAMART_API_URL ??
    'https://dev.danamart.id/development/dm-scf-api/public',
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});

export const getOutgoingFunds = async (): Promise<any> => {
  try {
    const accessTokenDanamart = localStorage.getItem('accessToken-danamart');

    if (accessTokenDanamart === null || accessTokenDanamart === '') {
      return await Promise.resolve('Access token Danamart not found');
    }

    const response = await danamartApi.get('/pemodal/DanaKeluar', {
      headers: {
        Authorization: `Bearer ${accessTokenDanamart ?? ''}`
      }
    });

    return response;
  } catch (error: any) {
    await Promise.reject(error);
  }
};

export const requestWithdrawal = async (
  formData: RequestWithdrawI
): Promise<any> => {
  try {
    const accessTokenDanamart = localStorage.getItem('accessToken-danamart');

    if (accessTokenDanamart === null || accessTokenDanamart === '') {
      return await Promise.resolve('Access token Danamart not found');
    }
    const response = await danamartApi.post(
      `/pemodal/DanaKeluar/tarikDana`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessTokenDanamart}`
        }
      }
    );
    return response.data;
  } catch (error: any) {
    await Promise.reject(error);
  }
};