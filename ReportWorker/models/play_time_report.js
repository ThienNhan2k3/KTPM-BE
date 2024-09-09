"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Play_Time_Report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const {Event, User} = models;
      this.belongsTo(Event, {foreignKey: "id_event"});
      this.belongsTo(User, {foreignKey: "id_user"});
    }
  }
  Play_Time_Report.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      id_event: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      id_user: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      start_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "play_time_reports",
      modelName: "Play_Time_Report",
      // don't add the timestamp attributes (updatedAt, createdAt)
      timestamps: false,
      // If don't want createdAt
      createdAt: false,
      // If don't want updatedAt
      updatedAt: false,
    }
  );
  return Play_Time_Report;
};
