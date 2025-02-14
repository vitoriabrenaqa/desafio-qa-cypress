const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://maratona-discover-devfinance.netlify.app/',
    waitForAnimations: false,
    animationDistanceThreshold: 50,
    chromeWebSecurity: false,
    experimentalSessionAndOrigin: true,
    viewportWidth: 1366,
    viewportHeight: 768,
    defaultCommandTimeout: 10000,
    retries: {
      runMode: 2,
      openMode: 1
    },
    video: true
  },
});