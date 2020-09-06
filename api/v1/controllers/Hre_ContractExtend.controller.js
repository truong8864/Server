const Hre_ContractExtendModel = require("../models/Hre_ContractExtend.model");

module.exports.get = async (req, res) => {
  try {
    const filter = req.query;
    const data = await Hre_ContractExtendModel.aggregate([
      {
        $lookup: {
          from: "hre_contracts",
          localField: "ContractID",
          foreignField: "ID",
          as: "Contract",
        },
      },
      {
        $addFields: {
          ProfileID: { $arrayElemAt: ["$Contract.ProfileID", 0] },
        },
      },
      {
        $lookup: {
          from: "hre_profiles",
          localField: "ProfileID",
          foreignField: "ID",
          as: "Profile",
        },
      },
      {
        $addFields: {
          CodeEmp: { $arrayElemAt: ["$Profile.CodeEmp", 0] },
          ProfileName: { $arrayElemAt: ["$Profile.ProfileName", 0] },
          OrgStructureID: { $arrayElemAt: ["$Profile.OrgStructureID", 0] },
        },
      },
      {
        $project: {
          Contract: 0,
          Profile: 0,
        },
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
        $addFields: {
          OrgStructureName: {
            $arrayElemAt: ["$OrgStructure.OrgStructureName", 0],
          },
        },
      },
      {
        $project: {
          Contract: 0,
          Profile: 0,
          OrgStructure: 0,
        },
      },
      {
        $match: filter,
      },
    ]);
    res.json({ mesage: "SUCCESS", data });
  } catch (error) {
    res.json(403);
  }
};

module.exports.getByID = async (req, res) => {
  try {
    const { ID } = req.params;
    const data = await Hre_ContractExtendModel.findById(ID);
    res.json({ mesage: "SUCCESS", data });
  } catch (error) {
    res.json(403);
  }
};

module.exports.create = async (req, res) => {
  try {
    const data = req.body;
    const result = await Hre_ContractExtendModel.create({
      ...data,
      DateCreate: Date.now(),
      DateUpdate: Date.now(),
      Status: "E_WAITING",
    });
    const resultData = await Hre_ContractExtendModel.aggregate([
      {
        $match: result,
      },
      {
        $lookup: {
          from: "hre_contracts",
          localField: "ContractID",
          foreignField: "ID",
          as: "Contract",
        },
      },
      {
        $addFields: {
          ProfileID: { $arrayElemAt: ["$Contract.ProfileID", 0] },
        },
      },
      {
        $lookup: {
          from: "hre_profiles",
          localField: "ProfileID",
          foreignField: "ID",
          as: "Profile",
        },
      },
      {
        $addFields: {
          ProfileName: { $arrayElemAt: ["$Profile.ProfileName", 0] },
          CodeEmp: { $arrayElemAt: ["$Profile.CodeEmp", 0] },
          OrgStructureID: { $arrayElemAt: ["$Profile.OrgStructureID", 0] },
        },
      },
      {
        $project: {
          Contract: 0,
          Profile: 0,
        },
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
        $addFields: {
          OrgStructureName: {
            $arrayElemAt: ["$OrgStructure.OrgStructureName", 0],
          },
        },
      },
      {
        $project: {
          Contract: 0,
          Profile: 0,
          OrgStructure: 0,
        },
      },
    ]);
    res.json({ mesage: "SUCCESS", data: resultData[0] });
  } catch (error) {
    res.json(403);
  }
};

module.exports.update = async (req, res) => {
  try {
    const { ID } = req.params;
    const data = req.body;
    const result = findOneAndDelete(ID, data, { new: true });
    const resultData = await Hre_ContractExtendModel.aggregate([
      {
        $match: result,
      },
      {
        $lookup: {
          from: "hre_contracts",
          localField: "ContractID",
          foreignField: "ID",
          as: "Contract",
        },
      },
      {
        $addFields: {
          ProfileID: { $arrayElemAt: ["$Contract.ProfileID", 0] },
        },
      },
      {
        $lookup: {
          from: "hre_profiles",
          localField: "ProfileID",
          foreignField: "ID",
          as: "Profile",
        },
      },
      {
        $addFields: {
          ProfileName: { $arrayElemAt: ["$Profile.ProfileName", 0] },
          CodeEmp: { $arrayElemAt: ["$Profile.CodeEmp", 0] },
          OrgStructureID: { $arrayElemAt: ["$Profile.OrgStructureID", 0] },
        },
      },
      {
        $project: {
          Contract: 0,
          Profile: 0,
        },
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
        $addFields: {
          OrgStructureName: {
            $arrayElemAt: ["$OrgStructure.OrgStructureName", 0],
          },
        },
      },
      {
        $project: {
          Contract: 0,
          Profile: 0,
          OrgStructure: 0,
        },
      },
    ]);
    res.json({ mesage: "SUCCESS", data: resultData[0] });
  } catch (error) {
    res.json(403);
  }
};

module.exports.delete = async (req, res) => {
  try {
    const { ID } = req.params;
    const result = await Hre_ContractExtendModel.findByIdAndDelete(ID);
    res.status(200).json(result);
  } catch (err) {
    return res.sendStatus(403);
  }
};
