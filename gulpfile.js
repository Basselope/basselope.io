// task list & dependencies module for gulpfile.js
const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const args = require('yargs').argv;

const run = require('./gulp_modules/utils_index');
const web = require('./gulp_modules/config/web_config');
const src = require('./gulp_modules/config/src_config');

/* *
 * gulp init                | Uses 'dirp-tree' to build filetree structure;
 *                          | config located @ 'gulp_modules/config/dir_tree_config.js'
 *
 * @return {[vinyl-stream]} | allows chaining of tasks & indicates completion
 */
gulp.task('init', function() {
  return run.dirptree.generate(run.dirptree.config);
});

/* *
 * gulp lint-client         | Processes all client source files 'app/client/jsx' using ES-lint;
 *                          | config can be found in the '.eslintrc' file
 *
 * @return {[vinyl-stream]} | allows chaining of tasks & indicates completion
 */
gulp.task('lint-client', function() {
  return gulp.src(src.client.jsx.all)
    .pipe(run.changed(src.dest.js))
    .pipe(run.lint());
});

/* *
 * gulp lint-server         | Processes all server source files 'app/server' using ESlint;
 *                          | style and configuration can be found in the '.eslintrc' file
 *                          | in the project root-directory
 *
 * @return {[vinyl-stream]} | allows chaining of tasks & indicates completion
 */
gulp.task('lint-server', function() {
  return gulp.src(src.server.js.all)
    .pipe(run.changed(src.dest.js))
    .pipe(run.lint());
});

/* *
* gulp pack --env NAME     | Takes 'public_index.js' and builds client bundle using webpack;
*                          |
*                          | --env dev:
*                          | creates a source-map and initiates '.hotModuleReload()' which listens
*                          | for changes in client files and quickly rebuilds the bundle
*                          |
*                          | --env build:
*                          | uses tree shaking and uglification to build a compressed bundle for
*                          | production environment
*                          |
*                          | more info in config: 'gulp_modules/config/web_config.js'
* 
* @return {[vinyl-stream]} | allows chaining of tasks & indicates completion
 */
gulp.task('pack', function() {
  if(!(args.env in web.task))
    return console.error('No environment set, use: --env ENVIRONMENT_NAME');
  return gulp.src(src.client.index)
    .pipe(run.named())
    .pipe(web.pack(web.task[args.env]))
    .pipe(gulp.dest(src.dest.js));
});
 