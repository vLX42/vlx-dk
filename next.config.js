// next.config.js

module.exports = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.node = { fs: 'empty', module: 'empty' }
        // Important: return the modified config
        return config
      },
}
