const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Cat_PositionSchema = new Schema(
  {
    ID: { type: Schema.Types.String },
    PositionName: { type: Schema.Types.String },
    Code: { type: Schema.Types.String },

    UserCreate: { type: Schema.Types.String }, ///nguoi tao
    UserUpdate: { type: Schema.Types.String }, //nguoi cap nhat
  },
  { timestamps: true },
);
module.exports = mongoose.model("Cat_Position", Cat_PositionSchema);
