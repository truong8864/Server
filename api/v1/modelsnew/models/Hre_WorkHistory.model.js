const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Hre_WorkHistorySchema = new Schema({
  ID: { type: Schema.Types.String },
  ProfileID: { type: Schema.Types.String },
  ProfileID1: { type: Schema.Types.String },
  DateEffective: { type: Schema.Types.String },
  OrganizationStructureID: { type: Schema.Types.String },
  PositionID: { type: Schema.Types.String },
  LaborType: { type: Schema.Types.String },
  PayrollGroupID: { type: Schema.Types.String },
  WorkLocation: { type: Schema.Types.String },
  Supervisor: { type: Schema.Types.String },
  UserUpdate: { type: Schema.Types.String },
  UserCreate: { type: Schema.Types.String },
  DateCreate: { type: Schema.Types.Date },
  DateUpdate: { type: Schema.Types.Date },
  JobTitleID: { type: Schema.Types.String },
  Status: { type: Schema.Types.String },
  Description: { type: Schema.Types.String },
  OrgOld: { type: Schema.Types.String },
  PositionOld: { type: Schema.Types.String },
  LaborTypeOld: { type: Schema.Types.String },
  PayrollGroupOld: { type: Schema.Types.String },
  WorkLocationOld: { type: Schema.Types.String },
  LocationCodeOld: { type: Schema.Types.String },
  JobTitleOld: { type: Schema.Types.String },
  CodeEmp: { type: Schema.Types.String },
  OrgStructureOldID: { type: Schema.Types.String },
  EmployeeGroupID: { type: Schema.Types.String },
  JobDescription: { type: Schema.Types.String },
  CompanyID: { type: Schema.Types.String },
  WorkPlaceID: { type: Schema.Types.String },
  SortID: { type: Schema.Types.Number },
  MidSupervisor: { type: Schema.Types.String },
  CompanyOldID: { type: Schema.Types.String },
  TypeWorkHistory: { type: Schema.Types.String },
  IsUpdateProfile: { type: Schema.Types.Number },
});

const Hre_WorkHistoryModel = mongoose.model(
  "Hre_WorkHistory",
  Hre_WorkHistorySchema,
);

module.exports = Hre_WorkHistoryModel;
