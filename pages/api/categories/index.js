// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { knex } from '../../../db/config';

export default async (req, res) => {
  const categories = await knex
    .select([
      'id',
      'name',
      knex
        .count('projects.id')
        .from('projects')
        .innerJoin('categories', 'projects.category', 'categories.id')
        .as('count_projects'),
    ])
    .from('categories');

  res.status(200).json(categories);
};
