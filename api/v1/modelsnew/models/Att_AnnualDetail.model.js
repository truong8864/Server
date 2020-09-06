const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Att_AnnualDetailSchema = new Schema({
  ID: { type: Schema.Types.String },
  ProfileID: { type: Schema.Types.String },
  Year: { type: Schema.Types.Number },
  MonthYear: { type: Schema.Types.Date },
  MonthBeginInYear: { type: Schema.Types.Number },
  MonthResetInitAvailable: { type: Schema.Types.Number },
  MonthStartProfile: { type: Schema.Types.Number },
  Available: { type: Schema.Types.Number },
  LeaveInMonth: { type: Schema.Types.Number },
  TotalLeaveBef: { type: Schema.Types.Number },
  Remain: { type: Schema.Types.Number },
  InitAvailable: { type: Schema.Types.Number },
  IsHaveResetInitAvailable: { type: Schema.Types.Number },
  UserUpdate: { type: Schema.Types.String },
  UserCreate: { type: Schema.Types.String },
  DateCreate: { type: Schema.Types.Date },
  DateUpdate: { type: Schema.Types.Date },
  Type: { type: Schema.Types.String },
  SortID: { type: Schema.Types.Number },
});

const Att_AnnualDetailModel = mongoose.model(
  "Att_AnnualDetail",
  Att_AnnualDetailSchema,
);

module.exports = Att_AnnualDetailModel;
