const PositionModel = require("../models/Cat_Position.model");

module.exports.getAll = async (req, res) => {
  try {
    const result = await PositionModel.find({});
    return res.status(200).json(result);
  } catch (err) {
    return res.sendStatus(403);
  }
};

module.exports.getByID = async (req, res) => {
  try {
    const { ID } = req.params;
    const result = await PositionModel.find({ ID: ID });
    return res.status(200).json(result);
  } catch (err) {
    return res.sendStatus(403);
  }
};

module.exports.getWithFilter = async (req, res) => {
  try {
    const filter = req.query;
    const result = await PositionModel.find(filter);
    return res.status(200).json(result);
  } catch (err) {
    return res.sendStatus(403);
  }
};

module.exports.update = async (req, res) => {
  try {
    const { ID } = req.params;
    const { data } = req.body;
    const result = PositionModel.findOneAndUpdate({ ID: ID }, data);
    return res.status(200).json(result);
  } catch (err) {
    return res.sendStatus(403);
  }
};

module.exports.create = async (req, res) => {
  try {
    const { data } = req.body;
    const result = await PositionModel.create({ data });
    return res.status(200).json(result);
  } catch (err) {
    return res.sendStatus(403);
  }
};

module.exports.delete = async (req, res) => {
  try {
    const { ID } = req.params;

    const result = await PositionModel.findOneAndUpdate(
      { ID: ID },
      { IsDelete: true },
    );
    return res.status(200).json(result);
  } catch (err) {
    return res.sendStatus(403);
  }
};
