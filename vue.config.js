const { defineConfig } = require('@vue/cli-service')
const { devServerHost, devServerPort } = require('./atom.config')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: devServerHost,
    port: devServerPort
  }
})
