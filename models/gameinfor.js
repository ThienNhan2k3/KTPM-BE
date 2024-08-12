'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GameInfor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  GameInfor.init({
    name: DataTypes.STRING,
    types: DataTypes.STRING,
    photos: DataTypes.STRING,
  }, {
    sequelize,
    tableName: 'GameInfors',
    modelName: 'GameInfor',
  });
  return GameInfor;
};