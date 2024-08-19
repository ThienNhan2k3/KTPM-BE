'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuizEvent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Quiz}) {
      // define association here

      //Contain lot of Quizs
      this.hasMany(Quiz, {foreignKey: 'qeID', as: 'quizzes'});
    }
  }
  QuizEvent.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
  }, {
    sequelize,
    tableName:'QuizEvent',
    modelName: 'QuizEvent',
  });
  return QuizEvent;
};