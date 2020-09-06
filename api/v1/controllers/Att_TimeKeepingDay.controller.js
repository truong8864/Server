const Att_TimeKeepingDayModel = require("../models/Att_TimeKeepingDay.model");
const Hre_ProfileModel = require("../models/Hre_Profile.model");

//Them ddu llieu cham cong
module.exports.create = async (req, res) => {
  try {
    const { CodeEmp, ...data } = req.body;
   // console.log(CodeEmp)
    const Profile = await Hre_ProfileModel.findOne({ CodeEmp: CodeEmp });
    console.log(Profile)

    const result = await Att_TimeKeepingDayModel.create({
      ...data,
      ProfileID: Profile.ID,
      TimeKeepingType: "BANG_TAY",
      Status: "CHUA_TINH_CONG",
    });
    console.log(result)

    const resultData = await Att_TimeKeepingDayModel.aggregate([
      {
        $match: result,
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
        },
      },
      {
        $project: {
          Profile: 0,
        },
      },
    ]);
    return res.status(200).json({ data: resultData[0] });
  } catch (err) {
    console.log(err);
    return res.sendStatus(403);
  }
};

module.exports.update = async (req, res) => {
  try {
    const { ID } = req.params;
    const data = req.body;
    const result = await Att_TimeKeepingDayModel.findOneAndUpdate(
      { _id: ID },
      { ...data, Status: "CHUA_TINH_CONG" },
      { new: true },
    );
    const resultData = await Att_TimeKeepingDayModel.aggregate([
      {
        $match: result,
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
          Profile: 0,
          OrgStructure: 0,
        },
      },
    ]);
    return res.status(200).json({ data: resultData[0] });
  } catch (err) {
    return res.sendStatus(403);
  }
};

//get du lieu cham cong
module.exports.get = async (req, res) => {
  try {
    const filter = req.query;

    if (filter.DateKeeping) {
      if (filter.DateKeeping["$gte"]) {
        filter.DateKeeping["$gte"] = new Date(filter.DateKeeping["$gte"]);
      }
      if (filter.DateKeeping["$lte"]) {
        filter.DateKeeping["$lte"] = new Date(filter.DateKeeping["$lte"]);
      }
    }

    const data = await Att_TimeKeepingDayModel.aggregate([
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
          OrgStructureID: { $arrayElemAt: ["$Profile.OrgStructureID", 0] },
          CodeEmp: { $arrayElemAt: ["$Profile.CodeEmp", 0] },
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
          OrgStructure: 0,
          Profile: 0,
        },
      },
      {
        $match: filter,
      },
    ]);
    return res.json({
      ms: "GET TIME KEEPING DAY",
      data,
    });
  } catch (err) {
    console.log(err);
    return res.sendStatus(403);
  }
};

module.exports.import = async (req, res) => {
  try {
    const dataImport = req.body.map((item) => {
      return {
        ...item,
        DateKeeping: new Date(item.DateKeeping),
        TimeIn: new Date(item.TimeIn),
        TimeOut: new Date(item.TimeOut),
        Status: "CHUA_TINH_CONG",
        TimeKeepingType: "BANG_TAY",
      };
    });
    await Att_TimeKeepingDayModel.insertMany(dataImport);
    res.json({ ms: "IMPORT_THANH_CONG" });
  } catch (error) {
    console.log(error);
    res.json(403);
  }
};

module.exports.delete = async (req, res) => {
  try {
    const { ID } = req.params;
    const result = await Att_TimeKeepingDayModel.findByIdAndDelete(ID);
    res.status(200).json(result);
  } catch (err) {
    return res.sendStatus(403);
  }
};

module.exports.calculate = async (req, res) => {
  try {
    const { listCalculate } = req.body;
    await Att_TimeKeepingDayModel.update(
      { _id: { $in: listCalculate } },
      [
        {
          $set: {
            Total: { $subtract: ["$TimeOut", "$TimeIn"] },
            Status: "DA_TINH_CONG",
          },
        },
      ],
      { multi: true },
    );

    res.json({ ms: "FINISHED" });
  } catch (error) {
    console.log(error);
    res.json(403);
  }
};
