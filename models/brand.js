'use strict';
const {
  Model,
  Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const {VoucherType, Event} = models;
      this.hasMany(VoucherType);
      this.hasMany(Event);
    }
  }
  Brand.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    industryName: {
      allowNull: false,
      type: Sequelize.STRING
    },
    address: {
      allowNull: false,
      type: Sequelize.STRING
    },
    GPS: {
      allowNull: false,
      type: Sequelize.STRING
    },
  }, {
    sequelize,
    tableName: 'Brand',
    modelName: 'Brand',
  });
  return Brand;
};