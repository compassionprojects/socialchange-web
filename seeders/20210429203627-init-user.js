'use strict';

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('users', [
      {
        name: 'John Doe',
        email: 'jd@example.com',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
