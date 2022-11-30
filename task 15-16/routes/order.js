const controller=require('../controllers/e-controller');
const express=require('express');


const router=express.Router();

router.get('/getCartOrder',controller.getCO);
router.post('/PostOrder',controller.PostOrder);
router.get('/getOrders',controller.getOrders);




module.exports=router;
