const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectStatus extends Model {}
  ProjectStatus.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      code: { type: DataTypes.STRING, allowNull: false, unique: true },
    },
    {
      sequelize,
      modelName: 'ProjectStatus',
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );
  return ProjectStatus;
};
