/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
  experimental: {
    appDir: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
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
