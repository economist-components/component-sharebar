module.exports = function(config) {
  const browsers = {
    SauceChromeLatest: {
      base: 'SauceLabs',
      browserName: 'Chrome',
    },
    SauceFirefoxLatest: {
      base: 'SauceLabs',
      browserName: 'Firefox',
    },
    SauceSafariLatest: {
      base: 'SauceLabs',
      browserName: 'Safari',
    },
    SauceInternetExplorerLatest: {
      base: 'SauceLabs',
      browserName: 'Internet Explorer',
    },
    SauceEdgeLatest: {
      base: 'SauceLabs',
      browserName: 'MicrosoftEdge',
    },
    SauceIphoneLatest: {
      base: 'SauceLabs',
      browserName: 'iPad',
    },
    SauceAndroidLatest: {
      base: 'SauceLabs',
      browserName: 'Android',
    },
  };
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
      require.resolve('chai-spies/chai-spies'),
      require.resolve('chai-things/lib/chai-things'),
      'testbundle.js'
    ],
    exclude: [
    ],
    preprocessors: {
    },
    reporters: ['progress', 'saucelabs'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    customLaunchers: browsers,
    browserDisconnectTimeout: 1000 * 60 * 2,
    browserNoActivityTimeout: 1000 * 60 * 2,
    sauceLabs: {
      testName: require('./package').name,
      startConnect: true,
      build: (function () {
        if (process.env.GO_PIPELINE_NAME && process.env.GO_PIPELINE_LABEL) {
          return process.env.GO_PIPELINE_NAME + '-' + process.env.GO_PIPELINE_LABEL;
        }
        return 'localbuild-' + new Date().toJSON();
      })(),
    },
    browsers: Object.keys(browsers),
    singleRun: true
  })
}
