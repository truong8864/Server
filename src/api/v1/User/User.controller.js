const mongoose = require("mongoose");

const { PasswordSecretKey } = require("../../../config/vars");

const UserModel = require("./User.model");

const BaseController = require("../utils/BaseController");

class UserController extends BaseController {
  constructor(Model = {}) {
    if (Model.schema instanceof mongoose.Schema) {
      super(Model);
      return this;
    }
    super(UserModel);
  }

  create = async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, PasswordSecretKey);
      const userData = { username, password: hashedPassword };
      const user = await UserModel.create(userData);
      res
        .status(httpStatus.CREATED)
        .json({ message: "CREATE USER", data: user });
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { username } = req.params;
      const { data } = req.body;
      if (data.password) {
        var hashedPassword = await bcrypt.hash(
          data.password,
          PasswordSecretKey,
        );
      }

      const user = await UserModel.updateOne(
        { username },
        {
          ...data,
          password: hashedPassword,
        },
      );
      res.status(httpStatus.OK).json({ message: "UPDATE USER", data: user });
    } catch (error) {
      next(error);
    }
  };

  getByUserName = async (req, res, next) => {
    try {
      const { username } = req.params;
      const data = await this.Model.findOne({ username: username });
      res.json({
        method: "GET",
        path: req.originalUrl,
        message: "GET BY USERNAME",
        status: "SUCCESS",
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  updateByUserName = async (req, res, next) => {
    try {
      const { username } = res.params;
      const data = req.body;
      const result = await this.Model.findOneAndUpdate(
        { username: username },
        data,
        {
          new: true,
        },
      );
      res.json({
        method: "PUT",
        path: req.originalUrl,
        message: "UPDATE BY USERNAME",
        status: "SUCCESS",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteByUserName = async (req, res, next) => {
    try {
      const { username } = res.params;
      const result = await this.Model.findOneAndRemove({ username: username });
      res.json({
        method: "DELETE",
        path: req.originalUrl,
        message: "DELETE BY USERNAME",
        status: "SUCCESS",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = UserController;
