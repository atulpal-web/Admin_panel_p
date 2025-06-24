const { default: mongoose } = require("mongoose");

require('dotenv').config()

function dbconfig() {
    mongoose.connect(process.env.mongo_url)
        .then(() => console.log("connected!💀"))
        .catch((err) => console.log(err));
}

module.exports = dbconfig;