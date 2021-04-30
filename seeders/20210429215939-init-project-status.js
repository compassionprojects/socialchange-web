'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('project_statuses', [
      {
        name: 'Published',
        code: 'published',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Draft',
        code: 'draft',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Archived',
        code: 'archived',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('project_statuses', null, {});
  },
};
