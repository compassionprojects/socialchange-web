import db from '../../../db';

export default async (req, res) => {
  const { user_id } = req.query;
  const [user] = await db
    .select(['id', 'name', 'image'])
    .from('users')
    .where({ id: user_id });

  res.status(200).json(user);
};
