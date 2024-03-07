export interface GetListChatParams {
  type: 'PERSONAL' | 'COMMUNITY' | 'REQUEST';
  search: string;
  page: number;
  limit?: number;
  unread?: boolean;
}

export interface Chat {
  id: string;
  name: string;
  avatar: string;
  content_text: string;
  status: boolean;
  status_joined: boolean;
  total_unread: number;
  created_at: string;
  accept_at: string;
  read_at: string;
}

export interface IChatBubble {
  id: string;
  content_text: string;
  media_urls: string[];
  created_at: string;
  accept_at: string;
  read_at: string;
  created_by: string;
  reference_type?: string;
  reference: IChatReference;
}

export interface IChatReference {
  user_id: string;
  url: string;
  expired_at: IChatTime;
}

export interface IChatTime {
  nanos: number;
  seconds: number;
}

export interface IGroupChatDetail {
  id: string;
  avatar: string;
  name: string;
  description: string;
  privacy: string;
  hashtags: string[];
  memberships: Record<string, unknown>;
  created_by: string;
  created_at: string;
  updated_at: string;
  total_memberships: number;
  total_online: number;
}

export const initialGroupDetail = {
  id: '',
  avatar: '',
  name: '',
  description: '',
  privacy: '',
  hashtags: [],
  deleted_by: '00000000-0000-0000-0000-000000000000',
  created_at: '',
  updated_at: ''
};

export interface IGroupMember {
  id: string;
  user_id: string;
  user_avatar: string;
  user_name: string;
  role: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface GetChatParams {
  user_id?: string;
  group_id?: string;
  search?: string;
  page?: number;
  limit?: number;
  unread?: boolean;
}

export interface SendMessageParams {
  content_text?: string;
  media_urls?: string[];
  group_id?: string;
  user_id?: string;
}
