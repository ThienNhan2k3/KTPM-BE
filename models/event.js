'use strict';
const {
  Model
} = require('sequelize');
const voucherQuantity = require('./voucherQuantity');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const {User, Playturn, VoucherQuantity} = models;
      this.belongsToMany(User, {through: Playturn});
      this.belongsToMany(VoucherQuantity, {through: "Event_VoucherQuantity"});
    }
  }
  Event.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    gender: {
      allowNull: false,
      type: DataTypes.STRING
    },
    dob: {
      allowNull: false,
      type: DataTypes.STRING
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    tableName: 'Events',
    modelName: 'Event',
  });
  return Event;
};