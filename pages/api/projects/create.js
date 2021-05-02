import db from '../../../db';
import jwt from 'next-auth/jwt';
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
      category_id,
      has_discussions,
      project_status_id: project_status.id,
      created_by: author.id,
      updated_by: author.id,
    })
    .returning('*');

  res.status(200).json(project);
};
