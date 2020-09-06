const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Cat_LeaveDayTypeSchema = new Schema({
  ID: { type: Schema.Types.String },
  LeaveDayTypeName: { type: Schema.Types.String },
  Code: { type: Schema.Types.String },
  CodeStatistic: { type: Schema.Types.String },
  PaidRate: { type: Schema.Types.Number },
  SalaryType: { type: Schema.Types.String },
  Penalty: { type: Schema.Types.Number },
  IsWorkDay: { type: Schema.Types.Number },
  IsAnnualLeave: { type: Schema.Types.Number },
  OrgStructureID: { type: Schema.Types.String },
  IsTimeOffInLieu: { type: Schema.Types.Number },
  UserUpdate: { type: Schema.Types.String },
  UserCreate: { type: Schema.Types.String },
  DateCreate: { type: Schema.Types.Date },
  DateUpdate: { type: Schema.Types.Date },
  SocialRate: { type: Schema.Types.Number },
  SortID: { type: Schema.Types.Number },
});

const Cat_LeaveDayTypeModel = mongoose.model(
  "Cat_LeaveDayType",
  Cat_LeaveDayTypeSchema,
);

module.exports = Cat_LeaveDayTypeModel;
