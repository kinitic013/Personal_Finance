const { default: mongoose } = require("mongoose");
const Saving = require("../models/saving");
const Transaction = require("../models/transaction");

module.exports.get_all = async (req, res) => {
  try {
      const savings = await Saving.find();
      res.status(200).json(savings);
  } catch (error) {
      console.error('Error fetching savings:', error);
      res.status(500).json({ message: 'Error fetching savings' });
  }
};

module.exports.create_saving = (req, res) => {
  const newSaving = new Saving({
    TargetAmount: req.body.TargetAmount,
    TargetDate: req.body.TargetDate,
    Description: req.body.Description,
    UserId: req.body.UserId,
    created : Date.now()
  });

  newSaving.save()
    .then(savedSaving => {
      res.status(201).json(savedSaving);
    })
    .catch(error => {
      res.status(400).json({ message: error.message });
    });
};

module.exports.update_saving = (req, res) => {
  Saving.findByIdAndUpdate(
    req.body._id,
    {
      TargetAmount: req.body.TargetAmount,
      TargetDate: req.body.TargetDate,
      Description: req.body.Description,
      UserId: req.body.UserId,
    },
    { new: true }
  )
    .then(updatedSaving => {
      res.json(updatedSaving);
    })
    .catch(error => {
      res.status(400).json({ message: error.message });
    });
};

// Delete
module.exports.delete_saving = (req, res) => {
  Saving.findByIdAndDelete(req.body._id)
    .then(() => {
      res.json({ message: 'Saving deleted successfully' });
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
};


module.exports.status = async (req, res) => {
  try {
    const userId = req.body.UserId;
    const _id = req.body._id;

    const current_saving = await Saving.findById(_id);
    if (!current_saving) {
      return res.status(400).json({
        "message": "Saving not found"
      });
    }
    console.log(current_saving);

    const startDate = new Date("2000-01-01");
    const endDate = new Date(current_saving.TargetDate);     

    console.log('userId:', userId);
    console.log('startDate:', startDate);
    console.log('endDate:', endDate);

    // Ensure startDate and endDate are valid
    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Invalid date range provided.' });
    }
    const totalSums = await Transaction.aggregate([
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
          _id: null,
          totalExpenditure: {
            $sum: {
              $cond: [{ $eq: ["$Type", false] }, "$Amount", 0]
            }
          },
          totalIncome: {
            $sum: {
              $cond: [{ $eq: ["$Type", true] }, "$Amount", 0]
            }
          }
        }
      }
    ]);
    const report = totalSums.length > 0 ? {
      totalExpenditure: totalSums[0].totalExpenditure,
      totalIncome: totalSums[0].totalIncome
    } : {
      totalExpenditure: 0,
      totalIncome: 0
    };
    res.status(200).json(report);

  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};