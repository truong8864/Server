const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Hre_ProfileSchema = new Schema(
  {
    ///thong tin co ban khi vao lam
    Code: { type: Schema.Types.String },
    OrgStructureID: { type: Schema.Types.String },
    PositionID: { type: Schema.Types.String },
    OrgStructureCode: { type: Schema.Types.String },
    PositionCode: { type: Schema.Types.String },
    ProfileName: { type: Schema.Types.String },
    NameFamily: { type: Schema.Types.String },
    FirstName: { type: Schema.Types.String },
    NameEnglish: { type: Schema.Types.String },
    CodeTax: { type: Schema.Types.String },
    CodeAttendance: { type: Schema.Types.String },
    StatusSyn: { type: Schema.Types.String },
    DateHire: { type: Schema.Types.Date },
    DateEndProbation: { type: Schema.Types.Date },
    DateQuit: { type: Schema.Types.Date },
    DateOfEffect: { type: Schema.Types.Date },
    Gender: { type: Schema.Types.String },
    DateOfBirth: { type: Schema.Types.Date },
    PlaceOfBirth: { type: Schema.Types.String },
    IDNo: { type: Schema.Types.String },
    IDDateOfIssue: { type: Schema.Types.Date },
    IDPlaceOfIssue: { type: Schema.Types.String },
    PassportNo: { type: Schema.Types.String },
    PassportDateOfExpiry: { type: Schema.Types.Date },
    PassportDateOfIssue: { type: Schema.Types.Date },
    PassportPlaceOfIssue: { type: Schema.Types.String },
    Cellphone: { type: Schema.Types.String },
    MarriageStatus: { type: Schema.Types.String },
    DayOfBirth: { type: Schema.Types.Number },
    MonthOfBirth: { type: Schema.Types.Number },
    YearOfBirth: { type: Schema.Types.Number },
    DateApplyAttendanceCode: { type: Schema.Types.Date },
    PAddress: { type: Schema.Types.String },
    ProbationTime: { type: Schema.Types.Number },
    ProbationTimeUnit: { type: Schema.Types.String },

    UserCreate: { type: Schema.Types.String }, ///nguoi tao
    UserUpdate: { type: Schema.Types.String }, //nguoi cap nhat
  },
  { timestamps: true },
);

module.exports = mongoose.model("Hre_Profile", Hre_ProfileSchema);
