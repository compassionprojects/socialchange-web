import db from '../../../db';

export default async (req, res) => {
  const { category_id } = req.query;
  const [category] = await db
    .select(['id', 'name', 'description'])
    .from('categories')
    .where({ id: category_id });

  res.status(200).json(category);
};
