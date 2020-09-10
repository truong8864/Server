const qs = require("qs");
const httpStatus = require("http-status");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const newStaffModel = require("../models/NewStaff.model");
const Hre_StopWorkingModel = require("../../../src/api/v1/HumanResourceExecutive/StopWorking/Hre_StopWorking.model");
const Hre_ProfilesModel = require("../models/Hre_Profile.model");

const BaseController = require("../../../src/api/v1/utils/BaseController");
const Hre_ProfileModel = require("../models/Hre_Profile.model");

class NewStaffController extends BaseController {
  constructor(Model = {}) {
    if (Model.schema instanceof mongoose.Schema) {
      super(Model);
      return this;
    }
    super(newStaffModel);
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

      if (filters.DateHire) {
        if (filters.DateHire.$gte) {
          filters.DateHire.$gte = new Date(filters.DateHire.$gte);
        }
        if (filters.DateHire.$lte) {
          filters.DateHire.$lte = new Date(filters.DateHire.$lte);
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

      const data = await this.Model.find(filters)
        .sort(sort)
        .select(fields)
        .skip((page - 1) * perPage)
        .limit(perPage);
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

  CreatByFilesCSV = async (req, res) => {
    try {
      const data = req.body;
      for (let i = 0; i < data.length; i++) {
        await newStaffModel.create(data[i]);
      }
      const result = await newStaffModel.find();
      return res.status(200).json(result);
    } catch (err) {
      return res.sendStatus(403);
    }
  };

  ApproveToProfiles = async (req, res, next) => {
    try {
      const StopWorking = await Hre_StopWorkingModel.distinct("ProfileID", {
        LastStatusSyn: "E_STOP",
        IsBlackList: 1,
      });
      const HreProfileIDNo = await Hre_ProfilesModel.distinct("IDNo", {
        ID: { $in: StopWorking },
      });
      const HreProfileName = await Hre_ProfilesModel.distinct("ProfileName", {
        ID: { $in: StopWorking },
      });
      await newStaffModel.updateMany(
        { IDNo: { $in: HreProfileIDNo }, ProfileName: { $in: HreProfileName } },
        { IsBlackList: 1 },
      );
      // const result = await newStaffModel.find({IDNo:{$in:HreProfileIDNo},ProfileName:{$in:HreProfileName}})

      // req.newProfile=result;
      next();
      //  console.log(StopWorking)
      //return res.json(result)
    } catch (err) {
      console.log(err);
      return res.sendStatus(403);
    }
  };

  delete = async (req, res) => {
    try {
      const { ID } = req.params;
      const result = await newStaffModel.findOneAndDelete(
        { _id: ID },
        { IsDelete: true },
      );
      return res.status(200).json(result);
    } catch (err) {
      return res.sendStatus(403);
    }
  };

  deleteAll = async (req, res) => {
    try {
      //const { ID } = req.params;
      const NewListProfile = await newStaffModel.find({});
      NewListProfile.forEach((item, index) => {
        const { _id,...NewProfile }= { ...item, ID: uuidv4() };
        await Hre_ProfileModel.create(NewProfile)
      });
      const result = await newStaffModel.remove({});
      return res.status(200).json(result);
    } catch (err) {
      return res.sendStatus(403);
    }
  };
}

module.exports = NewStaffController;
