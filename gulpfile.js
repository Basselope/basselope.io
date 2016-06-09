// task list & dependencies module for gulpfile.js
const fs = require('fs');
const gulp = require('gulp');
const args = require('yargs').argv;

const run = require('./gulp_modules/utils_index');
const web = require('./gulp_modules/config/web.config');
const src = require('./gulp_modules/config/src.config');

const ARG_DIR = args.dir;
const ARG_ENV = args.env;

// work directory & source glob from '--dir ...' which defaults to entire app
const ENV_DIR = (ARG_DIR && ARG_DIR in src) ? src[ARG_DIR].root : src.app.root;
const ENV_SRC = (ARG_DIR && ENV_DIR in src) ? src[ARG_DIR].all : src.app.all;
// pack.task set according to '--env ...' which defaults to 'dev'
const ENV_WPT = (ARG_ENV && ARG_ENV in web.task) ? web.task[ARG_ENV] : web.task.dev;
console.log(ENV_DIR);

/* * * * * * * * * * * * * * | Uses 'dirp-tree' to build filetree structure;
 * gulp init                 | config located @ 'gulp_modules/config/dirptree.config.js'
 * * * * * * * * * * * * * * |/
 * @return {[undefined]}
  */
gulp.task('init', function() {
  return run.dirptree.generate(run.dirptree.config);
});

/* * * * * * * * * * * * * * | Launches application & runs according to arguments;
 * gulp launch ...           | refer to tasks below for optional arguments
 * * * * * * * * * * * * * * |/
 * @return {[stream]}
 */
gulp.task('launch', ['lint','pack'], function() {
  return run.nodemon({
    watch: ENV_DIR,
    ignore: src.app.ignore,
    ext: 'js jsx html scss',
    tasks: ['lint','pack']
  });
});

/* * * * * * * * * * * * * * | Linting with ES-Lint using 'airbnb-react'
 * gulp lint ...             |_
 *           --dir app    -> |# source & diff against 'app' [default]
 *           --dir public -> |# "        ...        " 'app/public'
 *           --dir server -> |# "        ...        " 'app/server'
 * * * * * * * * * * * * * * |/
 * @return {[vinyl-stream]}
  */
gulp.task('lint', function() {
  return gulp.src(ENV_SRC)
    .pipe(run.changed(ENV_DIR))
    .pipe(run.lint());
});

/* * * * * * * * * * * * * * | WebPack tasks; config @ 'gulp_modules/config/web.config.js'
 * gulp pack ...             |_
 *           --env dev    -> |# default value; source-maps & runs hot-reloading
 *           --env deploy -> |# tree-shakes & uglifies source to produce compressed
 * * * * * * * * * * * * * * |/
 * @return {[stream]}
  */
gulp.task('pack', function() {
  return gulp.src(src.public.index)
    .pipe(run.named())
    .pipe(web.pack(ENV_WPT))
    .pipe(gulp.dest(src.dest.js));
});
 