import db from '../../../db';

export default async (req, res) => {
  const [project_status] = await db('project_statuses')
    .select(['id'])
    .where({ code: 'published' });

  const [stats] = await db
    .select(
      db.countDistinct('country').as('num_countries'),
      db.count('projects.id').as('num_projects'),
      db('categories').count('*').as('num_categories')
    )
    .from('projects')
    .where('project_status_id', project_status.id);

  res.status(200).json(stats);
};
