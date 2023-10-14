module.exports = {
  plugins: ["@babel/plugin-syntax-dynamic-import"],
  presets: [
    [
      "@babel/preset-env",
      {
        corejs: 3,
        useBuiltIns: "entry",
      },
    ],
    [
      "@babel/preset-react",
      {
        runtime: "automatic",
      },
    ],
  ],
  env: {
    test: {
      plugins: ["babel-plugin-istanbul"],
    },
  },
};
