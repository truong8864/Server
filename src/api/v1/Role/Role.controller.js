const mongoose = require("mongoose");

const RoleModel = require("./Role.model");

const BaseController = require("../utils/BaseController");

class RoleController extends BaseController {
  constructor(Model = {}) {
    if (Model.schema instanceof mongoose.Schema) {
      super(Model);
      return this;
    }
    super(RoleModel);
  }

  getByRole = async (req, res, next) => {
    try {
      const { role } = req.params;
      const data = await this.Model.findOne({ role: role });
      res.json({
        method: "GET",
        path: req.originalUrl,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  updateByRole = async (req, res, next) => {
    try {
      const { role } = res.params;
      const data = req.body;
      const result = await this.Model.findOneAndUpdate({ role: role }, data, {
        new: true,
      });
      res.json({
        method: "PUT",
        path: req.originalUrl,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteByRole = async (req, res, next) => {
    try {
      const { role } = res.params;
      const result = await this.Model.findOneAndRemove({ role: role });
      res.json({
        method: "DELETE",
        path: req.originalUrl,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = RoleController;
