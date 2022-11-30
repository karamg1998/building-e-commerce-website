
const Sequelize=require('sequelize');
const sequelize=require('../database/database');

let Order=sequelize.define('Order',{
    orderId:{
        type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique:true
    },
    quantity:Sequelize.INTEGER,
    name:Sequelize.STRING,
    image:Sequelize.STRING,
    price:Sequelize.DOUBLE
});

module.exports=Order;