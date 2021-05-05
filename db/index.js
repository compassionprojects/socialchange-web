// In dev mode handle connection pool leaks
// https://github.com/knex/knex/issues/3788#issuecomment-618593990

let pg;
const knex = require('knex')(require('../knexfile'));

if (process.env.NODE_ENV === 'development') {
  global.__KNEX_DB__ = global.__KNEX_DB__ || knex;
  pg = global.__KNEX_DB__;
} else {
  pg = knex;
}

export default pg;
