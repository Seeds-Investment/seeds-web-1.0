import baseAxios from '@/utils/common/axios';
import { isUndefindOrNull } from '@/utils/common/utils';
import axios from 'axios';

const baseUrl = baseAxios(`https://seeds-dev-gcp.seeds.finance/`);
interface getDataCircleType {
  circleId: string;
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

export const createPostCircleDetail = async (formData: {
  content_text: string;
  media_urls: string[];
  privacy: string;
  is_pinned: boolean;
  user_id: string | any;
  circleId: string | any;
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
      isUndefindOrNull(formData.circleId)
    ) {
      return await Promise.resolve(null);
    }

    const body = JSON.stringify({
      content_text: formData.content_text,
      media_urls: formData.media_urls,
      privacy: formData.privacy,
      is_pinned: formData.is_pinned,
      user_id: formData.user_id,
      circleId: formData.circleId
    });

    return await baseUrl.post('/post/v2/create', body, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken ?? ''}`
      }
    });
  } catch (error) {
    return error;
  }
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
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken ?? ''}`
      }
    }
  );
};
