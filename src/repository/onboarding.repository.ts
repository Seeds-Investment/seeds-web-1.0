import baseAxios from '@/utils/common/axios';

const onboardService = baseAxios(
    `${
      process.env.NEXT_PUBLIC_URL ?? 'https://seeds-dev-ali.seeds.finance'
    }/onboard/v1`
  );

export const getOnboardingQuestion = async (
  params: {
    page: number,
    limit: number,
    language: string,
}
): Promise<any> => {
  try {
    return await onboardService(`/question`, {
      params,
      headers: {
        Accept: 'application/json'
      }
    });
  } catch (error) {
    await Promise.resolve();
  }
};
