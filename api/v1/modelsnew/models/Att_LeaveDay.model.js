const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Att_LeaveDaySchema = new Schema({
  ID: { type: Schema.Types.String },
  ProfileID: { type: Schema.Types.String },
  LeaveDayTypeID: { type: Schema.Types.String },
  UserApproveID: { type: Schema.Types.String },
  DateStart: { type: Schema.Types.Date },
  DateEnd: { type: Schema.Types.Date },
  Status: { type: Schema.Types.String },
  Duration: { type: Schema.Types.Number },
  DurationType: { type: Schema.Types.String },
  UserUpdate: { type: Schema.Types.String },
  UserCreate: { type: Schema.Types.String },
  DateCreate: { type: Schema.Types.Date },
  DateUpdate: { type: Schema.Types.Date },
  LeaveDays: { type: Schema.Types.Number },
  LeaveHours: { type: Schema.Types.Number },
  OrgStructureID: { type: Schema.Types.String },
  ShiftID: { type: Schema.Types.String },
  JobTitleID: { type: Schema.Types.String },
  PositionID: { type: Schema.Types.String },
  PayrollGroupID: { type: Schema.Types.String },
  LaborType: { type: Schema.Types.String },
  SortID: { type: Schema.Types.Number },
  CompanyID: { type: Schema.Types.String },
});

const Att_LeaveDayModel = mongoose.model("Att_LeaveDay", Att_LeaveDaySchema);

module.exports = Att_LeaveDayModel;
