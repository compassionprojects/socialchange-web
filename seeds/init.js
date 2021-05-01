exports.seed = function (knex) {
  return knex('project_statuses')
    .del()
    .then(function () {
      return knex('project_statuses').insert([
        {
          id: 1,
          code: 'draft',
          name: 'Draft',
        },
        {
          id: 2,
          code: 'published',
          name: 'Published',
        },
        {
          id: 3,
          code: 'review',
          name: 'Under Review',
        },
        {
          id: 4,
          code: 'archived',
          name: 'Archived',
        },
      ]);
    })
    .then(() =>
      knex('categories')
        .del()
        .then(function () {
          return knex('categories').insert([
            {
              id: 1,
              name: 'Education System',
              description: 'All about Educational institutions and schools',
            },
            {
              id: 2,
              name: 'Parenting',
              description: 'All about parenting and children',
            },
          ]);
        })
    );
};
