'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GiftExchangesHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const {ItemQuantity, Account, Warehouse, Event} = models;
      this.belongsToMany(ItemQuantity, {through: "GiftExchangesHistory_ItemQuantity", foreignKey: "itemQuantityId"})
      this.belongsToMany(Warehouse, {through: "Warehouse_GiftExchangesHistory", foreignKey: "warehouseId"})
      this.hasMany(Account, {foreignKey: "receiverId"})
      this.hasMany(Event, {foreignKey: "eventId"})
    }
  }
  GiftExchangesHistory.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    exchangeTime: {
      type: DataTypes.DATE,
      allowNull: false
    },

    
  }, {
    sequelize,
    tableName: 'GiftExchangesHistory',
    modelName: 'GiftExchangesHistory',
  });
  return GiftExchangesHistory;
};