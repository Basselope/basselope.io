
module.exports = {
  git: require('gulp-git'),
  named: require('vinyl-named'),
  dirptree: require('./config/dir_tree_config'),
  changed: require('gulp-changed'),
  sequence: require('gulp-sequence'),
  nodemon: require('gulp-nodemon'),
  lint: require('gulp-eslint')
};


