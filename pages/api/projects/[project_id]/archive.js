import db from '../../../../db';
import elastic from '../../../../elastic';
import jwt from 'next-auth/jwt';

const secret = process.env.JWT_SECRET;
const signingKey = process.env.JWT_SIGNING_KEY;

// @todo add collaborators to project
// @todo get reason before archiving
// @todo add archived_by attribute

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

  const [project_status] = await db('project_statuses')
    .select(['id'])
    .where({ code: 'archived' });

  const [project] = await db('projects')
    .update({
      project_status_id: project_status.id,
      updated_at: new Date(),
      updated_by: author.id,
    })
    .where({ id: project_id, created_by: author.id }) // also authorize
    .returning('*');

  if (!project) return res.status(401).json({ error: 'Authorization error' });

  try {
    await elastic.delete({
      index: 'projects_index',
      id: project.id,
    });
  } catch (e) {
    console.log('Indexing error');
    console.log(e);
  }

  res.status(200).json(project);
};
