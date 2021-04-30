'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface
      .createTable('projects', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        intentions: {
          type: Sequelize.TEXT,
        },
        outcomes: {
          type: Sequelize.TEXT,
        },
        societal_change: {
          type: Sequelize.TEXT,
        },
        start_date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        end_date: {
          type: Sequelize.DATE,
        },
        category_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'categories',
            key: 'id',
          },
          onDelete: 'RESTRICT',
        },
        geo: {
          type: Sequelize.GEOGRAPHY('POINT', 4326),
        },
        created_by: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
          },
          onDelete: 'RESTRICT',
        },
        updated_by: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
          },
          onDelete: 'RESTRICT',
        },
        num_people: {
          type: Sequelize.INTEGER,
        },
        has_discussions: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
        },
        project_status_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'project_statuses',
            key: 'id',
          },
          onDelete: 'RESTRICT',
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      })
      .then(() =>
        queryInterface.addIndex('projects', {
          using: 'gist',
          fields: ['geo'],
        })
      );
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('projects');
  },
};
