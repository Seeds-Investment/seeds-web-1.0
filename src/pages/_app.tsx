import '@/styles/globals.css';
import { ThemeProvider } from '@material-tailwind/react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ReactNode } from 'react';

// Documentation of Next Layouts see:
// https://nextjs.org/docs/basic-features/layouts#with-typescript

export type Page<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: JSX.Element) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: Page;
};

function App({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
  const getLayout = Component.getLayout ?? (page => page);

  return (
    <ThemeProvider>{getLayout(<Component {...pageProps} />)}</ThemeProvider>
  );
}

export default App;
