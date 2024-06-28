import baseAxios from '@/utils/common/axios';
import { type ListParamsI } from '@/utils/interfaces/academy.interface';
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

export const getCategoryDetail = async (id: string): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await academyService.get(`/category/${id}`, {
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

export const getClassListByCategoryId = async (
  id: string,
  params: ListParamsI
): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await academyService.get(`/category/${id}/class`, {
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
