exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION if not exists postgis')
    .createTable('users', function (table) {
      table.increments('id').primary();
      table.string('email', 255).unique().notNullable();
      table.timestamp('email_verified', { useTz: true });
      table.string('name', 100);
      table.text('image');
      table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
      table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
    })
    .createTable('categories', function (table) {
      table.increments('id').primary();
      table.string('name', 100).notNullable();
      table.string('description', 255);
      table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
      table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
    })
    .createTable('project_statuses', function (table) {
      table.increments('id').primary();
      table.string('name', 30).notNullable();
      table.string('code', 30).unique().notNullable();
      table.string('description', 255);
      table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
      table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
    })
    .createTable('projects', function (table) {
      table.increments('id').primary();
      table.string('title', 140).notNullable();
      table.text('description').notNullable();
      table.text('intentions');
      table.text('outcomes');
      table.text('societal_change');
      table
        .integer('category_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('categories');
      table
        .integer('project_status_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('project_statuses');
      table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
      table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
      table.date('start_date');
      table.date('end_date');
      table.specificType('geo', 'geography(POINT,4326)');
      table.integer('num_people');
      table.boolean('has_discussions').notNullable().defaultTo(false);
      table
        .integer('created_by')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users');
      table
        .integer('updated_by')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users');

      table.index('geo', 'projects_geo_idx', 'gist');
    })
    .createTable('topics', function (table) {
      table.increments('id').primary();
      table.string('title', 255).notNullable();
      table
        .integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects');

      table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
      table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
      table
        .integer('created_by')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users');
      table
        .integer('updated_by')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users');
    })
    .createTable('posts', function (table) {
      table.increments('id').primary();
      table.text('post').notNullable();
      table
        .integer('topic_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('topics');

      table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
      table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
      table
        .integer('created_by')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users');
      table
        .integer('updated_by')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users');
    })
    .createTable('followups', function (table) {
      table.increments('id').primary();
      table.string('title', 140).notNullable();
      table.text('description').notNullable();
      table.date('date').notNullable();
      table
        .integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects');

      table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
      table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
      table
        .integer('created_by')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users');
      table
        .integer('updated_by')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users');
    })
    .createTable('verification_requests', function (table) {
      table.increments('id').primary();
      table.string('identifier').notNullable();
      table.string('token').notNullable();
      table.timestamp('expires', { useTz: true }).notNullable();
      table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
      table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
    })
    .createTable('sessions', function (table) {
      table.increments('id').primary();
      table.integer('user_id').notNullable().references('id').inTable('users');
      table.string('session_token').notNullable();
      table.string('access_token').notNullable();
      table.timestamp('expires', { useTz: true }).notNullable();
      table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
      table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable('followups')
    .dropTable('posts')
    .dropTable('topics')
    .dropTable('projects')
    .dropTable('project_statuses')
    .dropTable('categories')
    .dropTable('sessions')
    .dropTable('users')
    .dropTable('verification_requests');
};
