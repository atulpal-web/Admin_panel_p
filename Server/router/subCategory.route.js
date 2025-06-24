const { store, getAll, getOne, update, destroy, getByCategory } = require('../controller/subCategory.controller');
const { verifyUser } = require('../middleware/verifyUser');
const router = require('express').Router();

router.post('/', verifyUser, store);
router.get('/', verifyUser, getAll);
router.get('/:id', verifyUser, getOne);
router.put('/:id', verifyUser, update);
router.delete('/:id', verifyUser, destroy);
router.get('/by-category/:categoryId', verifyUser, getByCategory);

module.exports = router;
