import baseAxios from '@/utils/common/axios';

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
