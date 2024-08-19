'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VoucherQuantity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  }
  VoucherQuantity.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    quantity: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    totalQuantity: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    tableName: 'VoucherQuantities',
    modelName: 'VoucherQuantity',
  });
  return VoucherQuantity;
};