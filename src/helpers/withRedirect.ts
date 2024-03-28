import type { NextRouter } from 'next/router';

interface QueryType extends Record<string, string | string[] | undefined> {}
interface RedirectItem {
  logic: boolean;
  redirect: string;
}
interface RedirectList extends Array<RedirectItem> {}

const withRedirect = async <T extends QueryType>(
  router: NextRouter,
  query?: T,
  pathname?: string
): Promise<void> => {
  // Add logic and redirect pathname in here
  const redirectList: RedirectList = [
    {
      logic: query?.lead !== undefined && query?.quizId !== undefined,
      redirect: `/play/quiz/${query?.quizId as string}/leaderboard`
    },
    {
      logic: query?.quizId !== undefined,
      redirect: `/play/quiz/${query?.quizId as string}`
    },
    {
      logic: query?.withdrawal !== undefined,
      redirect: `/withdrawal`
    }
  ];

  if (window.localStorage.getItem('accessToken') === null) {
    await router.push({
      pathname,
      query
    });
  } else {
    if (redirectList !== undefined) {
      for (let i = 0; i < redirectList?.length; i++) {
        if (redirectList[i].logic) {
          await router.push({ pathname: redirectList[i].redirect });
          break;
        } else if (window.localStorage.getItem('accessToken') !== undefined) {
          window.localStorage.removeItem('accessToken');
          await router.push({
            pathname,
            query
          });
        }
      }
    }
  }
};

export default withRedirect;
