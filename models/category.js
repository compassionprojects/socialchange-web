const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {}
  Category.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Category',
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );
  return Category;
};
