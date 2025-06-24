const { Schema, model } = require("mongoose");
const { common } = require("./common");

const subCatSchema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    sub_cat: common
}, { timestamps: true })

const subCategory = model('subCategory', subCatSchema)

module.exports = subCategory;