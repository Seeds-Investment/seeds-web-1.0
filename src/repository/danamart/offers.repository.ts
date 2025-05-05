import { type ReportFormI } from '@/hooks/danamart/usePostReport';
import baseAxios from '@/utils/common/axios';
import { type PurchaseCheckTestingI, type PurchaseI } from '@/utils/interfaces/danamart/offers.interface';
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

const danamartPurchaseService = axios.create({
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

export const getOffersList = async (params: {
  jenis: string;
  sektor: string;
  status: string;
  urutan: string;
}): Promise<any> => {
  try {
    const accessTokenDanamart = localStorage.getItem('accessToken-danamart');

    if (accessTokenDanamart === null || accessTokenDanamart === '') {
      return await Promise.resolve('Access token Danamart not found');
    }

    const response = await danamartApi.get('/pemodal/penawaran', {
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

export const postDiscussion = async (formData: FormData): Promise<any> => {
  try {
    const accessTokenDanamart = localStorage.getItem('accessToken-danamart');

    if (accessTokenDanamart === null) {
      return await Promise.resolve('Access token Danamart not found');
    }

    const response = await danamartApi.post(
      `/pemodal/Prospektus/postDiskusi`,
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
    return error.response;
  }
};

export const getOfferReport = async (params: {
  pinjaman_id: string;
}): Promise<any> => {
  try {
    const accessTokenDanamart = localStorage.getItem('accessToken-danamart');

    if (accessTokenDanamart === null || accessTokenDanamart === '') {
      return await Promise.resolve('Access token Danamart not found');
    }

    const response = await danamartApi.get('/pemodal/Laporan/penerbit', {
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

export const getDashboardUserById = async (params: {
  pinjaman_id: string;
}): Promise<any> => {
  try {
    const accessTokenDanamart = localStorage.getItem('accessToken-danamart');

    if (accessTokenDanamart === null || accessTokenDanamart === '') {
      return await Promise.resolve('Access token Danamart not found');
    }

    const response = await danamartApi.get('/pemodal/dashboard', {
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

export const getFormPurchase = async (
  pinjamanId: string,
  userPinjamanId: string
): Promise<any> => {
  try {
    const accessTokenDanamart = localStorage.getItem('accessToken-danamart');

    if (accessTokenDanamart === null || accessTokenDanamart === '') {
      return await Promise.resolve('Access token Danamart not found');
    }

    const response = await danamartApi.get(
      `/pemodal/pendanaan/form/${pinjamanId}/${userPinjamanId}`,
      {
        headers: {
          Authorization: `Bearer ${accessTokenDanamart ?? ''}`
        }
      }
    );
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const purchaseItem = async (formData: PurchaseI): Promise<any> => {
  try {
    const accessTokenDanamart = localStorage.getItem('accessToken-danamart');

    if (accessTokenDanamart === null || accessTokenDanamart === '') {
      return await Promise.resolve('Access token Danamart not found');
    }
    const response = await danamartPurchaseService.post(
      `/pemodal/pendanaan/beli`,
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

export const purchaseItemCheckTesting = async (formData: PurchaseCheckTestingI): Promise<any> => {
  try {
    const accessTokenDanamart = localStorage.getItem('accessToken-danamart');

    if (accessTokenDanamart === null || accessTokenDanamart === '') {
      return await Promise.resolve('Access token Danamart not found');
    }
    const response = await danamartPurchaseService.post(
      `/pemodal/CekOmbak/beli`,
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

export const getPurchaseOTP = async (formData: FormData): Promise<any> => {
  try {
    const accessTokenDanamart = localStorage.getItem('accessToken-danamart');

    if (accessTokenDanamart === null || accessTokenDanamart === '') {
      return await Promise.resolve('Access token Danamart not found');
    }

    const response = await danamartApi.post(
      `/pemodal/dashboard/sendOTP`,
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
    return error.response;
  }
};

export const getDetailPayment = async (params: {
  idPinjaman: string;
}): Promise<any> => {
  try {
    const accessTokenDanamart = localStorage.getItem('accessToken-danamart');

    if (accessTokenDanamart === null || accessTokenDanamart === '') {
      return await Promise.resolve('Access token Danamart not found');
    }

    const response = await danamartApi.get('/pemodal/Pendanaan/getPembayaran', {
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

export const cancelPayment = async (params: {
  pinjamanId: string;
}): Promise<any> => {
  try {
    const accessTokenDanamart = localStorage.getItem('accessToken-danamart');

    if (accessTokenDanamart === null || accessTokenDanamart === '') {
      return await Promise.resolve('Access token Danamart not found');
    }

    const response = await danamartApi.get(
      '/pemodal/Pendanaan/deleteTransaksi',
      {
        params,
        headers: {
          Authorization: `Bearer ${accessTokenDanamart ?? ''}`
        }
      }
    );
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const postReport = async (formData: ReportFormI): Promise<any> => {
  try {
    const accessTokenDanamart = localStorage.getItem('accessToken-danamart');

    if (accessTokenDanamart === null || accessTokenDanamart === '') {
      return await Promise.resolve('Access token Danamart not found');
    }
    const response = await danamartPurchaseService.post(
      `/pemodal/Prospektus/laporkan`,
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

export const getFormCheckTesting = async (
  pinjamanId: string,
  userPinjamanId: string
): Promise<any> => {
  try {
    const accessTokenDanamart = localStorage.getItem('accessToken-danamart');

    if (accessTokenDanamart === null || accessTokenDanamart === '') {
      return await Promise.resolve('Access token Danamart not found');
    }

    const response = await danamartApi.get(
      `/pemodal/CekOmbak/form/${pinjamanId}/${userPinjamanId}`,
      {
        headers: {
          Authorization: `Bearer ${accessTokenDanamart ?? ''}`
        }
      }
    );
    return response;
  } catch (error: any) {
    await Promise.reject(error);
  }
};