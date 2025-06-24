const jwt=require('jsonwebtoken')
exports.verifyUser = async (req, res, next) => {
    console.log(req.headers)
    let token = req.headers.authorization;
    if (!token) {
        return res.json({
            success: false,
            message:"Token not found"
        })
    }
    token = token.split(" ")[1];
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY)
    if (!verifyToken) {
        res.json({
            success: false,
            messsage:"Verification Failed!"
        })
    }
    req.admin = verifyToken;
    next()
}