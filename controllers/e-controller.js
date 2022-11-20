const Products=require('../models/e-commerce');
const path=require('path');
exports.getP=(req,res,next)=>{
    res.sendFile(path.join(__dirname,'../view','add-product.html'))
};

exports.postP=(req,res,next)=>{
  Products.create({
    name:req.body.name,
    image:req.body.image,
    price:req.body.price
  }).then(result=>{
    console.log(result);
    console.log('product created');
    res.redirect('/products');
  }).catch(err=>{
    console.log(err);
  })
};

exports.getAX=(req,res,next)=>{
   Products.findAll()
   .then(products=>{
    res.json(products);
   });
}