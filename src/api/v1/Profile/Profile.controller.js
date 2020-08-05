const Hre_ProfileModel = require("../models/Hre/Hre_Profile.model");

exports.get = async (req, res, next) => {
  try {
    const { filter } = req.body;
    const profiles = await Hre_ProfileModel.find(filter);
    res.json({ ms: "GET LiST PROFILE", data: profiles });
  } catch (error) {
    next(error);
  }
};

exports.getByCodeEmp = async (req, res, next) => {
  try {
    const { CodeEmp } = req.params;
    const profile = await Hre_ProfileModel.findOne({ CodeEmp: CodeEmp });
    res.json({ ms: "GET PROFILE", data: profile });
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { data } = req.body;
    const profile = await Hre_ProfileModel.create(data);
    res.json({ ms: "CREATE PROFILE", data: profile });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { data } = req.body;
    const { CodeEmp } = req.params;
    const profile = await Hre_ProfileModel.updateOne({ CodeEmp }, data);
    res.json({ ms: "UPDATE PROFILE", data: profile });
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { CodeEmp } = req.params;
    const profile = await Hre_ProfileModel.deleteOne({ CodeEmp });
    res.json({ ms: "DELETE PROFILE", data: profile });
  } catch (error) {
    next(error);
  }
};
