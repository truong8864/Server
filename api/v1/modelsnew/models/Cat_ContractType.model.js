const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Cat_ContractTypeSchema = new Schema({
  ID: { type: Schema.Types.String },
  ContractTypeName: { type: Schema.Types.String },
  Type: { type: Schema.Types.String },
  UnitTime: { type: Schema.Types.String },
  ValueTime: { type: Schema.Types.Number },
  ReportMappingID: { type: Schema.Types.String },
  UserUpdate: { type: Schema.Types.String },
  UserCreate: { type: Schema.Types.String },
  DateCreate: { type: Schema.Types.Date },
  DateUpdate: { type: Schema.Types.Date },
  Description: { type: Schema.Types.String },
  ExportID: { type: Schema.Types.String },
  Formula: { type: Schema.Types.String },
  SortID: { type: Schema.Types.Number },
  ContractNextID: { type: Schema.Types.String },
});

const Cat_ContractTypeModel = mongoose.model(
  "Cat_ContractType",
  Cat_ContractTypeSchema,
);

module.exports = Cat_ContractTypeModel;
