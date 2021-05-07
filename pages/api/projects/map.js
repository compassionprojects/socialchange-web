import db from '../../../db';
const knexPostgis = require('knex-postgis');
const st = knexPostgis(db);

export const defaultFilters = {
  'project_statuses.code': 'published', // only fetch 'published' projects
};

export default async (req, res) => {
  const { category_id } = req.query;
  const filter = {
    ...defaultFilters,
  };

  if (category_id) filter.category_id = category_id;

  const projects = await db
    .select(['projects.id', 'title', st.asGeoJSON('geo')])
    .from('projects')
    .innerJoin('categories', 'projects.category_id', 'categories.id')
    .innerJoin(
      'project_statuses',
      'projects.project_status_id',
      'project_statuses.id'
    )
    .where(filter)
    .whereNotNull('projects.geo');

  res.status(200).json({ projects });
};
