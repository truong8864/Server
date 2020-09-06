const express = require("express");

const OrgUnitController = require("../controllers/Cat_OrgUnit.controller");

const OrgUnitRoute = express.Router();

//OrgUnitRoute.get("/", OrgUnitController.getAll);

OrgUnitRoute.get("/:ID", OrgUnitController.getByID);

OrgUnitRoute.get("/", OrgUnitController.getWithFilter);

OrgUnitRoute.post("/", OrgUnitController.create);

OrgUnitRoute.put("/:ID", OrgUnitController.update);

OrgUnitRoute.patch("/:ID", OrgUnitController.delete);

module.exports = OrgUnitRoute;
