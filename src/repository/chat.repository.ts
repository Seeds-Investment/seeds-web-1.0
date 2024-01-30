import Endpoints from '@/utils/_static/endpoint';
import baseAxios from '@/utils/common/axios';
import { isUndefindOrNull } from '@/utils/common/utils';
import { type GetListChatParams } from '@/utils/interfaces/chat.interface';

const baseUrl = baseAxios(
  `${process.env.NEXT_PUBLIC_URL ?? 'https://seeds-dev-gcp.seeds.finance'}/`
);

export const getListChat = async ({
  type,
  search = '',
  page = 1,
  limit = 10,
  unread = true
}: GetListChatParams): Promise<any> => {
  const accessToken = localStorage.getItem('accessToken');
  const chatType = type === 'COMMUNITY' ? 'group' : type.toLowerCase();
  const path = `${Endpoints.chat.list.replace(':type', chatType)}`;

  if (isUndefindOrNull(accessToken)) {
    return await Promise.resolve(null);
  }

  return await baseUrl.get(path, {
    params: { search, page, limit, unread },
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken ?? ''}`
    }
  });
};
