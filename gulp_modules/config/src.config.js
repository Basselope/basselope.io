const merge = (...args) => [].concat(...args);

const server = {
  root: 'app/server',
  index: ['app/index.js'],
  js: {
    index: ['app/index.js'],
    all: ['app/server/**/*.js']
  },
  ignore: ['app/server/data/db']
};

const public = {
  root: 'app/client',
  index: ['app/public/jsx/public_index.jsx'],
  jsx: {
    index: ['app/public/jsx/public_index.jsx'],
    all: ['app/public/jsx/**/*.jsx']
  },
  scss: {
    index: ['app/public/scss/style_index.scss'],
    all: ['app/public/scss/**/*.scss']
  },
  ignore: ['app/public/dist']
};

const app = {
  root: 'app',
  index: ['app/index.js'],
  all: merge(server.js.all, public.jsx.all),
  ignore: merge(server.ignore, public.ignore)
};

const dest = {
  root: 'app/public/dist',
  js: 'app/public/dist/js',
  css: 'app/public/build/css'
};

module.exports = {
  merge: merge,
  app: app,
  dest: dest,
  server: server,
  public: public
};