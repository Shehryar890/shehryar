  

  const express = require('express');
  const {   createOrder,
  
    getUserOrderHistory,  // For order history
    getUserOrderById, } = require('../controller/order');
    const authenticate = require('../middlerwares/auth');


    const router= express.Router();


    router.post('/' , authenticate,  createOrder);
    router.get('/:id' , authenticate, getUserOrderById);
    router.get('/history:id' , authenticate, getUserOrderHistory);

    module.exports = router;