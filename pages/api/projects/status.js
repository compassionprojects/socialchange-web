import db from '../../../db';

export default async (req, res) => {
  const project_statuses = await db
    .select('id', 'name')
    .from('project_statuses');

  res.status(200).json(project_statuses);
};
