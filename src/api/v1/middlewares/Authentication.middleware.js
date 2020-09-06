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
    if ((decoder.UserID = req.cookies._ga)) {
      req.decoder = decoder;
      return next();
    }
    res.status(httpStatus.UNAUTHORIZED).json({
      message: "Token created by another user",
      UserIdDecoder: decoder.UserID,
      UserID: req.cookies._ga,
    });
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
    console.log("DANG O DAY", req.decoder);
    if (AccessTokenExpirationAt < new Date(Date.now() + 1000 * 60 * 5)) {
      const { REFRESH_TOKEN } = req.cookies;
      const decoder = jwt.verify(REFRESH_TOKEN, RefreshTokenSecretKey);
      if (req.connection.remoteAddress === decoder.ipUser) {
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
