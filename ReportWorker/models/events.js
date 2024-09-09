"use strict";
const { Model, Table } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
      const {User_Event, Voucher_In_Event, Item} = models;
      this.hasMany(User_Event, {foreignKey: 'id_event'});
      this.hasMany(Voucher_In_Event, {foreignKey: "id_event"});
      this.hasMany(Item, {foreignKey: "id_event"});

    }
  }
  Event.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id_game: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      id_brand: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      start_time: {
        type: DataTypes.DATEONLY,
        allowNull: null,
      },
      end_time: {
        type: DataTypes.DATEONLY,
        allowNull: null,
      },
      time_update: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "events",
      modelName: "Event",
      // don't add the timestamp attributes (updatedAt, createdAt)
      timestamps: false,
      // If don't want createdAt
      createdAt: false,
      // If don't want updatedAt
      updatedAt: false,
    }
  );
  return Event;
};
