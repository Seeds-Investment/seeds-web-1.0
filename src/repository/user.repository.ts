import baseAxios from '@/utils/common/axios';
import type { IChangePasswordPayload } from '@/utils/interfaces/payload.interfaces';

const authService = baseAxios(`https://seeds-dev.seeds.finance/user/v1`);

export const patchChangePassword = async (
  payload: IChangePasswordPayload
): Promise<any> => {
  return await authService.patch(`/change-password`, payload);
};
