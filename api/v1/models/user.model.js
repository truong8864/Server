const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, trim: true, minlength: 2 },
  role: { type: String, enum: ["admin", "customer"] },
  password: { type: String, required: true, trim: true, minlength: 6 },
  password_confirm: { type: String, required: true, trim: true, minlength: 6 },
});
module.exports = mongoose.model("User", userSchema);
