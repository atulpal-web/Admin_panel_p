const express = require('express');
const router = express();
const { creation, viewing, singleViewing, deletion, updation, multiImageCreation } = require('../controller/blog.controller');
const upload = require('../upload');

router.post('/', upload.single('blog_img'), creation);
router.get('/', viewing);
router.get('/:id', singleViewing);
router.delete('/:id', deletion);
router.put('/:id', upload.single('blog_img'), updation);
router.post('/multi-blogs', upload.array('blog_imgs', 10), multiImageCreation);

module.exports = router;
