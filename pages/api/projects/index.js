import db from '../../../db';
const knexPostgis = require('knex-postgis');
const st = knexPostgis(db);

export const defaultFilters = {
  'project_statuses.code': 'published', // only fetch 'published' projects
};

export default async (req, res) => {
  const { page, per_page, category_id, author_id } = req.query;
  const limit = parseInt(per_page, 10) || 15;
  const offset = (parseInt(page, 10) - 1 || 0) * limit;

  const filters = {};
  if (author_id) filters['projects.created_by'] = author_id;
  const filter = {
    ...defaultFilters,
    ...filters,
  };

  if (category_id) filter.category_id = category_id;

  const projects = await db
    .select([
      'projects.id',
      'title',
      'projects.description',
      'categories.name as category_name',
      'category_id',
      'country',
      st.asGeoJSON('geo'),
      'users.name as author_name',
      'users.id as author_id',
      'projects.created_at',
      'num_people',
      'start_date',
      'end_date',
      'has_discussions',
      'project_status_id',
    ])
    .from('projects')
    .innerJoin('categories', 'projects.category_id', 'categories.id')
    .innerJoin('users', 'projects.created_by', 'users.id')
    .innerJoin(
      'project_statuses',
      'projects.project_status_id',
      'project_statuses.id'
    )
    .where(filter)
    .orderBy('created_at', 'desc')
    .limit(limit)
    .offset(offset);

  const [count] = await db('projects')
    .innerJoin(
      'project_statuses',
      'projects.project_status_id',
      'project_statuses.id'
    )
    .count('projects.id')
    .where(filter);

  res.status(200).json({ projects, ...count });
};
