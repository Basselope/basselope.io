// task list & dependencies module for gulpfile.js
const fs = require('fs');
const path = require('path');
const gulp = require('gulp');

const run = require('./gulp_modules/utils_index');

gulp.task('init', function() {
  return run.dirptree.generate(run.dirptree.config);
});

gulp.task('dev', function() {
  return gulp.src('app/public/js/public_index.js')
    .pipe(run.named())
    .pipe(run.web.pack({
      watch: true,
      devtool: 'source-map',
      plugins: run.web.plugins.dev,
      module: {
        loaders: run.web.loaders
      }
    },null,function(err,stats) {
      // console.log(stats);
    })).pipe(gulp.dest('app/public/dist/js'));
});


gulp.task('build', function() {
  return gulp.src('app/public/js/public_index.js')
    .pipe(run.named())
      .pipe(run.web.pack({
        watch: false,
        devtool: 'source-map',
        plugins: run.web.plugins.build,
        module: {
        loaders: run.web.loaders
      }
    },null,function(err,stats) {
      // completion status
    })).pipe(gulp.dest('app/public/dist/js'));
});

 