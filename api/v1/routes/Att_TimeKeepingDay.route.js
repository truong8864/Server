const express = require("express");

const TimeKeepingDayController = require("../controllers/Att_TimeKeepingDay.controller");

const TimeKeepingDayRoute = express.Router();

TimeKeepingDayRoute.route("/")
  .get(TimeKeepingDayController.get)
  .post(TimeKeepingDayController.create);

TimeKeepingDayRoute.route("/import").post(TimeKeepingDayController.import);

TimeKeepingDayRoute.route("/calculate").post(
  TimeKeepingDayController.calculate,
);

TimeKeepingDayRoute.route("/:ID")
  .put(TimeKeepingDayController.update)
  .delete(TimeKeepingDayController.delete);

module.exports = TimeKeepingDayRoute;
