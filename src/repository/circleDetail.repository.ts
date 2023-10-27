import baseAxios from '@/utils/common/axios';
import { isUndefindOrNull } from '@/utils/common/utils';
import axios from 'axios';

const baseUrl = baseAxios(
  `${process.env.NEXT_PUBLIC_URL ?? 'https://seeds-dev-gcp.seeds.finance'}/`
);
interface getDataCircleType {
  circleId: string;
}

interface typeOfComment {
  post_id: string;
  user_id: string;
  parent_id: string;
  content_text: string;
  media_url: string;
  media_type: string;
}

interface getDataPostCircleType {
  postId: string;
}
export const getDetailCircle = async ({
  circleId
}: getDataCircleType): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (isUndefindOrNull(circleId)) {
      return await Promise.resolve(null);
    }

    const response = await baseUrl.get(`/circle/v2/find/${circleId}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken ?? ''}`
      }
    });
    return { ...response, status: 200 };
  } catch (error: any) {
    return error.response;
  }
};

export const getCirclePost = async ({
  circleId
}: getDataCircleType): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (isUndefindOrNull(circleId)) {
      return await Promise.resolve(null);
    }

    const response = await baseUrl.get(
      `/post/v2/list?circle_id=${circleId}&page=1&limit=10`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken ?? ''}`
        }
      }
    );
    return { ...response, status: 200 };
  } catch (error: any) {
    return error.response;
  }
};

export const getDetailCirclePost = async ({
  postId
}: getDataPostCircleType): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (isUndefindOrNull(postId)) {
      return await Promise.resolve(null);
    }

    const response = await baseUrl.get(`/post/v2/find/${postId}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken ?? ''}`
      }
    });
    return { ...response, status: 200 };
  } catch (error: any) {
    return error.response;
  }
};

export const getAllComment = async ({
  postId
}: getDataPostCircleType): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (isUndefindOrNull(postId)) {
      return await Promise.resolve(null);
    }

    const response = await baseUrl.get(
      `/post/comment/v2/list?post_id=${postId}`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken ?? ''}`
        }
      }
    );
    return { ...response, status: 200 };
  } catch (error: any) {
    return error.response;
  }
};

export const getMemberCircle = async ({
  circleId
}: getDataCircleType): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (isUndefindOrNull(circleId)) {
      return await Promise.resolve(null);
    }

    const response = await baseUrl.get(
      `/circle/v2/list/members?circle_id=${circleId}&page=1&limit=10`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken ?? ''}`
        }
      }
    );
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const getStatusCircle = async ({
  circleId
}: getDataCircleType): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (isUndefindOrNull(circleId)) {
      return await Promise.resolve(null);
    }

    const response = await baseUrl.get(
      `/circle/v2/user/status?circle_id=${circleId}`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken ?? ''}`
        }
      }
    );
    return { ...response, status: 200 };
  } catch (error: any) {
    return error.response;
  }
};

export const getCircleRecomend = async ({
  circleId
}: getDataCircleType): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (isUndefindOrNull(circleId)) {
      return await Promise.resolve(null);
    }

    const response = await baseUrl.get(
      `/post/v2/list/recommended?circle_id=${circleId}&page=1&limit=10`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken ?? ''}`
        }
      }
    );

    return { ...response, status: 200 };
  } catch (error: any) {
    return error.response;
  }
};

export const getGifFromGhipy = async (): Promise<any> => {
  try {
    const response = await fetch(
      'https://api.giphy.com/v1/gifs/trending?api_key=STZwTE2z0evd6Ew1nReSwJnXfi01XSRp&limit=10'
    );
    const res = await response.json();
    return res;
  } catch (error) {
    return error;
  }
};

export const searchGifFromGhipy = async (query: string): Promise<any> => {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=STZwTE2z0evd6Ew1nReSwJnXfi01XSRp&q=${query}&limit=10`
    );
    const res = await response.json();
    return res;
  } catch (error) {
    return error;
  }
};

interface Polling {
  content_text: string;
  media_url: string;
}

interface JoinCircleType {
  circle_id: string;
  duration: number;
  payment_request: any;
}

