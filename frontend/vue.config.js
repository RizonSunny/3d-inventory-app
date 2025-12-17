module.exports = {
    devServer: {
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API_URL || 'http://localhost:3000',
        changeOrigin: true,
        ws: true  // Optional, for websockets if needed later
      }
    }
  },
  lintOnSave: false
}