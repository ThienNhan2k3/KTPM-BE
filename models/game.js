'use strict';
const {
  Model,
  Table
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
    static associate(models) {
      // define association here
    }
  }
  Game.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    istrade: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    instructions: {
      type: DataTypes.TEXT,
      allowNull: null
    },
    // update_time: {
    //   type: DataTypes.DATE,
    //   allowNull: false
    // }
  }, {
    sequelize,
    tableName: 'games',
    modelName: 'Game',
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: true,
    // If don't want createdAt
    createdAt: false,
    // If don't want updatedAt
    updatedAt: "time_update",


  });
  return Game;
};

