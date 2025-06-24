const { Schema, model } = require("mongoose");
const { common } = require("./common");

const blogSchema = new Schema({
    blog_name: common,
    blog_cat: common,
    blog_num: {
        ...common,
        type:Number
    },
    blog_img: {
        ...common,
        required:false
    },
    blog_imgs: {
        type: [String]
    }
}, { timestamps: true })

exports.Blog = model('blog',blogSchema);