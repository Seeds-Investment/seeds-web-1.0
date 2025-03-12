import axios from 'axios';

const danamartApi = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_DANAMART_API_URL ??
    'https://dev.danamart.id/development/dm-scf-api/public',
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});

export const validatePromoCode = async (
  formData: FormData
): Promise<any> => {
  try {
    const accessTokenDanamart = localStorage.getItem('accessToken-danamart');

    if (accessTokenDanamart === null || accessTokenDanamart === '') {
      return await Promise.resolve('Access token Danamart not found');
    }
    const response = await danamartApi.post(
      `/pemodal/Referral/claim`,
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