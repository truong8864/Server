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

///////////////////////////////////////////TRUONG
const AuthenticationMiddleware = require("../api/v1/middlewares/Authentication.middleware");

const AuthorizationMiddleware = require("../api/v1/middlewares/Authorization.middleware");

const AuthenticationRoute = require("../api/v1/Authentication/Authentication.route");

const AuthorizationRoute = require("../api/v1/Authorization/Authorization.route");

const RoutesV1 = require("../api/v1/routes");
/////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////

const apiRouteV1 = require("../../api/v1/routes");
const { verifyToken } = require("../../api/v1/controllers/verifyToken");
const loginRouter = require("../../api/v1/routes/Login.router");
const RouterUser = require("../../api/v1/routes/RouterUser");

///////////////////////////////////////////////////////////////////////////////////////////////////////

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

// // mount api v1 routes

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.use("/api/v1/user", loginRouter);
app.use("/api/v1/user", verifyToken, RouterUser);
app.use(
  "/api/v1",
  AuthenticationMiddleware.verifyToken,
  AuthenticationMiddleware.refreshToken,
  apiRouteV1,
);

// Vào trong apiRouterV1 sửa nếu bị lỗi phần export
// const pdf = require("html-pdf");
// const pdfTemplate = require("../../api/v1/ExportFile/documents/Contract");

// app.get("/api/v1/fetch-pdf", (req, res) => {
//   res.sendFile(`${__dirname}/result.pdf`);
// });
// app.post("/api/v1/create-pdf", (req, res) => {
//   pdf.create(pdfTemplate(req.body), {}).toFile("result.pdf", (err) => {
//     if (err) {
//       res.send(Promise.reject());
//     }
//     res.send(Promise.resolve());
//   });
// });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//******************************************************************************************************
/**
 *  ROUTE TRUONG
 */
app.use("/authentication", AuthenticationRoute);
app.use("/authorization", AuthorizationRoute);
app.use(
  "/hrm/api/v1",
  AuthenticationMiddleware.verifyToken,
  AuthenticationMiddleware.refreshToken,
  // AuthorizationMiddleware.middleware((req) => [
  //   req.decoder.username,
  //   req.decoder.role,
  // ]),
  RoutesV1,
);
//******************************************************************************************************
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// if error is not an instanceOf APIError, convert it.
app.use(ErrorMiddleware.converter);

// catch 404 and forward to error handler
app.use(ErrorMiddleware.notFound);

// error handler, send stacktrace only during development
app.use(ErrorMiddleware.handler);

module.exports = app;
