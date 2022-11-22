const Products=require('../models/e-commerce');
const Cart=require('../models/cart');
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
    res.status(500).json({
      error:err
  })
});
};

exports.getAX=(req,res,next)=>{
   Products.findAll()
   .then(products=>{
    res.json(products);
   });
}

exports.addPtC=(req,res,next)=>{
    Cart.create({
      quantity:req.body.prodQty,
      name:req.body.prodName,
      image:req.body. prodImage,
      price:req.body.prodPrice
    }).then(cart=>{
      res.json(cart);
      console.log('item added to cart');
    }).catch(err=>
      res.status(500).json({
        error:err
      }));
};

exports.getCartItems=(req,res,next)=>{
  Cart.findAll().then(items=>{
    res.json(items);
    console.log('got cart items');
  }).catch(err=>{
    console.log(err);
  })
};

exports.delCartItems=(req,res,next)=>{
  let Id=req.params.Id;
  console.log(Id);
  Cart.findByPk(Id).then(item=>{
    res.json(item);
    item.destroy();
    console.log('item deleted');
  }).catch(err=>{
    console.log(err);
  });
};

