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


exports.login = async (req, res, next) => {
  try {

    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });
    if (!user) return res.json({ message: "USE_NOT_FOUND" });

    const passwordVerify = await bcrypt.compare(password, user.password);
    if (!passwordVerify) return res.json({ message: "MAT KHAU KO CHINH XAC" });

    const payload = {
      username: user.username,
      role:user.role,
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
      message: "LOGIN_THANH_CONG",
      data: {
        username,
        refreshToken,
        accessToken,
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
    res.json({ message: "LOGOUT FINISH" });
  } catch (error) {
    next(error);
  }
};

exports.checkLogged = async (req, res, next) => {
  try {
    const { ACCESS_TOKEN,REFRESH_TOKEN } = req.cookies;
    if (ACCESS_TOKEN&&REFRESH_TOKEN) {
      const decode = await jwt.verify(REFRESH_TOKEN, RefreshTokenSecretKey);
      if (decode.ipUser === req.connection.remoteAddress) {
        return res.json({ message: "DA_DANG_NHAP", data: { IsLogged: true } });
      }
    }
    res.json({ message: "CHUA_DANG_NHAP", data: { IsLogged: false } });
  } catch (error) {
    res.json({ message: "CHUA_DANG_NHAP", data: { IsLogged: false } });
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    res.json("refreshToken");
  } catch (error) {
    next(error);
  }
};
