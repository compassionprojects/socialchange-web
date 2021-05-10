exports.up = function (knex) {
  return knex.schema.table('projects', function (table) {
    table.string('website');
    return table;
  });
};

exports.down = function (knex) {
  return knex.schema.table('projects', function (table) {
    table.dropColumn('website');
    return table;
  });
};
