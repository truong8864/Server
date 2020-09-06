

const  Hre_ProfileModel = require("../models/Hre_Profile.model")

const  SalaryModel = require("../models/Att_Salary.model")


module.exports.get = async (req,res) =>{
  try{

    const filter=req.query
    const data = await SalaryModel.aggregate([
      {
        $lookup:{
          from: "hre_profiles",
          localField:"ProfileID",
          foreignField:"ID",
          as: "Profile"
        }
      },
      {
        $addFields:{
          ProfileName:{ "$arrayElemAt": [ "$Profile.ProfileName", 0 ] },
          OrgStructureID:{ "$arrayElemAt": [ "$Profile.OrgStructureID", 0 ] },
          CodeEmp:{ "$arrayElemAt": [ "$Profile.CodeEmp", 0 ] } ,
        }
      },
      {
        $lookup:{
          from: "cat_orgstructures",
          localField:"OrgStructureID",
          foreignField:"ID",
          as: "OrgStructure"
        }
      },
      {
        $addFields:{
          OrgStructureName:{ "$arrayElemAt": [ "$OrgStructure.OrgStructureName", 0 ] },
        }
      },
      {
        $project:{
          OrgStructure:0,
          Profile:0
        }
      },
      {
        $match:filter
      }
    ])

    return res.json({message:"GET SALARY",data})    
  }
  catch(err)
  {
    res.sendStatus(403)
  }
}



module.exports.update = async (req, res) => {
  try{
    const { ID } = req.params;
    const  data  = req.body;
    const result = await SalaryModel.findOneAndUpdate({_id:ID}, {...data},{new:true});
    const resultData=await SalaryModel.aggregate([{
      $match:result
    },
    {
      $lookup:{
        from: "hre_profiles",
        localField:"ProfileID",
        foreignField:"ID",
        as: "Profile"
      }
    },
    {
      $addFields:{
        ProfileName:{ "$arrayElemAt": [ "$Profile.ProfileName", 0 ] },
        CodeEmp:{ "$arrayElemAt": [ "$Profile.CodeEmp", 0 ] } ,
        OrgStructureID:{ "$arrayElemAt": [ "$Profile.OrgStructureID", 0 ] } ,
      }
    },
    {
      $lookup:{
        from: "cat_orgstructures",
        localField:"OrgStructureID",
        foreignField:"ID",
        as: "OrgStructure"
      }
    },
    {
      $addFields:{
        OrgStructureName:{ "$arrayElemAt": [ "$OrgStructure.OrgStructureName", 0 ] } ,
      }
    },
    {
      $project:{
        Profile:0,
        OrgStructure:0
      }
    },
  ])
    return res.status(200).json({data:resultData[0]}); 
  }
  catch(err)
  {
    return res.sendStatus(403)
  }
};

module.exports.delete = async (req, res) => {
  try{
    const { ID } = req.params;
    const result = await SalaryModel.findByIdAndDelete(ID);
    res.status(200).json(result);
  }
  catch(err)
  {
    return res.sendStatus(403)
  }
};



module.exports.create = async (req,res) =>{
    try{
      return res.json({message:"CRATE SALARY"})    
    }
    catch(err)
    {
      res.sendStatus(403)
    }
}
 
  module.exports.payroll = async (req,res) =>{
    try{
      const {KiCong,...filter}=req.body
      const result=await Hre_ProfileModel.aggregate([
        {
          $match:filter
        },
        {
          $lookup:{
              "from": "att_timekeepinggroups",     
              "localField": "ProfileID",     
              "foreignField": "ProfileID",     
              "as": "TimeKeepingGroup"   
          } 
        },
        {
          $addFields:{
            KiCong:{ "$arrayElemAt": ["$TimeKeepingGroup.KiCong", 0 ] },
            TotalKeepingReality:{ $divide:[{ "$arrayElemAt": ["$TimeKeepingGroup.TotalKeepingReality", 0 ] },1000*60*60*9]},
          }
        },
        {
          $project:{
            ProfileID:1,
            KiCong:1,
            TotalKeepingReality: {
              $cond: { if: { $lt: [ "$TotalKeepingReality", 33 ] }, then: "$TotalKeepingReality", else: 33 }
            }
          }
        },
        {
          $match:{KiCong:KiCong}
        },
        {
          $lookup:{
              "from": "hre_contracts",     
              "localField": "ProfileID",     
              "foreignField": "ProfileID",     
              "as": "Contract"   
          } 
        },
        {
          $match:{
            "Contract.Status":"E_APPROVED"
          }
        },
        {
          $addFields:{
            ContractNew: { "$arrayElemAt": [{ $filter: {
              input: "$Contract",
              as: "item",
              cond: { $eq:["$$item.DateSigned",{ $max:"$Contract.DateSigned"}]}
            }}, 0 ] },
          }
        },
        {
          $project:{
            _id:0,
            ProfileID:1,
            KiCong:1,
            SalaryContract:"$ContractNew.Salary",
            Salary: {$multiply:[{
              $ceil:{$divide:[
                {
                  $cond: { if: { $lte: [ "$TotalKeepingReality", 26 ] }, then:{$multiply:["$ContractNew.Salary",{$divide:["$TotalKeepingReality",26]}]}, else: 
                  {$multiply:["$ContractNew.Salary",
                  {$divide:[ {$multiply:[
                    {$subtract :["$TotalKeepingReality",26]}
                    ,1.5]},26]}]}, }
                },

                100]}
            },100]
            },
            TotalKeepingReality:1
          }
        },

        { 
          $merge:{
            into:"att_salaries",
            on:["ProfileID","KiCong"],
           // whenMatched:"keepExisting",
            whenMatched:"replace",
            whenNotMatched:"insert"
          },       
        },
       
      ])
     
      const data = await SalaryModel.aggregate([
        {
          $lookup:{
            from: "hre_profiles",
            localField:"ProfileID",
            foreignField:"ID",
            as: "Profile"
          }
        },
        {
          $addFields:{
            ProfileName:{ "$arrayElemAt": [ "$Profile.ProfileName", 0 ] },
            OrgStructureID:{ "$arrayElemAt": [ "$Profile.OrgStructureID", 0 ] },
            CodeEmp:{ "$arrayElemAt": [ "$Profile.CodeEmp", 0 ] } ,
          }
        },
        {
          $project:{
            Profile:0
          }
        },
        {
          $lookup:{
            from: "cat_orgstructures",
            localField:"OrgStructureID",
            foreignField:"ID",
            as: "OrgStructure"
          }
        },
        {
          $addFields:{
            OrgStructureName:{ "$arrayElemAt": [ "$OrgStructure.OrgStructureName", 0 ] },
          }
        },
        {
          $project:{
            OrgStructure:0
          }
        },
        {
          $match:{...filter,KiCong:KiCong}
        }
      ])

      res.json({
        ms:"PAYROLL" ,
        data:data})
    }
    catch(err)
    {
      console.log(err)
      res.sendStatus(403)
    }
  }

