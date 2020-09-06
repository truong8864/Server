const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Att_AnnualDetailSchema = new Schema({
  ID: { type: Schema.Types.String },
  ProfileID: { type: Schema.Types.String },
  Year: { type: Schema.Types.String },
  MonthYear: { type: Schema.Types.String },
  MonthBeginInYear: { type: Schema.Types.String },
  MonthResetInitAvailable: { type: Schema.Types.String },
  MonthStartProfile: { type: Schema.Types.String },
  Available: { type: Schema.Types.String },
  LeaveInMonth: { type: Schema.Types.String },
  TotalLeaveBef: { type: Schema.Types.String },
  Remain: { type: Schema.Types.String },
  InitAvailable: { type: Schema.Types.String },
  LeaveInMonthFromInitAvailable: { type: Schema.Types.String },
  TotalLeaveBefFromInitAvailable: { type: Schema.Types.String },
  IsHaveResetInitAvailable: { type: Schema.Types.String },
  ServerUpdate: { type: Schema.Types.String },
  ServerCreate: { type: Schema.Types.String },
  UserUpdate: { type: Schema.Types.String },
  UserCreate: { type: Schema.Types.String },
  DateCreate: { type: Schema.Types.String },
  DateUpdate: { type: Schema.Types.String },
  UserLockID: { type: Schema.Types.String },
  DateLock: { type: Schema.Types.String },
  IsDelete: { type: Schema.Types.String },
  IPCreate: { type: Schema.Types.String },
  IPUpdate: { type: Schema.Types.String },
  Type: { type: Schema.Types.String },
  SortID: { type: Schema.Types.String },
  SeniorBonus: { type: Schema.Types.String },
  PregnantLeaveAvailablePerMonth: { type: Schema.Types.String },
  InitAvailableInMonth: { type: Schema.Types.String },
  AvailableInMonth: { type: Schema.Types.String },
  SettlementInMonth: { type: Schema.Types.String },
  TotalSettlementInMonthBef: { type: Schema.Types.String },
});

const Att_AnnualDetailModel = mongoose.model(
  "Att_AnnualDetail",
  Att_AnnualDetailSchema,
);

module.exports = Att_AnnualDetailModel;
