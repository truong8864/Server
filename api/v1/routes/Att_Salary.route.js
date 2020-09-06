const express = require("express");

const SalaryController = require("../controllers/Att_Salary.controller");

const SalaryRoute = express.Router();

SalaryRoute.route("/")
  .get(SalaryController.get)
  .post(SalaryController.create)
  .put()
  .patch()
  .delete();

SalaryRoute.route("/:ID")
  .put(SalaryController.update)
  .delete(SalaryController.delete);

SalaryRoute.route("/payroll")
  .get()
  .post(SalaryController.payroll)
  .put()
  .patch()
  .delete();

module.exports = SalaryRoute;
