const express = require("express");

const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const compress = require("compression");
const methodOverride = require("method-override");
const cors = require("cors");
const helmet = require("helmet");

const { logs, FrontEndUrl } = require("./vars");

const ErrorMiddleware = require("../api/v1/middlewares/Error.middleware");

const AuthenticationMiddleware = require("../api/v1/middlewares/Authentication.middleware");

const AuthorizationMiddleware = require("../api/v1/middlewares/Authorization.middleware");

const AuthenticationRoute = require("../api/v1/Authentication/Authentication.route");

const AuthorizationRoute = require("../api/v1/Authorization/Authorization.route");

const RoutesV1 = require("../api/v1/routes");

const Parse = require("../api/v1/middlewares/Paser.middleware");

/**
 * Express instance
 * @public
 */
const app = express();

// request logging. dev: console | production: file
app.use(morgan(logs));

app.use(cookieParser());
// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// gzip compression
app.use(compress());

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing

const corsOptionCredentials = {
  origin: FrontEndUrl,
  credentials: true,
};

app.use(cors(corsOptionCredentials));

// enable authentication
// app.use(passport.initialize());
// passport.use("jwt", strategies.jwt);

// // mount api v1 routes

app.use("/authentication", AuthenticationRoute);
app.use("/authorization", AuthorizationRoute);

app.use(Parse.parseURL);
app.use(
  "/hrm/api/v1",
  AuthenticationMiddleware.verifyToken,
  AuthenticationMiddleware.refreshToken,
  AuthorizationMiddleware.middleware((req) => [
    req.decoder.username,
    req.decoder.role,
  ]),
  RoutesV1,
);

// if error is not an instanceOf APIError, convert it.
app.use(ErrorMiddleware.converter);

// catch 404 and forward to error handler
app.use(ErrorMiddleware.notFound);

// error handler, send stacktrace only during development
app.use(ErrorMiddleware.handler);

module.exports = app;
