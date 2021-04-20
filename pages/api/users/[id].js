export default (req, res) => {
  const { id } = req.query;
  res.status(200).json(getUser(id));
};

export const getUser = (i) => ({
  id: i,
  name: `User ${i}`,
  created_at: new Date(2021, 3, 20).toISOString(),
  updated_at: new Date(2021, 3, 20).toISOString(),
});
