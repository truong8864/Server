const express = require("express");

const OrgStructureController = require("./OrgStructure.controller");

const OrgStructureRoute = express.Router();

OrgStructureRoute.route("/")
  .get(OrgStructureController.get)
  //.post(OrgStructureController.create)
  .put()
  .patch()
  .delete();

OrgStructureRoute.route("/:Code")
  //.get(OrgStructureController.getByCode)
  //.post()
  //.put(OrgStructureController.update)
  // .patch()
  // .delete(OrgStructureController.delete);

module.exports = OrgStructureRoute;
