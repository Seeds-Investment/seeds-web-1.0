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

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getPersonalChatById = async ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  user_id,
  search = '',
  page = 1,
  limit = 30
}: {
  user_id: string;
  search?: string;
  page?: number;
  limit?: number;
}) => {
  const accessToken = localStorage.getItem('accessToken');
  const path = Endpoints.chat.personalChat;

  if (isUndefindOrNull(accessToken)) {
    return await Promise.resolve(null);
  }

  return await baseUrl.get(path, {
    params: { user_id, search, page, limit },
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken ?? ''}`
    }
  });
};

export const sendPersonalChat = async ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  user_id,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  content_text,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  media_urls
}: {
  user_id: string;
  content_text?: string;
  media_urls?: string[];
}): Promise<any> => {
  const accessToken = localStorage.getItem('accessToken');
  const path = Endpoints.chat.sendPersonalChat;

  if (isUndefindOrNull(accessToken)) {
    return await Promise.resolve(null);
  }

  return await baseUrl.post(
    path,
    { user_id, content_text, media_urls },
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken ?? ''}`
      }
    }
  );
};

export const mutePersonalChat = async (
  // eslint-disable-next-line @typescript-eslint/naming-convention
  user_id: string,
  type: 'eight_hours' | 'one_week' | 'always'
): Promise<any> => {
  const path = `${Endpoints.chat.mutePersonalChat}`;
  const accessToken = localStorage.getItem('accessToken');

  // eslint-disable-next-line no-useless-catch
  try {
    const response = await baseUrl.post(
      path,
      { user_id, type },
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken ?? ''}`
        }
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const deletePersonalChat = async (user_id: string): Promise<any> => {
  const path = Endpoints.chat.deletePersonalChat.replace(':id', user_id);
  const accessToken = localStorage.getItem('accessToken');

  // eslint-disable-next-line no-useless-catch
  try {
    const response = await baseUrl.delete(path, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken ?? ''}`
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
};
