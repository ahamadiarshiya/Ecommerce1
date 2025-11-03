const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Shipping = sequelize.define(
  "Shipping",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references : {
        model : "Users", 
        key : "id"
      }
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { timestamps: true, paranoid: true }
);

module.exports = Shipping;
