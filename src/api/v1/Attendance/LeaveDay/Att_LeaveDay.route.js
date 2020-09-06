const express = require("express");

const ClassAtt_LeaveDayController = require("./Att_LeaveDay.controller");

const LeaveDayController = new ClassAtt_LeaveDayController();

const LeaveDayRoute = express.Router();

LeaveDayRoute.route("/")
  .get(LeaveDayController.get)
  .post(LeaveDayController.create)
  .put()
  .patch()
  .delete();

LeaveDayRoute.route("/:ID")
  .get(LeaveDayController.getByID)
  .post()
  .put(LeaveDayController.update)
  .patch()
  .delete(LeaveDayController.delete);

module.exports = LeaveDayRoute;
