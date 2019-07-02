const GitVersionPlugin = require('@eloquent/git-version-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')

const {env: {TRAVIS_COMMIT: travisCommit}} = process
const version = travisCommit && travisCommit.substring(0, 7)

module.exports = (_, {mode = 'development'} = {}) => {
  // const isProduction = mode === 'production'

  return {
    mode,
    plugins: [
      new HtmlPlugin(),
      new GitVersionPlugin({version}),
    ],
  }
}
