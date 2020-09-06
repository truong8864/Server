const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoleSchema = new Schema(
  {
    role: { type: Schema.Types.String, required: true, unique: true },
    allows: { type: Schema.Types.Array, required: true },
    UserCreate: { type: Schema.Types.String },
    UserUpdate: { type: Schema.Types.String },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Role_T", RoleSchema);
