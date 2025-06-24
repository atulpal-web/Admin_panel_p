const{Schema, model} =require('mongoose')
const { common } = require('./common')
const categorySchema = new Schema({
    name: common
}, { timestamps: true })

const Category = model('Category', categorySchema);

module.exports = Category;