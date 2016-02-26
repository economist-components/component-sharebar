const packageJson = require('./package.json');
const path = require('path');
const oneSecondInMilliseconds = 1000;
const oneMinuteInSeconds = 60;
const twoMinutesInMilliseconds = oneSecondInMilliseconds * oneMinuteInSeconds * 2;
function configureBuildValue() {
  /* eslint-disable prefer-template */
  if (process.env.GO_PIPELINE_NAME && process.env.GO_PIPELINE_LABEL) {
    return process.env.GO_PIPELINE_NAME + '-' + process.env.GO_PIPELINE_LABEL;
  }
  return 'localbuild-' + new Date().toJSON();
  /* eslint-enable prefer-template */
}
module.exports = function configureKarma(config) {
  const localBrowsers = [
    'PhantomJS',
  ];
  const sauceLabsBrowsers = {
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
    SauceAndroidLatest: {
      base: 'SauceLabs',
      browserName: 'Android',
    },
  };
  config.set({
    basePath: '',
    browsers: localBrowsers,
    logLevel: config.LOG_INFO,
    frameworks: [ 'mocha' ],
    files: [
      path.join(packageJson.directories.site, 'bundle.js'),
    ],
    exclude: [],
    preprocessors: {},
    reporters: [ 'mocha' ],
    port: 9876,
    colors: true,
    concurrency: 3,
    autoWatch: false,
    captureTimeout: twoMinutesInMilliseconds,
    browserDisconnectTimeout: twoMinutesInMilliseconds,
    browserNoActivityTimeout: twoMinutesInMilliseconds,
    singleRun: true,
  });

  if (process.env.SAUCE_ACCESS_KEY && process.env.SAUCE_USERNAME) {
    config.reporters.push('saucelabs');
    config.set({
      customLaunchers: sauceLabsBrowsers,
      browsers: Object.keys(sauceLabsBrowsers),
      sauceLabs: {
        testName: packageJson.name,
        recordVideo: true,
        startConnect: true,
        build: configureBuildValue(),
      },
    });
  }
};
