const express = require("express");

const ClassAtt_SalaryController = require("./Att_Salary.controller");

const SalaryController = new ClassAtt_SalaryController();

const SalaryRoute = express.Router();

SalaryRoute.route("/")
  .get(SalaryController.get)
  .post(SalaryController.create)
  .put()
  .patch()
  .delete();

SalaryRoute.route("/:ID")
  .get(SalaryController.getByID)
  .post()
  .put(SalaryController.update)
  .patch()
  .delete(SalaryController.delete);

module.exports = SalaryRoute;
