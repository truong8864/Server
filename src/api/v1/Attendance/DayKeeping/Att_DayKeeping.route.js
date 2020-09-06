const express = require("express");

const ClassAtt_DayKeepingController = require("./Att_DayKeeping.controller");

const DayKeepingController = new ClassAtt_DayKeepingController();

const DayKeepingRoute = express.Router();

DayKeepingRoute.route("/")
  .get(DayKeepingController.get)
  .post(DayKeepingController.create)
  .put()
  .patch()
  .delete();

DayKeepingRoute.route("/synthesis").post(DayKeepingController.synthesis);
DayKeepingRoute.route("/calculate").post(DayKeepingController.calculate);

DayKeepingRoute.route("/:ID")
  .get(DayKeepingController.getByID)
  .post()
  .put(DayKeepingController.update)
  .patch()
  .delete(DayKeepingController.delete);

module.exports = DayKeepingRoute;
