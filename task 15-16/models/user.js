const Sequelize=require('sequelize');
const sequelize=require('../database/database');

let User=sequelize.define('user',{
    id:{type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
        unique:true
    },
    name:Sequelize.STRING,
    email:{
        type:Sequelize.STRING,
        unique:true,
        allowNull:false,
    },
    phone:{
        type:Sequelize.STRING,
        unique:true,
        allowNull:false,
    }
});

module.exports=User;