const path = require('path');

module.exports = {

  entry: [
    './popup/src/scripts/index.js'
  ],

  output: {
    filename: 'popup.js',
    path: path.join(__dirname, '../', 'build'),
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.json'],
    modules: ['node_modules'],
    alias: {
      actionbar:  path.resolve(__dirname, 'src/scripts/components/actionbar'),
      app:  path.resolve(__dirname, 'src/scripts/components/app'),
      button:  path.resolve(__dirname, 'src/scripts/components/button'),
      navbar:  path.resolve(__dirname, 'src/scripts/components/navbar'),
      searchbar:  path.resolve(__dirname, 'src/scripts/components/searchbar'),
      tab:  path.resolve(__dirname, 'src/scripts/components/tab'),
      window:  path.resolve(__dirname, 'src/scripts/components/window'),
    }
  },
  module: {
    loaders: [
      {
        test: /\.(jsx|js)?$/,
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
      },
      {
        test: /\.s?css$/,
        use: [
            'style-loader',
            'css-loader',
            'sass-loader'
        ]
      }
    ]
  }
  
};
