const controller=require('../controllers/e-controller');
const express=require('express');


const router=express.Router();

router.post('/addProductToCart',controller.addPtC);
router.get('/getCartItems',controller.getCartItems);
router.delete('/getCartItems/:Id',controller.delCartItems);



module.exports=router;
