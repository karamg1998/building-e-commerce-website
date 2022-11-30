const Products=require('../models/product');
const Cart=require('../models/cart');
const Order=require('../models/order');
const path=require('path');
let itemsPerPage=2;

exports.getP=(req,res,next)=>{
    res.sendFile(path.join(__dirname,'../view','add-product.html'))
};

exports.postP=async (req,res,next)=>{
  try{
    if(req.body.name===null && req.body.image==null && req.body.price==null)
    {
      throw new Error('all the fields are mendatory');
    }
    
    await Products.create({
    name:req.body.name,
    image:req.body.image,
    price:req.body.price,
    userId:req.user.id
     }).then(result=>{
    console.log(result);
    console.log('product created');
    res.redirect('/products');
    });

    
  }
  catch(err){
        res.status(500).json({
      error:err
      });
      console.log('error in adding products');
  }
};

exports.getAp=async (req,res,next)=>{
  let page=req.query.page;
  let totalProds;

  try{
    await Products.count()
  .then(count=>{
     totalProds=count;
     return Products.findAll({offset:(page-1)*itemsPerPage,limit:itemsPerPage});
  })
  .then(products=>{
    res.json({
      products:products,
      currentpage:page,
      hasNextPage:itemsPerPage*page<totalProds,
      previousPage:page>1,
      lastPage:Math.ceil(totalProds/itemsPerPage),
      totalProds:totalProds
    });
  })
  }
  catch(err){
    console.log(err);
  }
}

exports.addPtC=async (req,res,next)=>{
  try{
    await Cart.create({
      quantity:req.body.prodQty,
      name:req.body.prodName,
      image:req.body. prodImage,
      price:req.body.prodPrice,
      userId:req.user.id
    }).then(cart=>{
      res.json(cart);
      console.log('item added to cart');
    });
  }
  catch(err){
      res.status(500).json({
        error:err
      });
      console.log('error in adding product to the cart');
  }
      
};

exports.getCartItems=async (req,res,next)=>{
  let page=req.query.page;
  let items;
  try{
   await Cart.count().then(count=>{
        items=count;
        return Cart.findAll({offset:(page-1)*itemsPerPage,limit:itemsPerPage});
   }).then(products=>{
    res.json({
    products:products,
    currentpage:page,
    hasNextPage:itemsPerPage*page<items,
    previousPage:page>1,
    lastPage:Math.ceil(items/itemsPerPage),
    totalitems:items
    })
    console.log('cart items sent');
  });
  }
  catch(err){
    res.status(500).json({
      error:err
      });
   console.log('error in getting cart items');
  }
};

exports.delCartItems=async (req,res,next)=>{
    let Id=req.params.Id;
  try{
    await Cart.findByPk(Id).then(item=>{
    res.json(item);
    item.destroy();
    console.log('item deleted');
    });
  }
  catch(err){
    res.status(500).json({
      error:err
      });
    console.log('error in deleting product');
  };
};

exports.getCO=async (req,res,next)=>{
  try{
    Cart.findAll()
  .then(items=>{
    res.json(items);
  })
  }
  catch(err){
    res.status(500).json({
      error:err
      });
    console.log('error in getting product');
  }
};

exports.PostOrder=async (req,res,next)=>{
  try{
   await Order.create({
    quantity:req.body.quantity,
    name:req.body.name,
    image:req.body.image,
    price:req.body.price,
    userId:req.body.userId
  }).then(order=>{
    res.json(order);
    console.log('order created');
  })
  }
  catch(err){
    res.status(500).json({
      error:err
      });
     console.log('error in creating order');
  }
};

exports.getOrders=async (req,res,next)=>{
  let page=req.query.page;
  let items;
  try{
   await Order.count().then(count=>{
        items=count;
        return Order.findAll({offset:(page-1)*itemsPerPage,limit:itemsPerPage});
   }).then(products=>{
    res.json({
    products:products,
    currentpage:page,
    hasNextPage:itemsPerPage*page<items,
    previousPage:page>1,
    lastPage:Math.ceil(items/itemsPerPage),
    totalitems:items
    })
    console.log('order items sent');
  });
  }
  catch(err)
  {
    res.status(500).json({
      error:err
      });
    console.log('error in getting orders');
  }
};