import db, { batchUpdate } from '../../../../db';
import elastic from '../../../../elastic';
import jwt from 'next-auth/jwt';
import knexPostgis from 'knex-postgis';
import { mapCountry } from '../../../../lib';

const st = knexPostgis(db);
const secret = process.env.JWT_SECRET;
const signingKey = process.env.JWT_SIGNING_KEY;

export default async (req, res) => {
  const { project_id } = req.query;
  let token;
  try {
    token = await jwt.getToken({ req, secret, signingKey });
    if (!token) return res.status(401).json({ error: 'Not authenticated' });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ error: 'Not about to authorise' });
  }

  const [author] = await db('users')
    .select(['id'])
    .where({ email: token.email });

  const {
    title,
    description,
    intentions,
    outcomes,
    societal_change,
    start_date,
    end_date,
    category_id,
    // @todo how to go about having discussion forums etc?
    // perhaps introduce lock_discussions attribute if there are any that
    // exist so that they don't disappear just like that but only
    // disables users to post
    has_discussions,
    geo,
    country,
    website,
    num_people,
    followups,
  } = req.body;

  const [project] = await db('projects')
    .update({
      title,
      description,
      intentions,
      outcomes,
      societal_change,
      start_date,
      end_date,
      category_id,
      has_discussions,
      geo: geo ? st.geomFromGeoJSON(geo) : null,
      country,
      website,
      num_people,
      updated_at: new Date(),
      updated_by: author.id,
    })
    .where({ id: project_id, created_by: author.id }) // also authorize
    .returning('*');

  if (!project) return res.status(401).json({ error: 'Authorization error' });

  await batchUpdate(
    {
      table: 'followups',
      column: 'id',
      merge: ['title', 'description', 'date', 'updated_at'],
    },
    followups
      .filter((f) => !f.removed) // only update non deleted followups
      .map((f) => ({
        ...f,
        project_id,
        updated_at: new Date(),
        updated_by: author.id,
        created_by: author.id,
      }))
  );

  // delete followups that are marked to be removed
  await db('followups')
    .whereIn(
      'id',
      followups.filter((f) => f.removed).map((f) => f.id)
    )
    .del();

  try {
    const [category] = await db('categories')
      .select('name')
      .where('id', category_id);

    await elastic.update({
      index: 'projects_index',
      id: project.id,
      body: {
        doc: {
          title,
          description,
          intentions,
          outcomes,
          societal_change,
          category_id,
          category_name: category.name,
          country,
          country_name: mapCountry[country],
        },
      },
    });
  } catch (e) {
    console.log('Indexing error');
    console.log(e);
  }

  res.status(200).json(project);
};
