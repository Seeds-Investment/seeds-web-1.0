import '@/styles/globals.css';
import { ThemeProvider } from '@material-tailwind/react';
import type { NextPage } from 'next';
// import { SessionProvider } from 'next-auth/react';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import type { ReactNode } from 'react';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import '@/utils/common/i18n';

export type Page<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: JSX.Element) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: Page;
};

function App({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
  const getLayout = Component.getLayout ?? (page => page);
  return (
    // <SessionProvider session={pageProps.session}>
    <ThemeProvider>{getLayout(<Component {...pageProps} />)}</ThemeProvider>
    // </SessionProvider>
  );
}

export default appWithTranslation(App);
