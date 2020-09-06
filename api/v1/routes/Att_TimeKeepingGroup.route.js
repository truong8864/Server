const express = require("express");

const TimeKeepingGroupController = require("../controllers/Att_TimeKeepingGroup.controller");

const TimeKeepingGroupRoute = express.Router();

TimeKeepingGroupRoute.route("/").get(TimeKeepingGroupController.get);

TimeKeepingGroupRoute.route("/:ID")
  .put(TimeKeepingGroupController.update)
  .delete(TimeKeepingGroupController.delete);

TimeKeepingGroupRoute.route("/synthesis").post(
  TimeKeepingGroupController.synthesis,
);

module.exports = TimeKeepingGroupRoute;
