const RoleModel = require("./Role.model")

const BaseController = require("../utils/BaseController")

class AuthorizationController extends BaseController{
    constructor(){
      super()
      this.Model=RoleModel
    }
  
    getByRole = async (req,res,next)=>{
      try {
          const { Role } = req.params;
          const data = await this.Model.findOne({Role:Role});
          res.json({ 
              method:"GET",
              path:req.originalUrl,
              // message: "GET" ,
              // status:"SUCCESS",
              data
          });
      } catch (error) {
          next(error)
      }
  }
  
  updateByRole = async (req, res, next)=>{
      try {
          const { Role } = res.params
          const data = req.body
          const result = await this.Model.findOneAndUpdate({Role:Role},data,{new:true})
          res.json({
              method:"PUT",
              path:req.originalUrl,
              // message: "CREATE",
              // status:"SUCCESS", 
              data: result 
          });
      } catch (error) {
          next(error)
      }
  }
  
  deleteByRole = async (req, res, next)=>{
      try {
          const { Role } = res.params
          const result = await this.Model.findOneAndRemove({Role:Role})
          res.json({
              method:"DELETE",
              path:req.originalUrl,
              // message: "CREATE",
              // status:"SUCCESS", 
              data: result 
          });
      } catch (error) {
          next(error)
      }
  }  
  
  }
  
  module.exports= new AuthorizationController()

