const express = require("express");
const { CreateFile } = require("../ExportFile");

const routeExport = express.Router();

routeExport.post("/create-pdf", CreateFile);
module.exports = routeExport;
