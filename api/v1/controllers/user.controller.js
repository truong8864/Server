const User = require("../models/user.model");
const bcrypt = require("bcrypt");
jwt = require("jsonwebtoken");
const express = require("express");
app = express();
require("dotenv").config();

exports.register1 = function (req, res, next) {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (user == null) {
      //Kiểm tra xem email đã được sử dụng chưa
      if (req.body.password === req.body.password_confirm) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res
              .sendStatus(403)
              .json({ err: "effort hash passwork does not success" });
          }
          const newUser = {
            role: req.body.role,
            username: req.body.username,
            password: hash,
            password_confirm: hash,
          };
          User.create(newUser, function (err, user) {
            if (err) return res.sendStatus(403);
            if (user) {
              console.log("create!");
              return res.json({ mss: "create" });
            }
            return res.sendStatus(404).json({ err: "can not create new user" });
          });
        });
        return;
      } else {
        return res.status(500).json({ err: "confirm password is wrong" });
      }
    } else {
      return res.json({ err: "Username has been used" });
    }
  });
};
module.exports.register = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user == null) {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res
          .sendStatus(403)
          .json({ err: "effort hash passwork does not success" });
      }
      const newUser = {
        role: req.body.role,
        username: req.body.username,
        password: hash,
        password_confirm: hash,
      };
      User.create(newUser, function (err, user) {
        if (err) return res.sendStatus(403);
        if (user) {
          return res.json({ mss: "Tạo tài khoản thành công" });
        }
        return res.sendStatus(404).json({ err: "Không thể tạo tài khoản" });
      });
    });
    return;
  }
  return res.json({ err: "Username has been used" });
};

let refreshTokens = [];
exports.login = function (req, res) {
  console.log(req.body.username);
  User.findOne({ username: req.body.username }).exec(function (err, user) {
    if (err) {
      return res.json({ err });
    } else if (!user) {
      return res.json({ err: "Username is incorrect" });
    }
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (result === true) {
        //req.session.user = user;
        const payload = {
          data: user,
        };
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "1m",
        });
        const refreshToken = jwt.sign(
          payload,
          process.env.REFRESH_TOKEN_SECRET,
        );
        refreshTokens.push(refreshToken);

        // req.token;
        return res.json({
          data: user,
          accessToken: accessToken,
          refreshToken: refreshToken,
          login: "success",
        });
      } else {
        return res.json({ err: "Password is incorrect" });
      }
    });
  });
};

exports.token = function (req, res) {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = jwt.sign(user.data, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15s",
    });
    res.json({ accessToken: accessToken });
  });
};

exports.getInfor = async function (req, res) {
  try {
    const decoded = await jwt.decode(req.token, { complete: true });
    return res.json({
      header: decoded.header,
      payload: decoded.payload,
      Signature: decoded.signature,
    });
  } catch (err) {
    res.sendStatus(403);
  }
};
