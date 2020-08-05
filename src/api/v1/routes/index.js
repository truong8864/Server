const express = require("express");

const UserRoute = require("../User/User.route");
const ProfileRoute = require("../Profile/Profile.route");

const RouterV1 = express.Router();

RouterV1.use("/users", UserRoute);
RouterV1.use("/profiles", ProfileRoute);

module.exports = RouterV1;
