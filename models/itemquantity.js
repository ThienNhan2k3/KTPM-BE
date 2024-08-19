'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemQuantity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const {Item, ItemOfUser, GiftExchangesHistory} = models;
      this.belongsTo(Item);
      this.belongsToMany(GiftExchangesHistory, {through: "GiftExchangesHistory_ItemQuantity"})
      this.belongsToMany(ItemOfUser, {through: "ItemOfUser_ItemQuantity"})

    }
  }
  ItemQuantity.init({
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
    tableName: 'ItemQuantities',
    modelName: 'ItemQuantity',
  });
  return ItemQuantity;
};