const { Blog } = require("../models/blog.model");

exports.creation = async (req, res) => {
    try {
      const { blog_name, blog_cat, blog_num } = req.body;
      const blog_img = req.file ? `/uploads/${req.file.filename}` : '';
  
      const blog = await Blog.create({
        blog_name,
        blog_cat,
        blog_num,
        blog_img
      });
  
      res.json({ message: "Blog created successfully!", blog });
    } catch (err) {
      res.json({ error: err.message });
    }
  };

exports.viewing = async (req, res) => {
    try {
        const blogs = await Blog.find();
        if (blogs.length > 0) {
            res.json({
                success: true,
                blogs
            })
        } else {
            res.json({
                success: true,
                message:"no blogs found!"
            })
        }
    } catch (error) {
        console.log(error)
    }
}

exports.singleViewing = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);
        if (!blog) {
            res.json({
                success: false,
                message:"blog not found"  
            })
        }
        res.json({
            success: true,
            blog
        })
    } catch (error) {
        console.log(error)
    }
}

exports.deletion = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBlog = await Blog.findByIdAndDelete(id);
        if (!deletedBlog) {
            res.json({
                success: false,
                message:"blog not found!"
            })
        }
        res.json({
            success: true,
            message:"blog deleted!"
        })
    } catch (error) {
        console.log(error)
    }
}

exports.updation = async (req, res) => {
    try {
      const { id } = req.params;
      const { blog_name, blog_cat, blog_num } = req.body;
  
      const updateData = {
        blog_name,
        blog_cat,
        blog_num,
      };
  
      if (req.file) {
        updateData.blog_img = `/uploads/${req.file.filename}`;
      }
  
      const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
        new: true,
      });
  
      if (!updatedBlog) {
        return res.json({ success: false, message: "Blog not found" });
      }
  
      res.json({
        success: true,
        message: "Blog updated successfully",
        updatedBlog,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error.message });
    }
};
  
exports.multiImageCreation = async (req, res) => {
  try {
    const { blog_name, blog_cat, blog_num } = req.body;
    const blog_imgs = [];
    req.files.forEach((file) => {
      blog_imgs.push(`/uploads/${file.filename}`);
    });
    const blog = await Blog.create({
      blog_name,
      blog_cat,
      blog_num,
      blog_imgs
    });
    res.json({ success: true, message: "Blog with multiple images created!", blog });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
  