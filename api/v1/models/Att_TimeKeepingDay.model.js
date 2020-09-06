const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Att_TimeKeepingDaySchema = new Schema({
  ProfileID: { type: Schema.Types.String, required: true },
  DateKeeping: { type: Schema.Types.Date, required: true },
  TimeIn: { type: Schema.Types.Date, required: true },
  TimeOut: { type: Schema.Types.Date, required: true },
  TimeKeepingType: { type: Schema.Types.String },
  Description: { type: Schema.Types.String },
  Total: {
    type: Schema.Types.Number,
    default: function () {
      if (!this.TimeOut || !this.TimeIn) return 0;
      return this.TimeOut - this.TimeIn;
    },
  },
  IsLock: { type: Schema.Types.Boolean },
  Status: {
    type: Schema.Types.String,
    // default: function () {
    //   if (0 !== this.Total) return "DA_TINH_CONG";
    //   return "CHUA_TINH_CONG";
    // },
    default: "CHUA_TINH_CONG",
  },
  // TotalHours: {
  //   type: Schema.Types.Number,
  //   default: function () {
  //     if (this.Total)
  //       return Math.round((this.Total / (1000 * 60 * 60)) * 10) / 10;
  //     return;
  //   },
  // },
  // TotalDay: {
  //   type: Schema.Types.Number,
  //   default: function () {
  //     if (this.TotalHours)
  //       return Math.round((this.TotalHours / 24) * 100) / 100;
  //     return;
  //   },
  // },
});

Att_TimeKeepingDaySchema.pre("findOneAndUpdate", async function (next) {
  next();
});

Att_TimeKeepingDaySchema.post("findOneAndUpdate", async function (doc) {
  const { TimeOut, TimeIn } = this._update.$set;

  //cap nhat Status

  if (TimeOut || TimeIn) {
    await this.model.updateOne(
      { _id: doc._id },
      {
        Status: "CHUA_TINH_CONG",
        Total: 0,
      },
    );
  }
});

Att_TimeKeepingDaySchema.virtual("Profile", {
  ref: "Hre_Profile",
  localField: "ProfileID",
  foreignField: "ID",
  justOne: true,
});

Att_TimeKeepingDaySchema.set("toObject", { virtuals: true });
Att_TimeKeepingDaySchema.set("toJSON", { virtuals: true });

Att_TimeKeepingDaySchema.index(
  { ProfileID: 1, DateKeeping: 1 },
  { unique: true },
);

const Att_TimeKeepingDayModel = mongoose.model(
  "Att_TimeKeepingDay",
  Att_TimeKeepingDaySchema,
);

module.exports = Att_TimeKeepingDayModel;
