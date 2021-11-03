const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection');

class UserFollowers extends Model {}

UserFollowers.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'userFollowers'
  }
);

module.exports = UserFollowers;