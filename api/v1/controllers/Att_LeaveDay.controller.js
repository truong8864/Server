const Att_LeaveDayModel = require("../models/Att_LeaveDay.model");
const Hre_ProfileModel = require("../models/Hre_Profile.model");

module.exports.create = async (req, res) => {
  try {
    const { CodeEmp, ...data } = req.body;

    const DayLeave = new Date(data.DayLeave);
    DayLeave.setMilliseconds(0);
    DayLeave.setSeconds(0);
    DayLeave.setMinutes(0);
    DayLeave.setHours(0);
    const Profile = await Hre_ProfileModel.findOne({ CodeEmp: CodeEmp });
    const result = await Att_LeaveDayModel.create({
      ...data,
      DayLeave: DayLeave,
      ProfileID: Profile.ProfileID,
      Status: "CHUA_DUYET",
    });

    const resultData = await Att_LeaveDayModel.aggregate([
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
    const result = await Att_LeaveDayModel.findOneAndUpdate(
      { _id: ID },
      { ...data, Status: "CHUA_TINH_CONG" },
      { new: true },
    );
    const resultData = await Att_LeaveDayModel.aggregate([
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

module.exports.get = async (req, res) => {
  try {
    const filter = req.query;

    if (filter.DateLeave) {
      if (filter.DateLeave["$gte"]) {
        filter.DateLeave["$gte"] = new Date(filter.DateLeave["$gte"]);
      }
      if (filter.DateLeave["$lte"]) {
        filter.DateLeave["$lte"] = new Date(filter.DateLeave["$lte"]);
      }
    }

    const data = await Att_LeaveDayModel.aggregate([
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
      ms: "GET LEAVE DAY",
      data,
    });
  } catch (err) {
    console.log(err);
    return res.sendStatus(403);
  }
};

module.exports.delete = async (req, res) => {
  try {
    const { ID } = req.params;
    const result = await Att_LeaveDayModel.findByIdAndDelete(ID);
    res.status(200).json(result);
  } catch (err) {
    return res.sendStatus(403);
  }
};
