const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Hre_StopWorkingSchema = new Schema({
  ID: { type: Schema.Types.String },
  StopWorkType: { type: Schema.Types.String },
  ResignReasonID: { type: Schema.Types.String },
  DateStop: { type: Schema.Types.Date },
  Status: { type: Schema.Types.String },
  LastStatusSyn: { type: Schema.Types.String },
  UserUpdate: { type: Schema.Types.String },
  UserCreate: { type: Schema.Types.String },
  DateCreate: { type: Schema.Types.Date },
  DateUpdate: { type: Schema.Types.Date },
  ProfileID: { type: Schema.Types.String },
  JobTitleID: { type: Schema.Types.String },
  PositionID: { type: Schema.Types.String },
  OrgStructureID: { type: Schema.Types.String },
  ContractTypeID: { type: Schema.Types.String },
  SortID: { type: Schema.Types.Number },
});

const Hre_StopWorkingModel = mongoose.model(
  "Hre_StopWorking",
  Hre_StopWorkingSchema,
);

module.exports = Hre_StopWorkingModel;
