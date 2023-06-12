/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es']
  },
  images: {
    domains: ['seeds-bucket.s3.ap-southeast-1.amazonaws.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'seeds-bucket-new.s3.ap-southeast-3.amazonaws.com',
        port: '',
        pathname: '/**'
      }
    ]
  }
};

module.exports = nextConfig;
