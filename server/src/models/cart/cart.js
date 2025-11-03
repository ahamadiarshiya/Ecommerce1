const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");


const Cart = sequelize.define("Cart", {
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true,
        allowNull : false
    },
    userId : {
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
            model : "Users",
            key : 'id'
        }
    },
    productId : {
        type : DataTypes.INTEGER,
        allowNull : false,
        references:  {
            model : "Products",
            key : 'id'
        }
    },
    quantity : {
        type : DataTypes.INTEGER,
        defaultValue : 1
    },
   },{
        timestamps : true,
        paranoid : true
    }
);



module.exports = Cart;