const express = require("express");

const OrgStructureController = require("../controllers/Cat_OrgStructure.controller");

const OrgStructureRoute = express.Router();

OrgStructureRoute.get("/", OrgStructureController.getOrgStructure);
OrgStructureRoute.get("/trees", OrgStructureController.getStructureTree);
OrgStructureRoute.get("/trees/orgs", OrgStructureController.getListOrgID);

// OrgStructureRoute.get(
//   "/trees/profiles",
//   OrgStructureController.getListProfilePopulate
// );

// OrgStructureRoute.get(
//   "/trees/profiles",
//   OrgStructureController.getListProfile
// );

OrgStructureRoute.get(
  "/:OrgStructureID",
  OrgStructureController.getOrgStructure,
);

OrgStructureRoute.get(
  "/:OrgStructureID/trees",
  OrgStructureController.getStructureTree,
);

OrgStructureRoute.get(
  "/:OrgStructureID/trees/orgs",
  OrgStructureController.getListOrgID,
);

OrgStructureRoute.get(
  "/:OrgStructureID/trees/profiles",
  OrgStructureController.getListProfile,
);

OrgStructureRoute.get("/filter", OrgStructureController.getWithFilter);

OrgStructureRoute.post("/", OrgStructureController.create);

OrgStructureRoute.put("/:ID", OrgStructureController.update);

OrgStructureRoute.patch("/:ID", OrgStructureController.delete);

module.exports = OrgStructureRoute;
