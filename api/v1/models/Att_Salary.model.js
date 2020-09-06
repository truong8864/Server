const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SalarySchema = new Schema(
  {
    KiCong: { type: Schema.Types.String },
    CodeEmp: { type: Schema.Types.String },
    ProfileID: { type: Schema.Types.String },
    CodeAttendance: { type: Schema.Types.String },
    OrgStructureID: { type: Schema.Types.String },
    SalaryContract: { type: Schema.Types.Number },
    TotalKeepingReality: { type: Schema.Types.Number },
    Salary: { type: Schema.Types.Number },
    Description: { type: Schema.Types.String },
    Status: { type: Schema.Types.String },
    //IsLock: { type: Schema.Types.Boolean },
  },
  { timestamps: true },
);

SalarySchema.index({ ProfileID: 1, KiCong: 1 }, { unique: true });

const SalaryModel = mongoose.model("Att_Salary", SalarySchema);

module.exports = SalaryModel;
