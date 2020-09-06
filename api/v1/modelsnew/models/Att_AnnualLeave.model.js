const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Att_AnnualLeaveSchema = new Schema({
  ID: { type: Schema.Types.String },
  ProfileID: { type: Schema.Types.String },
  Year: { type: Schema.Types.Number },
  MonthStart: { type: Schema.Types.Number },
  InitAnlValue: { type: Schema.Types.Number },
  InitSickValue: { type: Schema.Types.Number },
  InitSaveSickValue: { type: Schema.Types.Number },
  UserUpdate: { type: Schema.Types.String },
  UserCreate: { type: Schema.Types.String },
  DateCreate: { type: Schema.Types.Date },
  DateUpdate: { type: Schema.Types.Date },
  SortID: { type: Schema.Types.Number },
});

const Att_AnnualLeaveModel = mongoose.model(
  "Att_AnnualLeave",
  Att_AnnualLeaveSchema,
);

module.exports = Att_AnnualLeaveModel;
