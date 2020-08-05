//const httpStatus = require("http-status");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  AccessTokenSecretKey,
  RefreshTokenSecretKey,
  AccessTokenExpirationMinutes,
  RefreshTokenExpirationMinutes,
} = require("../../../config/vars.js");

const UserOnline = require("../models/UserOnline.model");
const UserModel = require("../models/user.model");
const { request } = require("../../../config/express");

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });
    if (!user) return res.json({ ms: "USE_NOT_FOUND" });

    const passwordVerify = await bcrypt.compare(password, user.password);
    if (!passwordVerify) return res.json({ ms: "MAT KHAU KO CHINH XAC" });

    const payload = {
      username: user.username,
      ipUser: req.connection.remoteAddress,
    };

    const accessToken = jwt.sign(payload, AccessTokenSecretKey, {
      expiresIn: AccessTokenExpirationMinutes * 60 * 1000,
    });

    const refreshToken = jwt.sign(payload, RefreshTokenSecretKey, {
      expiresIn: RefreshTokenExpirationMinutes * 60 * 1000,
    });

    const newUserOnline = {
      expireAt: Date.now() + RefreshTokenExpirationMinutes * 60 * 1000,
      username: user.username,
      ipLogin: req.connection.remoteAddress,
      refreshToken: refreshToken,
    };

    await UserOnline.create(newUserOnline);

    res.cookie("ACCESS_TOKEN", accessToken, {
      maxAge: AccessTokenExpirationMinutes * 60 * 1000,
      httpOnly: true,
    });
    res.cookie("REFRESH_TOKEN", refreshToken, {
      maxAge: RefreshTokenExpirationMinutes * 60 * 1000,
      httpOnly: true,
    });
    return res.json({
      ms: "LOGIN THANH CONG",
      data: {
        username,
        refreshToken,
        accessToken,
        ipUser: req.connection.remoteAddress,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const REFRESH_TOKEN = req.cookies.REFRESH_TOKEN;
    await UserOnline.findOneAndDelete({
      refreshToken: REFRESH_TOKEN,
    });
    res.clearCookie("REFRESH_TOKEN");
    res.clearCookie("ACCESS_TOKEN");
    res.json({ ms: "LOGOUT FINISH" });
  } catch (error) {
    next(error);
  }
};

exports.checkLogged = async (req, res, next) => {
  try {
    const REFRESH_TOKEN = req.cookies.REFRESH_TOKEN;
    if (REFRESH_TOKEN) {
      const decode = await jwt.verify(REFRESH_TOKEN, RefreshTokenSecretKey);
      if (decode.ipUser === req.connection.remoteAddress) {
        return res.json({ ms: "DA_DANG_NHAP", data: { isLogged: true } });
      }
    }
    res.json({ ms: "CHUA_DANG_NHAP", data: { isLogged: false } });
  } catch (error) {
    next(error);
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    res.json("refreshToken");
  } catch (error) {
    next(error);
  }
};
