const httpStatus = require("http-status");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/user.model");

exports.get = async (req, res, next) => {
  try {
    const { filter } = req.body;
    const users = await UserModel.find(filter, {
      password: 0,
      _id: 0,
      __v: 0,
    });
    res.status(httpStatus.OK).json({ ms: "GET LIST USER", data: users });
  } catch (error) {
    next(error);
  }
};

exports.getByUserName = async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await UserModel.findOne(
      { username },
      {
        password: 0,
        _id: 0,
        __v: 0,
      }
    );
    res.status(httpStatus.OK).json({ ms: "GET USER", data: user });
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = { username, password: hashedPassword };
    const user = await UserModel.create(userData);
    res.status(httpStatus.CREATED).json({ ms: "CREATE USER", data: user });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { username } = req.params;
    const { data } = req.body;
    if (data.password) {
      var hashedPassword = await bcrypt.hash(data.password, 10);
    }

    const user = await UserModel.updateOne(
      { username },
      {
        ...data,
        password: hashedPassword,
      }
    );
    res.status(httpStatus.OK).json({ ms: "UPDATE USER", data: user });
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await UserModel.findOneAndDelete({ username });
    res.status(httpStatus.OK).json({ ms: "DELETE USER", data: user });
  } catch (error) {
    next(error);
  }
};

// exports.update = async (req, res, next) => {};
