// configuration of webpack-gulp tasks, required by utils_config
const wp = {};

wp.pack = require('webpack-stream'),
wp.import = require('webpack-load-plugins')();

wp.loaders = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader'
  }
];

wp.plugins = {
  dev: [
    new wp.pack.webpack.HotModuleReplacementPlugin(),
    new wp.pack.webpack.ProgressPlugin(function(p,m) {})
  ],
  build: [
    new wp.pack.webpack.optimize.DedupePlugin(),
    new wp.pack.webpack.optimize.UglifyJsPlugin(),
    new wp.pack.webpack.ProgressPlugin(function(p,m) {})
  ]
};


module.exports = wp;


// wp.pack_plugins({
//   pattern: ['*-webpack-plugin','@*/*-webpack-plugin'], // the glob(s) to search for 
//   config: 'package.json', // where to find the plugins, by default searched up from process.cwd() 
//   scope: ['dependencies', 'devDependencies', 'peerDependencies'], // which keys in the config to look within 
//   replaceString: /-webpack-plugin$/, // what to remove from the name of the module when adding it to the context 
//   camelize: true, // if true, transforms hyphenated plugins names to camel case 
//   lazy: true, // whether the plugins should be lazy loaded on demand 
//   rename: {}, // a mapping of plugins to rename 
//   renameFn: function (name) { ... } // a function to handle the renaming of plugins (the default works) 
// });