import baseAxios from '@/utils/common/axios';

const seedsCoinService = baseAxios(
  `${process.env.NEXT_PUBLIC_URL ?? 'https://seeds-dev-gcp.seeds.finance'}`
);

export const getSeedsCoinTransactions = async (
  type: string,
  limit: number,
  page: number
): Promise<any> => {
  const accessToken = localStorage.getItem('accessToken');

  try {
    const response = await seedsCoinService.get('/coin/v1/transaction', {
      params: {
        type,
        limit,
        page
      },
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken ?? ''}`
      }
    });

    return response;
  } catch (error: any) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw new Error(`Error fetching seeds coin transactions: ${error.message}`);
  }
};
