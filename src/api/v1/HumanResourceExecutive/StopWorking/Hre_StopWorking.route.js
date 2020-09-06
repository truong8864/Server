const express = require("express");

const ClassHre_StopWorkingController = require("./Hre_StopWorking.controller");

const StopWorkingController = new ClassHre_StopWorkingController();

const StopWorkingRoute = express.Router();

StopWorkingRoute.route("/")
  .get(StopWorkingController.get)
  .post(StopWorkingController.create)
  .put()
  .patch()
  .delete();

StopWorkingRoute.route("/:ID")
  .get(StopWorkingController.getByID)
  .post()
  .put(StopWorkingController.update)
  .patch()
  .delete(StopWorkingController.delete);

module.exports = StopWorkingRoute;
