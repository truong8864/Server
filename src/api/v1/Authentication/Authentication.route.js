const express = require("express");
const AuthenticationController = require("../Authentication/Authentication.controller");

const AuthenticationRoute = express.Router();

AuthenticationRoute.route("/login").post(AuthenticationController.login);

AuthenticationRoute.route("/logout").get(AuthenticationController.logout);

AuthenticationRoute.route("/check-logged").get(
  AuthenticationController.checkLogged
);

AuthenticationRoute.route("/refresh-token").get(
  AuthenticationController.refreshToken
);

module.exports = AuthenticationRoute;
