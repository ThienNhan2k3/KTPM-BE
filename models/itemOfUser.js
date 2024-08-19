'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemOfUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const {ItemQuantity, Warehouse} = models;
      this.belongsToMany(ItemQuantity, {through: "ItemOfUser_ItemQuantity"})
      this.belongsToMany(Warehouse, {through: "Warehouse_ItemOfUser"})
      
    }
  }
  ItemOfUser.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    
  }, {
    sequelize,
    tableName: 'ItemOfUsers',
    modelName: 'ItemOfUser',
  });
  return ItemOfUser;
};