const path = require('path');
var SRC_DIR = path.join(__dirname, './client/src');
var DIST_DIR = path.join(__dirname, './client/public');

const config = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    path: DIST_DIR,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015'],
          plugins: [['transform-object-rest-spread', { useBuiltIns: true }]]
        }
      }
    ]
  }
};

module.exports = config;

// const path = require('path');

// const config = {
//   entry: './client/src/index.jsx',
//   output: {
//     path: path.resolve(__dirname, './client/public'),
//     filename: 'bundle.js'
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         loader: 'babel-loader',
//         exclude: /node_modules/
//       }
//     ]
//   }
// };

// module.exports = config;
