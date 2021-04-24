// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { knex } from '../../../db/config';
import { defaultFilters } from './index';
const knexPostgis = require('knex-postgis');
const st = knexPostgis(knex);

export default async (req, res) => {
  const { project_id } = req.query;
  const filter = {
    ...defaultFilters,
    'projects.id': project_id,
  };

  const [project] = await knex
    .select([
      'projects.id',
      'title',
      'projects.description',
      'intentions',
      'outcomes',
      'societal_change',
      'categories.name as category_name',
      'categories.id as category_id',
      'users.name as author_name',
      'projects.created_at',
      st.asGeoJSON('geo'),
      'num_people',
      'start_date',
      'end_date',
      'has_discussions',
      'status',
    ])
    .from('projects')
    .innerJoin('categories', 'projects.category', 'categories.id')
    .innerJoin('users', 'projects.created_by', 'users.id')
    .innerJoin('project_status', 'projects.status', 'project_status.id')
    .where(filter);

  res.status(200).json(project);
};
