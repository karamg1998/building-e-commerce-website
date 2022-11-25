const controller=require('../controllers/e-controller');
const express=require('express');


const router=express.Router();

router.get('/products',controller.getP);

router.post('/products',controller.postP);

router.get('/getAllproducts',controller.getAp);

module.exports=router;



