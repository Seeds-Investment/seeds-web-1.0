import { Head, Html, Main, NextScript } from 'next/document';

export default function Document(): React.ReactElement {
  return (
    <Html lang="en">
      <Head />
      <body>
        <div id="portal" />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
