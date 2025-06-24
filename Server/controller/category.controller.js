const Category = require("../models/category.model");

exports.store = async (req, res) => {
    const { name } = req.body;
    const existCat = await Category.findOne({ name }).countDocuments().exec();
    if (existCat > 0) {
        return res.json({
            success: false,
            message:"Category already Exist"
        })
    } else {
        await Category.create({ name })
            .then(() => {
                res.json({
                    success: true,
                    message:"Category Added"
                })
                    .catch((err) => {
                        console.log(err);
                })
        })
    }
}
exports.getAll = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json({
            success: true,
            data: categories
        });
    } catch (err) {
        res.json({
            success: false,
            message: "Couldn't find the Category"
        });
    }
};

exports.getOne = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.findById(id);
        if (!category) {
            return res.json({
                success: false,
                message: "Category not found"
            });
        }
        res.json({
            success: true,
            data: category
        });
    } catch (err) {
        res.json({
            success: false,
            message: "Error finding category"
        });
    }
};

exports.update = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const updated = await Category.findByIdAndUpdate(id, { name }, { new: true });
        if (!updated) {
            return res.json({
                success: false,
                message: "Category not found"
            });
        }
        res.json({
            success: true,
            message: "Category Updated",
            data: updated
        });
    } catch (err) {
        res.json({
            success: false,
            message: "Update failed"
        });
    }
};

exports.destroy = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Category.findByIdAndDelete(id);
        if (!deleted) {
            return res.json({
                success: false,
                message: "Category not found"
            });
        }
        res.json({
            success: true,
            message: "Category Deleted"
        });
    } catch (err) {
        res.json({
            success: false,
            message: "Delete failed"
        });
    }
};