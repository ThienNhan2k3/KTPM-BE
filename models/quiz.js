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
    static associate(models) {
      // define association here
    }
  }
  Quiz.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
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
    }, {
      sequelize,
      tableName: 'quiz',
      modelName: 'Quiz',
  });
  return Quiz;
};