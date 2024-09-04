"use strict";
const { Model, Table } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Fav_Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
    }
  }
  Fav_Event.init(
    {
      id_event: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      id_user: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      time_update: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "fav_events",
      modelName: "Fav_Event",
      // don't add the timestamp attributes (updatedAt, createdAt)
      timestamps: false,
      // If don't want createdAt
      createdAt: false,
      // If don't want updatedAt
      updatedAt: false,
    }
  );
  return Fav_Event;
};
