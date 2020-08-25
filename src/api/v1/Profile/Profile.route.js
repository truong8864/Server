const express = require("express");

const ProfileController = require("./Profile.controller");

const ProfileRoute = express.Router();

ProfileRoute.route("/")
  .get(ProfileController.get)
  .post(ProfileController.create)
  .put()
  .patch()
  .delete();

  ProfileRoute.route("/:ID")
  .get(ProfileController.getByID)
  .post()
  .put(ProfileController.update)
  .patch()
  .delete(ProfileController.delete);

// ProfileRoute.route("/:CodeEmp")
//   .get(ProfileController.getByCodeEmp)
//   .post()
//   .put(ProfileController.updateByCodeEmp)
//   .patch()
//   .delete(ProfileController.deleteByCodeEmp);

module.exports = ProfileRoute;
