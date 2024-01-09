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

export const getQuizTrending = async (): Promise<any> => {
  try {
    return await quizService.get(`/top`, {
      headers: {
        Accept: 'application/json'
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
    const path = `/all?search=${search}&status=${status}&page=${page}&limit=${limit}&currency=${currency}`;
    return await quizService.get(path, {
      headers: {
        Accept: 'application/json'
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
    const path = `/${id}?currency=${currency}`;
    return await quizService.get(path, {
      headers: {
        Accept: 'application/json'
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