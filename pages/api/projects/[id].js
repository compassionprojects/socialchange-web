import { getProject } from './index';

export default (req, res) => {
  const { id } = req.query;
  res.status(200).json(getProject(id));
};
