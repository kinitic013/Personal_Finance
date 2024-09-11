const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SavingModel = new Schema(
    {
        TargetAmount : Number,
        TargetDate : Date,
        Description : String,
        UserId : String,
        created:  {type: Date, default: Date.now},
    }
)


module.exports = mongoose.model("Saving",SavingModel);