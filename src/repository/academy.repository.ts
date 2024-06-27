import baseAxios from '@/utils/common/axios';
import {
  type ListParamsI,
  type SubmitAnswerI
} from '@/utils/interfaces/academy.interface';
import { toast } from 'react-toastify';

const academyService = baseAxios(
  `${
    process.env.NEXT_PUBLIC_URL ?? 'https://seeds-dev-gcp.seeds.finance'
  }/academy/v1`
);

export const getAllCategory = async (params: ListParamsI): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await academyService.get(`/category`, {
      params,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken ?? ''}`
      }
    });
    return response;
  } catch (error: any) {
    toast(error.message, { type: 'error' });
  }
};

export const getAllClass = async (params: ListParamsI): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await academyService.get(`/class`, {
      params,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken ?? ''}`
      }
    });
    return response;
  } catch (error: any) {
    toast(error.message, { type: 'error' });
  }
};

export const startPretest = async (id: string): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await academyService.post(
      `/class/${id}/pre-test`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken ?? ''}`
        }
      }
    );
    return response;
  } catch (error: any) {
    console.error(error);
    toast(error.message, { type: 'error' });
  }
};

export const getPretestQuestion = async (id: string): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await academyService.get(
      `/class/${id}/pre-test/questions`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken ?? ''}`
        }
      }
    );
    return response;
  } catch (error: any) {
    toast(error.message, { type: 'error' });
  }
};

export const submitPretestAnswer = async (
  formData: SubmitAnswerI
): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await academyService.post(
      '/pre-test/submit-answer',
      formData,
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken ?? ''}`
        }
      }
    );
    return response;
  } catch (error: any) {
    toast(error.message, { type: 'error' });
  }
};

export const getPretestScore = async (id: string): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await academyService.get(`/class/${id}/pre-test/score`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken ?? ''}`
      }
    });
    return response;
  } catch (error: any) {
    toast(error.message, { type: 'error' });
  }
};

export const getClassDetail = async (id: string): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await academyService.get(`/class/${id}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken ?? ''}`
      }
    });
    return response;
  } catch (error: any) {
    toast(error.message, { type: 'error' });
  }
};
