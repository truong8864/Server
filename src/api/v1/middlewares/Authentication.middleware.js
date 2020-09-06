const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");

const {
  AccessTokenSecretKey,
  RefreshTokenSecretKey,
  AccessTokenExpirationMinutes,
} = require("../../../config/vars");

module.exports.verifyToken = async (req, res, next) => {
  try {
    const ACCESS_TOKEN = req.cookies.ACCESS_TOKEN;
    const decoder = await jwt.verify(ACCESS_TOKEN, AccessTokenSecretKey);
    if (decoder) {
      req.decoder = decoder;
      return next();
    }
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json({ message: "Token not verify" });
  } catch (error) {
    console.log(error);
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json({ message: "Token not verify" });
  }
};

module.exports.refreshToken = async (req, res, next) => {
  try {
    const AccessTokenExpirationAt = new Date(
      req.decoder.iat * 1000 + req.decoder.exp - req.decoder.iat,
    );

    if (AccessTokenExpirationAt < new Date(Date.now() + 1000 * 60 * 5)) {
      const { REFRESH_TOKEN } = req.cookies;
      const decoder = jwt.verify(REFRESH_TOKEN, RefreshTokenSecretKey);
      if (decoder) {
        const payload = req.decoder;
        const accessToken = jwt.sign(payload, AccessTokenSecretKey, {
          expiresIn: AccessTokenExpirationMinutes * 60 * 1000,
        });
        res.cookie("ACCESS_TOKEN", accessToken, {
          maxAge: AccessTokenExpirationMinutes * 60 * 1000,
          httpOnly: true,
          sameSite: "None",
          secure: true,
        });
      }
    }
  } finally {
    next();
  }
};
