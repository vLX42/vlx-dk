// next.config.js
const withVideos = require('next-videos')

module.exports = withVideos({
  assetPrefix: 'http://localhost:3000',
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      config.node = { fs: 'empty', module: 'empty' }
      // Important: return the modified config
      return config
    },
})

