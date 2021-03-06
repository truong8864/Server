const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userOnlineSchema = new Schema(
  {
    expireAt: { type: Date, default: null },
    username: { type: String, required: true, trim: true, minlength: 2 },
    ip: { type: String, required: true, trim: true },
    refreshToken: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

userOnlineSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("UserOnline", userOnlineSchema);
