import { knex } from '../../../db/config';

export default async (req, res) => {
  const project_statuses = await knex
    .select('id', 'name')
    .from('project_statuses');

  res.status(200).json(project_statuses);
};
