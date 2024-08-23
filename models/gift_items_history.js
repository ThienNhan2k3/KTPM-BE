'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Gift_Items_History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  }
  Gift_Items_History.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    id_giver: {
      type: DataTypes.UUID,
      allowNull: false
    },
    id_recipient: {
      type: DataTypes.UUID,
      allowNull: false
    },
    id_item: {
      type: DataTypes.UUID,
      allowNull: false
    },
    id_game: {
      type: DataTypes.UUID,
      allowNull: false
    },
    gift_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    update_time: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'gift_items_history',
    modelName: 'Gift_Items_History',
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
    // If don't want createdAt
    createdAt: false,
    // If don't want updatedAt
    updatedAt: false,
  });
  return Gift_Items_History;
};