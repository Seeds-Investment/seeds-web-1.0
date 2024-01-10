import baseAxios from '@/utils/common/axios';
import { type QuizStatus } from '@/utils/interfaces/quiz.interfaces';

const quizService = baseAxios(
  `${
    process.env.NEXT_PUBLIC_URL ?? 'https://seeds-dev-gcp.seeds.finance'
  }/quiz/v1`
);

export const getQuizLeaderboard = async (params: any): Promise<any> => {
  return await quizService.get(`/leaderboard`, {
    params
  });
};

export const getQuizTrending = async (currency: string): Promise<any> => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken === null || accessToken === '') {
    return await Promise.resolve('Access token not found');
  }
  try {
    return await quizService.get(`/top?currency=${currency}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken ?? ''}`
      }
    });
  } catch (error) {
    console.error('Error fetching trending play list:', error);
  }
};

export const getAllQuiz = async ({
  search = '',
  status = '',
  page = 1,
  limit = 10,
  currency = ''
}: {
  search?: string;
  status: QuizStatus | '';
  page?: number;
  limit?: number;
  currency?: string;
}): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken === null || accessToken === '') {
      return await Promise.resolve('Access token not found');
    }

    const path = `/all?search=${search}&status=${status}&page=${page}&limit=${limit}&currency=${currency}`;
    return await quizService.get(path, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken ?? ''}`
      }
    });
  } catch (error) {
    console.error('Error fetching trending play list:', error);
  }
};

export const getQuizById = async ({
  id,
  currency
}: {
  id: string;
  currency: string;
}): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken === null || accessToken === '') {
      return await Promise.resolve('Access token not found');
    }

    const path = `/${id}?currency=${currency}`;
    return await quizService.get(path, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken ?? ''}`
      }
    });
  } catch (error) {
    console.error('Error fetching trending play list:', error);
  }
};

export const getQuizReview = async (id: string): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken === null || accessToken === '') {
      return await Promise.resolve('Access token not found');
    }
    const path = `/${id}/reviews`;
    return await quizService.get(path, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken ?? ''}`
      }
    });
  } catch (error) {
    console.error('Error fetching trending play list:', error);
  }
};

export const getLeaderBoardGlobal = async ({
  page = 1,
  limit = 10
}: {
  page?: number;
  limit?: number;
}): Promise<any> => {
  try {
    const params = {
      page,
      limit
    };
    return await quizService.get(`/leaderboard`, {
      params,
      headers: {
        Accept: 'application/json'
      }
    });
  } catch (error) {
    console.error('Error fetching global leaderboard:', error);
  }
};

export const getLeaderBoardByQuizId = async (quizId: any): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await quizService.get(`/leaderboard/${quizId}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken ?? ''}`
      }
    });
  } catch (error) {
    console.error('Error fetching leaderboard by quiz id:', error);
  }
};