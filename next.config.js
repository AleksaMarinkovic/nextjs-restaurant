/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images:{
    remotePatterns:[
      {
        protocol:'https',
        hostname:'strapi.aleksa-marinkovic.me',
        port:'',
      }
    ]
  }
}

module.exports = nextConfig
