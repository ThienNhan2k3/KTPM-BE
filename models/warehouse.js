'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Warehouse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const {ItemOfUser, IsUsedVoucher, GiftExchangesHistory} = models;
      this.belongsToMany(ItemOfUser, {through: "Warehouse_ItemOfUser"})
      this.belongsToMany(IsUsedVoucher, {through: "Warehouse_IsUsedVoucher"})
      this.belongsToMany(GiftExchangesHistory, {through: "Warehouse_GiftExchangesHistory"})
    }
  }
  Warehouse.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    
  }, {
    sequelize,
    tableName: 'Warehouses',
    modelName: 'Warehouse',
  });
  return Warehouse;
};