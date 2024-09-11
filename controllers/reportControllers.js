const mongoose = require("mongoose");
const Transaction = require("../models/transaction");
const Category = require("../models/category");

module.exports.get_report = async (req, res) => {
  try {
    const userId = req.body.UserId; 
    const userCategories = await Category.find({ UserId: userId });
    const transactionSums = await Transaction.aggregate([
      {
        $match: { UserId: userId  }
      },
      {
        $group: {
          _id: {
            Category_id: "$Category_id",
            Category_name: "$Category_name"
          },
          expenditure: {
            $sum: {
              $cond: [{ $eq: ["$Type", false] }, "$Amount", 0]
            }
          },
          income: {
            $sum: {
              $cond: [{ $eq: ["$Type", true] }, "$Amount", 0]
            }
          }
        }
      }
    ]);

   
    const report = userCategories.map(category => {
      const transactionSum = transactionSums.find(sum => sum._id.Category_id.toString() === category._id.toString()) || { expenditure: 0, savings: 0 };
      return {
        categoryId: category._id,
        categoryName: category.Name,
        expenditure: transactionSum.expenditure,
        income: transactionSum.income
      };
    });

    // Send the report as the response
    res.status(200).json(report);

  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
module.exports.get_report_custom_dates = async (req, res) => {
  try {
    const userId = req.body.UserId;
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);     

    console.log(startDate);
    console.log(endDate);

    // Ensure startDate and endDate are valid
    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Invalid date range provided.' });
    }

    const userCategories = await Category.find({ UserId: userId });

    const transactionSums = await Transaction.aggregate([
      {
        $match: {
          UserId: userId,
          created: {
            $gte: startDate, 
            $lte: endDate 
          }
        }
      },
      {
        $group: {
          _id: {
            Category_id: "$Category_id",
            Category_name: "$Category_name"
          },
          expenditure: {
            $sum: {
              $cond: [{ $eq: ["$Type", false] }, "$Amount", 0]
            }
          },
          income: {
            $sum: {
              $cond: [{ $eq: ["$Type", true] }, "$Amount", 0]
            }
          }
        }
      }
    ]);

    const report = userCategories.map(category => {
      const transactionSum = transactionSums.find(sum => sum._id.Category_id.toString() === category._id.toString()) || { expenditure: 0, income: 0 };
      return {
        categoryId: category._id,
        categoryName: category.Name,
        expenditure: transactionSum.expenditure,
        income: transactionSum.income
      };
    });

    // Send the report as the response
    res.status(200).json(report);

  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
