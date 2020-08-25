const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Hre_ProfileSchema = new Schema(
  {
    ///thong tin co ban khi vao lam
    CodeEmp: { type: Schema.Types.String, required: true, unique: true }, //ma NV**
    DateHire: { type: Schema.Types.String }, //Ngay vao lam**
    StatusSyn: {type: Schema.Types.String}, //trang thai

    //thong tin ca nhan
    ProfileName: { type: Schema.Types.String, required: true,minlength:2 }, ///ten nv**
    // FistName: { type: Schema.Types.String }, //ten
    // LastName: { type: Schema.Types.String }, //ho
    // EnglishName: { type: Schema.Types.String }, //ten tieng anh
    DateOfBirth: { type: Schema.Types.Date }, //ngay sinh
    PlaceOfBirth: { type: Schema.Types.String }, //noi sinh
    Gender: { type: Schema.Types.String }, //gioi tinh
    IDNo: { type: Schema.Types.String, required: true , unique: true ,minlength:9,maxlength:12 }, //So CMND
    IDNoDateOfIssue: { type: Schema.Types.String },
    IDNoPlaceOfIssue: { type: Schema.Types.String },


    // IDNo2: { type: Schema.Types.String }, //The can cuoc cong dan
    // IDNo2DateOfIssue: { type: Schema.Types.String },
    // IDNo2PlaceOfIssue: { type: Schema.Types.String },
    // IDNo2DateOfExpiry: { type: Schema.Types.String },
    // PassportNo: { type: Schema.Types.String }, //So ho chieu
    // PassportDateOfIssue: { type: Schema.Types.Date },
    // PassportPlaceOfIssue: { type: Schema.Types.String },
    // PassportDateOfExpiry: { type: Schema.Types.Date },

    // //thong tin lien he
    // Email1: { type: Schema.Types.String },
    // Email2: { type: Schema.Types.String },
    // PhoneNumber1: { type: Schema.Types.String },
    // PhoneNumber2: { type: Schema.Types.String },

    //  //thong tin cong viec
    // DonViCongTac: {type:Schema.Types.String}, //Ma nhan vien orgstructure
    // ChucVu: {type:Schema.Types.String}, ///position
    // ThoiGianThuViec: { type: Schema.Types.String },//thoi gian thu viec///////sau khi ki hop dong thu viec
    // DateEndProbation: { type: Schema.Types.String },//ngay ket thuc thu viec//sau khi ki hop dong thu viec
    // Supervisor:{ type: Schema.Types.String },

    ///thong tin he thong
    UserCreate: { type: Schema.Types.String }, ///nguoi tao
    UserUpdate: { type: Schema.Types.String }, //nguoi cap nhat
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hre_Profile", Hre_ProfileSchema);
