
const Sequelize=require('sequelize');
const sequelize=require('../database/database');

let Order=sequelize.define('review',{
   Id:{
        type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique:true
    },
    rating:{
        type:Sequelize.INTEGER
    }
});

module.exports=Order;