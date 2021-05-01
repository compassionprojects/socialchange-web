// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import db from '../../../db';

export default async (req, res) => {
  const categories = await db
    .select([
      'categories.id',
      'categories.name',
      db.raw(
        `(
          select count(projects.id)
          from projects
          where projects.category_id = categories.id
        ) as count_projects`
      ),
    ])
    .from('categories')
    .innerJoin('projects', 'projects.category_id', 'categories.id')
    .groupBy('categories.id')
    .orderBy('categories.name')
    .havingRaw('count(categories.id) > 0');

  res.status(200).json(categories);
};
