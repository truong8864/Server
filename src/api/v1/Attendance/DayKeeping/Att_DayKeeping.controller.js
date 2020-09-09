const mongoose = require("mongoose");
const qs = require("qs");
const httpStatus = require("http-status");

const Att_TimeKeepingDayModel = require("./Att_DayKeeping.model");
const BaseController = require("../../utils/BaseController");

const Hre_ProfileModel = require("../../../../../api/v1/models/Hre_Profile.model"); //Model Outside Folder

const Att_TimeKeepingGroupModel = require("../../../../../api/v1/models/Att_TimeKeepingGroup.model");

class Att_TimeKeepingDayController extends BaseController {
  constructor(Model = {}) {
    if (Model.schema instanceof mongoose.Schema) {
      super(Model);
      return this;
    }
    super(Att_TimeKeepingDayModel);
  }

  upload = async (req, res, next) => {
    try {
      const data = req.body;
      // Att_TimeKeepingDayModel.insertMany(data)
      // const result = await this.Model.insertMany(data);
      console.log(data);
      res.json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  get = async (req, res, next) => {
    try {
      const {
        filters = {},
        sort = { _id: -1 },
        fields = { BlaBla: 0 },
      } = qs.parse(req.query, {
        allowDots: true,
      });

      const DateKeeping = filters.DateKeeping;
      if (DateKeeping) {
        if (DateKeeping.$gte) {
          filters.DateKeeping.$gte = new Date(DateKeeping.$gte);
        }
        if (DateKeeping.$lte) {
          filters.DateKeeping.$lte = new Date(DateKeeping.$lte);
        }
      }

      const isAll = parseInt(req.query.all || 0, { allowDots: true });

      const page = parseInt(req.query.page || 1);
      const perPage = parseInt(req.query.limit || 25);

      if (isAll) {
        const data = await this.Model.find(filters).sort(sort).select(fields);

        if (0 >= data.length) {
          return res.status(httpStatus.RESET_CONTENT).json({
            method: "GET",
            path: req.originalUrl,
          });
        }

        const totalDocuments = data.length;
        const totalPages = Math.ceil(totalDocuments / perPage);

        return res.status(httpStatus.OK).json({
          method: "GET",
          path: req.originalUrl,
          meta: {
            page,
            perPage,
            totalDocuments,
            totalPages,
          },
          data,
        });
      }

      const data = await this.Model.aggregate([
        {
          $match: filters,
        },
        {
          $sort: sort,
        },
        {
          $project: fields,
        },
        {
          $skip: (page - 1) * perPage,
        },
        {
          $limit: perPage,
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
            CodeEmp: { $arrayElemAt: ["$Profile.CodeEmp", 0] },
            ProfileName: { $arrayElemAt: ["$Profile.ProfileName", 0] },
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
      ]);

      if (0 === data.length) {
        return res.status(httpStatus.RESET_CONTENT).json({
          method: "GET",
          path: req.originalUrl,
        });
      }

      const totalDocuments = await this.Model.find(filters)
        .sort(sort)
        .countDocuments();
      const totalPages = Math.ceil(totalDocuments / perPage);

      res.status(httpStatus.OK).json({
        method: "GET",
        path: req.originalUrl,
        meta: {
          page,
          perPage,
          totalDocuments,
          totalPages,
        },
        data,
      });
    } catch (error) {
      next(error);
    }
  };
  calculate = async (req, res, next) => {
    try {
      /**
       * TINH NGAY CONG
       */

      const { filters = {} } = qs.parse(req.query, {
        allowDots: true,
      });

      const DateKeeping = filters.DateKeeping;
      if (DateKeeping) {
        if (DateKeeping.$gte) {
          filters.DateKeeping.$gte = new Date(DateKeeping.$gte);
        }
        if (DateKeeping.$lte) {
          filters.DateKeeping.$lte = new Date(DateKeeping.$lte);
        }
      }

      const result = await this.Model.updateMany(
        { ...filters, Status: "CHUA_TINH_CONG" },
        [
          {
            $set: {
              Status: "DA_TINH_CONG",
              Total: { $subtract: ["$TimeOut", "$TimeIn"] },
            },
          },
        ],
      );
      res.json({
        method: "GET",
        path: req.originalUrl,
        message: "TINH_CONG",
      });
    } catch (error) {
      next(error);
    }
  };

  synthesis = async (req, res, next) => {
    try {
      const { KiCong, OrgStructureID } = req.body;

      const [Month, Year] = KiCong.split("/");

      const TimeFrom = new Date(`${Month}/01/${Year}`);
      const TimeTo = new Date(TimeFrom);
      TimeTo.setMonth(TimeTo.getMonth() + 1);
      const GioCong1Ngay = 9;

      const data = await this.Model.aggregate([
        {
          $match: {
            Status: "DA_TINH_CONG",
            OrgStructureID: OrgStructureID,
            DateKeeping: {
              $gte: TimeFrom,
              $lt: TimeTo,
            },
          },
        },
        {
          $group: {
            _id: {
              ProfileID: "$ProfileID",
              OrgStructureID: "$OrgStructureID",
              CodeEmp: "$CodeEmp",
              CodeAttendance: "$CodeAttendance",
            },
            SumKeeping: { $sum: "$Total" },
          },
        },
        {
          $project: {
            _id: 0,
            ProfileID: "$_id.ProfileID",
            OrgStructureID: "$_id.OrgStructureID",
            CodeAttendance: "$_id.CodeAttendance",
            CodeEmp: "$_id.CodeEmp",
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
            KiCong: KiCong,
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
                GioCong1Ngay * 60 * 60 * 1000,
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
                GioCong1Ngay * 60 * 60 * 1000,
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

      res.json({
        method: "POST",
        path: req.originalUrl,
        status: "SUCCESSS",
        message: "TONG_HOP_CONG",
      });
    } catch (error) {
      console.log("ATT_DAYKEEPING_CONTROLLER", error);
      next(error);
    }
  };
}

module.exports = Att_TimeKeepingDayController;
