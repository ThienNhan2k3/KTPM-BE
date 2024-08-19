'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Quiz extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({QuizEvent}) {
      // define association here

      //QuizEventID
      this.belongsTo(QuizEvent, {foreignKey: 'qeID'});
    }
  }
  Quiz.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answers: {
        type: DataTypes.ARRAY(DataTypes.STRING), 
        allowNull: false,
    },
    correct_answer: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    qeID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    }, {
      sequelize,
      tableName: 'Quiz',
      modelName: 'Quiz',
  });
  return Quiz;
};