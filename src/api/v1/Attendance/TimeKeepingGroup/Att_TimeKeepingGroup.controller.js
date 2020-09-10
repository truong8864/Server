const mongoose = require("mongoose");
const qs = require("qs");
const httpStatus = require("http-status");

const Att_TimeKeepingGroupModel = require("../../../../../api/v1/models/Att_TimeKeepingGroup.model"); //Model Outside Folder
const BaseController = require("../../utils/BaseController");

const Hre_ProfileModel = require("../../../../../api/v1/models/Hre_Profile.model"); //Model Outside Folder

const SalaryModel = require("../../../../../api/v1/models/Att_Salary.model"); //Model Outside Folder

class Att_TimeKeepingGroupController extends BaseController {
  constructor(Model = {}) {
    if (Model.schema instanceof mongoose.Schema) {
      super(Model);
      return this;
    }
    super(Att_TimeKeepingGroupModel);
  }

  get = async (req, res, next) => {
    try {
      const {
        filters = {},
        sort = { _id: -1 },
        fields = { BlaBla: 0 },
      } = qs.parse(req.query, {
        allowDots: true,
      });

      const isAll = parseInt(req.query.all || 0, { allowDots: true });

      const page = parseInt(req.query.page || 1);
      const perPage = parseInt(req.query.limit || 25);

      if (filters.KiCong) {
        filters.KiCong = `${(
          "0" +
          (new Date(filters.KiCong).getMonth() + 1)
        ).slice(-2)}/${new Date(filters.KiCong).getFullYear()}`;
      }
      if (isAll) {
        const data = await this.Model.aggregate([
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
              OrgStructureID: {
                $arrayElemAt: ["$Profile.OrgStructureID", 0],
              },
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
          {
            $match: filters,
          },
          {
            $sort: sort,
          },
          {
            $project: fields,
          },
        ]);

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
          $lookup: {
            from: "hre_profiles",
            localField: "ProfileID",
            foreignField: "ID",
            as: "Profile",
          },
        },
        {
          $addFields: {
            OrgStructureID: {
              $arrayElemAt: ["$Profile.OrgStructureID", 0],
            },
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
          $facet: {
            data: [
              {
                $skip: (page - 1) * perPage,
              },
              {
                $limit: perPage,
              },
            ],
            totalDocuments: [
              {
                $group: {
                  _id: null,
                  count: { $sum: 1 },
                },
              },
            ],
          },
        },
      ]);

      if (0 === data[0].data.length) {
        return res.status(httpStatus.RESET_CONTENT).json({
          method: "GET",
          path: req.originalUrl,
        });
      }

      const totalDocuments = data[0].totalDocuments[0].count;
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
        data: data[0].data,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  payroll = async (req, res, next) => {
    try {
      const { KiCong, ...filter } = req.query;

      const GioCong1Ngay = 9 * 60 * 60 * 1000;

      const result = await Att_TimeKeepingGroupModel.aggregate([
        {
          $match: {
            ...filter,
            KiCong: KiCong,
          },
        },
        {
          $lookup: {
            from: "hre_contracts",
            localField: "ProfileID",
            foreignField: "ProfileID",
            as: "Contract",
          },
        },
        {
          $match: {
            "Contract.Status": "E_APPROVED",
          },
        },
        {
          $addFields: {
            ContractNew: {
              $arrayElemAt: [
                {
                  $filter: {
                    input: "$Contract",
                    as: "item",
                    cond: {
                      $eq: [
                        "$$item.DateSigned",
                        { $max: "$Contract.DateSigned" },
                      ],
                    },
                  },
                },
                0,
              ],
            },
          },
        },

        {
          $project: {
            _id: 0,
            ProfileID: 1,
            KiCong: 1,
            SalaryContract: "$ContractNew.Salary",
            CodeEmp: 1,
            CodeAttendance: 1,
            OrgStructureID: 1,
            Salary: {
              $multiply: [
                {
                  $ceil: {
                    $divide: [
                      {
                        $cond: {
                          if: {
                            $lte: ["$TotalKeepingReality", 26 * GioCong1Ngay],
                          },
                          then: {
                            $multiply: [
                              "$ContractNew.Salary",
                              {
                                $divide: [
                                  "$TotalKeepingReality",
                                  26 * GioCong1Ngay,
                                ],
                              },
                            ],
                          },
                          else: {
                            $multiply: [
                              "$ContractNew.Salary",
                              {
                                $divide: [
                                  {
                                    $multiply: [
                                      {
                                        $subtract: [
                                          "$TotalKeepingReality",
                                          26 * GioCong1Ngay,
                                        ],
                                      },
                                      1.5,
                                    ],
                                  },
                                  26,
                                ],
                              },
                            ],
                          },
                        },
                      },

                      100,
                    ],
                  },
                },
                100,
              ],
            },
            TotalKeepingReality: 1,
          },
        },
        {
          $merge: {
            into: "att_salaries",
            on: ["ProfileID", "KiCong"],
            // whenMatched:"keepExisting",
            whenMatched: "replace",
            whenNotMatched: "insert",
          },
        },
      ]);

      const data = await SalaryModel.aggregate([
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
        ms: "PAYROLL",
        data: data,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

module.exports = Att_TimeKeepingGroupController;
