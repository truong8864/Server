const httpStatus = require("http-status")
const RoleModel = require("../Authorization/Role.model")

module.exports.middleware= (getUserAndRole)=>{
    const Authorization = async (req,res,next)=>{
        try {
            const resources = req.originalUrl
            const method = req.method.toLowerCase()
            const checkPermission = await this.isAllowed(getUserAndRole(req),resources,method)
            if(checkPermission){
                return next()
            }
            res.status(httpStatus.UNAUTHORIZED).json({message:"Not permission"})
        } catch (error) {
            next(error)
        }
    }
    return Authorization 
}

module.exports.isAllowed= async(UserAndRole,resources,method)=>{
    try {
        const [,role]=UserAndRole;
        const data = await RoleModel.findOne({role:role})
        if(data){
            const allows = data.allows
            if(0===allows.length){
                return false
            }
            for (let index = 0; index < allows.length; index++) {
                const element = allows[index];
                if("*"===element.resources&&"*"===element.permissions){
                    return true
                }
                if("*"===element.resources&&-1!==element.permissions.indexOf(method)){
                    return true
                }
                if(-1!==element.resources.indexOf(resources)&&"*"===element.permissions){
                    return true
                }
                if(-1!==element.resources.indexOf(resources)&&-1!==element.permissions.indexOf(method)){
                    return true
                }   
                return false
            }
        }
        return false
    } catch (error) {
        return false
    }   
}

