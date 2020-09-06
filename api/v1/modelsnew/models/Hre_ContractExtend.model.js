const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Hre_ContractExtendSchema = new Schema({
  ID: { type: Schema.Types.String },
  ContractID: { type: Schema.Types.String },
  AnnexCode: { type: Schema.Types.String },
  DateStart: { type: Schema.Types.Date },
  DateEnd: { type: Schema.Types.Date },
  UserUpdate: { type: Schema.Types.String },
  UserCreate: { type: Schema.Types.String },
  DateCreate: { type: Schema.Types.Date },
  DateUpdate: { type: Schema.Types.Date },
  SortID: { type: Schema.Types.Number },
  TypeAppendix: { type: Schema.Types.String },
  JobTitleID: { type: Schema.Types.String },
  AppendixContractTypeID: { type: Schema.Types.String },
  PositionID: { type: Schema.Types.String },
  DateSignedAppendixContract: { type: Schema.Types.Date },
  WorkPlaceID: { type: Schema.Types.String },
  CurrencyIDSalary: { type: Schema.Types.String },
  salary: { type: Schema.Types.Number },
  CurrencyID: { type: Schema.Types.String },
  AppendixStatus: { type: Schema.Types.String },
  IDNo: { type: Schema.Types.String },
  IDDateOfIssue: { type: Schema.Types.Date },
  IDPlaceOfIssue: { type: Schema.Types.String },
  PAddress: { type: Schema.Types.String },
  OrgStructureID: { type: Schema.Types.String },
  CompanyID: { type: Schema.Types.String },
  Status: { type: Schema.Types.String },
});
const Hre_ContractExtendModel = mongoose.model(
  "Hre_ContractExtend",
  Hre_ContractExtendSchema,
);
module.exports = Hre_ContractExtendModel;
