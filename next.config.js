const nextTranslate = require('next-translate')

module.exports = nextTranslate({
  reactStrictMode: true,
  trailingSlash: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
})
