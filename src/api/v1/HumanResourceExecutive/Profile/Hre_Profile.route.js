const express = require("express");

const ClassHre_ProfileController = require("./Hre_Profile.controller");

const ProfileController = new ClassHre_ProfileController();

const ProfileRoute = express.Router();

ProfileRoute.route("/")
  .get(ProfileController.get)
  .post(ProfileController.create)
  .put()
  .patch()
  .delete();

ProfileRoute.route("/TONGHOP").get(ProfileController.TONGHOP);

// ProfileRoute.route("/:ID")
//   .get(ProfileController.getByID)
//   .post()
//   .put(ProfileController.update)
//   .patch()
//   .delete(ProfileController.delete);

ProfileRoute.route("/:Code")
  .get(ProfileController.getByCode)
  .post()
  .put(ProfileController.updateByCode)
  .patch()
  .delete(ProfileController.deleteByCode);

module.exports = ProfileRoute;
