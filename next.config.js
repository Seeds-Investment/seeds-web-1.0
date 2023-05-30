/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es']
  },
  images: {
    domains: ['seeds-bucket.s3.ap-southeast-1.amazonaws.com']
  }
};

module.exports = nextConfig;
