export const knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL,
});
