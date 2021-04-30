// import { knex } from '../../../db/config';

const models = require('../../../models');
const { Project, ProjectStatus, Category } = models;

export const defaultFilters = [
  {
    model: ProjectStatus,
    where: {
      code: 'published', // only fetch 'published' projects
    },
  },
];

export default async (req, res) => {
  const { page, per_page, category_id } = req.query;
  const limit = parseInt(per_page, 10) || 15;
  const offset = (parseInt(page, 10) - 1 || 0) * limit;
  const filters = [...defaultFilters];

  if (category_id) {
    filters.push({
      model: Category,
      where: {
        id: category_id,
      },
    });
  }

  const { rows, count } = await Project.findAndCountAll({
    where: {},
    include: filters,
    offset,
    limit,
  });

  res.status(200).json({ rows, count });
};
