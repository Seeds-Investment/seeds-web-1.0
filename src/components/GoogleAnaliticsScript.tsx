import Head from 'next/head';
import React from 'react';

const GoogleAnalyticsScript: React.FC = () => (
  <>
    <Head>
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-K9NMC6ZTY9"
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-K9NMC6ZTY9');
          `
        }}
      ></script>
    </Head>
  </>
);

export default GoogleAnalyticsScript;
