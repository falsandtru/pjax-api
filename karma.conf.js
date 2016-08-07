module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    files: [
      { pattern: 'https://cdn.polyfill.io/v2/polyfill.js?features=default,WeakMap,WeakSet', watched: false, served: false, included: true },
      { pattern: 'node_modules/power-assert/build/power-assert.js', watched: true, served: true, included: true },
      { pattern: 'node_modules/typed-dom/dist/typed-dom.js', watched: true, served: true, included: true },
      { pattern: 'node_modules/spica/dist/spica.js', watched: true, served: true, included: true },
      { pattern: 'node_modules/localsocket/dist/localsocket.js', watched: true, served: true, included: true },
      { pattern: 'dist/*.js', watched: true, served: true, included: true },
      { pattern: 'test/integration/usecase/**/*.{html,css,js}', watched: true, served: true, included: true },
      { pattern: 'test/unit/fixture/**/*', watched: true, served: true, included: false }
    ],
    exclude: [
    ],
    espowerPreprocessor: {
      options: {
        emitActualCode: false,
        ignoreUpstreamSourceMap: true
      }
    },
    reporters: ['dots'],
    coverageReporter: {
      dir: 'coverage',
      subdir: function (browser, platform) {
        return browser.toLowerCase().split(' ')[0];
      },
      reporters: [
        { type: 'lcov' },
        { type: 'text-summary', subdir: '.', file: 'summary.txt' }
      ]
    },
    autoWatch: true,
    autoWatchBatchDelay: 500,
    customLaunchers: {
      IE11: {
        base: 'IE',
        'x-ua-compatible': 'IE=EmulateIE11'
      }
    },
    browsers: ['Chrome']
  });
};
