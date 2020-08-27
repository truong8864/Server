const express = require("express");

const UserRoute = require("../User/User.route");
const RoleRoute = require("../Role/Role.route");
const ProfileRoute = require("../HumanResourceExecutive/Profile/Hre_Profile.route");
const OrgStructureRoute = require("../Category/OrgStructure/Cat_OrgStructure.route");

const RouterV1 = express.Router();

RouterV1.use("/users", UserRoute);
RouterV1.use("/roles", RoleRoute);
RouterV1.use("/profiles", ProfileRoute);
RouterV1.use("/org-structures", OrgStructureRoute);

module.exports = RouterV1;
