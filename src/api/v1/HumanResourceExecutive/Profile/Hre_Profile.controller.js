const mongoose = require("mongoose");
const qs = require("qs");
const httpStatus = require("http-status");

//const Hre_ProfileModel = require("./Hre_Profile.model"); //Model Current Folder
const Hre_ProfileModel = require("../../../../../api/v1/models/Hre_Profile.model"); //Model Outside Folder
const BaseController = require("../../utils/BaseController");

class Hre_ProfileController extends BaseController {
  constructor(Model = {}) {
    if (Model.schema instanceof mongoose.Schema) {
      super(Model);
      return this;
    }
    super(Hre_ProfileModel);
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

      for (const property in fields) {
        fields[property] = parseInt(fields[property]);
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
            from: "cat_positions",
            localField: "PositionID",
            foreignField: "ID",
            as: "Position",
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
            PositionName: { $arrayElemAt: ["$Position.PositionName", 0] },
          },
        },
        {
          $project: {
            Position: 0,
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

  getByCodeEmp = async (req, res, next) => {
    try {
      const { CodeEmp } = req.params;
      const data = await this.Model.findOne({ CodeEmp: CodeEmp });
      res.json({
        method: "GET",
        path: req.originalUrl,
        message: "GET PROFILE BY CODEEMP",
        status: "SUCCESS",
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  updateByCodeEmp = async (req, res, next) => {
    try {
      const { CodeEmp } = req.params;
      const data = req.body;
      const result = await this.Model.findOneAndUpdate(
        { CodeEmp: CodeEmp },
        data,
        { new: true },
      );
      res.json({
        method: "PUT",
        path: req.originalUrl,
        message: "UPDATE PROFILE BY CODEEMP",
        status: "SUCCESS",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteByCodeEmp = async (req, res, next) => {
    try {
      const { CodeEmp } = req.params;
      const result = await this.Model.findOneAndRemove({ CodeEmp: CodeEmp });
      res.json({
        method: "DELETE",
        path: req.originalUrl,
        message: "DELETE PROFILE BY CODEEMP",
        status: "SUCCESS",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = Hre_ProfileController;
