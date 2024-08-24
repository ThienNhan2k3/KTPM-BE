"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Voucher_In_Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Voucher_In_Event.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      id_voucher_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id_event: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      exp_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      total_quantity: {
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
      tableName: "voucher_in_event",
      modelName: "Voucher_In_Event",
      // don't add the timestamp attributes (updatedAt, createdAt)
      timestamps: false,
      // If don't want createdAt
      createdAt: false,
      // If don't want updatedAt
      updatedAt: false,
    }
  );
  return Voucher_In_Event;
};
