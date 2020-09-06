const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrgStructureTree = new Schema(
  {
    isRoot: { type: Schema.Types.Number, index: true },
    rootID: { type: Schema.Types.String, index: true, unique: true },
    StructureTree: { type: Schema.Types.Mixed },
  },
  { timestamps: true },
);

const OrgStructureTreeModel = mongoose.model(
  "Cat_OrgStructureTree_T",
  OrgStructureTree,
);

module.exports = OrgStructureTreeModel;
