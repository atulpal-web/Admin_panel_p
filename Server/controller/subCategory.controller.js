const subCategory = require("../models/subCategory.model");

exports.store = async (req, res) => {
  try {
    const { category, sub_cat } = req.body;
    const existSubCategory = await subCategory.findOne({ category, sub_cat });
    if (!existSubCategory) {
      await subCategory.create({ category, sub_cat });
      return res.json({ success: true, message: "Sub Category Added" });
    } else {
      return res.json({ success: false, message: "Sub Category already exists!" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getAll = async (req, res) => {
  try {
    const existSubCategory = await subCategory.countDocuments();
    if (!existSubCategory) {
      return res.json({ success: false, message: "No record found!" });
    }
    const result = await subCategory.find().populate({ path: 'category', select: 'name' });
    res.json({ success: true, Categories: result });
  } catch (error) {
    console.log(error);
  }
};

exports.getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const subCat = await subCategory.findById(id).populate({ path: 'category', select: 'name' });
    if (!subCat) {
      return res.json({ success: false, message: "Sub Category not found" });
    }
    res.json({ success: true, data: subCat });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Error retrieving sub-category" });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { sub_cat } = req.body;
    const updated = await subCategory.findByIdAndUpdate(id, { sub_cat }, { new: true });
    if (!updated) {
      return res.json({ success: false, message: "Sub Category not found" });
    }
    res.json({ success: true, message: "Sub Category Updated", data: updated });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Update failed" });
  }
};

exports.destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await subCategory.findByIdAndDelete(id);
    if (!deleted) {
      return res.json({ success: false, message: "Sub Category not found" });
    }
    res.json({ success: true, message: "Sub Category Deleted" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Delete failed" });
  }
};

exports.getByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const result = await subCategory.find({ category: categoryId });
    res.json({ success: true, data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Failed to fetch subcategories' });
  }
};


