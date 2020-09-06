const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Cat_OrgStructureSchema = new Schema({
  ID: { type: Schema.Types.String },
  OrgStructureName: { type: Schema.Types.String },
  Code: { type: Schema.Types.String },
  CodeBranch: { type: Schema.Types.String },
  IsRoot: { type: Schema.Types.Number },
  AddressDetail: { type: Schema.Types.String },
  Phone: { type: Schema.Types.String },
  TypeID: { type: Schema.Types.String },
  ParentID: { type: Schema.Types.String },
  BranchID: { type: Schema.Types.String },
  OrderNumber: { type: Schema.Types.Number },
  UserUpdate: { type: Schema.Types.String },
  UserCreate: { type: Schema.Types.String },
  DateCreate: { type: Schema.Types.Date },
  DateUpdate: { type: Schema.Types.Date },
  DecisionDate: { type: Schema.Types.Date },
  Status: { type: Schema.Types.String },
  DecisionNo: { type: Schema.Types.String },
  OrgStructureTypeID: { type: Schema.Types.String },
  SortID: { type: Schema.Types.Number },
  CompanyID: { type: Schema.Types.String },
  OrgUnitID: { type: Schema.Types.String },
});

const Cat_OrgStructureModel = mongoose.model(
  "Cat_OrgStructure",
  Cat_OrgStructureSchema,
);
module.exports = Cat_OrgStructureModel;
