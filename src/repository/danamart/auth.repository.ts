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
    process.env.NEXT_PUBLIC_URL ??
    'https://dev.danamart.id/development/dm-scf-api/public',
  headers: {
    'Content-Type': 'multipart/form-data'
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
