import { isGuest } from '@/helpers/guest';
import baseAxios from '@/utils/common/axios';
import { type ClassParamsI } from '@/utils/interfaces/academy.interface';
import { toast } from 'react-toastify';

const academyService = baseAxios(
  `${
    process.env.NEXT_PUBLIC_URL ?? 'https://seeds-dev-gcp.seeds.finance'
  }/academy/v1`
);
const adminService = baseAxios(
  `${
    process.env.NEXT_PUBLIC_URL ?? 'https://seeds-dev-gcp.seeds.finance'
  }/admin-academy/v1`
);

export const getAllCategory = async (): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await adminService.get(`/category`, {
      headers: {
        Accept: 'application/json',
        Authorization: isGuest() ? '' : `Bearer ${accessToken ?? ''}`
      }
    });
    return response.data;
  } catch (error) {
    toast.error('Failed to fetch fetch categories.');
    throw error;
  }
};

export const getAllClass = async (params: ClassParamsI): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await academyService.get(`/class`, {
      params,
      headers: {
        Accept: 'application/json',
        Authorization: isGuest() ? '' : `Bearer ${accessToken ?? ''}`
      }
    });
    return response.data;
  } catch (error) {
    toast.error('Failed to fetch classes.');
    throw error;
  }
};

export const getClassDetail = async (id: string): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await academyService.get(`/class/${id}`, {
      headers: {
        Accept: 'application/json',
        Authorization: isGuest() ? '' : `Bearer ${accessToken ?? ''}`
      }
    });
    return response.data;
  } catch (error) {
    toast.error('Failed to fetch detail class.');
    throw error;
  }
};
