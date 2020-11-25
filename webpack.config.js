const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDevelopment = process.env.NODE_ENV == 'development';
console.log(isDevelopment);
console.log(process.env.NODE_ENV);

var config = {
  entry: "./app.js",
  output: {
    filename: "bundle.js"
  },
  devServer: {
    contentBase: './dist',
    watchContentBase: true,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.js', 'jsx']
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: isDevelopment? '[name].css' : '[name].[hash].css',
      chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
    })
  ]

};

module.exports = (env, argv) => {
  
  if (argv.mode === 'development') {
    config.devtool = 'source-map';
    config.mode = 'development';
  }

  if (argv.mode === 'production') {
    config.mode = 'production';
  }

  return config;
};

