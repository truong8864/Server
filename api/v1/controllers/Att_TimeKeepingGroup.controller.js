const Att_TimeKeepingGroupModel = require("../models/Att_TimeKeepingGroup.model");

const Hre_ProfileModel = require("../models/Hre_Profile.model");

//get du lieu tong hop cong
module.exports.get = async (req, res) => {
  try {
    const filter = req.query;
    const result = await Att_TimeKeepingGroupModel.aggregate([
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
          OrgStructure: 0,
          Profile: 0,
        },
      },
      {
        $match: filter,
      },
    ]);

    return res.json({
      ms: "GET TIMEKEEPING GROUP",
      data: result,
    });
  } catch (err) {
    console.log(err);
    return res.sendStatus(403);
  }
};

module.exports.update = async (req, res) => {
  try {
    const { ID } = req.params;
    const data = req.body;
    const result = await Att_TimeKeepingGroupModel.findOneAndUpdate(
      { _id: ID },
      { ...data },
      { new: true },
    );
    const resultData = await Att_TimeKeepingGroupModel.aggregate([
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

module.exports.delete = async (req, res) => {
  try {
    const { ID } = req.params;
    const result = await Att_TimeKeepingGroupModel.findByIdAndDelete(ID);
    res.status(200).json(result);
  } catch (err) {
    return res.sendStatus(403);
  }
};

module.exports.synthesis = async (req, res) => {
  try {
    let { KiCong, ...filter } = req.body;

    KiCong = KiCong
      ? KiCong
      : `${("0" + (new Date().getMonth() + 1)).slice(
          -2,
        )}/${new Date().getFullYear()}`;

    const TimeFrom = new Date(`${KiCong.slice(0, 2)}/01/${KiCong.slice(3)}`);

    TimeFrom.setDate(TimeFrom.getDate() + 1);
    const TimeTo = new Date(TimeFrom);
    TimeTo.setMonth(new Date(TimeTo).getMonth() + 1);

    const result = await Hre_ProfileModel.aggregate([
      {
        $match: filter,
      },
      {
        $project: {
          _id: 0,
          ProfileID: 1,
        },
      },
      {
        $lookup: {
          from: "att_timekeepingdays",
          localField: "ID",
          foreignField: "ProfileID",
          as: "TimeKeepingDay",
        },
      },
      {
        $addFields: {
          TimeKeeping: {
            $filter: {
              input: "$TimeKeepingDay",
              as: "item",
              cond: {
                $and: [
                  { $gte: ["$$item.DateKeeping", TimeFrom] },
                  { $lt: ["$$item.DateKeeping", TimeTo] },
                ],
              },
            },
          },
        },
      },
      {
        $addFields: {
          KiCong: KiCong,
          SumKeeping: {
            $reduce: {
              input: "$TimeKeeping",
              initialValue: 0,
              in: { $add: ["$$value", "$$this.Total"] },
            },
          },
        },
      },
      {
        $project: {
          KiCong: 1,
          ProfileID: 1,
          SumKeeping: 1,
        },
      },
      {
        $lookup: {
          from: "att_leavedays",
          localField: "ProfileID",
          foreignField: "ProfileID",
          as: "LeaveDay",
        },
      },
      {
        $addFields: {
          Year: TimeFrom.getFullYear(),
          Month: TimeFrom.getMonth() + 1,
          UnSabbaticalLeave: {
            $multiply: [
              {
                $size: {
                  $filter: {
                    input: "$LeaveDay",
                    as: "leaveday",
                    cond: { $eq: ["$$leaveday.LeaveDayType", "KHONG_PHEP"] },
                  },
                },
              },
              9 * 60 * 60 * 1000,
            ],
          },
          SabbaticalLeave: {
            $multiply: [
              {
                $size: {
                  $filter: {
                    input: "$LeaveDay",
                    as: "leaveday",
                    cond: { $eq: ["$$leaveday.LeaveDayType", "CO_PHEP"] },
                  },
                },
              },
              9 * 60 * 60 * 1000,
            ],
          },
        },
      },
      {
        $project: {
          LeaveDay: 0,
        },
      },
      {
        $addFields: {
          TotalKeepingReality: {
            $add: ["$SumKeeping", "$SabbaticalLeave"],
          },
        },
      },

      {
        $merge: {
          into: "att_timekeepinggroups",
          on: ["ProfileID", "KiCong"],
          // whenMatched:"keepExisting",
          whenMatched: "replace",
          whenNotMatched: "insert",
        },
      },
    ]);

    const data = await Att_TimeKeepingGroupModel.aggregate([
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
        $project: {
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
          OrgStructure: 0,
        },
      },
      {
        $match: { ...filter, KiCong: KiCong },
      },
    ]);
    res.json({
      message: "TONG_HOP_CONG",
      data,
    });
  } catch (err) {
    console.log(err);
    return res.sendStatus(403);
  }
};
