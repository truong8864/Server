const express = require("express");
const ClassHre_ProfileController = require("../../../src/api/v1/HumanResourceExecutive/Profile/Hre_Profile.controller");
const ProfileControllerPge = new ClassHre_ProfileController();

const ProfileController = require("../controllers/Hre_Profile.controller");

const ProfileRoute = express.Router();

ProfileRoute.route("/")
  .get(ProfileController.get,ProfileControllerPge.get)
  .post(ProfileController.create);

ProfileRoute.get("/not-yet-contract", ProfileController.NotYet_THrProfile);
ProfileRoute.get("/retired", ProfileController.Retired);

//ProfileRoute.get("/position/:id/profiles", ProfileController.getWithPosition);

ProfileRoute.get("/:ID", ProfileController.getByID);

ProfileRoute.put("/:ID", ProfileController.update);

ProfileRoute.patch("/:ID", ProfileController.delete);

module.exports = ProfileRoute;
