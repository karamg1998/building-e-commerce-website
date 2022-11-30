const express=require('express');
const sequelize=require('./database/database');
const path=require('path');
const app=express();

const user=require('./models/user');
const restaurant=require('./models/Restaurant');
const review=require('./models/review');

const cors=require('cors');

app.use(cors());


app.use((req,res,next)=>{
    user.findByPk(1)
    .then(user=>{
        req.user=user;
        next();
    }).catch(err=>{
        console.log(err);
    })
});

restaurant.belongsTo(user,{constraints:true,onDelete:'CASCADE'});
user.hasMany(restaurant);
user.hasMany(review);
restaurant.hasMany(review);


sequelize
.sync()
.then(result=>{
    user.findByPk(1).then(User=>{
        if(!User)
        {
            user.create({name:'karamveer',email:'kg@xyz.com',phone:'58585858'});
        }
    });
}).then(res=>{
    app.listen(3000);
})
.catch(err=>console.log(err));