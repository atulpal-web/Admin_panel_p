const express = require('express');
const { index, store, show, update, destroy } = require('../controller/product.controller');
const { verifyUser } = require('../middleware/verifyUser');
const router = express.Router();

router.post('/',verifyUser,store);       
router.get('/',verifyUser,index);         
router.get('/:id',verifyUser,show);        
router.put('/:id',verifyUser,update);     
router.delete('/:id',verifyUser,destroy); 

module.exports = router;
