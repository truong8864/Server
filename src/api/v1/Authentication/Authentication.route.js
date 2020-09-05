const express = require("express");
const ClassAuthenticationController = require("./Authentication.controller.js");

const AuthenticationController = new ClassAuthenticationController();

const AuthenticationRoute = express.Router();

AuthenticationRoute.route("/login").post(AuthenticationController.login);

AuthenticationRoute.route("/logout").get(AuthenticationController.logout);

AuthenticationRoute.route("/check-logged").get(
  AuthenticationController.checkLogged,
);

module.exports = AuthenticationRoute;
