"use strict";
const { Model, Table } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
      const {User_Item} = models;
      // this.hasMany(User_Event, {foreignKey: 'id_user'});
      // this.hasMany(User_Voucher, {foreignKey: 'id_user'});
      this.hasMany(User_Item, {foreignKey: 'id_user'});
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dob: {
        type: DataTypes.STRING,
        allowNull: null,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: null,
      },
      fb_acc: {
        type: DataTypes.STRING,
        allowNull: null,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: null,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: null,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: null,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: null,
      },
      time_update: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "users",
      modelName: "User",
      // don't add the timestamp attributes (updatedAt, createdAt)
      timestamps: false,
      // If don't want createdAt
      createdAt: false,
      // If don't want updatedAt
      updatedAt: false,
    }
  );
  return User;
};
