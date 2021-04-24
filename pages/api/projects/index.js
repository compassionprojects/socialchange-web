// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { knex } from '../../../db/config';
const knexPostgis = require('knex-postgis');
const st = knexPostgis(knex);

export const defaultFilters = {
  'project_status.name': 'published', // only fetch 'published' projects
};

export default async (req, res) => {
  const { page, per_page, category_id } = req.query;
  const limit = parseInt(per_page, 10) || 15;
  const offset = (parseInt(page, 10) - 1 || 0) * limit;
  const filter = {
    ...defaultFilters,
  };

  if (category_id) filter.category = category_id;

  const projects = await knex
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
    .where(filter)
    .limit(limit)
    .offset(offset);

  const [count] = await knex('projects')
    .innerJoin('project_status', 'projects.status', 'project_status.id')
    .count('projects.id')
    .where(filter);

  res.status(200).json({ projects, ...count });
};
