"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User_Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const {User, Item} = models;
      this.belongsTo(User, {foreignKey: "id_user"});
      this.belongsTo(Item, {foreignKey: "id_item"});
    }
  }
  User_Item.init(
    {
      id_item: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
      },
      id_user: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      quantity: {
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
      tableName: "user_items",
      modelName: "User_Item",
      // don't add the timestamp attributes (updatedAt, createdAt)
      timestamps: false,
      // If don't want createdAt
      createdAt: false,
      // If don't want updatedAt
      updatedAt: false,
    }
  );
  return User_Item;
};
