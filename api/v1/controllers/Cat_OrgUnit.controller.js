const OrgUnitModel = require("../models/Cat_OrgUnit.model");

module.exports.getAll = async (req, res) => {
  try {
    const result = await OrgUnitModel.find({});
    return res.status(200).json(result);
  } catch (err) {
    return res.sendStatus(403);
  }
};

module.exports.getByID = async (req, res) => {
  try {
    const { ID } = req.params;
    const result = await OrgUnitModel.findOne({ OrgstructureID: ID });
    return res.status(200).json(result);
  } catch (err) {
    return res.sendStatus(403);
  }
};

module.exports.getWithFilter = async (req, res) => {
  try {
    const filter = req.query;
    const result = await OrgUnitModel.find(filter);
    return res.status(200).json(result);
  } catch (err) {
    return res.sendStatus(403);
  }
};

module.exports.update = async (req, res) => {
  try {
    const { ID } = req.params;
    const { data } = req.body;
    const result = OrgUnitModel.findOneAndUpdate({ ID: ID }, data);
    return res.status(200).json(result);
  } catch (err) {
    return res.sendStatus(403);
  }
};

module.exports.create = async (req, res) => {
  try {
    const { data } = req.body;
    const result = await OrgUnitModel.create({ data });
    return res.status(200).json(result);
  } catch (err) {
    return res.sendStatus(403);
  }
};

module.exports.delete = async (req, res) => {
  try {
    const { ID } = req.params;
    const result = await OrgUnitModel.findOneAndUpdate(
      { ID: ID },
      { IsDelete: true },
    );
    res.status(200).json(result);
  } catch (err) {
    return res.sendStatus(403);
  }
};
