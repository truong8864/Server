const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Att_DayKeepingSchema = new Schema(
  {
    CodeAttendance: { type: Schema.Types.String, required: true, index: true },
    ProfileID: { type: Schema.Types.String, required: true, index: true },
    CodeEmp: { type: Schema.Types.String, required: true, index: true },
    OrgStructureID: { type: Schema.Types.String, index: true },
    DateKeeping: { type: Schema.Types.Date, required: true, index: true },
    TimeIn: { type: Schema.Types.Date, required: true, index: true },
    TimeOut: { type: Schema.Types.Date, required: true, index: true },
    TimeKeepingType: { type: Schema.Types.String, index: true },
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
  },
  { timestamps: true },
);

Att_DayKeepingSchema.index({ ProfileID: 1, OrgStructureID: 1, DateKeeping: 1 });

Att_DayKeepingSchema.index({ ProfileID: 1, DateKeeping: 1 }, { unique: true });

Att_DayKeepingSchema.pre("findOneAndUpdate", async function (next) {
  next();
});

Att_DayKeepingSchema.post("findOneAndUpdate", async function (doc) {
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

Att_DayKeepingSchema.virtual("Profile", {
  ref: "Hre_Profile",
  localField: "ProfileID",
  foreignField: "ID",
  justOne: true,
});

Att_DayKeepingSchema.set("toObject", { virtuals: true });
Att_DayKeepingSchema.set("toJSON", { virtuals: true });

Att_DayKeepingSchema.index({ DateKeeping: 1 });
Att_DayKeepingSchema.index({ OrgStructureID: 1 });
Att_DayKeepingSchema.index({ ProfileID: 1, DateKeeping: 1 }, { unique: true });

const Att_DayKeepingModel = mongoose.model(
  "Att_DayKeeping",
  Att_DayKeepingSchema,
);

module.exports = Att_DayKeepingModel;
