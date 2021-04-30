module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface
      .createTable('project_statuses', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        code: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
      })
      .then(() =>
        queryInterface.addConstraint('project_statuses', {
          type: 'unique',
          fields: ['code'],
        })
      );
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('project_statuses');
  },
};
