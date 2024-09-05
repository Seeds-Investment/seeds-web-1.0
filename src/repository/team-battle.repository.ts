import baseAxios from '@/utils/common/axios';
import { type TeamBattleListParams } from '@/utils/interfaces/team-battle.interface';
import { toast } from 'react-toastify';

const teamBattleService = baseAxios(
  `${
    process.env.NEXT_PUBLIC_URL ?? 'https://seeds-dev-gcp.seeds.finance'
  }/battle/v1`
);

export const getBattleList = async (
  params: TeamBattleListParams
): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await teamBattleService.get(`/list`, {
      params,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken ?? ''}`
      }
    });
    return response;
  } catch (error: any) {
    toast.error(error.message, { type: 'error' });
  }
};
