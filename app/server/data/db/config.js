const path = require('path');
const db = require('knex')({
  client: 'pg',
  connection: {
    host     : 'http://localhost:8080/',
    user     : 'basselope',
    password : 'collatio',
    database : 'basselopedb',
    charset  : 'utf8',
    filename: path.join(__dirname, 'basselope.sql')
  }
});

db.schema.hasTable('users').then(exists => {
  if (!exists) {
    db.schema.createTable('users', user => {
      user.increments('id').primary();
      user.string('username', 100).unique();
      user.string('password', 100);
      user.timestamps();
    }).then(() => console.log('Created users table'));
  }
});

const bookshelf = require('bookshelf')(db);
module.exports = bookshelf;