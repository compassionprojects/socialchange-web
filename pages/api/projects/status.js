import { knex } from '../../../db/config';

export default async (req, res) => {
  const project_status = await knex.select('id', 'name').from('project_status');

  res.status(200).json(project_status);
};
