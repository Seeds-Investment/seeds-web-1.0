import { type ReactNode } from 'react';

import { ThemeProvider } from '@material-tailwind/react';
import type { NextPage } from 'next';
import { SessionProvider } from 'next-auth/react';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import Header from '@/components/layouts/Header';
import ErrorBEProvider from '@/store/error-be/ErrorBEProvider';
import LanguageProvider from '@/store/language/LanguageProvider';
import LoadingProvider from '@/store/loading/LoadingProvider';
import SuccessProvider from '@/store/success/SuccessProvider';

import '@/utils/common/i18n';

import '@/styles/globals.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: (page: JSX.Element) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const pathsWithoutHeader = ['', 'auth', 'story-boarding', 'term-condition'];

function App({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
  const getLayout = Component.getLayout ?? (page => page);

  const path = useRouter().pathname.split('/')[1];

  const renderHeader =
    !pathsWithoutHeader.includes(path) && !path.includes('_error');

  return (
    <LanguageProvider>
      <LoadingProvider>
        <ErrorBEProvider>
          <SuccessProvider>
            <SessionProvider session={pageProps.session}>
              {renderHeader && <Header />}
              <ThemeProvider>
                {getLayout(<Component {...pageProps} />)}
              </ThemeProvider>
            </SessionProvider>
          </SuccessProvider>
        </ErrorBEProvider>
      </LoadingProvider>
    </LanguageProvider>
  );
}

export default appWithTranslation(App);
