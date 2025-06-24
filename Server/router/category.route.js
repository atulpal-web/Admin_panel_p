const { store, getAll, getOne, update, destroy } = require('../controller/category.controller')
const {verifyUser}=require('../middleware/verifyUser')
const router = require('express').Router()

router.post('/', verifyUser, store);
router.get('/', verifyUser, getAll);
router.get('/:id', verifyUser, getOne);
router.put('/:id', verifyUser, update);
router.delete('/:id', verifyUser, destroy);

module.exports = router;