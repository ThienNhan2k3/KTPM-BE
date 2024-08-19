'use strict';
const {
  Model
} = require('sequelize');
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
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    photo: {
      allowNull: false,
      type: DataTypes.STRING
    },
    start: {
      allowNull: false,
      type: DataTypes.DATE
    },
    end: {
      allowNull: false,
      type: DataTypes.DATE
    },
    brandId: {
      type: DataTypes.INTEGER,
    },
    gameInforId: {
      type: DataTypes.INTEGER,
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    tableName: 'Event',
    modelName: 'Event',
  });
  return Event;
};