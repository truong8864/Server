const mongoose = require("mongoose");
const { static } = require("express");
const Schema = mongoose.Schema;

const Hre_CollaborateSchema = new Schema({
  ProfileID: { type: Schema.Types.String },
  CodeEmp: { type: Schema.Types.String },
  ProfileName: { type: Schema.Types.String },
  Status: { type: Schema.Types.String,
    default: "Chuẩn bị công tác",},
  Reason: { type: Schema.Types.String },
  Accept:{ type: Schema.Types.String,
    default: "Chưa duyệt" },
  DateCreate: { type: Schema.Types.Date },
  DateUpdate: { type: Schema.Types.Date },
  DateSignature: { type: Schema.Types.Date },
  DateStart: { type: Schema.Types.Date,},
  Time: { type: Schema.Types.Number },
  DateEnd: { type: Schema.Types.Date,
    // default: function () {
    //   if(this.DateStart&&this.Time)
    //   {
    //     return this.DateEnd.setMonth(this.DateStart.getMonth()+this.Time)
    //   }
    //   return 0;
    // }
  },
  PositionName: { type: Schema.Types.String },
  E_UNIT: { type: Schema.Types.String }, //công ty
  E_UNIT_CODE: { type: Schema.Types.String },
  E_DIVISION: { type: Schema.Types.String }, // chi nhánh
  E_DIVISION_CODE: { type: Schema.Types.String },
  E_DEPARTMENT: { type: Schema.Types.String }, // phòng ban
  E_DEPARTMENT_CODE: { type: Schema.Types.String },
  E_TEAM: { type: Schema.Types.String }, //bộ phận
  E_TEAM_CODE: { type: Schema.Types.String },
  E_SECTION: { type: Schema.Types.String }, //Tổ công tác
  E_SECTION_CODE: { type: Schema.Types.String },
});

const Hre_CollaborateModel = mongoose.model(
  "Hre_Collaborate",
  Hre_CollaborateSchema,
);

module.exports = Hre_CollaborateModel;
  