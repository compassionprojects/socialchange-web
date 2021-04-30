const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const ProjectStatus = require('./project_status')(sequelize, DataTypes);
  const Category = require('./category')(sequelize, DataTypes);
  const User = require('./user')(sequelize, DataTypes);
  class Project extends Model {}
  Project.init(
    {
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false },
      intentions: { type: DataTypes.TEXT },
      outcomes: { type: DataTypes.TEXT },
      societalChange: { type: DataTypes.TEXT },
      startDate: { type: DataTypes.DATE, allowNull: false },
      endDate: { type: DataTypes.DATE },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Category,
          key: 'id',
        },
      },
      projectStatusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: ProjectStatus,
          key: 'id',
        },
      },
      geo: { type: DataTypes.GEOGRAPHY('POINT', 4326) },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User,
          key: 'id',
        },
      },
      updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          references: User,
          key: 'id',
        },
      },
      numPeople: { type: DataTypes.INTEGER },
      hasDiscussions: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      sequelize,
      modelName: 'Project',
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  ProjectStatus.hasMany(Project, {
    foreignKey: {
      name: 'project_status_id',
    },
    onDelete: 'RESTRICT',
  });
  Category.hasMany(Project, {
    foreignKey: {
      name: 'category_id',
    },
    onDelete: 'RESTRICT',
  });
  User.hasMany(Project, {
    foreignKey: {
      name: 'created_by',
    },
    onDelete: 'RESTRICT',
  });
  User.hasMany(Project, {
    foreignKey: {
      name: 'updated_by',
    },
    onDelete: 'RESTRICT',
  });
  Project.belongsTo(ProjectStatus);
  Project.belongsTo(Category);
  Project.belongsTo(User, {
    as: 'Author',
    foreignKey: {
      name: 'created_by',
    },
    onDelete: 'RESTRICT',
  });
  Project.belongsTo(User, {
    as: 'Updater',
    foreignKey: {
      name: 'updated_by',
    },
    onDelete: 'RESTRICT',
  });
  return Project;
};
