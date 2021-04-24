// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { knex } from '../../../db/config';

export default async (req, res) => {
  const { category_id } = req.query;
  const [category] = await knex
    .select(['id', 'name', 'description'])
    .from('categories')
    .where({ id: category_id });

  res.status(200).json(category);
};
