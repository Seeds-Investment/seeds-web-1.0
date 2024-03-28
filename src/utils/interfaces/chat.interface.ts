export interface GetListChatParams {
  type: 'PERSONAL' | 'COMMUNITY' | 'REQUEST';
  search: string;
  page: number;
  limit?: number;
  unread: boolean;
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

export interface SearchUserChat {
  id: string;
  avatar: string;
  rank: number;
  name: string;
  seedsTag: string;
  followers: number;
  followings: number;
  isFollowed: boolean;
}

export interface MutePersonalChatParams {
  user_id?: string;
  type: string;
}

export interface MuteGroupChatParams {
  group_id?: string;
  type: string;
}

export interface LeaveGroupParams {
  id?: string;
  user_id: string;
  message_text: string;
}

export interface GetChatNotesParams {
  user_id?: string;
  group_id?: string;
  search?: string;
  page: number;
  limit: number;
  type: string;
}

export interface GetChatMediaParams {
  user_id?: string;
  group_id?: string;
  search?: string;
  page: number;
  limit: number;
  type: string;
}

export interface GetCommonGroupParams {
  user_id: string;
  page: number;
  limit: number;
}

export interface PersonalChatNotesResponse {
  data: PersonalChatNotesData[];
  metadata: Metadata;
}

export interface PersonalChatNotesData {
  id: string;
  content_text: string;
  media_urls: string[];
  created_by: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  user_name: string;
  user_avatar: string;
  total_comment: number;
  total_like: number;
  status_like: number;
}
export interface PersonalChatMediaResponse {
  data: PersonalChatMediaData[];
  metadata: Metadata;
}
export interface PersonalChatMediaData {
  id: string;
  content_text: string;
  media_urls: string[];
  media_url: string;
  created_by: string;
  created_at: string;
  accept_at: string;
  read_at: string;
  reference_type: string;
}
export interface Metadata {
  total: number;
  current_page: number;
  limit: number;
  total_page: number;
}

export interface CommonGroupResponse {
  data: CommonGroupData[];
}

export interface CommonGroupData {
  id: string;
  name: string;
  avatar: string;
  cover: string;
  description: string;
  description_rules: string;
  type: string;
  premium_fee: number;
  admin_fee: number;
  monthly_time: number;
  is_liked: boolean;
  total_like: number;
  total_rating: number;
  total_member: number;
  total_post: number;
  created_at: string;
  updated_at: string;
  categories: string;
  top_members: TopMember[];
}

export interface TopMember {
  id: string;
  name: string;
}

export interface GroupMemberParams {
  id: string;
  page: number;
  limit: number;
}

export interface GroupMemberResponse {
  data: GroupMemberData[];
  metadata: Metadata;
}

export interface GroupMemberData {
  id: string;
  user_id: string;
  user_avatar: string;
  user_name: string;
  role: string;
  status: string;
  created_at: string;
  updated_at: string;
}
