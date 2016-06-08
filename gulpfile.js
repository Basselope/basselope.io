// task list & dependencies module for gulpfile.js
const fs = require('fs');
const path = require('path');
const gulp = require('gulp');

const run = require('./gulp_modules/utils_index');
const web = require('./gulp_modules/config/web_config');

gulp.task('init', function() {
  return run.dirptree.generate(run.dirptree.config);
});


/* *
* {[gulp-task]} 'pack-dev' | Takes 'public_index.js' and builds client bundle using webpack;
*                          | creates a source-map and initiates '.hotModuleReload()' which listens
*                          | for changes in client files and quickly rebuilds the bundle
* 
* @return {[vinyl-stream]} | allows data to be operated on after webpack completes work
 */
gulp.task('pack-dev', function() {
  return gulp.src('app/public/jsx/public_index.jsx')
    .pipe(run.named())
    .pipe(web.pack(web.task.dev))
    .pipe(gulp.dest('app/public/dist/js/dev'));
});

/* *
 * {[gulp-task]} 'pack-dist' | Takes 'public_index.js' and builds client bundle using webpack;
 *                           | uses tree-shaking and uglification to create a production-
 *                           | ready file for deployment.
 * 
 * @return {[vinyl-stream]} | allows data to be operated on after webpack completes work
 */
gulp.task('pack-build', function() {
  return gulp.src('app/public/jsx/public_index.jsx')
    .pipe(run.named())
    .pipe(web.pack(web.task.build))
    .pipe(gulp.dest('app/public/dist/js'));
});

 