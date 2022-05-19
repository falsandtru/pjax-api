module.exports = function (config) {
  config.set({
    browsers: ['Chrome', 'Firefox'],
    frameworks: ['mocha', 'power-assert'],
    files: [
      { pattern: 'dist/**/*.{js,map}', watched: true, served: true, included: true },
      { pattern: 'test/unit/fixture/**/*', watched: true, served: true, included: false },
      { pattern: 'test/integration/fixture/**/*.{html,css,js}', watched: true, served: true, included: false },
    ],
    reporters: ['dots', 'coverage'],
    preprocessors: {
      'dist/**/*.js': ['coverage'],
    },
    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type: 'html', subdir: browser => browser.split(/\s/)[0] },
        { type: 'text-summary', subdir: '.', file: 'summary.txt' },
      ],
    },
    browserDisconnectTimeout: 60 * 1e3,
    browserNoActivityTimeout: 90 * 1e3,
  });
};
