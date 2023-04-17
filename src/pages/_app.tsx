import '@/styles/globals.css';
import { ThemeProvider } from '@material-tailwind/react';
import i18n from 'i18next';
import type { NextPage } from 'next';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import en from 'public/locales/en';
import id from 'public/locales/id';
import type { ReactNode } from 'react';
import { initReactI18next } from 'react-i18next';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

export type Page<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: JSX.Element) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: Page;
};

function App({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
  const getLayout = Component.getLayout ?? (page => page);
  void i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    debug: true,

    resources: {
      en: {
        translation: en
      },
      id: {
        translation: id
      }
    },

    interpolation: {
      escapeValue: false
    }
  });
  return (
    <ThemeProvider>{getLayout(<Component {...pageProps} />)}</ThemeProvider>
  );
}

export default appWithTranslation(App);
