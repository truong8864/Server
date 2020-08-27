const mongoose = require("mongoose");
const Hre_ProfileModel = require("./Hre_Profile.model");

const BaseController = require("../../utils/BaseController");

class Hre_ProfileController extends BaseController {
  constructor(Model = {}) {
    if (Model.schema instanceof mongoose.Schema) {
      super(Model);
      return this;
    }
    super(Hre_ProfileModel);
  }

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
      const { CodeEmp } = res.params;
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
      const { CodeEmp } = res.params;
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
