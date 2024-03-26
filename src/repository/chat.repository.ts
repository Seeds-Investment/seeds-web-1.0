/* eslint-disable @typescript-eslint/naming-convention */
import Endpoints from '@/utils/_static/endpoint';
import baseAxios from '@/utils/common/axios';
import { isUndefindOrNull } from '@/utils/common/utils';
import {
  type GetChatParams,
  type GetListChatParams,
  type LeaveGroupParams,
  type MuteGroupChatParams,
  type MutePersonalChatParams,
  type SendMessageParams
} from '@/utils/interfaces/chat.interface';
import { toast } from 'react-toastify';

const baseUrl = baseAxios(
  `${process.env.NEXT_PUBLIC_URL ?? 'https://seeds-dev-gcp.seeds.finance'}/`
);

export const getListChat = async ({
  type,
  search = '',
  page = 1,
  limit = 10,
  unread = false
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

export const getChat = async ({
  user_id,
  group_id,
  search = '',
  page = 1,
  limit = 20,
  unread = true
}: GetChatParams): Promise<any> => {
  const accessToken = localStorage.getItem('accessToken');
  const path = Endpoints.chat.personalChat;

  if (isUndefindOrNull(accessToken)) {
    return await Promise.resolve(null);
  }

  return await baseUrl.get(path, {
    params: { user_id, group_id, search, page, limit, unread },
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken ?? ''}`
    }
  });
};

export const getGroupDetail = async (id: string): Promise<any> => {
  const accessToken = localStorage.getItem('accessToken');
  const path = `${Endpoints.chat.groupDetail}/${id}`;

  if (isUndefindOrNull(accessToken)) {
    return await Promise.resolve(null);
  }

  return await baseUrl.get(path, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken ?? ''}`
    }
  });
};

export const sendPersonalMessage = async (
  data: SendMessageParams
): Promise<any> => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken === null || accessToken === '') {
    toast('Access token not found');
  }
  const path = Endpoints.chat.sendPersonalChat;
  return await baseUrl.post(path, data, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken ?? ''}`
    }
  });
};

export const readPersonalMessage = async (id: string): Promise<void> => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken === null || accessToken === '') {
    toast('Access token not found');
  }
  const path = `${Endpoints.chat.readChat}/${id}/personal`;
  await baseUrl.put(path, null, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken ?? ''}`
    }
  });
};

export const readGroupMessage = async (id: string): Promise<void> => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken === null || accessToken === '') {
    toast('Access token not found');
  }
  const path = `${Endpoints.chat.readChat}/${id}/group`;
  await baseUrl.put(path, null, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken ?? ''}`
    }
  });
};

export const mutePersonalChat = async (
  data: MutePersonalChatParams
): Promise<void> => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken === null || accessToken === '') {
    toast('Access token not found');
  }
  const path = Endpoints.chat.mutePersonalChat;
  await baseUrl.post(path, data, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken ?? ''}`
    }
  });
};

export const muteGroupChat = async (
  data: MuteGroupChatParams
): Promise<void> => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken === null || accessToken === '') {
    toast('Access token not found');
  }
  const path = Endpoints.chat.muteGroupChat;
  await baseUrl.post(path, data, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken ?? ''}`
    }
  });
};

export const deletePersonalChat = async (id: string): Promise<void> => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken === null || accessToken === '') {
    toast('Access token not found');
  }
  const path = Endpoints.chat.deletePersonalChat.replace(':id', id);
  await baseUrl.delete(path, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken ?? ''}`
    }
  });
};

export const deleteGroupChat = async (id: string): Promise<void> => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken === null || accessToken === '') {
    toast('Access token not found');
  }
  const path = Endpoints.chat.deleteGroupChat.replace(':id', id);
  await baseUrl.delete(path, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken ?? ''}`
    }
  });
};

export const leaveGroupChat = async (data: LeaveGroupParams): Promise<void> => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken === null || accessToken === '') {
    toast('Access token not found');
  }
  const path = Endpoints.chat.leaveGroupChat.replace(':id', data?.id as string);
  await baseUrl.put(path, data, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken ?? ''}`
    }
  });
};
