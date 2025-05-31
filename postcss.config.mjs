export default {
  plugins: [
    // Basic PostCSS setup
    ['autoprefixer', {
      grid: true
    }],
    
    // Advanced CSS features
    ['postcss-preset-env', {
      stage: 1,
      features: {
        'nesting-rules': true,
        'custom-properties': true,
        'custom-media-queries': true,
        'media-query-ranges': true,
        'custom-selectors': true,
      },
      autoprefixer: {
        grid: true
      }
    }],
    
    // CSS optimization
    ['postcss-combine-duplicated-selectors', {
      removeDuplicatedProperties: true
    }],
    
    ['css-declaration-sorter', {
      order: 'smacss'
    }],
      // Production optimizations
    process.env.NODE_ENV === 'production' && [
      'cssnano',
      {
        preset: [
          'advanced',
          {
            discardComments: { removeAll: true },
            normalizeWhitespace: false,
            reduceIdents: true,
            mergeIdents: true,
            minifyFontValues: true,
            minifyGradients: true,
            minifyParams: true,
            minifySelectors: true,
            convertValues: true,
            discardDuplicates: true,
            discardOverridden: true,
            normalizeDisplayValues: true,
            normalizePositions: true,
            normalizeRepeatStyle: true,
            normalizeString: true,
            normalizeTimingFunctions: true,
            normalizeUnicode: true,
            normalizeUrl: true,
            orderedValues: true,
            reduceInitial: true,
            reduceTransforms: true,
            uniqueSelectors: true,
            zindex: false
          }
        ]
      }
    ],
    
    // Purge unused CSS
    process.env.NODE_ENV === 'production' && [
      '@fullhuman/postcss-purgecss',
      {
        content: [
          './src/**/*.{js,jsx,ts,tsx}',
          './index.html'
        ],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
        safelist: {
          standard: [/^:/, /^::/, /^react-/, /^swiper-/],
          deep: [/dark$/, /light$/],
          greedy: [/selected/, /active/, /hover/, /focus/, /disabled/]
        }
      }
    ]
  ].filter(Boolean)
};
