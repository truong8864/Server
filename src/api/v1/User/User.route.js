const express = require("express");

const ClassUserController = require("./User.controller");

const UserController = new ClassUserController();

const UserRoute = express.Router();

UserRoute.route("/")
  .get(UserController.get)
  .post(UserController.create)
  .put()
  .patch()
  .delete();

UserRoute.route("/:ID")
  .get(UserController.getByID)
  .post()
  .put(UserController.update)
  .patch()
  .delete(UserController.delete);

// UserRoute.route("/:username")
//   .get(UserController.getByUserName)
//   .post()
//   .put(UserController.updateByUserName)
//   .patch()
//   .delete(UserController.deleteByUserName);

module.exports = UserRoute;
