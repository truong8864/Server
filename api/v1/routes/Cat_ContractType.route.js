const express = require("express");

const ContractTypeController = require("../controllers/Cat_ContractType.controller");

const ContractTypeRoute = express.Router();

ContractTypeRoute.get("/", ContractTypeController.getAll);

ContractTypeRoute.get("/filter", ContractTypeController.getWithFilter);

ContractTypeRoute.get("/:ID", ContractTypeController.getByID);

ContractTypeRoute.post("/", ContractTypeController.create);

ContractTypeRoute.put("/:ID", ContractTypeController.update);

ContractTypeRoute.patch("/:ID", ContractTypeController.delete);

module.exports = ContractTypeRoute;
