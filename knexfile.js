// Update with your config settings.

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config(
    require('path').resolve(process.cwd(), '.env.local')
  );
}

module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
};
