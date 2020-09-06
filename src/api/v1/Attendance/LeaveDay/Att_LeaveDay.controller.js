const mongoose = require("mongoose");
const qs = require("qs");
const httpStatus = require("http-status");

const Att_LeaveDayModel = require("../../../../../api/v1/models/Att_LeaveDay.model"); //Model Outside Folder
const BaseController = require("../../utils/BaseController");

class Att_LeaveDayController extends BaseController {
  constructor(Model = {}) {
    if (Model.schema instanceof mongoose.Schema) {
      super(Model);
      return this;
    }
    super(Att_LeaveDayModel);
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

      const DayLeave = filters.DayLeave;
      if (DayLeave) {
        if (DayLeave.$gte) {
          filters.DayLeave.$gte = new Date(DayLeave.$gte);
        }
        if (DayLeave.$lte) {
          filters.DayLeave.$lte = new Date(DayLeave.$lte);
        }
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

module.exports = Att_LeaveDayController;
