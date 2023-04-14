import '@/styles/globals.css';
import { ThemeProvider } from '@material-tailwind/react';
import i18n from 'i18next';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import en from 'public/locales/en';
import id from 'public/locales/id';
import { initReactI18next } from 'react-i18next';

function App({ Component, pageProps }: AppProps): React.ReactElement {
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
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default appWithTranslation(App);
