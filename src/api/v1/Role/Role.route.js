const express = require("express");

const ClassRoleController = require("./Role.controller");

const RoleController = new ClassRoleController();

const RoleRoute = express.Router();

RoleRoute.route("/")
  .get(RoleController.get)
  .post(RoleController.create)
  .put()
  .patch()
  .delete();

RoleRoute.route("/:ID")
  .get(RoleController.getByID)
  .post()
  .put(RoleController.update)
  .patch()
  .delete(RoleController.delete);

// RoleRoute.route("/:role")
//   .get(RoleController.getByRole)
//   .post()
//   .put(RoleController.updateByRole)
//   .patch()
//   .delete(RoleController.deleteByRole);

module.exports = RoleRoute;
