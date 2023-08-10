/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      'slashdot.org',
      'consent.google.com',
      'markets.businessinsider.com',
      'www.businessinsider.com',
      'coinpaper.com',
      'www.erlang.org',
      'cdn.vox-cdn.com',
      'a.fsdn.com',
      'i.insider.com',
      'res.cloudinary.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'a.fsdn.com',
        port: '',
        pathname: '*'
      },
      {
        protocol: 'https',
        hostname: 'i.insider.com',
        port: '',
        pathname: '*'
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '*'
      }
      // {
      //   protocol: 'https',
      //   hostname: 'a.fsdn.com',
      //   port: '',
      //   pathname: '*'
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'a.fsdn.com',
      //   port: '',
      //   pathname: '*'
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'a.fsdn.com',
      //   port: '',
      //   pathname: '*'
      // }
    ]
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es']
  },
  images: {
    domains: ['dev-assets.seeds.finance', 'assets.seeds.finance'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dev-assets.seeds.finance',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'assets.seeds.finance',
        port: '',
        pathname: '/**'
      }
    ]
  }
};

module.exports = nextConfig;
