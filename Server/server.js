const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
require('dotenv').config();
const port = process.env.PORT || 7030;
const cors = require('cors')
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const blogRoute = require('./router/blog.routes');
const adminRoute = require('./router/admin.routes');
const categoryRoute = require('./router/category.route');
const subCategoryRoute = require('./router/subCategory.route')
const productRoute=require('./router/product.route')

require('./config/db')();

app.use('/api/blogs', blogRoute);
app.use('/api/admin', adminRoute);
app.use('/api/category', categoryRoute)
app.use('/api/sub-category', subCategoryRoute);
app.use('/api/products', productRoute);

app.get('/', (req, res) => res.send("API created!"));

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
