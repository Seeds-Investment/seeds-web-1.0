import baseAxios from '@/utils/common/axios';
import { isUndefindOrNull } from '@/utils/common/utils';

const baseUrl =
  process.env.NEXT_PUBLIC_URL ?? 'https://seeds-dev-gcp.seeds.finance';
const relativeUrl = 'payment/v1';

const paymentService = baseAxios(`${baseUrl}/${relativeUrl}`);

export const getPaymentList = async (): Promise<any> => {
  return await paymentService.get(`/list`);
};

export const getPaymentDetail = async (id: string): Promise<any> => {
  const accessToken = localStorage.getItem('accessToken');
  if (isUndefindOrNull(id)) {
    return await Promise.resolve(null);
  }
  return await paymentService.get(`${id}`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken ?? ''}`
    }
  });
};

export const getHowToPay = async (url: string): Promise<any> => {
  const axios = baseAxios(url);
  return await axios.get('');
};
