const Product = require("../models/product.model");

exports.store = async (req, res) => {
    const { category, subCategory, p_name, p_price } = req.body;
    const existProduct = await Product.findOne({ category, subCategory, p_name });
    if (existProduct) {
        res.json({
            success: false,
            message:"Product already exists!"
        })
    }
    await Product.create({ category, subCategory, p_name, p_price })
    res.json({
        success: true,
        message:"Product Added!"
    })
}

exports.index = async (req, res) => {
    try {
        const products = await Product.find()
            .populate("category", "name")
            .populate("subCategory", "sub_cat");
        res.json({ success: true, data: products });
    } catch (err) {
        res.status(500).json(
            {
                success: false,
                message: err.message 
                
            });
    }
};

exports.show = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id)
            .populate("category", "name")
            .populate("subCategory", "sub_cat");

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.json({ success: true, data: product });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { category, subCategory, p_name, p_price } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { category, subCategory, p_name, p_price },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, message: "Product Updated", data: updatedProduct });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.destroy = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Product.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, message: "Product Deleted" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};