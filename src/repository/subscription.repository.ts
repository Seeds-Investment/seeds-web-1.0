import baseAxios from '@/utils/common/axios';
import { toast } from 'react-toastify';

const subscriptionService = baseAxios(
  `${
    process.env.NEXT_PUBLIC_URL ?? 'https://seeds-dev-gcp.seeds.finance'
  }/subscription/v1`
);

export const getSubscriptionPlan = async (): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await subscriptionService.get(`/subscription`, {
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

export const getSubscriptionVoucher = async (id: string): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await subscriptionService.get(
      `/subscription/${id}/vouchers`,
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
