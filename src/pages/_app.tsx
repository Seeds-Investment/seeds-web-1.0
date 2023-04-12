import '@/styles/globals.css';
import { Layouts } from '@/utils/constants/layouts';
import { ThemeProvider } from '@material-tailwind/react';
import type { NextComponentType, NextPage, NextPageContext } from 'next';
import type { AppProps } from 'next/app';

// Documentation of Next Layouts see:
// https://nextjs.org/docs/basic-features/layouts#with-typescript
// Improved Using
// https://reacthustle.com/blog/next-js-multiple-layouts-typescript

export type LayoutKeys = keyof typeof Layouts;

export type Page<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
  Layout?: LayoutKeys;
};

type AppPropsWithLayout = AppProps & {
  Component: NextComponentType<NextPageContext, any, any> & {
    Layout: LayoutKeys;
  };
};

function App({ Component, pageProps }: AppPropsWithLayout): React.ReactElement {
  const Layout = Layouts[Component.Layout] ?? (page => page);

  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
