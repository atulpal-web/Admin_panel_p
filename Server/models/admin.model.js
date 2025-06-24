const { Schema, model } = require("mongoose");
const{common}=require("./common")

const adminSchema = new Schema({
    username: common,
    user_email: {
        ...common,
        unique:true
    },
    user_pass: common,
    otpNo:String
})

const Admin = model('Admin', adminSchema)

module.exports = Admin;