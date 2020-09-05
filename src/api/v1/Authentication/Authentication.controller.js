const httpStatus = require("http-status");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  AccessTokenSecretKey,
  RefreshTokenSecretKey,
  AccessTokenExpirationMinutes,
  RefreshTokenExpirationMinutes,
} = require("../../../config/vars.js");

const UserOnlineModel = require("../UserOnline/UserOnline.model");
const UserModel = require("../User/User.model");

class AuthenticationController {
  login = async (req, res, next) => {
    try {
      const { username, password } = req.body;

      const user = await UserModel.findOne({ username });
      if (!user) return res.json({ message: "USE_NOT_FOUND" });

      const passwordVerify = await bcrypt.compare(password, user.password);
      if (!passwordVerify)
        return res.json({ message: "MAT KHAU KO CHINH XAC" });

      const payload = {
        username: user.username,
        role: user.role,
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

      await UserOnlineModel.create(newUserOnline);

      res.cookie("ACCESS_TOKEN", accessToken, {
        maxAge: AccessTokenExpirationMinutes * 60 * 1000,
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      res.cookie("REFRESH_TOKEN", refreshToken, {
        maxAge: RefreshTokenExpirationMinutes * 60 * 1000,
        sameSite: "None",
        httpOnly: true,
        secure: true,
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

  logout = async (req, res, next) => {
    try {
      const REFRESH_TOKEN = req.cookies.REFRESH_TOKEN;
      await UserOnlineModel.findOneAndDelete({
        refreshToken: REFRESH_TOKEN,
      });
      res.clearCookie("REFRESH_TOKEN");
      res.clearCookie("ACCESS_TOKEN");
      res.json({ message: "LOGOUT FINISH" });
    } catch (error) {
      next(error);
    }
  };

  checkLogged = async (req, res, next) => {
    try {
      const { ACCESS_TOKEN, REFRESH_TOKEN } = req.cookies;
      if (ACCESS_TOKEN && REFRESH_TOKEN) {
        const decode = jwt.verify(REFRESH_TOKEN, RefreshTokenSecretKey);
        if (decode.ipUser === req.connection.remoteAddress) {
          return res.json({
            message: "DA_DANG_NHAP",
            data: { IsLogged: true },
          });
        }
      }
      res
        .status(httpStatus.UNAUTHORIZED)
        .json({
          message: "Token created by another user",
          decode,
          IP: req.connection.remoteAddress,
        });
    } catch (error) {
      res.json({ message: "CHUA_DANG_NHAP", data: { IsLogged: false } });
    }
  };
}

module.exports = AuthenticationController;
