const express = require("express");

const ClassAtt_TimeKeepingGroupController = require("./Att_TimeKeepingGroup.controller");

const TimeKeepingGroupController = new ClassAtt_TimeKeepingGroupController();

const TimeKeepingGroupRoute = express.Router();

TimeKeepingGroupRoute.route("/")
  .get(TimeKeepingGroupController.get)
  .post(TimeKeepingGroupController.create)
  .put()
  .patch()
  .delete();

TimeKeepingGroupRoute.route("/payroll").get(TimeKeepingGroupController.payroll);

TimeKeepingGroupRoute.route("/:ID")
  .get(TimeKeepingGroupController.getByID)
  .post()
  .put(TimeKeepingGroupController.update)
  .patch()
  .delete(TimeKeepingGroupController.delete);

module.exports = TimeKeepingGroupRoute;
