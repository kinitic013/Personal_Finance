const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategoryModel = new Schema(
    {
        Name : String,
        UserId : String
    }
)


module.exports = mongoose.model("Category",CategoryModel);