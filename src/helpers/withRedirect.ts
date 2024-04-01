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
  const currentUnixTime = Math.floor(Date.now() / 1000);
  const expiredUnixTime = parseInt(
    window.localStorage.getItem('expiresAt') as string
  );
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

  if (
    window.localStorage.getItem('accessToken') === null ||
    expiredUnixTime < currentUnixTime
  ) {
    await router.push({
      pathname,
      query
    });
  } else if (
    window.localStorage.getItem('accessToken') !== null &&
    expiredUnixTime > currentUnixTime
  ) {
    const redirectItem = redirectList.find(item => item.logic);
    if (redirectItem !== undefined && redirectItem !== null) {
      await router.push({ pathname: redirectItem.redirect });
    }
  }
};

export default withRedirect;
