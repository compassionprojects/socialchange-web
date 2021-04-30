'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('categories', [
      {
        name: 'Education System',
        description:
          'All projects involving education, schools and institutions',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Parenting',
        description: 'All projects involving parenting and children',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('categories', null, {});
  },
};
