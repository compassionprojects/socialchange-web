exports.seed = function (knex) {
  const st = require('knex-postgis')(knex);

  return knex('users')
    .del()
    .then(() =>
      knex('users').insert([
        {
          id: 1,
          email: 'johndoe@example.com',
          name: 'John Doe',
        },
        {
          id: 2,
          email: 'mail@example.com',
          name: 'Jane Austin',
        },
      ])
    )
    .then(() =>
      knex('project_status')
        .del()
        .then(function () {
          return knex('project_status').insert([
            {
              id: 1,
              name: 'draft',
            },
            {
              id: 2,
              name: 'published',
            },
            {
              id: 3,
              name: 'under_review',
            },
            {
              id: 4,
              name: 'archived',
            },
          ]);
        })
    )
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
    )
    .then(() =>
      knex('projects')
        .del()
        .then(function () {
          return knex('projects').insert([
            {
              id: 1,
              title: 'NVC school in London',
              description:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
              intentions:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
              outcomes:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
              start_date: new Date(2020, 3, 2),
              end_date: null,
              geo: st.geomFromText('POINT(-0.09 51.505)'),
              num_people: 20,
              has_discussions: true,
              created_by: 1,
              updated_by: 1,
              category: 1,
              status: 2,
            },
          ]);
        })
    )
    .then(() =>
      knex('topics')
        .del()
        .then(function () {
          return knex('topics').insert([
            {
              id: 1,
              title: 'How did you get consent?',
              project: 1,
              created_by: 1,
              updated_by: 1,
            },
            {
              id: 2,
              title: 'How are people responding?',
              project: 1,
              created_by: 1,
              updated_by: 1,
            },
          ]);
        })
    )
    .then(() =>
      knex('followups')
        .del()
        .then(() =>
          knex('followups').insert([
            {
              id: 1,
              title: 'Update after a month',
              description:
                'Lorem ipsum dolar sit amet when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap',
              project: 1,
              date: new Date(2020, 6, 1),
              created_by: 1,
              updated_by: 1,
            },
          ])
        )
    )
    .then(() =>
      knex('posts')
        .del()
        .then(function () {
          return knex('posts').insert([
            {
              id: 1,
              post:
                'I can imagine it must have been really a difficult conversation. How did you go about getting consent?',
              topic: 1,
              created_by: 1,
              updated_by: 1,
            },
            {
              id: 2,
              post:
                'How did you even manage to mediate this? Wow! I am really amazed. Did you get the consent after phase 1?',
              topic: 1,
              created_by: 1,
              updated_by: 1,
            },
          ]);
        })
    );
};
