const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      unique: true,
    },
    password: { type: String, required: true, trim: true, minlength: 6 },
    role: {
      type: String,
      //enum: ["admin", "customer"],
      default: "customer",
    },
  },
  { timestamps: true },
);
module.exports = mongoose.model("User_T", userSchema);
