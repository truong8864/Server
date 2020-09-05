const express = require("express");

const ClassAuthorizationController = require("./authorization.controller");
const AuthorizationController = new ClassAuthorizationController();

const AuthorizationRoute = express.Router();

AuthorizationRoute.route("/check-permission").get(
  AuthorizationController.checkPermission,
);

module.exports = AuthorizationRoute;
