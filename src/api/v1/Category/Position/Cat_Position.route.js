const express = require("express");

const ClassCat_PositionController = require("./Cat_Position.controller");

const PositionController = new ClassCat_PositionController();

const PositionRoute = express.Router();

PositionRoute.route("/")
  .get(PositionController.get)
  .post(PositionController.create)
  .put()
  .patch()
  .delete();

PositionRoute.route("/:ID")
  .get(PositionController.getByID)
  .post()
  .put(PositionController.update)
  .patch()
  .delete(PositionController.delete);

module.exports = PositionRoute;
