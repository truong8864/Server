const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Hre_ProfileQualificationSchema = new Schema({
  ID: { type: Schema.Types.String },
  ProfileID: { type: Schema.Types.String },
  QualificationTypeID: { type: Schema.Types.String },
  QualifiTypeID: { type: Schema.Types.String },
  FieldOfTraining: { type: Schema.Types.String },
  CertificateName: { type: Schema.Types.String },
  GraduationDate: { type: Schema.Types.String },
  QualificationName: { type: Schema.Types.String },
  TrainingPlace: { type: Schema.Types.String },
  TrainingAddress: { type: Schema.Types.String },
  DateStart: { type: Schema.Types.String },
  DateFinish: { type: Schema.Types.String },
  Rank: { type: Schema.Types.String },
  SpecialLevelID: { type: Schema.Types.String },
  Comment: { type: Schema.Types.String },
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
  DateExpired: { type: Schema.Types.String },
  SortID: { type: Schema.Types.String },
  IsQualificationMain: { type: Schema.Types.String },
  FileAttach: { type: Schema.Types.String },
  TrainingType: { type: Schema.Types.String },
  EducationLevelID: { type: Schema.Types.String },
  TypeOfEducation: { type: Schema.Types.String },
});

const Hre_ProfileQualificationModel = mongoose.model(
  "Hre_ProfileQualification",
  Hre_ProfileQualificationSchema,
);

module.exports = Hre_ProfileQualificationModel;
