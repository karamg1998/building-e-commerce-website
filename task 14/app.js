const express=require('express');
const bodyParser=require('body-parser');
const sequelize=require('./database/database');
const routes=require('./routes/e-commerce');
const cart=require('./routes/cart');
const path=require('path');
const app=express();
app.use(express.static(path.join(__dirname,'css')));

const cors=require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(routes);
app.use(cart);

sequelize
.sync()
.then(app.listen(3000))
.catch(err=>console.log(err));