import axios from 'axios';

const danamartApi = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_DANAMART_API_URL ??
    'https://dev.danamart.id/development/dm-scf-api/public',
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});

export const getUserLog = async (
  params: { 
    start_date: string;
    end_date: string
  }
): Promise<any> => {
  try {
    const accessTokenDanamart = localStorage.getItem('accessToken-danamart');

    if (accessTokenDanamart === null || accessTokenDanamart === '') {
      return await Promise.resolve('Access token Danamart not found');
    }

    const response = await danamartApi.get('/pemodal/dashboard/history', {
      params,
      headers: {
        Authorization: `Bearer ${accessTokenDanamart ?? ''}`
      }
    });

    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};