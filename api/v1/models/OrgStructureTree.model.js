const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrgStructureTree = new Schema({
  rootID: { type: Schema.Types.String },
  StructureTree: Object,
});

const OrgStructureTreeModel = mongoose.model(
  "OrgStructureTree",
  OrgStructureTree,
);

module.exports = OrgStructureTreeModel;
