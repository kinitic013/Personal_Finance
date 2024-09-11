const mongoose=require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        Email: {
            type: String,
            required: true,
            unique: true  // This ensures uniqueness
        },
        Password: String,
    }
);

module.exports = mongoose.model("Accounts",userSchema);