import { type RegistrationForm } from '@/utils/interfaces/danamart.interface';
import axios from 'axios';

interface IFormLogin {
  email: string;
  password: string;
  captchaToken: string;
}

interface ChangePasswordI {
  email: string;
  password: string;
}

const authService = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_DANAMART_API_URL ??
    'https://dev.danamart.id/development/dm-scf-api/public',
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});

const danamartApi = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_DANAMART_API_URL ??
    'https://dev.danamart.id/development/dm-scf-api/public',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export const login = async (formData: IFormLogin): Promise<any> => {
  try {
    let response = await authService.post(
      `/autentikasi/email?aku=development`,
      formData
    );
    return (response = { ...response, status: 200 });
  } catch (error: any) {
    return error.response;
  }
};

export const changePassword = async (
  changePasswordI: ChangePasswordI
): Promise<any> => {
  try {
    let response = await authService.post(
      `/LupaPassword/withoutRedirect`,
      changePasswordI
    );
    return (response = { ...response, status: 200 });
  } catch (error: any) {
    return error.response;
  }
};

export const register = async (formData: RegistrationForm): Promise<any> => {
  try {
    let response = await authService.post(
      '/daftar/email/user?role=Pemodal',
      formData
    );
    return (response = { ...response, status: 200 });
  } catch (error: any) {
    throw new Error(error.response);
  }
};

export const getIdleLogout = async (): Promise<any> => {
  try {
    const accessTokenDanamart = localStorage.getItem('accessToken-danamart');

    if (accessTokenDanamart === null || accessTokenDanamart === '') {
      return await Promise.resolve('Access token Danamart not found');
    }

    const response = await danamartApi.get('/logout?status=idle', {
      headers: {
        Authorization: `Bearer ${accessTokenDanamart ?? ''}`
      }
    });

    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
