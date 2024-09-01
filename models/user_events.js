"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User_Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const { Users, Event } = models;
      this.belongsTo(Users, { foreignKey: "id_user" });
      this.belongsTo(Event, { foreignKey: "id_event" });
    }
  }
  User_Event.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      id_user: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      id_event: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      playthrough: {
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
      tableName: "user_events",
      modelName: "User_Event",
      // don't add the timestamp attributes (updatedAt, createdAt)
      timestamps: false,
      // If don't want createdAt
      createdAt: false,
      // If don't want updatedAt
      updatedAt: false,
    }
  );
  return User_Event;
};
