const dirptree = require('dirp-tree');

const server_file_tree = {
  name: 'server',
  files: ['server_config.js'],
  paths: [
    {
      name: 'data',
      files: ['data_config.js'],
      paths: [
        {
          name: 'models',
          files: ['models_index.js']
        },{
          name: 'collections',
          files: ['collections_index.js']
        },{
          name: 'utils',
          files: ['utils_index.js']
        },{
          name: 'db',
          files: ['collatio.sql']
        }
      ]
    },{
      name: 'router',
      files: ['router_config.js'],
      paths: [
        {
          name: 'utils',
          files: ['utils_index.js']
        }
      ]
    }
  ]
};

const client_file_tree = {
  name: 'public',
  files: ['index.html'],
  paths: [
    {
      name: 'assets'
    },{
      name: 'scss',
      files: ['stylesheet.scss']
    },{
      name: 'dist',
      files: ['build.log'],
      paths: [{name: 'js'},{name: 'css'},{name: 'src'}]
    },{
      name: 'jsx',
      files: ['public_index.jsx'],
      paths: [
        {
          name: 'components',
          files: ['comp_index.jsx']
        },{
          name: 'containers',
          files: ['cont_index.jsx']
        }, {
          name: 'state',
          files: ['state_index.jsx']
        },{
          name: 'utils',
          files: ['utils_index.jsx']
        }
      ]
    }
  ]
};

module.exports = {
  generate: dirptree,
  config: {
    name: 'app',
    files: ['index.js'],
    paths: [client_file_tree,server_file_tree]
  }
};