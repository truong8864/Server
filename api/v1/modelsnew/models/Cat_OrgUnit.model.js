const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Cat_OrgUnitSchema = new Schema({
  ID: { type: Schema.Types.String },
  OrgstructureID: { type: Schema.Types.String },
  E_COMPANY: { type: Schema.Types.String },
  E_UNIT: { type: Schema.Types.String },
  E_DIVISION: { type: Schema.Types.String },
  E_DEPARTMENT: { type: Schema.Types.String },
  E_TEAM: { type: Schema.Types.String },
  E_SECTION: { type: Schema.Types.String },
  E_COMPANY_CODE: { type: Schema.Types.String },
  E_UNIT_CODE: { type: Schema.Types.String },
  E_DIVISION_CODE: { type: Schema.Types.String },
  E_DEPARTMENT_CODE: { type: Schema.Types.String },
  E_TEAM_CODE: { type: Schema.Types.String },
  E_SECTION_CODE: { type: Schema.Types.String },
  SortID: { type: Schema.Types.Number },
});

const Cat_OrgUnitModel = mongoose.model("Cat_OrgUnit", Cat_OrgUnitSchema);

module.exports = Cat_OrgUnitModel;
