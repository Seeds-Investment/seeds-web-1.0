import baseAxios from '@/utils/common/axios';

const authService = baseAxios(`https://seeds-dev.seeds.finance/auth/v1`);

interface LoginForm {
  phoneNumber: string;
  password: string;
}

export const loginPhoneNumber = async (formData: LoginForm): Promise<any> => {
  try {
    let response = await authService.post('/login/phone-number', formData);
    return (response = { ...response, status: 200 });
  } catch (error: any) {
    return error.response;
  }
};

export const loginProvider = async (
  identifier: string,
  provider: string
): Promise<any> => {
  try {
    let response = await authService.post(`/login/${provider}`, { identifier });

    return (response = { ...response, status: 200 });
  } catch (error: any) {
    return error.response;
  }
};
