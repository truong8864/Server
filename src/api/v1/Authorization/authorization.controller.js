const RoleModel = require("../Role/Role.model");

class AuthorizationController {
  checkPermission = async (req, res, next) => {
    try {
      res.json("CHECK PERMISSION");
    } catch (error) {
      next(err);
    }
  };
}

module.exports = AuthorizationController;
