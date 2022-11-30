const Sequelize=require('sequelize');

const sequelize=new Sequelize('node-complete','root','Kgarathi@135',{
    dialect:'mysql',
    host:'localhost'
});

module.exports=sequelize;