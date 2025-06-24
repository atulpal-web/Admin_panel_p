const { plainToHash, hashToPlain } = require("../utils/password");
const Admin = require('../models/admin.model')
const otpGenerator = require('otp-generator');
const mailSend = require("../config/mailer");
const { sendOtpFormat } = require("../utils/emailer");
const jwt=require('jsonwebtoken')

exports.signup = async (req, res) => {
    const { username, user_email, user_pass } = req.body;
    const hash_pass = await plainToHash(user_pass);
    const existUser = await Admin.findOne({ user_email });
    if (existUser) {
        return res.json({
            success: false,
            message:"Email ID already exists"
        })
    } else {
        await Admin.create({
            username,
            user_email,
            user_pass:hash_pass
        }).then(() => {
            return res.json({
                success: true,
                message:"User Created!"
            })
        }).catch((err) =>console.log(err))
    }
}

exports.login = async (req, res) => {
    const { user_email, user_pass } = req.body;

    try {
        const existUser = await Admin.findOne({ user_email });
        if (!existUser) {
            return res.json({
                success: false,
                message: "Email ID does not exist!"
            });
        }

        const matchPassword = await hashToPlain(user_pass, existUser.user_pass);
        if (!matchPassword) {
            return res.json({
                success: false,
                message: "Password does not match!"
            });
        }
        const payload = {
            id: existUser._id,
            email: existUser.user_email,
            name:existUser.username
        }
        const token=jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:'1h'})
        res.header('token',token)
        res.json({
                success: true,
            message: "Welcome!",
                token
            });
    } catch (err) {
        console.error(err);
    }
    
};


exports.updatePassword = async (req, res) => {
    try {
        const id = req.admin.id;
        const { user_pass, new_pass } = req.body;
        const existAdmin = await Admin.findById(id);
        if (!existAdmin) {
            return res.json({
                success: false,
                message:"Admin not Found!"
            })
        }
        // console.log(existAdmin.user_pass);
    
        const match = await hashToPlain(user_pass, existAdmin.user_pass);
        // console.log(match);
        if (!match) {
            return res.json({
                success: false,
                message:"old password not match"
            })
        }
        const hash_pass = await plainToHash(new_pass)
        await Admin.findByIdAndUpdate(
            id,
            {
                user_pass:hash_pass
            }
        )
        return res.json({
            success: true,
            message:"password has been Updated!"
        })
    } catch (error) {
        console.log(error)
    }
}

exports.logOut = async (req, res) => {
    try {
        res.clearCookie('admin_token');
        res.json({
            success: true,
            message:"Logged Out Successfully"
        })
    } catch (error) {
        console.log(error)
    }
}

exports.sendOtp = async (req, res) => {
    const { user_email } = req.body;
    const existAdmin = await Admin.findOne({ user_email });
    if (!existAdmin) {
        res.json({
            success: false,
            message:"admin not found!"
        })
    }
    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
    mailSend(user_email, 'forgot password', sendOtpFormat(otp));
    await Admin.updateOne(
        { user_email },
        {
            otpNo:otp
        }
    )
    res.json({
        success:true,
        message:"OTP sent, Check your mail"
    })
}

exports.changePassword = async (req, res) => {
    const { otpNo, new_pass } = req.body;
    // console.log(req.body);
    const matchOtp = await Admin.findOne({ otpNo });
    if (!matchOtp) {
        res.json({
            success: false,
            message:"Wrong OTP"
        })
    }
    const hash_pass = await plainToHash(new_pass);
    await Admin.updateOne(
        { otpNo },
        {
            user_pass: hash_pass,
            otpNo:0
        }
    ).then(() => {
        res.json({
            success: true,
            message:"Password Changed Successfully!"
        })
    })
}
