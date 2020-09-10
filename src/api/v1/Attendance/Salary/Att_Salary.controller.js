const mongoose = require("mongoose");
const qs = require("qs");
const httpStatus = require("http-status");

const Att_SalaryModel = require("../../../../../api/v1/models/Att_Salary.model"); //Model Outside Folder
const BaseController = require("../../utils/BaseController");

class Att_SalaryController extends BaseController {
  constructor(Model = {}) {
    if (Model.schema instanceof mongoose.Schema) {
      super(Model);
      return this;
    }
    super(Att_SalaryModel);
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

      if (filters.KiCong) {
        filters.KiCong = `${(
          "0" +
          (new Date(filters.KiCong).getMonth() + 1)
        ).slice(-2)}/${new Date(filters.KiCong).getFullYear()}`;
      }

      const isAll = parseInt(req.query.all || 0, { allowDots: true });

      const page = parseInt(req.query.page || 1);
      const perPage = parseInt(req.query.limit || 25);

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
}

module.exports = Att_SalaryController;
