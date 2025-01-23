import baseAxios from '@/utils/common/axios';
import { type RegisterLog } from '@/utils/interfaces/danamart.interface';
import axios from 'axios';

export interface UpdateUserInfoForm {
  // pernyataantrigger: string;
  pernyataan: string;
  dm_penmit_01010: string;
  dm_penmit_01003: string;
  dm_penmit_01006: string;
  dm_penmit_01007: string;
  dm_penmit_01015: string;
  dm_penmit_01027: string;
  dm_penmit_01026: string;
  // namaPasangan: string;
  dm_penmit_01029: string;
  dm_penmit_01039: string;
  dm_penmit_01040: string;
  alamat_tmpt_kerja: string;
  telepon_tmpt_kerja: string;
  dm_penmit_01032: string;
  dm_penmit_01019rt: string;
  dm_penmit_01019rw: string;
  dm_penmit_01037: string;
  dm_penmit_01036: string;
  dm_penmit_01034: string;
  dm_penmit_01033: string;
  dm_penmit_01017: string;
  // masa_berlaku: string;
  // dm_penmit_01018: string;
  // dm_penmit_01022: string;
  // dm_penmit_01041: string;
  dm_penmit_01042: string;
  dm_pen_08002: string;
  dm_pen_08009: string;
  pernyataan_npwp: string;
  // dm_penmit_01012: string;
  // dm_penmit_01045: string;
  // dm_penmit_01013_exist: string;
  dm_penmit_01008: string;
}

const danamartApi = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_DANAMART_API_URL ??
    'https://dev.danamart.id/development/dm-scf-api/public',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

const danamartService = baseAxios(
  `${
    process.env.NEXT_PUBLIC_URL ?? 'https://seeds-dev-gcp.seeds.finance'
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

    const formData = new FormData();
    formData.append('image_from_web_cam', imageEncoded);

    const response = await danamartApi.post(
      '/pemodal/form_foto_selfie',
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

export const updateUserInfo = async (
  formData: UpdateUserInfoForm
): Promise<any> => {
  try {
    const accessTokenDanamart = localStorage.getItem('accessToken-danamart');

    if (accessTokenDanamart === null || accessTokenDanamart === '') {
      return await Promise.resolve('Access token Danamart not found');
    }
    const response = await danamartApi.post(
      `/pemodal/form_informasi_pribadi/updateForm`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessTokenDanamart}`
        }
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
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

export const updatePhotoIdCard = async (type: string, imageEncoded: string): Promise<any> => {
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
    formData.append('typeSubmit', 'updateOcr');
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
    throw new Error(error.response.data.message);
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

export const updateFinancialInformation = async (data: any): Promise<any> => {
  try {
    const accessTokenDanamart = localStorage.getItem('accessToken-danamart');

    if (accessTokenDanamart === null || accessTokenDanamart === '') {
      return await Promise.resolve('Access token Danamart not found');
    }
    const response = await danamartApi.post(
      `/pemodal/form_informasi_keuangan/updateFormKeuangan`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessTokenDanamart}`
        }
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
