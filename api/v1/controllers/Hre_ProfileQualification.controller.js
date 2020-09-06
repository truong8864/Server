const Hre_ProfileQualificationModel = require("../modelsnew/models/Hre_ProfileQualification.model");

module.exports.get = async (req, res) => {
  try {
    const filter = req.query;
    const result = await Hre_ProfileQualificationModel.find(filter);
    return res.status(200).json(result);
  } catch (err) {
    return res.sendStatus(403);
  }
};
module.exports.getByID = async (req, res) => {
  try {
    const { ID } = req.params;
    const result = await Hre_ProfileQualificationModel.find({ ProfileID: ID });
    return res.status(200).json(result);
  } catch (err) {
    return res.sendStatus(403);
  }
};

module.exports.create = async (req, res) => {
  try {
    const data = req.body;
    const result = await Hre_ProfileQualificationModel.create(data);
    return res.status(200).json(result);
  } catch (err) {
    return res.sendStatus(403);
  }
};
module.exports.update = async (req, res) => {
  try {
    const { ID } = req.params;
    const data = req.body;
    const result = await Hre_ProfileQualificationModel.findOneAndUpdate(
      { ProfileID: ID },
      data,
      {
        new: true,
      },
    );
    return res.status(200).json(result);
  } catch (err) {
    return res.sendStatus(403);
  }
};
