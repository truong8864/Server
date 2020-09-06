const express = require("express");

const LeaveDayController = require("../controllers/Att_LeaveDay.controller");

const LeaveDayRoute = express.Router();

LeaveDayRoute.route("/")
  .get(LeaveDayController.get)
  .post(LeaveDayController.create);

LeaveDayRoute.route("/:ID")
  .put(LeaveDayController.update)
  .delete(LeaveDayController.delete);

module.exports = LeaveDayRoute;
