'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playturn extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const {ItemQuantity, User} = models;
      this.belongsTo(ItemQuantity);

    }
  }
  Playturn.init({
    idUser: {
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    idEvent: {
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    quantity: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    tableName: 'Playturns',
    modelName: 'Playturn',
  });
  return Playturn;
};