const Hre_ProfileModel = require("../models/Hre_Profile.model");
const Hre_ContractModel = require("../models/Hre_Contract.model");

//nhân viên chưa có hợp đồng
module.exports.NotYet_THrProfile = async function (req, res) {
  try {
    const contract = await Hre_ContractModel.distinct("ProfileID");
    const NotYet = await Hre_ProfileModel.find({
      ProfileID: { $nin: contract },
    });
    return res.json({
      result: NotYet,
    });
  } catch (err) {
    return res.sendStatus(403);
  }
};

module.exports.get = async (req, res) => {
  try {
    const filter = req.query;
    if (filter.DateHire) {
      if (filter.DateHire.$lte) {
        filter.DateHire.$lte = new Date(filter.DateHire.$lte);
      }
      if (filter.DateHire.$gt) {
        filter.DateHire.$gt = new Date(filter.DateHire.$gt);
      }
    }
    const result = await Hre_ProfileModel.aggregate([
      {
        $match: filter,
      },
      {
        $lookup: {
          from: "cat_orgstructures",
          localField: "OrgStructureID",
          foreignField: "ID",
          as: "OrgStructure",
        },
      },
      {
        $lookup: {
          from: "cat_positions",
          localField: "PositionID",
          foreignField: "ID",
          as: "Position",
        },
      },
      { $unwind: { path: "$OrgStructure", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$Position", preserveNullAndEmptyArrays: true } },
      {
        $addFields: {
          OrgStructureName: "$OrgStructure.OrgStructureName",
          PositionName: "$Position.PositionName",
        },
      },
      {
        $project: {
          Position: 0,
          OrgStructure: 0,
        },
      },
    ]).limit(30)

    // const result = await Hre_ProfileModel.find(filter)
    //   .populate({
    //     path: "OrgStructure",
    //     select: { _id: 0, OrgStructureName: 1, Code: 1 },
    //     justOne: true,
    //   })
    //   .populate({
    //     path: "Position",
    //     select: { PositionName: 1 },
    //     justOne: true,
    //   });
    return res.status(200).json(result);
  } catch (err) {
    return res.sendStatus(403);
  }
};
module.exports.Retired = async (req, res) => {
  const today = new Date();
  today.setFullYear(today.getFullYear() - 40);
  console.log(today);
  try {
    const result = await Hre_ProfileModel.find({
      DateOfBirth: { $lte: today },
    });
    return res.status(200).json(result);
  } catch (err) {
    return res.sendStatus(403);
  }
};

module.exports.getByID = async (req, res) => {
  try {
    const { ID } = req.params;
    const result = await Hre_ProfileModel.findOne({ ID: ID });
    return res.status(200).json(result);
  } catch (err) {
    return res.sendStatus(403);
  }
};

module.exports.update = async (req, res) => {
  try {
    const { ID } = req.params;
    const data = req.body;
    console.log(data);
    const result = await Hre_ProfileModel.findOneAndUpdate({ ID: ID }, data, {
      new: true,
    });
    return res.status(200).json(result);
  } catch (err) {
    return res.sendStatus(403);
  }
};

module.exports.create = async (req, res) => {
  try {
    const { data } = req.body;
    const result = await Hre_ProfileModel.create({ data });
    return res.status(200).json(result);
  } catch (err) {
    return res.sendStatus(403);
  }
};

module.exports.delete = async (req, res) => {
  try {
    const { ID } = req.params;
    const result = await Hre_ProfileModel.findOneAndDelete(
      { ID: ID },
      { IsDelete: true },
    );
    return res.status(200).json(result);
  } catch (err) {
    return res.sendStatus(403);
  }
};
