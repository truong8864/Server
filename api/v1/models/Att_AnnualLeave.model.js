const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Att_AnnualLeaveSchema = new Schema({
  ID: { type: Schema.Types.String },
  ProfileID: { type: Schema.Types.String },
  Year: { type: Schema.Types.String },
  MonthStart: { type: Schema.Types.String },
  InitAnlValue: { type: Schema.Types.String },
  InitSickValue: { type: Schema.Types.String },
  InitSaveSickValue: { type: Schema.Types.String },
  ServerUpdate: { type: Schema.Types.String },
  ServerCreate: { type: Schema.Types.String },
  UserUpdate: { type: Schema.Types.String },
  UserCreate: { type: Schema.Types.String },
  DateCreate: { type: Schema.Types.Date },
  DateUpdate: { type: Schema.Types.Date },
  UserLockID: { type: Schema.Types.String },
  DateLock: { type: Schema.Types.String },
  IsDelete: { type: Schema.Types.String },
  IPCreate: { type: Schema.Types.String },
  IPUpdate: { type: Schema.Types.String },
  AnlValueLastYear: { type: Schema.Types.String },
  ExpireAnlValueLastYear: { type: Schema.Types.String },
  AnlMonthReset: { type: Schema.Types.String },
  MonthResetAnlOfBeforeYear: { type: Schema.Types.String },
  SurplusAnllastYear: { type: Schema.Types.String },
  SurplusSicklastYear: { type: Schema.Types.String },
  AvailableByProfile: { type: Schema.Types.String },
  AvailableByProfileNew: { type: Schema.Types.String },
  DateChangeNewAvailable: { type: Schema.Types.String },
  InitMensesValue: { type: Schema.Types.String },
  SortID: { type: Schema.Types.String },
  InitAdditionalValue: { type: Schema.Types.String },
});

const Att_AnnualLeaveModel = mongoose.model(
  "Att_AnnualLeave",
  Att_AnnualLeaveSchema,
);

module.exports = Att_AnnualLeaveModel;
