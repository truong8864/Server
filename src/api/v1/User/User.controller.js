const mongoose = require("mongoose");

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

// const httpStatus = require("http-status");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const UserModel = require("./User.model");

// exports.get = async (req, res, next) => {
//   try {
//     const { filter } = req.body;
//     const users = await UserModel.find(filter, {
//       password: 0,
//       _id: 0,
//       __v: 0,
//     });
//     res.status(httpStatus.OK).json({ message: "GET LIST USER", data: users });
//   } catch (error) {
//     next(error);
//   }
// };

// exports.getByUserName = async (req, res, next) => {
//   try {
//     const { username } = req.params;
//     const user = await UserModel.findOne(
//       { username },
//       {
//         password: 0,
//         _id: 0,
//         __v: 0,
//       },
//     );
//     res.status(httpStatus.OK).json({ message: "GET USER", data: user });
//   } catch (error) {
//     next(error);
//   }
// };

// exports.create = async (req, res, next) => {
//   try {
//     const { username, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const userData = { username, password: hashedPassword };
//     const user = await UserModel.create(userData);
//     res.status(httpStatus.CREATED).json({ message: "CREATE USER", data: user });
//   } catch (error) {
//     next(error);
//   }
// };

// exports.update = async (req, res, next) => {
//   try {
//     const { username } = req.params;
//     const { data } = req.body;
//     if (data.password) {
//       var hashedPassword = await bcrypt.hash(data.password, 10);
//     }

//     const user = await UserModel.updateOne(
//       { username },
//       {
//         ...data,
//         password: hashedPassword,
//       },
//     );
//     res.status(httpStatus.OK).json({ message: "UPDATE USER", data: user });
//   } catch (error) {
//     next(error);
//   }
// };

// exports.delete = async (req, res, next) => {
//   try {
//     const { username } = req.params;
//     const user = await UserModel.findOneAndDelete({ username });
//     res.status(httpStatus.OK).json({ message: "DELETE USER", data: user });
//   } catch (error) {
//     next(error);
//   }
// };
