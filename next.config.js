/** @type {import('next').NextConfig} */

const prod = process.env.NODE_ENV === 'production'

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: prod ? false : true,
})

const nextConfig = withPWA({
  productionBrowserSourceMaps: true,
  images: {
    domains: ['https://avatars.dicebear.com/', 'https://dicebear.com/', 'https://api.dicebear.com/', 'api.dicebear.com', 'https://cdn-images-1.medium.com/', 'cdn-images-1.medium.com', 'medium.com']
  },
  i18n: {
    locales: [ 'pl', 'en' ],
    defaultLocale: 'en',
  },
  async headers() {
    const headers = [];
    if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview') {
      headers.push({
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'all',
          },
        ],
        source: '/:path*',
      });
    }
    return headers;
  }
})

module.exports = nextConfig