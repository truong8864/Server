const mongoose = require("mongoose");
const Hre_ProfileModel = require("./Hre_Profile.model");

const OrgStructureModel = require("../../Category/OrgStructure/Cat_OrgStructure.model");
const PositionModel = require("../../Category/Position/Cat_Position.model");

const BaseController = require("../../utils/BaseController");

class Hre_ProfileController extends BaseController {
  constructor(Model = {}) {
    if (Model.schema instanceof mongoose.Schema) {
      super(Model);
      return this;
    }
    super(Hre_ProfileModel);
  }

  TONGHOP = async (req, res, next) => {
    const data = await Hre_ProfileModel.find(
      {
        $expr: { $eq: [{ $toString: { $year: "$DateHire" } }, "2019"] },
        $expr: { $eq: [{ $toString: { $month: "$DateHire" } }, "1"] },
      },
      // $expr: { $eq: [{ $toString: { $year: "$DateHire" } }, "2019"] },
    ).limit(10);
    // const data = await Hre_ProfileModel.aggregate([
    //   {
    //     $match: {
    //       $expr: { $eq: [{ $year: "$DateHire" }, 2020] },
    //     },
    //   },
    //   {
    //     $limit: 10,
    //   },
    // ]);
    res.json({ ms: "TONG HOP", data });
  };
}

module.exports = Hre_ProfileController;
