//const httpStatus = require("http-status");

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

      res.cookie("_ACCESS_TOKEN", accessToken, {
        maxAge: AccessTokenExpirationMinutes * 60 * 1000,
        httpOnly: true,
        sameSite: "None",
        // domain: ".herokuapp.com",
        secure: true,
      });
      res.cookie("_REFRESH_TOKEN", refreshToken, {
        maxAge: RefreshTokenExpirationMinutes * 60 * 1000,
        sameSite: "None",
        secure: true,
        // domain: ".herokuapp.com",
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

  logout = async (req, res, next) => {
    try {
      const _REFRESH_TOKEN = req.cookies["_REFRESH_TOKEN"];
      await UserOnlineModel.findOneAndDelete({
        refreshToken: _REFRESH_TOKEN,
      });
      res.clearCookie("_REFRESH_TOKEN");
      res.clearCookie("_ACCESS_TOKEN");
      res.json({ message: "LOGOUT FINISH" });
    } catch (error) {
      next(error);
    }
  };

  checkLogged = async (req, res, next) => {
    try {
      const { _ACCESS_TOKEN, _REFRESH_TOKEN } = req.cookies;
      if (_ACCESS_TOKEN && _REFRESH_TOKEN) {
        const decode = await jwt.verify(_REFRESH_TOKEN, RefreshTokenSecretKey);
        if (decode.ipUser === req.connection.remoteAddress) {
          return res.json({
            message: "DA_DANG_NHAP",
            data: { IsLogged: true },
          });
        }
      }
      res.json({ message: "CHUA_DANG_NHAP", data: { IsLogged: false } });
    } catch (error) {
      res.json({ message: "CHUA_DANG_NHAP", data: { IsLogged: false } });
    }
  };
}

module.exports = AuthenticationController;
