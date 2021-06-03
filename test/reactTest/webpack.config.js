const path = require('path');

module.exports = {
  mode: 'development',
  devServer: {
    contentBase: './src',
    compress: true,
    port: 9000
  }
};
