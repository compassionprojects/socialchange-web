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

export async function batchUpdate({ table, column, merge }, collection) {
  const trx = await pg.transaction();
  const queries = collection.map((tuple) =>
    pg(table).insert(tuple).onConflict(column).merge(merge).transacting(trx)
  );
  return Promise.all(queries).then(trx.commit).catch(trx.rollback);
}
