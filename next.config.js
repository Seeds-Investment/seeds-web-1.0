/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Allow builds to pass even with type errors
    ignoreBuildErrors: true
  },
  reactStrictMode: false,
  // Uncomment the following line if deploying standalone
  // output: 'standalone',
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
      'res.cloudinary.com',
      'pict.sindonews.net',
      'images.unsplash.com',
      'seeds-bucket-new.s3.ap-southeast-3.amazonaws.com',
      'dev-assets.seeds.finance',
      'assets.seeds.finance',
      'cdn06.pramborsfm.com',
      'i.pravatar.cc',
      'dipssy.com',
      'zengo.com',
      'blockchainmagazine.com',
      'widyasecurity.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'a.fsdn.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'i.insider.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**'
      },
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
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es']
  }
};

module.exports = nextConfig;
