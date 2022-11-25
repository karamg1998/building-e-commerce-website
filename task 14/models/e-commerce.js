
const Sequelize=require('sequelize');
const sequelize=require('../database/database');

let Products=sequelize.define('items',{
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

module.exports=Products;