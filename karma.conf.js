// Karma configuration
// Generated on Sun Apr 13 2014 02:27:06 GMT+0900 (東京 (標準時))

module.exports = function (config) {

  config.set({

    client: {
      args: [{
        jquery: process.env.jquery
      }]
    },


    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    customLaunchers: {
      IE11: {
        base: 'IE',
        'x-ua-compatible': 'IE=EmulateIE11'
      },
      IE10: {
        base: 'IE',
        'x-ua-compatible': 'IE=EmulateIE10'
      },
      IE9: {
        base: 'IE',
        'x-ua-compatible': 'IE=EmulateIE9'
      },
      IE8: {
        base: 'IE',
        'x-ua-compatible': 'IE=EmulateIE8'
      },
      PhantomJSB: {
        base: 'PhantomJS',
        flags: ['--remote-debugger-port=9000']
      }
    },


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai'],


    // list of files / patterns to load in the browser
    files: [
      // dependencies
      { pattern: 'test/env/*', watched: true, served: true, included: true },

      // fixtures
      { pattern: 'test/**.html', watched: true, served: true, included: false },
      { pattern: 'test/**/*.html', watched: true, served: true, included: false },
      { pattern: 'test/cov/*.js', watched: true, served: true, included: false },
      { pattern: 'test/fixture/img/*.*', watched: true, served: true, included: false },
      { pattern: 'test/fixture/js/*.js', watched: true, served: true, included: false },

      // files to test
      { pattern: 'test/unit/index.js', watched: true, served: true, included: true },
      { pattern: 'test/unit/*.js', watched: true, served: true, included: false }
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/*.html': ['html2js'],
      'test/cov/*.js': ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    //reporters: ['progress', 'coverage'],
    coverageReporter: {
      type: 'lcov', // lcov or lcovonly are required for generating lcov.info files
      dir: 'gh-pages/coverage'
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    //browsers: ['PhantomJS', 'Chrome', 'Firefox', 'IE'],
    browsers: ['PhantomJS', 'Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false

  });

};
