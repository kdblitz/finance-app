const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const publicPath = '/' + (process.env.PUBLIC_PATH || '');
const DEFINITIONS = {
  PUBLIC_PATH: JSON.stringify(publicPath)
};

const plugins = [
  // new webpack.HotModuleReplacementPlugin(),
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    Popper: ['popper.js', 'default'],
  }),
  new CopyWebpackPlugin([{
    from: path.resolve(__dirname, 'public', 'manifest.json'),
    to: path.resolve(__dirname, 'build')
  },{
    from: path.resolve(__dirname, 'public', '*.png'),
    to: path.resolve(__dirname, 'build'),
    flatten: true
  }]),
  new HtmlWebpackPlugin({
    inject: true,
    template: path.resolve(__dirname, 'public', 'index.html')
  }),
  new webpack.DefinePlugin(DEFINITIONS)
];

if (process.env.NODE_ENV === 'production') {
  DEFINITIONS['process.env'] = {
    NODE_ENV: JSON.stringify('production')
  };
  plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = {
  entry: [
    // require.resolve('webpack')
    // require.resolve('./polyfills'),
    './src'
  ],
  devtool: 'cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx']
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        oneOf: [
          {
            test: /\.(js|jsx)$/,
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: false,
              presets: ["env", "react"],
              cacheDirectory: true
            }
          },
          {
            test: /\.(eot|otf|woff|woff2|svg|ttf)([\?]?.*)$/,
            loader: 'file-loader'
          },
          {
            test: /\.css$/,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1
                }
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9'
                      ],
                      flexbox: 'no-2009'
                    })
                  ]
                }
              }
            ]
          }
        ]
      }
    ]
  },
  plugins
}
