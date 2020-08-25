const express = require("express");
const AuthorizationController = require("./Authorization.controller");

const AuthorizationRoute = express.Router();



AuthorizationRoute.route("/check-permission").get(
    AuthorizationController.checkLogged
);



module.exports = AuthorizationRoute;
