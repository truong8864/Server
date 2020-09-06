const path = require("path");

//import .env variables
require("dotenv").config({
  path: path.join(__dirname, "../../.example.env"),
  allowEmptyValues: true,
});

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  FrontEndUrl: process.env.FRONT_END_URL,
  PasswordSecretKey: process.env.PASSWORD_SECRET_KEY,
  AccessTokenSecretKey: process.env.ACCESS_TOKEN_SECRET_KEY,
  RefreshTokenSecretKey: process.env.REFRESH_TOKEN_SECRET_KEY,
  AccessTokenExpirationMinutes: process.env.ACCESS_TOKEN_EXPIRATION_MINUTES,
  RefreshTokenExpirationMinutes: process.env.REFRESH_TOKEN_EXPIRATION_MINUTES,
  mongo: {
    uri:
      process.env.NODE_ENV === "test"
        ? process.env.MONGO_URI_TESTS
        : process.env.MONGO_URI,
  },
  logs: process.env.NODE_ENV === "production" ? "combined" : "dev",
  //   emailConfig: {
  //     host: process.env.EMAIL_HOST,
  //     port: process.env.EMAIL_PORT,
  //     username: process.env.EMAIL_USERNAME,
  //     password: process.env.EMAIL_PASSWORD,
  //   },
};
