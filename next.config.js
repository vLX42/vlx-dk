// next.config.js
module.exports = {
  plugins: [
    'tailwindcss',
    'postcss-flexbugs-fixes',
    [
      'postcss-preset-env',
      {
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
        features: {
          'custom-properties': false,
        },
      },
    ],
  ],
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {

    // Important: return the modified config
    return config
  },
}