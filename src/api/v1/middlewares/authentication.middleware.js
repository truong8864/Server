const jwt = require("jsonwebtoken");
const httpStatus = require("http-status")

const Authorization = require("../Authorization/authorization.controller")

Authorization.createFistRole()

const { AccessTokenSecretKey, RefreshTokenSecretKey, AccessTokenExpirationMinutes } = require("../../../../src/config/vars");

module.exports.verifyToken = async (req, res, next) => {
  try {
    const ACCESS_TOKEN = req.cookies.ACCESS_TOKEN;
    const decoder = await jwt.verify(ACCESS_TOKEN, AccessTokenSecretKey);
    if (req.connection.remoteAddress === decoder.ipUser) {
      req.decoder = decoder;
      return next();
    }
    res.status(httpStatus.UNAUTHORIZED).json({ message: "Token created by another user" });
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).json({ message: "Token not verify" });
  }
};


module.exports.refreshToken = async (req, res, next) => {
  try {
    const AccessTokenExpirationAt = new Date(req.decoder.iat*1000+req.decoder.exp-req.decoder.iat)
    if(AccessTokenExpirationAt < new Date(Date.now()+1000*60*5)){
      const { REFRESH_TOKEN } = req.cookies
      const decoder = await jwt.verify(REFRESH_TOKEN, RefreshTokenSecretKey);
      if (req.connection.remoteAddress === decoder.ipUser) {

        const payload = {
          username: req.decoder.username,
          ipUser: req.decoder.ipUser,
        };
    
        const accessToken = jwt.sign(payload, AccessTokenSecretKey, {
          expiresIn: AccessTokenExpirationMinutes * 60 * 1000,
        });
    
        res.cookie("ACCESS_TOKEN", accessToken, {
          maxAge: AccessTokenExpirationMinutes * 60 * 1000,
          httpOnly: true,
        });

      }
    }
  } finally {
    next()
  }
};

