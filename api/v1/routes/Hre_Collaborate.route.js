const express = require("express");

const Hre_CollaborateController = require("../controllers/Hre_Collaborate.controller");

const Hre_CollaborateRoute = express.Router();

Hre_CollaborateRoute.get(
  "/",
  Hre_CollaborateController.UpdateStatus,
  Hre_CollaborateController.get
);
Hre_CollaborateRoute.get(
  "/select-staff",
  Hre_CollaborateController.SelectStaffCollaborate,
);
Hre_CollaborateRoute.get(
  "/bonus-disciplines",
  Hre_CollaborateController.Bonus_Discipline,
);

//T_ProfileRoute.get("/filter", T_ProfileController.getWithFilter);

Hre_CollaborateRoute.get("/:ID", Hre_CollaborateController.getByID);

Hre_CollaborateRoute.post("/", Hre_CollaborateController.create);

Hre_CollaborateRoute.put("/:ID", Hre_CollaborateController.update);

Hre_CollaborateRoute.patch("/:ID", Hre_CollaborateController.delete);

module.exports = Hre_CollaborateRoute;
