const Cat_OrgStruccture = require("../models/Cat/Cat_OrgStruccture.model");
const qs = require("qs")

exports.get = async (req, res, next) => {
  try {
    const  filters  = qs.parse(req.query.filters||{},{ allowDots: true })
    const sort=qs.parse(req.query.sort||{_id:-1},{ allowDots: true });
    const fields=qs.parse(req.query.fields||{},{ allowDots: true });
   
    const page= parseInt(req.query.page||1)
    const perPage=parseInt(req.query.limit||25)
    
   
    const data = await Cat_OrgStruccture
    .find(filters) 
     .sort(sort)
     .select(fields)
     .skip((page-1)*perPage)
     .limit(perPage);

    const totalDocuments = await Cat_OrgStruccture
    .find(filters)
    .sort(sort)
    .countDocuments()
    const totalPages =Math.ceil(totalDocuments/perPage);

    res.json({
    method:"GET",
    path:req.originalUrl,
    message: "GET_LIST_ORGSTRUCTURE" ,
    status:"SUCCESS",
    meta:{
      page,
      perPage,
      totalDocuments,
      totalPages },
    data });
  } catch (error) {
    next(error);
  }
};

// exports.getByCodeEmp = async (req, res, next) => {
//   try {
//     const { CodeEmp } = req.params;
//     const profile = await Cat_OrgStruccture.findOne({ CodeEmp: CodeEmp });
//     res.json({ 
//       method:"GET",
//       path:req.originalUrl,
//       message: "GET_PROFILE_BY_CODE_EMP" ,
//       status:"SUCCESS",
//       data: profile });
//   } catch (error) {
//     next(error);
//   }
// };




// exports.create = async (req, res, next) => {
//   try {
//     const { data } = req.body;
//     const profile = await Cat_OrgStruccture.create(data);
//     res.json({
//     method:"POST",
//     path:req.originalUrl,
//     message: "CREATE_PROFILE",
//     status:"SUCCESS", 
//     data: profile });
//   } catch (error) {
//     next(error);
//   }
// };

// exports.update = async (req, res, next) => {
//   try {
//     const { data } = req.body;
//     const { CodeEmp } = req.params;
//     const profile = await Cat_OrgStruccture.updateOne({ CodeEmp }, data);
//     res.json({ message: "UPDATE PROFILE", data: profile });
//   } catch (error) {
//     next(error);
//   }
// };

// exports.delete = async (req, res, next) => {
//   try {
//     const { CodeEmp } = req.params;
//     const profile = await Cat_OrgStruccture.deleteOne({ CodeEmp });
//     res.json({ message: "DELETE PROFILE", data: profile });
//   } catch (error) {
//     next(error);
//   }
// };
