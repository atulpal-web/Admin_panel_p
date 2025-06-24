const mongoose = require('mongoose');
const { common } = require('./common');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    category: {
        type:Schema.Types.ObjectId,
        ref:'Category'
    },
    subCategory: {
        type: Schema.Types.ObjectId,
        ref:'subCategory'
    },
    p_name: common,
    p_price:Number
},{timestamps:true});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;