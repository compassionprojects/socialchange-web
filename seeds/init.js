exports.seed = async function (knex) {
  const st = require('knex-postgis')(knex);
  const elastic = require('../elastic');
  try {
    await elastic.delete({
      id: 1,
      index: 'projects_index',
    });
  } catch (e) {
    console.log('Cant delete indexes');
    console.log(e);
  }

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
          const title = 'NVC school in London';
          const description =
            'Chapman Flack, in reviewing a training video by Rosenberg, finds the presentation of key ideas "spell-binding" and the anecdotes "humbling and inspiring", notes the "beauty of his work", and his "adroitly doing fine attentive thinking" when interacting with his audience. Yet Flack wonders what to make of aspects of Rosenberg\'s presentation, such as his apparent "dim view of the place for thinking" and his building on Walter Wink\'s account of the origins of our way of thinking. To Flack, some elements of what Rosenberg says seem like pat answers at odds with the challenging and complex picture of human nature, history, literature, and art offer.[34]';
          const intentions =
            'Flack notes a distinction between the "strong sense" of Nonviolent Communication as a virtue that is possible with care and attention, and the "weak sense," a mimicry of this born of ego and haste. The strong sense offers a language to examine one\'s thinking and actions, support understanding, bring one\'s best to the community, and honor one\'s emotions. In the weak sense, one may take the language as rules and use these to score debating points, label others for political gain, or insist that others express themselves in this way. Though concerned that some of what Rosenberg says could lead to the weak sense, Flack sees evidence confirming that Rosenberg understands the strong sense in practice. Rosenberg\'s work with workshop attendees demonstrates "the real thing." Yet Flack warns that "the temptation of the weak sense will not be absent." As an antidote, Flack advises, "Be conservative in what you do, be liberal in what you accept from others," (also known as the robustness principle) and guard against the "metamorphosis of nonviolent communication into subtle violence done in its name."[34]';
          const outcomes =
            "Marion Little examines theoretical frameworks related to NVC. The influential interest-based model for conflict resolution, negotiation, and mediation developed by Fisher, Ury, and Patton at the Harvard Negotiation Project and at the Program on Negotiation in the 1980s appears to have some conceptual overlap with NVC, although neither model references the other.[9]:31–35 Little suggests The Gordon Model for Effective Relationships (1970) as a likely precursor to both NVC and interest-based negotiation, based on conceptual similarities, if not any direct evidence of a connection.[9]:35–41 Like Rosenberg, Gordon had worked with Carl Rogers, so the models' similarities may reflect common influences.[9]:35";
          return knex('projects')
            .insert([
              {
                id: 1,
                title,
                description,
                intentions,
                outcomes,
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
            ])
            .then(() =>
              elastic
                .index({
                  index: 'projects_index',
                  id: 1,
                  body: {
                    id: 1,
                    title,
                    description,
                    intentions,
                    outcomes,
                  },
                })
                .catch((e) => console.log(e.meta.body.error))
            );
        })
    )
    .then(() =>
      knex('topics')
        .del()
        .then(function () {
          return knex('topics')
            .insert([
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
            ])
            .then(() =>
              elastic
                .index({
                  index: 'projects_index',
                  id: 1,
                  body: {
                    topics: [
                      { topic: 'How did you get consent?' },
                      { topic: 'How are people responding?' },
                    ],
                  },
                })
                .catch((e) => console.log(e.meta.body.error))
            );
        })
    )
    .then(() =>
      knex('followups')
        .del()
        .then(() =>
          knex('followups')
            .insert([
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
            .then(() =>
              elastic
                .index({
                  index: 'projects_index',
                  id: 1,
                  body: {
                    followups: [
                      {
                        title: 'Update after a month',
                        description:
                          'Lorem ipsum dolar sit amet when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap',
                      },
                    ],
                  },
                })
                .catch((e) => console.log(e.meta.body.error))
            )
        )
    )
    .then(() =>
      knex('posts')
        .del()
        .then(function () {
          return knex('posts')
            .insert([
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
            ])
            .then(() =>
              elastic
                .index({
                  index: 'projects_index',
                  id: 1,
                  body: {
                    posts: [
                      {
                        post:
                          'I can imagine it must have been really a difficult conversation. How did you go about getting consent?',
                      },
                      {
                        post:
                          'How did you even manage to mediate this? Wow! I am really amazed. Did you get the consent after phase 1?',
                      },
                    ],
                  },
                })
                .catch((e) => console.log(e.meta.body.error))
            );
        })
    );
};
