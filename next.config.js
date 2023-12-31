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
})

module.exports = nextConfig