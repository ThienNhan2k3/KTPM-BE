'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IsUsedVoucher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const {Warehouse} = models;
      this.belongsToMany(Warehouse, {through: "Warehouse_IsUsedVoucher"})

    }
  }
  IsUsedVoucher.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    isUsed: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    
  }, {
    sequelize,
    tableName: 'IsUsedVouchers',
    modelName: 'IsUsedVoucher',
  });
  return IsUsedVoucher;
};