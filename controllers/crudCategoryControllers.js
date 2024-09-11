const Category = require("../models/category");
const Transaction = require("../models/transaction");
const axios = require('axios');
const mongoose = require("mongoose")
module.exports.get = (req, res) => {
    res.send("HEHEHE");
};

module.exports.get_all = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ message: 'Error fetching categories' });
    }
};

module.exports.create_category = async (req, res) => {
    try {
        // After checking if user is authorized

        const newCategory = new Category({
            Name: req.body.Name,
            UserId: req.body.UserId,
        });

        const savedCategory = await newCategory.save();
        console.log("New Category added to the Database");
        res.status(200).json({ id: savedCategory._id });
    } catch (err) {
        if (err.name === 'ValidationError') {
            // Log validation errors
            for (const field in err.errors) {
                console.log(field);
                console.log(err.errors[field].message);
            }
        } else {
            console.log(err);
        }
        res.status(400).json({ message: 'Error creating category' });
    }
};

module.exports.update_category = async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            req.body._id,
            { Name: req.body.new_name }, // Only update the Name field
            { new: true } // Option to return the updated document
        );

        if (updatedCategory) {
            console.log("Category Updated:", updatedCategory);
            res.status(200).json(updatedCategory);
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Error updating category' });
    }
};
module.exports.delete_category = (req, res) => {
    const oldCategoryId = req.body._id;
    const newCategoryId = new mongoose.Types.ObjectId(null);

    Category.findById(oldCategoryId)
        .then(category => {
            if (!category) {
                console.log(`Category with ID ${oldCategoryId} not found.`);
                return res.status(404).json({ error: 'Category not found' });
            }

            // If the category exists, proceed to delete it
            return Category.deleteOne({ _id: oldCategoryId })
                .then(() => {
                    console.log(`Category with ID ${oldCategoryId} deleted.`);

                    // Update all transactions where category_id equals oldCategoryId
                    return Transaction.updateMany(
                        { category_id: oldCategoryId },
                        { $set: { category_id: newCategoryId } }
                    );
                })
                .then(result => {
                    console.log(result);
                    res.status(200).json({
                        message: `Category deleted updated Transactions`,
                    });
                });
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(500).json({ error: 'An error occurred while processing the request' });
        });
};
