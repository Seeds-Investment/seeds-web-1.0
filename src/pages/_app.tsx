import '@/styles/globals.css';
import { ThemeProvider } from '@material-tailwind/react';
import type { AppProps } from 'next/app';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

export default function App({
  Component,
  pageProps
}: AppProps): React.ReactElement {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
