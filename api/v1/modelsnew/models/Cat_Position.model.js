const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Cat_PositionSchema = new Schema({
  ID: { type: Schema.Types.String },
  PositionName: { type: Schema.Types.String },
  Code: { type: Schema.Types.String },
  UserUpdate: { type: Schema.Types.String },
  UserCreate: { type: Schema.Types.String },
  DateCreate: { type: Schema.Types.Date },
  DateUpdate: { type: Schema.Types.Date },
  SortID: { type: Schema.Types.Number },
  HeadPosProfileID: { type: Schema.Types.String },
});

const Cat_PositionModel = mongoose.model("Cat_Position", Cat_PositionSchema);

module.exports = Cat_PositionModel;
