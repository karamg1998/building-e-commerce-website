
const Sequelize=require('sequelize');
const sequelize=require('../database/database');

let Cart=sequelize.define('cart',{
    id:{
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

module.exports=Cart;