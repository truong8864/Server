const express = require("express");

const ClassCat_OrgStructureController = require("./Cat_OrgStructure.controller");

const OrgStructureController = new ClassCat_OrgStructureController();

const OrgStructureRoute = express.Router();

OrgStructureRoute.route("/")
  .get(OrgStructureController.get)
  .post(OrgStructureController.create)
  .put()
  .patch()
  .delete();

// OrgStructureRoute.route("/:ID")
//   .get(OrgStructureController.getByID)
//   .post()
//   .put(OrgStructureController.update)
//   .patch()
//   .delete(OrgStructureController.delete);

OrgStructureRoute.route("/:Code")
  .get(OrgStructureController.getByCode)
  .post()
  .put(OrgStructureController.updateByCode)
  .patch()
  .delete(OrgStructureController.deleteByCode);

module.exports = OrgStructureRoute;
