"use strict";
const { Model, Table } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
    }
  }
  Question.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      id_quiz: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      ques: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      choice_1: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      choice_2: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      choice_3: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      choice_4: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      answear: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      time_update: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "questions",
      modelName: "Question",
      // don't add the timestamp attributes (updatedAt, createdAt)
      timestamps: false,
      // If don't want createdAt
      createdAt: false,
      // If don't want updatedAt
      updatedAt: false,
    }
  );
  return Question;
};