export const joinCirclePost = async (data: JoinCircleType): Promise<any> => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken === null || accessToken === '') {
    return await Promise.resolve('Access token not found');
  }
  const body = JSON.stringify({
    circle_id: data.circle_id,
    duration: data.duration,
    payment_request: data.payment_request
  });

  const response = await baseUrl.put('/circle/v2/join', body, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken ?? ''}`
    }
  });
  return response;
};

export const createPostCircleDetail = async (formData: {
  content_text: string;
  media_urls: string[];
  privacy: string;
  is_pinned: boolean;
  user_id: string | any;
  circleId?: string | any;
  hashtags: string[] | any;
  pollings?: Polling[] | any;
  polling_multiple?: boolean;
  polling_new_option?: boolean;
  polling_date?: string;
  pie_title?: string;
  pie_amount?: number;
  pie?: any[];
}): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken === null || accessToken === '') {
      return await Promise.resolve('Access token not found');
    }
    if (
      isUndefindOrNull(formData.content_text) ||
      isUndefindOrNull(formData.media_urls) ||
      isUndefindOrNull(formData.privacy) ||
      isUndefindOrNull(formData.is_pinned) ||
      isUndefindOrNull(formData.user_id) ||
      isUndefindOrNull(formData.hashtags)
    ) {
      return await Promise.resolve(null);
    }

    const body = JSON.stringify({
      content_text: formData.content_text,
      media_urls: formData.media_urls,
      privacy: formData.privacy,
      is_pinned: formData.is_pinned,
      user_id: formData.user_id,
      circle_id: formData.circleId,
      hashtags: formData.hashtags,
      pollings: formData.pollings,
      polling_multiple: formData.polling_multiple,
      polling_new_option: formData.polling_new_option,
      polling_date: formData.polling_date,
      pie_title: formData.pie_title,
      pie_amount: formData.pie_amount,
      pie: formData.pie
    });

    const response = await baseUrl.post('/post/v2/create', body, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken ?? ''}`
      }
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const createComment = async (formData: typeOfComment): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken === null || accessToken === '') {
      return await Promise.resolve('Access token not found');
    }
    if (
      isUndefindOrNull(formData.content_text) ||
      isUndefindOrNull(formData.post_id) ||
      isUndefindOrNull(formData.user_id)
    ) {
      return await Promise.resolve(null);
    }

    const body = JSON.stringify({
      content_text: formData.content_text,
      media_url: formData.media_url,
      user_id: formData.user_id,
      post_id: formData.post_id,
      parent_id: formData.parent_id,
      media_type: formData.media_type
    });

    const response = await baseUrl.post('/post/comment/v2/create', body, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken ?? ''}`
      }
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const selectPostPolling = async (
  postPollingId: string
): Promise<any> => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken === null || accessToken === '') {
    return await Promise.resolve('Access token not found');
  }

  const res = await baseUrl.post(
    '/post/v2/polling/vote',
    {
      post_polling_id: postPollingId
    },
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken ?? ''}`
      }
    }
  );

  return res;
};

const post = async (url: string, payload: any, headers = {}): Promise<any> => {
  return await axios({
    method: 'POST',
    url: url,
    data: payload,
    headers: headers
  });
};

export const UseUploadMedia = async (media: any): Promise<any> => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken === null || accessToken === '') {
    return await Promise.resolve('Access token not found');
  }
  const formData = new FormData();
  formData.append('file', media);
  formData.append('type', 'OTHER_URL');

  return await post(
    `https://seeds-dev-gcp.seeds.finance/v1/storage/cloud`,
    formData,
    {
      headers: {
        Accept: 'multipart/form-data',
        Authorization: `Bearer ${accessToken ?? ''}`
      }
    }
  );
};

export const postLikeCirclePost = async (
  type: number,
  id: string
): Promise<any> => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken === null || accessToken === '') {
    return await Promise.resolve('Access token not found');
  }
  try {
    let response = await baseUrl.post(
      `/post/rating/v2/create`,
      {
        post_id: id,
        type
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken ?? ''}`
        }
      }
    );
    return (response = { ...response, status: 200 });
  } catch (error: any) {
    return error.response;
  }
};

export const postLikeComment = async (
  type: number,
  id: string
): Promise<any> => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken === null || accessToken === '') {
    return await Promise.resolve('Access token not found');
  }
  try {
    let response = await baseUrl.post(
      `/post/comment/v2/rating`,
      {
        post_id: id,
        type
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken ?? ''}`
        }
      }
    );
    return (response = { ...response, status: 200 });
  } catch (error: any) {
    return error.response;
  }
};

export const postPinCirclePost = async (
  type: string,
  id: string
): Promise<any> => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken === null || accessToken === '') {
    return await Promise.resolve('Access token not found');
  }
  try {
    let response = await baseUrl.patch(
      `/post/v2/update/pinned`,
      {
        post_id: id,
        type
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken ?? ''}`
        }
      }
    );
    return (response = { ...response, status: 200 });
  } catch (error: any) {
    return error.response;
  }
};

export const postSavedCirclePost = async (id: string): Promise<any> => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken === null || accessToken === '') {
    return await Promise.resolve('Access token not found');
  }
  try {
    let response = await baseUrl.post(
      `/post/saving/v1/create`,
      {
        post_id: id
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken ?? ''}`
        }
      }
    );
    return (response = { ...response, status: 200 });
  } catch (error: any) {
    return error.response;
  }
};

export const searchCircleByName = async (params: any): Promise<any> => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken === null || accessToken === '') {
    return await Promise.resolve('Access token not found');
  }

  return await baseUrl.get(`circle/v1/search`, {
    params,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken ?? ''}`
    }
  });
};

export const getUserTagList = async (
  cat: string,
  value: string
): Promise<any> => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken === null || accessToken === '') {
    return await Promise.resolve('Access token not found');
  }

  return await baseUrl.get(`/tag/v1/${cat}?search=${value}`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken ?? ''}`
    }
  });
};

export const searchUser = async (params: any): Promise<any> => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken === null || accessToken === '') {
    return await Promise.resolve('Access token not found');
  }

  return await baseUrl.get(`user/v1/search`, {
    params,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken ?? ''}`
    }
  });
};
