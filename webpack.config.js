/* eslint-disable import/no-commonjs */

const {join} = require('path')

const GitVersionPlugin = require('@eloquent/git-version-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const {CleanWebpackPlugin: CleanPlugin} = require('clean-webpack-plugin')

const {env: {TRAVIS_COMMIT: travisCommit}} = process
const version = travisCommit && travisCommit.substring(0, 7)

const srcPath = join(__dirname, 'src')

module.exports = (_, {mode = 'development'} = {}) => {
  const isProduction = mode === 'production'

  return {
    mode,
    plugins: [
      new CleanPlugin(),
      new HtmlPlugin(),
      new GitVersionPlugin({version}),
    ],
    devtool: 'source-map',
    output: {
      filename: isProduction ? '[name].[contenthash].js' : '[name].js',
      publicPath: '/',
    },
    entry: {
      polyfill: './src/polyfill.js',
      main: './src/index.js',
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          include: [srcPath],
        },
      ],
    },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendors: {
            name: 'vendors',
            test: /[\\/]node_modules[\\/]/,
            enforce: true,
          },
          default: false,
        },
      },
      minimizer: [
        new TerserPlugin({
          sourceMap: true,
          terserOptions: {
            compress: {
              defaults: false,

              // needed to convince react-devtools that we're using a production build
              conditionals: true,
              dead_code: true,
              evaluate: true,
            },
          },
        }),
      ],
    },
    stats: {
      children: isProduction,
      entrypoints: isProduction,
      excludeAssets: isProduction ? () => false : /\.map$/,
      modules: isProduction,
    },
  }
}
