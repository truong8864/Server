const express = require("express");

const ClassHre_ContractController = require("./Hre_Contract.controller");

const ContractController = new ClassHre_ContractController();

const ContractRoute = express.Router();

ContractRoute.route("/")
  .get(ContractController.get)
  .post(ContractController.create)
  .put()
  .patch()
  .delete();

ContractRoute.route("/:ID")
  .get(ContractController.getByID)
  .post()
  .put(ContractController.update)
  .patch()
  .delete(ContractController.delete);

module.exports = ContractRoute;
