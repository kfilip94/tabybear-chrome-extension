const path = require('path');

module.exports = {

  entry: [
    './event/src/index.js'
  ],

  output: {
    filename: 'event.js',
    path: path.join(__dirname, '../', 'build')
  },

  resolve: {
    extensions: ['.js', '.json'],
    modules: ['node_modules'],
    alias: {
      chromeServices:  path.resolve(__dirname, 'src/chrome-services'),
      reducers:  path.resolve(__dirname, 'src/reducers'),
      requestActions:  path.resolve(__dirname, 'src/request-actions'),
      storage:  path.resolve(__dirname, '../', 'shared/storage')
    }
  },

  module: {
    loaders: [
      {
        test: /\.(js)?$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        include: path.join(__dirname, 'src'),
        query: {
          presets: ['es2015', 'react'],
          plugins: [
            'transform-class-properties',
            'transform-object-rest-spread'
          ]
        }
      }
    ]
  }
};
