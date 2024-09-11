const Transaction = require("../models/transaction");
const axios = require('axios');


module.exports.get_all = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.status(200).json(transactions);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ message: 'Error fetching categories' });
    }
};

module.exports.create_transaction = async (req,res)=>
{
    // after checking if user is authorised
    const newTransaction = new Transaction(
        {
            Amount : req.body.Amount,
            Description : req.body.Description,
            UserId  : req.body.userId,
            Category_id : req.body.Category_id,
            Type : req.body.Type,
            Date : Date.now()
        }
    ) 
    await newTransaction.save()
    .then((msg)=>
    {
        console.log("newTransaction added to the Database");
        res.sendStatus(200);
    })
    .catch((err)=>
    {
        if (err.name == 'ValidationError') {
            // below code 
            // field traverse over all elements in schema and prints their feild and error if any
            for (field in err.errors) {
                console.log(field);
                console.log(err.errors[field].message); 
            }
        }
        else
        {
            console.log(err);
        }
        res.sendStatus(400);
    })
};


module.exports.update_transaction = async (req,res)=>
{
    console.log(req.body);
    Transaction.findByIdAndUpdate(req.body._id, 
        { $set: req.body },
        { new: true, runValidators: true }
    )
    .then(updatedTransaction => {
        if (!updatedTransaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }
        res.json(updatedTransaction);
    })
    .catch(err => res.status(400).json({ message: "Update failed", error: err }));
};

module.exports.delete_transaction = async (req,res)=>
{
    await Transaction.deleteOne({_id : req.body._id})
    .then((msg)=>
    {
        console.log("Deleted");
        console.log(msg);
        res.sendStatus(200);
    })
    .catch((err)=>
    {
        console.log(err);
        res.sendStatus(400);
    })
}