const express = require("express");

const PositionController = require("../controllers/Cat_Position.controller");

const PositionRoute = express.Router();

//PositionRoute.get("/", PositionController.getAll);

PositionRoute.get("/", PositionController.getWithFilter);

PositionRoute.get("/:ID", PositionController.getByID);

PositionRoute.post("/", PositionController.create);

PositionRoute.put("/:ID", PositionController.update);

PositionRoute.patch("/:ID", PositionController.delete);

module.exports = PositionRoute;
