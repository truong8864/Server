const mongoose = require("mongoose");
const qs = require("qs");
const httpStatus = require("http-status");

const Hre_StopWorkingModel = require("./Hre_StopWorking.model");
const BaseController = require("../../utils/BaseController");
const Hre_ProfileModel = require("../../../../../api/v1/models/Hre_Profile.model");

class Hre_StopWorkingController extends BaseController {
  constructor(Model = {}) {
    if (Model.schema instanceof mongoose.Schema) {
      super(Model);
      return this;
    }
    super(Hre_StopWorkingModel);
  }

  update = async (req, res, next) => {
    try {
      const { ID } = req.params;
      const data = req.body;

      const result = await this.Model.findByIdAndUpdate(ID, data, {
        new: true,
      });
      if (data.Status === "E_APPROVED") {
        await Hre_ProfileModel.updateOne(
          { ID: result.ProfileID },
          { StatusSyn: "E_STOP" },
        );
      }

      res.json({
        method: "PUT",
        path: req.originalUrl,
        data: result,
      });
    } catch (error) {
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

      for (const property in fields) {
        fields[property] = parseInt(fields[property]);
      }

      const DateStop = filters.DateStop;
      if (DateStop) {
        if (DateStop.$gte) {
          filters.DateStop.$gte = new Date(DateStop.$gte);
        }
        if (DateStop.$lte) {
          filters.DateStop.$lte = new Date(DateStop.$lte);
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
            ProfileName: { $arrayElemAt: ["$Profile.ProfileName", 0] },
            CodeEmp: { $arrayElemAt: ["$Profile.CodeEmp", 0] },
          },
        },
        {
          $project: {
            Profile: 0,
            OrgStructure: 0,
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
}

module.exports = Hre_StopWorkingController;
