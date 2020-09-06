const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Att_LeaveDaySchema = new Schema(
  {
    DayLeave: { type: Schema.Types.Date, required: true },
    CodeEmp: { type: Schema.Types.String },
    ProfileID: { type: Schema.Types.String, required: true },
    LeaveDayType: { type: Schema.Types.String },
    Status: { type: Schema.Types.String },
    LeaveReason: { type: Schema.Types.String },
    Description: { type: Schema.Types.String },

    // UserRegister: { type: Schema.Types.String },
    // DateRegister: { type: Schema.Types.String },
    // Comment: { type: Schema.Types.String },

    // UserApprove: { type: Schema.Types.String },
    // DateApprove: { type: Schema.Types.String },
    // CommentApprove: { type: Schema.Types.String },

    // UserCanel: { type: Schema.Types.String },
    // DateCancel: { type: Schema.Types.String },
    // CommentCancel: { type: Schema.Types.String },

    // UserUpdate: { type: Schema.Types.String },
    // UserCreate: { type: Schema.Types.String },
    IsLock: { type: Schema.Types.Boolean },
  },
  { timestamps: true },
);

Att_LeaveDaySchema.index({ ProfileID: 1, DayLeave: 1 }, { unique: true });
const Att_LeaveDayModel = mongoose.model("Att_LeaveDay", Att_LeaveDaySchema);

module.exports = Att_LeaveDayModel;
