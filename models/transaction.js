const mongoose=require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema(
    {
        Amount : Number,
        Category_id : String,
        Description : String,
        created:  {type: Date, default: Date.now},
        Type : Boolean,
        UserId : String

    }
);

module.exports = mongoose.model("Transaction",TransactionSchema);