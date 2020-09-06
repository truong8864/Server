const express = require("express");
const ClassNewStaffController = require("../controllers/NewStaff.controller");

const NewStaffController = new ClassNewStaffController();
const NewStaffRoute = express.Router();

NewStaffRoute.route("/")
  .get(NewStaffController.ApproveToProfiles, NewStaffController.get)
  .patch(NewStaffController.deleteAll);

NewStaffRoute.route("/:ID").patch(NewStaffController.delete);

//NewStaffRoute.get("/black-lists", );
NewStaffRoute.post("/create-files", NewStaffController.CreatByFilesCSV);

module.exports = NewStaffRoute;
