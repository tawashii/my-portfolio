module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-preset-env')({
      stage: 1,
      features: {
        'nesting-rules': true,
        'custom-properties': true,
        'relative-color-syntax': true,
      }
    }),
    require('cssnano')({
      preset: ['default', {
        discardComments: { removeAll: true },
        normalizeWhitespace: false,
      }]
    }),
    process.env.NODE_ENV === 'production' &&
      require('@fullhuman/postcss-purgecss')({
        content: ['./src/**/*.{js,jsx}', './index.html'],
        defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
        safelist: ['dark', /^swiper-/]
      })
  ].filter(Boolean)
}
