import db from '../../../../db';
import jwt from 'next-auth/jwt';
import knexPostgis from 'knex-postgis';

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

  // @todo if not author, throw error

  const {
    title,
    description,
    intentions,
    outcomes,
    societal_change,
    start_date,
    end_date,
    category_id,
    geo,
    country,
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
      geo: geo ? st.geomFromGeoJSON(geo) : null,
      country,
      updated_at: new Date(),
      updated_by: author.id,
    })
    .where('id', project_id)
    .returning('*');

  res.status(200).json(project);
};
