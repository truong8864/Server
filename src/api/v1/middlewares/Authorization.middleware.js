const httpStatus = require("http-status");
const RoleModel = require("../Role/Role.model");

module.exports.middleware = (getUserAndRole) => {
  const Authorization = async (req, res, next) => {
    try {
      const resources = req.originalUrl;
      const method = req.method.toLowerCase();
      const checkPermission = await this.isAllowed(
        getUserAndRole(req),
        resources,
        method,
      );
      if (checkPermission) {
        return next();
      }
      res.status(httpStatus.UNAUTHORIZED).json({ message: "Not permission" });
    } catch (error) {
      next(error);
    }
  };
  return Authorization;
};

module.exports.isAllowed = async (UserAndRole, resources, method) => {
  try {
    const [, role] = UserAndRole;
    const data = await RoleModel.findOne({
      role: role,
      "allows.resources": { $in: [regex(resources), "*"] },
      "allows.permissions": { $in: ["*", method] },
    });
    if (data) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const regex = (valiable) => {
  return new RegExp(`(${valiable})((/\w+)+)?(( )+)?$`);
};
