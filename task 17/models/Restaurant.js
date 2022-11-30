
const Sequelize=require('sequelize');
const sequelize=require('../database/database');

let Products=sequelize.define('restaurant',{
    id:{
        type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique:true
    },
    name:Sequelize.STRING,
    phone:{
        type:Sequelize.DOUBLE,
        unique:true,
        allowNull:false,
    },
    address:{
        type:Sequelize.STRING,
        unique:true,
        allowNull:false,
    }
});

module.exports=Products;