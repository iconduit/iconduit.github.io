const { join } = require("path");

const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const IconduitHtmlPlugin = require("@iconduit/html-webpack-plugin");
const { GenerateSW } = require("workbox-webpack-plugin");

const consumer = require("./assets/iconduit.consumer.js");

const srcPath = join(__dirname, "src");
const manifestPath = join(__dirname, "assets/site.iconduitmanifest");
const buildPath = join(__dirname, "artifacts/webpack/build");

module.exports = (_, { mode = "development" } = {}) => {
  const isProduction = mode === "production";
  const {
    manifest: { name },
  } = consumer;

  const networkFirstAssets = [
    /\bapple-touch-startup[^/]*\.png$/,
    /\bbrowserconfig[^/]*\.xml$/,
    /\bopen-graph[^/]*\.png$/,
    /\bsafari-mask-icon[^/]*\.svg$/,
    /\btwitter-card[^/]*\.png$/,
    /\bwindows-tile[^/]*\.png$/,
  ];

  const networkOnlyAssets = [/\bVERSION$/];

  const workboxExclude = [
    /\.map$/,
    ...networkFirstAssets,
    ...networkOnlyAssets,
  ];

  const workboxRuntimeCaching = [
    ...networkFirstAssets.map((urlPattern) => ({
      urlPattern,
      handler: "NetworkFirst",
    })),
    ...networkOnlyAssets.map((urlPattern) => ({
      urlPattern,
      handler: "NetworkOnly",
    })),
  ];

  return {
    mode,
    plugins: [
      new HtmlPlugin({
        template: "src/index.html",
        title: name,
      }),
      new IconduitHtmlPlugin({ manifestPath }),
      new GenerateSW({
        cacheId: "iconduit-website",
        cleanupOutdatedCaches: true,
        exclude: workboxExclude,
        runtimeCaching: workboxRuntimeCaching,
      }),
      new CopyPlugin({
        patterns: [
          {
            from: consumer.absoluteImagePath("faviconIco", "container"),
          },
        ],
      }),
    ],
    devtool: "source-map",
    output: {
      path: join(buildPath, isProduction ? "production" : "development"),
      filename: isProduction ? "[name].[contenthash].js" : "[name].js",
      assetModuleFilename: isProduction
        ? "[name].[contenthash][ext]"
        : "[name][ext]",
      publicPath: "/",
    },
    entry: {
      polyfill: "./src/polyfill.js",
      main: "./src/index.js",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: [srcPath],
          use: "babel-loader",
        },
        {
          test: /\.(png|svg)$/,
          type: "asset/resource",
        },
        {
          test: /\.webmanifest$/i,
          type: "asset/resource",
          use: "@iconduit/webmanifest-loader",
        },
        {
          test: /\/browserconfig\.xml$/i,
          type: "asset/resource",
          use: "@iconduit/browserconfig-loader",
        },
      ],
    },
    performance: {
      assetFilter(assetFilename) {
        if (/\.map$/.test(assetFilename)) return false;
        if (/^\./.test(assetFilename)) return false;

        return true;
      },
    },
    stats: {
      children: isProduction,
      entrypoints: isProduction,
      excludeAssets: isProduction ? () => false : /\.map$/,
      modules: isProduction,
    },
    devServer: {
      hot: true,
    },
  };
};
