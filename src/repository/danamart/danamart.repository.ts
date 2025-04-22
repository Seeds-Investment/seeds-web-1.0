import baseAxios from '@/utils/common/axios';
import {
  type FinancialInfoFormPayload,
  type RegisterLog
} from '@/utils/interfaces/danamart.interface';
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

const danamartUpdateUserInformation = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_DANAMART_API_URL ??
    'https://dev.danamart.id/development/dm-scf-api/public',
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});

const danamartService = baseAxios(
  `${
    process.env.NEXT_PUBLIC_URL ?? 'https://seeds-dev-ali.seeds.finance'
  }/user/v1/`
);

export const getAccountInformation = async (): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken === null || accessToken === '') {
      return await Promise.resolve('Access token not found');
    }

    return await danamartService.get('danamart-information', {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken ?? ''}`
      }
    });
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const registerLog = async (data: RegisterLog): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken === null || accessToken === '') {
      return await Promise.resolve('Access token not found');
    }

    return await danamartService.post('danamart/register-log', data, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken ?? ''}`
      }
    });
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const getProfileUser = async (): Promise<any> => {
  try {
    const accessTokenDanamart = localStorage.getItem('accessToken-danamart');

    if (accessTokenDanamart === null || accessTokenDanamart === '') {
      return await Promise.resolve('Access token Danamart not found');
    }

    const response = await danamartApi.get('/pemodal/Dashboard/profil', {
      headers: {
        Authorization: `Bearer ${accessTokenDanamart ?? ''}`
      }
    });

    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const getDashboardUser = async (): Promise<any> => {
  try {
    const accessTokenDanamart = localStorage.getItem('accessToken-danamart');

    if (accessTokenDanamart === null || accessTokenDanamart === '') {
      return await Promise.resolve('Access token Danamart not found');
    }

    const response = await danamartApi.get('/pemodal/dashboard', {
      headers: {
        Authorization: `Bearer ${accessTokenDanamart ?? ''}`
      }
    });
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const getPhotoSelfieData = async (): Promise<any> => {
  try {
    const accessTokenDanamart = localStorage.getItem('accessToken-danamart');

    if (accessTokenDanamart === null || accessTokenDanamart === '') {
      return await Promise.resolve('Access token Danamart not found');
    }

    const response = await danamartApi.get('/pemodal/form_foto_selfie', {
      headers: {
        Authorization: `Bearer ${accessTokenDanamart ?? ''}`
      }
    });
    return { ...response.data, status: 200 };
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const updatePhotoSelfie = async (imageEncoded: string): Promise<any> => {
  try {
    const accessTokenDanamart = localStorage.getItem('accessToken-danamart');

    if (accessTokenDanamart === null || accessTokenDanamart === '') {
      return await Promise.resolve('Access token Danamart not found');
    }

    const platform = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)
      ? 'Mobile'
      : 'Desktop';

    const formData = new FormData();
    formData.append('image_from_web_cam', imageEncoded);
    formData.append('platform', platform);
    formData.append('typeSubmit', 'updateOcr');
    formData.append('pernyataan', 'true');

    const response = await danamartApi.post(
      '/pemodal/form_foto_selfie/updateForm',
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessTokenDanamart ?? ''}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const getUserInformation = async (): Promise<any> => {
  try {
    const accessTokenDanamart = localStorage.getItem('accessToken-danamart');

    if (accessTokenDanamart === null || accessTokenDanamart === '') {
      return await Promise.resolve('Access token Danamart not found');
    }

    const response = await danamartApi.get('/pemodal/form_informasi_pribadi', {
      headers: {
        Authorization: `Bearer ${accessTokenDanamart ?? ''}`
      }
    });
    return { ...response.data, status: 200 };
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const updateUserInformation = async (
  formData: FormData
): Promise<any> => {
  try {
    const accessTokenDanamart = localStorage.getItem('accessToken-danamart');

    if (accessTokenDanamart === null || accessTokenDanamart === '') {
      return await Promise.resolve('Access token Danamart not found');
    }

    const response = await danamartUpdateUserInformation.post(
      `/pemodal/form_informasi_pribadi/updateForm`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessTokenDanamart}`,
          'Content-Type': 'multipart/form-data' // 👈 Important
        }
      }
    );

    return response.data;
  } catch (error: any) {
    await Promise.reject(error);
  }
};


export const getPhotoIdCard = async (): Promise<any> => {
  try {
    const accessTokenDanamart = localStorage.getItem('accessToken-danamart');

    if (accessTokenDanamart === null || accessTokenDanamart === '') {
      return await Promise.resolve('Access token Danamart not found');
    }

    const response = await danamartApi.get('/pemodal/form_foto_ktp', {
      headers: {
        Authorization: `Bearer ${accessTokenDanamart ?? ''}`
      }
    });
    return { ...response.data, status: 200 };
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const updatePhotoIdCard = async (
  type: string,
  imageEncoded: string
): Promise<any> => {
  try {
    const accessTokenDanamart = localStorage.getItem('accessToken-danamart');

    if (accessTokenDanamart === null || accessTokenDanamart === '') {
      return await Promise.resolve('Access token Danamart not found');
    }

    const platform = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)
      ? 'Mobile'
      : 'Desktop';

    const formData = new FormData();
    formData.append('platform', platform);
    formData.append('typeSubmit', type);
    formData.append('dm_penmit_01011', imageEncoded);

    const response = await danamartApi.post(
      `/pemodal/form_foto_ktp/${type}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessTokenDanamart ?? ''}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    return response;
  } catch (error: any) {
    await Promise.reject(error);
  }
};

export const getFinancialInformationData = async (): Promise<any> => {
  try {
    const accessTokenDanamart = localStorage.getItem('accessToken-danamart');

    if (accessTokenDanamart === null || accessTokenDanamart === '') {
      return await Promise.resolve('Access token Danamart not found');
    }

    const response = await danamartApi.get('/pemodal/form_informasi_keuangan', {
      headers: {
        Authorization: `Bearer ${accessTokenDanamart ?? ''}`
      }
    });
    return { ...response.data, status: 200 };
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const updateFinancialInformation = async (
  data: FinancialInfoFormPayload
): Promise<any> => {
  try {
    const accessTokenDanamart = localStorage.getItem('accessToken-danamart');

    if (accessTokenDanamart === null || accessTokenDanamart === '') {
      return await Promise.resolve('Access token Danamart not found');
    }

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    });

    const response = await danamartApi.post(
      `/pemodal/form_informasi_keuangan/updateFormKeuangan`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessTokenDanamart}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const getDetailProspektus = async (id: string): Promise<any> => {
  try {
    const accessTokenDanamart = localStorage.getItem('accessToken-danamart');

    if (accessTokenDanamart === null || accessTokenDanamart === '') {
      return await Promise.resolve('Access token Danamart not found');
    }

    const response = await danamartApi.get(
      `/pemodal/Prospektus?pinjamanId=${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessTokenDanamart ?? ''}`
        }
      }
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const validateExistingAccount = async (
  formData: FormData
): Promise<any> => {
  try {
    const response = await danamartUpdateUserInformation.post(
      `/daftar/email/checkAccount`,
      formData
    );
    return response.data;
  } catch (error: any) {
    await Promise.reject(error);
  }
};
