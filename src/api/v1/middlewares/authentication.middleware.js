const jwt = require("jsonwebtoken");

const { AccessTokenSecretKey } = require("../../../../src/config/vars");

module.exports.verifyToken = async (req, res, next) => {
  try {
    const ACCESS_TOKEN = req.cookies.ACCESS_TOKEN;
    const decode = await jwt.verify(ACCESS_TOKEN, AccessTokenSecretKey);
    if (req.connection.remoteAddress === decode.ipUser) {
      req.username = decode.username;
      return next();
    }
    res.json({ ms: "NOT VERIFY" });
  } catch (error) {
    next(error);
  }
};
