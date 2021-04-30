const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {}
  User.init(
    {
      name: DataTypes.STRING,
      email: { type: DataTypes.STRING, isEmail: true },
    },
    {
      sequelize,
      modelName: 'User',
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );
  return User;
};
