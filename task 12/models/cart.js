
const Sequelize=require('sequelize');
const sequelize=require('../database/database');

let Cart=sequelize.define('cartItem',{
    id:{
        type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique:true
    },
    name:Sequelize.STRING,
    image:Sequelize.STRING,
    price:Sequelize.DOUBLE
});

module.exports=Cart;