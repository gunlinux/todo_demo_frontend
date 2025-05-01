const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '^/api': {
        target: `http://${process.env.VUE_APP_BACKEND_HOST}:${process.env.VUE_APP_BACKEND_PORT}`,
        ws: true,
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
});
