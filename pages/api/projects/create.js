import db from '../../../db';
import elastic from '../../../elastic';
import jwt from 'next-auth/jwt';
import knexPostgis from 'knex-postgis';
import { mapCountry } from '../../../lib';

const st = knexPostgis(db);
const secret = process.env.JWT_SECRET;
const signingKey = process.env.JWT_SIGNING_KEY;

export default async (req, res) => {
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

  // @todo if not author, throw error

  const [project_status] = await db('project_statuses')
    .select(['id'])
    .where({ code: 'published' });

  const {
    title,
    description,
    intentions,
    outcomes,
    societal_change,
    start_date,
    end_date,
    category_id,
    has_discussions,
    geo,
    country,
  } = req.body;

  const [project] = await db('projects')
    .insert({
      title,
      description,
      intentions,
      outcomes,
      societal_change,
      start_date,
      end_date,
      geo: geo ? st.geomFromGeoJSON(geo) : null,
      country,
      category_id,
      has_discussions,
      project_status_id: project_status.id,
      created_by: author.id,
      updated_by: author.id,
    })
    .returning('*');

  try {
    const [category] = await db('categories')
      .select('name')
      .where('id', category_id);

    await elastic.index({
      index: 'projects_index',
      id: project.id,
      body: {
        id: project.id,
        title,
        description,
        intentions,
        outcomes,
        societal_change,
        created_at: project.created_at,
        author_name: author.name,
        author_id: author.id,
        category_id,
        category_name: category.name,
        country: mapCountry[country],
      },
    });
  } catch (e) {
    console.log('Indexing error');
    console.log(e);
  }

  res.status(200).json(project);
};
