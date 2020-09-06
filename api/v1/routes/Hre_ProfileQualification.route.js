const express = require("express");

const Hre_ProfileQualification = require("../controllers/Hre_ProfileQualification.controller");

const ProfileQualificationRoute = express.Router();
ProfileQualificationRoute.get("/", Hre_ProfileQualification.get);
ProfileQualificationRoute.get("/:ID", Hre_ProfileQualification.getByID);
ProfileQualificationRoute.post("/", Hre_ProfileQualification.create);
ProfileQualificationRoute.put("/:ID", Hre_ProfileQualification.update);

module.exports = ProfileQualificationRoute;
