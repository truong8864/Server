const express = require("express");

const WorkHistoryController = require("../controllers/Hre_WorkHistory.controller");

const WorkHistoryRoute = express.Router();

WorkHistoryRoute.get("/", WorkHistoryController.getAll);

WorkHistoryRoute.get("/filter", WorkHistoryController.getWithFilter);

WorkHistoryRoute.get("/:ID", WorkHistoryController.getByID);

WorkHistoryRoute.post("/", WorkHistoryController.create);

WorkHistoryRoute.put("/:ID", WorkHistoryController.update);

WorkHistoryRoute.patch("/:ID", WorkHistoryController.delete);

module.exports = WorkHistoryRoute;
