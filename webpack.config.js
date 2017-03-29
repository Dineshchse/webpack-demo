const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  app: path.join(__dirname, './app/index.js'),
  build: path.join(__dirname, 'build'),
};

// module.exports = {
//   // Entries have to resolve to files! They rely on Node
//   // convention by default so if a directory contains *index.js*,
//   // it resolves to that.
//   entry: {
//     app: PATHS.app,
//   },
//   output: {
//     path: PATHS.build,
//     filename: '[name].js',
//     //publicPath: path.resolve(__dirname, "build")
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       title: 'Webpack demo',
//       template:path.resolve(__dirname, "./app/index.html")
//     }),
//   ],
// };

// const commonConfig = {

//   entry: {
//     app: PATHS.app,
//   },
//   output: {
//     path: PATHS.build,
//     filename: '[name].js',
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       title: 'Webpack demo',
//       template:path.resolve(__dirname, "./app/index.html")
//     }),
//   ],
// };


// module.exports = (env) => {
//   console.log('env:-', env);

//   return commonConfig;
// };



const commonConfig = {

  entry: {
    app: PATHS.app,
  },
  output: {
    path: PATHS.build,
    filename: '[name].js',
  },
  module:{
    rules:[
      {test: /\.js$/, use: 'babel-loader',exclude: ['node_modules']},
      {test: /\.css$/, use: ['style-loader', 'css-loader']}
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack demo',
      template:path.resolve(__dirname, './app/index.html')
    }),
  ],
};
const productionConfig = () => commonConfig;

const developmentConfig = () => {

  
  const config = {
    devServer: {
      // Enable history API fallback so HTML5 History API based
      // routing works. Good for complex setups.
      historyApiFallback: true,

      // Display only errors to reduce the amount of output.
      stats: 'errors-only',
      open:true,

      // Parse host and port from env to allow customization.
      //
      // If you use Docker, Vagrant or Cloud9, set
      // host: options.host || '0.0.0.0';
      //
      // 0.0.0.0 is available to all network devices
      // unlike default `localhost`.
      host: process.env.HOST, // Defaults to `localhost`
      port: process.env.PORT, // Defaults to 8080
    },
  };

  return Object.assign(
    {},
    commonConfig,
    config
  );
};

module.exports = (env) => {
  console.log(env);
  if (env === 'production') {
    return productionConfig();
  }

  return developmentConfig();

};