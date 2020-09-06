const express = require("express");
const routeExport1 = express.Router();

const pdf = require("html-pdf");
const pdfTemplate = require("./api/v1/ExportFile/documents/Contract");

routeExport1.post("/create-pdf", (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile("result1.pdf", (err) => {
    if (err) {
      res.send(Promise.reject());
    }
    res.send(Promise.resolve());
  });
});
routeExport1.get("/fetch-pdf", (req, res) => {
  res.sendFile(`${__dirname}/result1.pdf`);
});
module.exports = routeExport1;
