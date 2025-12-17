const Model = require('../models/Model');

exports.getAllModels = async (req, res) => {
  try {
    const models = await Model.find();
    res.json(models);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createModel = async (req, res) => {
  try {
    const model = new Model(req.body);
    await model.save();
    res.status(201).json(model);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};