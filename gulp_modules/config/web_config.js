// configuration of webpack-gulp tasks, required by utils_config
const web = {};

web.pack = require('webpack-stream');
web.import = require('webpack-load-plugins')();

// web.log = {
//   progress: new web.pack.webpack.ProgressPlugin(function(p, m) { console.log(p); }),
//   complete: function(status) { console.log(status); }
// }

web.loaders = [
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'babel-loader'
  },{
    test: require.resolve('snapsvg'),
    loader: 'imports?this=>window'
  }
];

web.plugins = {
  dev: [
    new web.pack.webpack.HotModuleReplacementPlugin(),
  ],
  build: [
    new web.pack.webpack.optimize.DedupePlugin(),
    new web.pack.webpack.optimize.UglifyJsPlugin()
  ],
  deploy: []
};

web.task = {
  dev: {
    watch: true,
    devtool: 'source-map',
    plugins: web.plugins.dev,
    module: { loaders: web.loaders }
  },
  build: {
    watch: false,
    devtool: 'source-map',
    plugins: web.plugins.build,
    module: { loaders: web.loaders }
  },
  deploy: {}
};


module.exports = web;


// web.pack_plugins({
//   pattern: ['*-webpack-plugin','@*/*-webpack-plugin'], // the glob(s) to search for 
//   config: 'package.json', // where to find the plugins, by default searched up from process.cwd() 
//   scope: ['dependencies', 'devDependencies', 'peerDependencies'], // which keys in the config to look within 
//   replaceString: /-webpack-plugin$/, // what to remove from the name of the module when adding it to the context 
//   camelize: true, // if true, transforms hyphenated plugins names to camel case 
//   lazy: true, // whether the plugins should be lazy loaded on demand 
//   rename: {}, // a mapping of plugins to rename 
//   renameFn: function (name) { ... } // a function to handle the renaming of plugins (the default works) 
// });