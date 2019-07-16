/* eslint-disable import/no-commonjs */

const {join} = require('path')

const CopyPlugin = require('copy-webpack-plugin')
const GitVersionPlugin = require('@eloquent/git-version-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const IconduitHtmlPlugin = require('@iconduit/html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const {CleanWebpackPlugin: CleanPlugin} = require('clean-webpack-plugin')
const {GenerateSW} = require('workbox-webpack-plugin')

const consumer = require('./assets/iconduit.consumer.js')

const {env: {TRAVIS_COMMIT: travisCommit}} = process
const version = travisCommit && travisCommit.substring(0, 7)

const srcPath = join(__dirname, 'src')
const manifestPath = join(__dirname, 'assets/site.iconduitmanifest')

module.exports = (_, {mode = 'development'} = {}) => {
  const isProduction = mode === 'production'
  const {manifest: {name}} = consumer

  const fileLoader = {
    loader: 'file-loader',
    options: {
      name: isProduction ? '[name].[hash].[ext]' : '[name].[ext]',
    },
  }

  return {
    mode,
    plugins: [
      new CleanPlugin(),
      new HtmlPlugin({
        template: 'src/index.html',
        title: name,
      }),
      new GitVersionPlugin({version}),
      new IconduitHtmlPlugin({manifestPath}),
      new GenerateSW({
        cleanupOutdatedCaches: true,
        exclude: [
          /\.map$/,
          /\bapple-touch-startup[^/]*\.png$/,
          /\bbrowserconfig[^/]*\.xml$/,
          /\bopen-graph[^/]*\.png$/,
          /\bsafari-mask-icon[^/]*\.svg$/,
          /\btwitter-card[^/]*\.png$/,
          /\bVERSION$/,
          /\bwindows-tile[^/]*\.png$/,
        ],
      }),
      new CopyPlugin([
        {
          from: consumer.absoluteImagePath('faviconIco', 'container'),
        },
      ]),
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
          include: [srcPath],
          use: [
            'babel-loader',
          ],
        },
        {
          test: /\.(png|svg)$/,
          use: [
            fileLoader,
          ],
        },
        {
          test: /(\.webmanifest|browserconfig\.xml)$/,
          use: [
            fileLoader,
            'app-manifest-loader',
          ],
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
