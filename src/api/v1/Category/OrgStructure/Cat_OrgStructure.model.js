const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Cat_OrgStructureSchema = new Schema(
  {
    ID: { type: Schema.Types.String },
    OrgStructureName: { type: Schema.Types.String },
    Code: { type: Schema.Types.String },
    ParentCode: { type: Schema.Types.String },
    IsRoot: { type: Schema.Types.String },
    AddressDetail: { type: Schema.Types.String },
    Phone: { type: Schema.Types.String },
    ParentID: { type: Schema.Types.String },
    DecisionDate: { type: Schema.Types.Date },
    Status: { type: Schema.Types.String },
    DecisionNo: { type: Schema.Types.String },

    UserCreate: { type: Schema.Types.String }, ///nguoi tao
    UserUpdate: { type: Schema.Types.String }, //nguoi cap nhat
  },
  { timestamps: true },
);
module.exports = mongoose.model("Cat_OrgStructure", Cat_OrgStructureSchema);
