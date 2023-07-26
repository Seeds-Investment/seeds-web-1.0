import baseAxios from '@/utils/common/axios';

const baseUrl =
  process.env.NEXT_PUBLIC_URL ?? 'https://seeds-dev-gcp.seeds.finance';
const relativeUrl = 'payment/v1';

const paymentService = baseAxios(`${baseUrl}/${relativeUrl}`);

export const getPaymentList = async (): Promise<any> => {
  return await paymentService.get(`/list`);
};
