const express = require("express");

const ContractExtendController = require("../controllers/Hre_ContractExtend.controller");

const ContractExtendRouter = express.Router();

ContractExtendRouter.route("/")
  .get(ContractExtendController.get)
  .post(ContractExtendController.create);

ContractExtendRouter.route("/:ID")
  .get(ContractExtendController.getByID)
  .put(ContractExtendController.update)
  .delete(ContractExtendController.delete);

module.exports = ContractExtendRouter;
