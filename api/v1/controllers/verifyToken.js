//const Secret = process.env.SECRET;
const jwt = require("jsonwebtoken");

module.exports.verifyToken = function (req, res, next) {
  const token = req.headers["access-token"];
  console.log(token);
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      //console.log(token);

      if (err) {
        return res.sendStatus(403);
      } else {
        req.decoded = decoded;
        req.token = token;
        next();
        /*    res.json({
            decoded
          })*/
      }
    });
  } else {
    res.json({
      message: "No token provided.",
    });
  }
};
