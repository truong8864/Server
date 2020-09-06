const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const T_Hre_ProfileSchema = new Schema({
  ID: { type: Schema.Types.String },
  CodeEmp: { type: Schema.Types.String },
  ProfileName: { type: Schema.Types.String },
  CodeTax: { type: Schema.Types.String },
  IDNo: { type: Schema.Types.String },
  DateHire: { type: Schema.Types.String },
  DateQuit: { type: Schema.Types.String },
  Relatives: { type: Schema.Types.String },
  DateContract: { type: Schema.Types.String },
  PositionName: { type: Schema.Types.String },
  E_COMPANY_CODE: { type: Schema.Types.String },
  E_UNIT_CODE: { type: Schema.Types.String },
  E_DIVISION: { type: Schema.Types.String },
  E_DIVISION_CODE: { type: Schema.Types.String },
  E_DEPARTMENT: { type: Schema.Types.String },
  E_DEPARTMENT_CODE: { type: Schema.Types.String },
  E_SECTION: { type: Schema.Types.String },
  E_SECTION_CODE: { type: Schema.Types.String },
});

const T_Hre_ProfileModel = mongoose.model("T_Hre_Profile", T_Hre_ProfileSchema);

module.exports = T_Hre_ProfileModel;
