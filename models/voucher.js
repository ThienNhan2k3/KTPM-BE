'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Voucher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Voucher.init({
    id_brand: DataTypes.INTEGER,
    voucher_code: DataTypes.STRING,
    img_url: DataTypes.STRING,
    value: DataTypes.INTEGER,
    max: DataTypes.INTEGER,
    description: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'Voucher',
    modelName: 'Voucher',
  });
  return Voucher;
};