const express = require("express");

const UserController = require("./User.controller");

const UserRoute = express.Router();

UserRoute.route("/")
  .get(UserController.get)
  .post(UserController.create)
  .put()
  .patch()
  .delete();

UserRoute.route("/:username")
  .get(UserController.getByUserName)
  .post()
  .put(UserController.update)
  .patch()
  .delete(UserController.delete);

module.exports = UserRoute;
