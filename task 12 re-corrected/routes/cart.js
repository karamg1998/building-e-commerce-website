const controller=require('../controllers/e-controller');
const express=require('express');


const router=express.Router();

router.post('/addProductToCart',controller.addPtC);



module.exports=router;
