import db from '../../../db';

export default async (req, res) => {
  const [project_status] = await db('project_statuses')
    .select('id')
    .where('code', 'published');

  const categories = await db
    .select([
      'categories.id',
      'categories.name',
      db.raw(
        `(
          select count(projects.id)
          from projects
          where projects.category_id = categories.id and projects.project_status_id = ${project_status.id}
        ) as count_projects`
      ),
    ])
    .from('categories')
    .innerJoin('projects', 'projects.category_id', 'categories.id')
    .where('projects.project_status_id', project_status.id)
    .groupBy('categories.id')
    .orderBy('categories.name')
    .havingRaw('count(categories.id) > 0');

  res.status(200).json(categories);
};
