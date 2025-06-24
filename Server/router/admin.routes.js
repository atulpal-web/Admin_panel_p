const { signup, login, isAuth, updatePassword, logOut, sendOtp, changePassword } = require('../controller/admin.controller')
const { verifyUser } = require('../middleware/verifyUser')

const router = require('express').Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/update-password',verifyUser, updatePassword)
router.get('/logout',verifyUser, logOut)
router.post('/sendOtp', sendOtp)
router.post('/changePassword',changePassword)





module.exports = router;