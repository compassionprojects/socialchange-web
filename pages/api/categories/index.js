import db from '../../../db';

export default async (req, res) => {
  const categories = await db
    .select(['categories.id', 'categories.name'])
    .from('categories')
    .orderBy('categories.name');

  res.status(200).json(categories);
};
