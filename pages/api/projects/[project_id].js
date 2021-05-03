import db from '../../../db';
import { defaultFilters } from './index';
const knexPostgis = require('knex-postgis');
const st = knexPostgis(db);

export default async (req, res) => {
  const { project_id } = req.query;
  const filter = {
    ...defaultFilters,
    'projects.id': project_id,
  };

  const [project] = await db
    .select([
      'projects.id',
      'title',
      'projects.description',
      'intentions',
      'outcomes',
      'societal_change',
      'categories.name as category_name',
      'category_id',
      'country',
      'users.name as author_name',
      'users.id as author_id',
      'projects.created_at',
      st.asGeoJSON('geo'),
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
    .where(filter);

  res.status(200).json(project);
};
