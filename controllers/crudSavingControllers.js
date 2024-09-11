const Saving = require("../models/saving");


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
    UserId: req.body.UserId
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
      UserId: req.body.UserId
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