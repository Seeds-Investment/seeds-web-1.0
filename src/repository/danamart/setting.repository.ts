import axios from 'axios';

const danamartApi = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_DANAMART_API_URL ??
    'https://dev.danamart.id/development/dm-scf-api/public',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export const getPhoneVerificationOTP = async (formData: FormData): Promise<any> => {
  try {
    const accessTokenDanamart = localStorage.getItem('accessToken-danamart');

    if (accessTokenDanamart === null || accessTokenDanamart === '') {
      return await Promise.resolve('Access token Danamart not found');
    }

    const response = await danamartApi.post(
      `/pemodal/Setting/sendOtp`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessTokenDanamart}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    return { ...response, status: 200 };
  } catch (error: any) {
    await Promise.reject(error);
  }
};

export const postPhoneVerificationOTP = async (formData: FormData): Promise<any> => {
  try {
    const accessTokenDanamart = localStorage.getItem('accessToken-danamart');

    if (accessTokenDanamart === null || accessTokenDanamart === '') {
      return await Promise.resolve('Access token Danamart not found');
    }

    const response = await danamartApi.post(
      `/pemodal/Setting/verifOtp`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessTokenDanamart}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    return { ...response, status: 200 };
  } catch (error: any) {
    await Promise.reject(error);
  }
};

export const getEmailVerification = async (): Promise<any> => {
  try {
    const accessTokenDanamart = localStorage.getItem('accessToken-danamart');

    if (accessTokenDanamart === null || accessTokenDanamart === '') {
      return await Promise.resolve('Access token Danamart not found');
    }

    const response = await danamartApi.get(
      `/pemodal/Setting/statusEmail`,
      {
        headers: {
          Authorization: `Bearer ${accessTokenDanamart}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    return { ...response, status: 200 };
  } catch (error: any) {
    await Promise.reject(error);
  }
};

export const getDeleteAccountOTP = async (formData: FormData): Promise<any> => {
  try {
    const accessTokenDanamart = localStorage.getItem('accessToken-danamart');

    if (accessTokenDanamart === null || accessTokenDanamart === '') {
      return await Promise.resolve('Access token Danamart not found');
    }

    const response = await danamartApi.post(
      `/pemodal/Setting/otpHapusAkun`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessTokenDanamart}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    return { ...response, status: 200 };
  } catch (error: any) {
    await Promise.reject(error);
  }
};

export const postDeleteAccountRequest = async (formData: FormData): Promise<any> => {
  try {
    const accessTokenDanamart = localStorage.getItem('accessToken-danamart');

    if (accessTokenDanamart === null || accessTokenDanamart === '') {
      return await Promise.resolve('Access token Danamart not found');
    }

    const response = await danamartApi.post(
      `/pemodal/Setting/hapusAkun`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessTokenDanamart}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    return { ...response, status: 200 };
  } catch (error: any) {
    await Promise.reject(error);
  }
};

export const changePassword = async (formData: FormData): Promise<any> => {
  try {
    const accessTokenDanamart = localStorage.getItem('accessToken-danamart');

    if (accessTokenDanamart === null || accessTokenDanamart === '') {
      return await Promise.resolve('Access token Danamart not found');
    }

    const response = await danamartApi.post(
      `/pemodal/Setting/ubahPassword`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessTokenDanamart}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    return { ...response, status: 200 };
  } catch (error: any) {
    await Promise.reject(error);
  }
};

export const changeEmail = async (formData: FormData): Promise<any> => {
  try {
    const accessTokenDanamart = localStorage.getItem('accessToken-danamart');

    if (accessTokenDanamart === null || accessTokenDanamart === '') {
      return await Promise.resolve('Access token Danamart not found');
    }

    const response = await danamartApi.post(
      `/pemodal/setting/ubahEmail`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessTokenDanamart}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    return { ...response, status: 200 };
  } catch (error: any) {
    await Promise.reject(error);
  }
};

export const getBankList = async (): Promise<any> => {
  try {
    const accessTokenDanamart = localStorage.getItem('accessToken-danamart');

    if (accessTokenDanamart === null || accessTokenDanamart === '') {
      return await Promise.resolve('Access token Danamart not found');
    }

    const response = await danamartApi.get(
      `/pemodal/setting/getRekening`,
      {
        headers: {
          Authorization: `Bearer ${accessTokenDanamart}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    return { ...response, status: 200 };
  } catch (error: any) {
    await Promise.reject(error);
  }
};

export const changeBankAccount = async (formData: FormData): Promise<any> => {
  try {
    const accessTokenDanamart = localStorage.getItem('accessToken-danamart');

    if (accessTokenDanamart === null || accessTokenDanamart === '') {
      return await Promise.resolve('Access token Danamart not found');
    }

    const response = await danamartApi.post(
      `/pemodal/setting/getOtpSend?transaksi=ubahRek`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessTokenDanamart}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    return { ...response, status: 200 };
  } catch (error: any) {
    await Promise.reject(error);
  }
};

export const validateChangeBankOTP = async (formData: FormData): Promise<any> => {
  try {
    const accessTokenDanamart = localStorage.getItem('accessToken-danamart');

    if (accessTokenDanamart === null || accessTokenDanamart === '') {
      return await Promise.resolve('Access token Danamart not found');
    }

    const response = await danamartApi.post(
      `/pemodal/setting/getOtpValidate`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessTokenDanamart}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    return { ...response, status: 200 };
  } catch (error: any) {
    await Promise.reject(error);
  }
};