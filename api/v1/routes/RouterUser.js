const express = require("express");
const { token, register, getInfor } = require("../controllers/user.controller");
const { verifyToken } = require("../controllers/verifyToken");
const RouterUser = express.Router();

RouterUser.post("/register", register);
RouterUser.get("/getinfor", getInfor);
RouterUser.post("/refresh-token", token);
RouterUser.get("/checktoken", verifyToken);
module.exports = RouterUser;
