const mongoose = require("mongoose");
const Cat_OrgStructureModel = require("./Cat_OrgStructure.model");

const BaseController = require("../../utils/BaseController");

class Cat_OrgStructureController extends BaseController {
  constructor(Model = {}) {
    if (Model.schema instanceof mongoose.Schema) {
      super(Model);
      return this;
    }
    super(Cat_OrgStructureModel);
  }

  getByCode = async (req, res, next) => {
    try {
      const { Code } = req.params;
      const data = await this.Model.findOne({ Code: Code });
      res.json({
        method: "GET",
        path: req.originalUrl,
        message: "GET PROFILE BY Code",
        status: "SUCCESS",
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  updateByCode = async (req, res, next) => {
    try {
      const { Code } = res.params;
      const data = req.body;
      const result = await this.Model.findOneAndUpdate({ Code: Code }, data, {
        new: true,
      });
      res.json({
        method: "PUT",
        path: req.originalUrl,
        message: "UPDATE PROFILE BY Code",
        status: "SUCCESS",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteByCode = async (req, res, next) => {
    try {
      const { Code } = res.params;
      const result = await this.Model.findOneAndRemove({ Code: Code });
      res.json({
        method: "DELETE",
        path: req.originalUrl,
        message: "DELETE PROFILE BY Code",
        status: "SUCCESS",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = Cat_OrgStructureController;
