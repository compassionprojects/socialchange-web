const config = {
  use_env_variable: 'DATABASE_URL',
  migrationStorageTableName: 'migrations',
  seederStorageTableName: 'seed_data',
  dialect: 'postgres',
};

module.exports = {
  development: config,
  test: config,
  production: config,
};
