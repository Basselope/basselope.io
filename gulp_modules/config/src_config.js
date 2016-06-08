
const join = (...args) => [].concat(...args);

const dest = {
  js: 'app/public/dist/js',
  css: 'app/public/build/css'
};

const server = {
  index: ['app/index.js'],
  js: {
    index: ['app/index.js'],
    all: ['app/server/**/*.js']
  }
};

const client = {
  index: ['app/public/jsx/public_index.jsx'],
  jsx: {
    index: ['app/public/jsx/public_index.jsx'],
    all: ['app/public/jsx/**/*.jsx']
  },
  scss: {
    index: ['app/public/scss/style_index.scss'],
    all: ['app/public/scss/**/*.scss']
  }
};

module.exports = {
  join: join,
  dest: dest,
  server: server,
  client: client
};