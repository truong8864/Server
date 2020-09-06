const mongoose = require("mongoose");
//const Hre_ContractModel = require("./Hre_Contract.model"); //Model Current Folder
const Hre_ContractModel = require("../../../../../api/v1/models/Hre_Contract.model"); //Model Outside Folder
const BaseController = require("../../utils/BaseController");

class Hre_ContractController extends BaseController {
  constructor(Model = {}) {
    if (Model.schema instanceof mongoose.Schema) {
      super(Model);
      return this;
    }
    super(Hre_ContractModel);
  }
  HreContract = async (req, res, next) => {    
    try {
      const filter=req.query
      console.log(filter)
      const contract = await Hre_ContractModel.aggregate([
        {
           $sort: { 
              ProfileID: 1, 
              DateEnd: 1,
              DateSigned:1,
              DateStart:1
            }
        },
        {
          $group:{
            _id:"$ProfileID",
            DateSigned:{ $last: "$DateSigned" },
            DateStart:{ $last: "$DateStart" },
            DateEnd:{ $last: "$DateEnd" },
          }
        },
        {
          $lookup: {
            from: 'hre_profiles',
            localField: '_id',
            foreignField: 'ID',
            as: 'profiles',
          }
        },
        {
          $addFields:{
            ProfileName:{ "$arrayElemAt": [ "$profiles.ProfileName", 0 ] },
            CodeEmp:{ "$arrayElemAt": [ "$profiles.CodeEmp", 0 ] },
            OrgStructureID:{ "$arrayElemAt": [ "$profiles.OrgStructureID", 0 ] } ,
            Gender:{ "$arrayElemAt": [ "$profiles.Gender", 0 ] } ,
            IDNo:{ "$arrayElemAt": [ "$profiles.IDNo", 0 ] } ,
            StatusSyn:{ "$arrayElemAt": [ "$profiles.StatusSyn", 0 ] } ,
            PositionID:{ "$arrayElemAt": [ "$profiles.PositionID", 0 ] } ,
            DateHire:{ "$arrayElemAt": [ "$profiles.DateHire", 0 ] } 
          }
        },
        {
          $match:filter,
        },
        {
          $match:{
            DateEnd:{$gt: new Date()},
            //StatusSyn:"E_HIRE"
          }
        }
       ])
       // await contract.limit(10)
        return res.json({
          method: "GET",
          path: req.originalUrl,
          message: "GET PROFILE BY CODEEMP",
          status: "SUCCESS",
          data: contract
        })
      }
      catch(err)
      {
        console.log(err)
        res.sendStatus(403)
      }
  } 
}

module.exports = Hre_ContractController;
