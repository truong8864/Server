const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Hre_ProfileQualificationSchema = new Schema({
  ID: { type: Schema.Types.String },
  ProfileID: { type: Schema.Types.String },
  ProfileID1: { type: Schema.Types.String },
  FieldOfTraining: { type: Schema.Types.String },
  TrainingPlace: { type: Schema.Types.String },
  SpecialLevelID: { type: Schema.Types.String },
  DateCreate: { type: Schema.Types.Date },
  DateUpdate: { type: Schema.Types.Date },
  SortID: { type: Schema.Types.Number },
});

const Hre_ProfileQualificationModel = mongoose.model(
  "Hre_ProfileQualification",
  Hre_ProfileQualificationSchema,
);

module.exports = Hre_ProfileQualificationModel;
