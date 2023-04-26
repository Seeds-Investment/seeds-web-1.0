import baseAxios from '@/utils/common/axios';
import type {
  IGetOtp,
  IVerifyOtp
} from '@/utils/interfaces/payload.interfaces';

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

export const postResetPassword = async (email: string): Promise<any> => {
  if (typeof email !== 'string') {
    return await Promise.resolve(null);
  }
  return await authService.post(`email/v1/forgot-password`, { email });
};

export const getOtp = async (payload: IGetOtp): Promise<any> => {
  try {
    if (
      typeof payload.method !== 'string' ||
      typeof payload.phoneNumber !== 'string'
    ) {
      return await Promise.resolve(null);
    }
    return await authService.put(`/otp`, { ...payload });
  } catch (error) {
    console.log(error);
  }
};

export const verifyOtp = async (payload: IVerifyOtp): Promise<any> => {
  try {
    if (
      payload?.method?.length === 0 ||
      payload?.msisdn?.length === 0 ||
      payload?.otp?.length === 0
    ) {
      return await Promise.resolve(null);
    }
    return await authService.post(`/otp/verify/${payload.method}`, {
      ...payload
    });
  } catch (error) {
    console.log(error);
  }
};
